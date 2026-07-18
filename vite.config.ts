import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function kityStrictModeCompat() {
  const methodOriginal = `var method = BaseClass.prototype[methodName] = extension[methodName];
                    method.__KityMethodClass = BaseClass;
                    method.__KityMethodName = methodName;`
  const methodReplacement = `var originalMethod = extension[methodName];
                    if (typeof originalMethod === 'function') {
                        var method = BaseClass.prototype[methodName] = (function(originalMethod) {
                            return function kityMethod() {
                                var previousMethod = this.__KityCurrentMethod;
                                this.__KityCurrentMethod = kityMethod;
                                try {
                                    return originalMethod.apply(this, arguments);
                                } finally {
                                    this.__KityCurrentMethod = previousMethod;
                                }
                            };
                        })(originalMethod);
                        method.__KityMethodClass = BaseClass;
                        method.__KityMethodName = methodName;
                    } else {
                        BaseClass.prototype[methodName] = originalMethod;
                    }`
  const constructorOriginal = `NewClass = inherit(constructor, BaseClass, classname);`
  const constructorReplacement = `var originalConstructor = constructor;
            constructor = function() {
                var previousMethod = this.__KityCurrentMethod;
                this.__KityCurrentMethod = constructor;
                try {
                    return originalConstructor.apply(this, arguments);
                } finally {
                    this.__KityCurrentMethod = previousMethod;
                }
            };
            NewClass = inherit(constructor, BaseClass, classname);`
  const callerOriginal = `var caller = arguments.callee.caller;`
  const callerReplacement = `var caller = this.__KityCurrentMethod;`

  return {
    name: 'kity-strict-mode-compat',
    enforce: 'pre',
    transform(code, id) {
      if (!id.split('?')[0].endsWith('/kity/dist/kity.js')) return null
      if (!code.includes(methodOriginal) || !code.includes(constructorOriginal)) {
        throw new Error('Unsupported kity build: strict-mode compatibility target not found')
      }
      return code
        .replace(methodOriginal, methodReplacement)
        .replace(constructorOriginal, constructorReplacement)
        .replaceAll(callerOriginal, callerReplacement)
    }
  }
}

export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = command === 'build' && mode === 'library'
  const isSiteBuild = command === 'build' && mode === 'site'

  return {
    base: isSiteBuild ? './' : '/',
    plugins: [kityStrictModeCompat(), vue()],
    ...(isLibraryBuild ? {
      build: {
        outDir: 'dist',
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'Minder',
          formats: ['es', 'umd'],
          fileName: (format) => `minder.${format === 'es' ? 'es' : 'min'}.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
            assetFileNames: (assetInfo) => assetInfo.name === 'style.css'
              ? 'styles/minder.css'
              : 'assets/[name]-[hash][extname]'
          }
        }
      }
    } : isSiteBuild ? {
      build: {
        outDir: 'dist-site'
      }
    } : {}),
    optimizeDeps: {
      exclude: ['kity', 'kityminder-core', 'hotbox/hotbox.js']
    },
    server: {
      port: 10000,
      open: false
    }
  }
})
