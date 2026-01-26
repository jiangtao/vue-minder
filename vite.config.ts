import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve'

  return {
    plugins: [vue()],
    // Only configure build options for production builds
    ...(isDev ? {} : {
      build: {
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
            }
          }
        }
      }
    }),
    server: {
      port: 10000,
      open: true
    }
  }
})
