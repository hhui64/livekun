import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import progress from 'vite-plugin-progress'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      host: '0.0.0.0',
      port: 8080,
      strictPort: true
    },
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue(),
      eslint({
        cache: true
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/types/auto-imports.d.ts'
      }),
      Components({
        dts: 'src/types/components.d.ts',
        globs: ['src/components/**/*.vue', 'src/plugins/**/components/*.vue'],
        deep: true,
        resolvers: [
          AntDesignVueResolver({ importStyle: 'less', resolveIcons: true }),
          IconsResolver(),
          (componentName) => {
            switch (componentName) {
              case 'ColorPicker':
                return { name: 'ColorPicker', from: 'vue3-colorpicker' }
            }
          }
        ],
        allowOverrides: true
      }),
      Icons({
        compiler: 'vue3'
      }),
      progress()
    ],
    define: {
      __APP_VERSION__: `"${process.env.npm_package_version}"`,
      __DEV_URL__: `"10.0.0.230:39075"`,
      __PROD_URL__: `"livekun-webapi.anankun.icu:4433"`
    },
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'INVALID_ANNOTATION') {
            return
          }

          defaultHandler(warning)
        },
        output: {
          sanitizeFileName(name) {
            const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
            const DRIVE_LETTER_REGEX = /^[a-z]:/i

            const match = DRIVE_LETTER_REGEX.exec(name)
            const driveLetter = match ? match[0] : ''
            return (
              driveLetter +
              name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
            )
          }
        }
      }
    }
  }
})
