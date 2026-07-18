import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

test('Vercel receives a standalone Vue 3 demo site', () => {
  const build = spawnSync('npm', ['run', 'build:site'], {
    cwd: projectRoot,
    encoding: 'utf8'
  })

  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`)

  const siteRoot = resolve(projectRoot, 'dist-site')
  const index = readFileSync(resolve(siteRoot, 'index.html'), 'utf8')
  const assets = readdirSync(resolve(siteRoot, 'assets'))
  const cssFile = assets.find((file) => file.endsWith('.css'))
  const jsFile = assets.find((file) => file.endsWith('.js'))
  const vercel = JSON.parse(readFileSync(resolve(projectRoot, 'vercel.json'), 'utf8'))

  assert.ok(cssFile, 'site build should emit CSS')
  assert.ok(jsFile, 'site build should emit JavaScript')
  const css = readFileSync(resolve(siteRoot, 'assets', cssFile), 'utf8')
  assert.ok(statSync(resolve(siteRoot, 'assets', cssFile)).size > 10_000, 'site CSS should include the editor theme')
  assert.ok(assets.some((file) => file.startsWith('icons-') && file.endsWith('.png')), 'toolbar sprite should be emitted')
  assert.ok(assets.some((file) => file.startsWith('template-') && file.endsWith('.png')), 'template sprite should be emitted')
  assert.doesNotMatch(css, /topTab\/(?:appearance|idea|view)?\/?images\//, 'CSS must not retain unresolved legacy image paths')
  assert.match(index, /Vue Minder 3/)
  assert.doesNotMatch(index, /\/examples\/main\.js/, 'production HTML must reference built assets')
  assert.equal(vercel.installCommand, 'npm ci')
  assert.equal(vercel.buildCommand, 'npm run build:site')
  assert.equal(vercel.outputDirectory, 'dist-site')
})
