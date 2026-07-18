import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

test('Vue 3.2.25 consumers can dynamically load complete library artifacts', () => {
  const build = spawnSync('npm', ['run', 'build:lib'], {
    cwd: projectRoot,
    encoding: 'utf8'
  })

  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`)

  const packageJson = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'))
  const packageLock = JSON.parse(readFileSync(resolve(projectRoot, 'package-lock.json'), 'utf8'))
  const esmPath = resolve(projectRoot, packageJson.exports['.'].import)
  const umdPath = resolve(projectRoot, packageJson.exports['.'].require)
  const cssPath = resolve(projectRoot, packageJson.exports['./style.css'])
  const esm = readFileSync(esmPath, 'utf8')

  assert.ok(statSync(esmPath).size > 100_000, 'ESM bundle should contain the editor runtime')
  assert.ok(statSync(umdPath).size > 100_000, 'UMD bundle should contain the editor runtime')
  assert.ok(statSync(cssPath).size > 10_000, 'published CSS should contain the full editor theme')
  assert.doesNotMatch(esm, /assemble\(require\(/, 'runtime modules must be statically assembled')
  assert.doesNotMatch(esm, /Vue\.filter\(/, 'Vue 1 filters must not execute in Vue 3')
  assert.doesNotMatch(esm, /require\(["']\.\/runtime\//, 'local runtime requires must be bundled')
  assert.doesNotMatch(esm, /require\(["']kityminder-core\/src\//, 'internal vendor requires must be bundled')
  assert.doesNotMatch(JSON.stringify(packageLock), /git\+ssh:/, 'deployment dependencies must not require SSH credentials')
  assert.equal(packageJson.devDependencies.playwright, undefined, 'browser QA must not add Playwright to the project')

  const consumerRoot = mkdtempSync(join(tmpdir(), 'vue-minder-consumer-'))
  try {
    const packed = spawnSync('npm', ['pack', '--json', '--pack-destination', consumerRoot], {
      cwd: projectRoot,
      encoding: 'utf8'
    })
    assert.equal(packed.status, 0, `${packed.stdout}\n${packed.stderr}`)

    const [{ filename }] = JSON.parse(packed.stdout)
    const viteVersion = packageLock.packages['node_modules/vite'].version
    writeFileSync(resolve(consumerRoot, 'package.json'), JSON.stringify({
      private: true,
      type: 'module'
    }))

    const install = spawnSync('npm', [
      'install',
      '--ignore-scripts',
      '--package-lock=false',
      '--no-audit',
      '--no-fund',
      resolve(consumerRoot, filename),
      'vue@3.2.25',
      `vite@${viteVersion}`
    ], {
      cwd: consumerRoot,
      encoding: 'utf8'
    })
    assert.equal(install.status, 0, `${install.stdout}\n${install.stderr}`)

    writeFileSync(resolve(consumerRoot, 'index.html'), '<div id="app"></div><script type="module" src="/main.js"></script>')
    // Keep the package import inside the lazy chunk so Vite validates both
    // named and default exports without moving the editor into the entry chunk.
    writeFileSync(resolve(consumerRoot, 'load-minder.js'), `
      import VueMinder, { Minder } from 'vue-minder'
      export { Minder, VueMinder }
    `)
    writeFileSync(resolve(consumerRoot, 'main.js'), `
      import { createApp, defineAsyncComponent, h } from 'vue'

      const Minder = defineAsyncComponent(async () => {
        await import('vue-minder/style.css')
        const module = await import('./load-minder.js')
        if (typeof module.VueMinder.install !== 'function' || !module.Minder) {
          throw new Error('Vue Minder exports are incomplete')
        }
        return module.Minder
      })

      const data = {
        root: { data: { id: 1, name: 'Consumer root' }, children: [] },
        template: 'default',
        theme: 'fresh-blue'
      }
      const app = createApp({
        render: () => h(Minder, {
          importData: data,
          uniqueIndexFn: (node) => node.data.id,
          style: { width: '800px', height: '500px' }
        })
      })
      app.mount('#app')
    `)

    const consumerBuild = spawnSync(resolve(consumerRoot, 'node_modules/.bin/vite'), ['build', '--manifest'], {
      cwd: consumerRoot,
      encoding: 'utf8'
    })
    assert.equal(consumerBuild.status, 0, `${consumerBuild.stdout}\n${consumerBuild.stderr}`)

    const consumerAssets = readdirSync(resolve(consumerRoot, 'dist/assets'))
    const consumerHtml = readFileSync(resolve(consumerRoot, 'dist/index.html'), 'utf8')
    const manifest = JSON.parse(readFileSync(resolve(consumerRoot, 'dist/.vite/manifest.json'), 'utf8'))
    const entryChunk = Object.values(manifest).find((chunk) => chunk.isEntry)
    const minderChunk = manifest['load-minder.js']
    const styleChunk = manifest['node_modules/vue-minder/dist/styles/minder.css']
    const consumerCss = consumerAssets.filter((file) => file.endsWith('.css'))
    const consumerJs = consumerAssets.filter((file) => file.endsWith('.js'))
    const totalCssSize = consumerCss.reduce((size, file) => size + statSync(resolve(consumerRoot, 'dist/assets', file)).size, 0)
    const totalJsSize = consumerJs.reduce((size, file) => size + statSync(resolve(consumerRoot, 'dist/assets', file)).size, 0)
    assert.ok(entryChunk?.isEntry, `consumer entry is missing from manifest: ${JSON.stringify(manifest)}`)
    assert.ok(entryChunk.dynamicImports?.includes('load-minder.js'), `consumer entry does not lazy-load the editor: ${JSON.stringify(manifest)}`)
    assert.ok(minderChunk?.isDynamicEntry, `editor is not a dynamic entry: ${JSON.stringify(manifest)}`)
    assert.ok(statSync(resolve(consumerRoot, 'dist', minderChunk.file)).size > 100_000, 'dynamic editor chunk should contain the runtime')
    assert.ok(styleChunk?.file.endsWith('.css'), `editor CSS is missing from manifest: ${JSON.stringify(manifest)}`)
    assert.ok(consumerCss.length > 0, 'consumer build should include the dynamically imported CSS')
    assert.doesNotMatch(consumerHtml, /\.css/, 'dynamically imported CSS should not be linked eagerly from HTML')
    assert.ok(totalCssSize > 100_000, 'consumer CSS should include Bootstrap and editor styles')
    assert.ok(totalJsSize > 100_000, 'consumer JS should include the editor runtime')
  } finally {
    rmSync(consumerRoot, { recursive: true, force: true })
  }
})
