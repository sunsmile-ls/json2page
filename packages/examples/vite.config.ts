/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import vitePluginImp from 'vite-plugin-imp'
import lessToJS from 'less-vars-to-js'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import 'dotenv/config'
import { resolve } from 'path'
import * as fs from 'fs'
const pathResolver = (path: string) => resolve(__dirname, path)
const themeVariables = lessToJS(fs.readFileSync(pathResolver('./config/variables.less'), 'utf8'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mockDevServerPlugin(),
    Unocss({ presets: [presetWind()] }),
    tsconfigPaths(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => {
            if (name === 'col' || name === 'row') {
              return 'antd/es/grid/style/index.less'
            }
            return `antd/es/${name}/style/index.less`
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '^/api': 'http://localhost:3000',
    },
  },
  // vitest config
  test: {
    // https://vitest.dev/config/
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/test/setupFiles.ts',
  },
})
