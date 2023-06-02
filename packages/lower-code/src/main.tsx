import * as React from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from '@src/context/app-providers'
import Entry from '@src/index'
import 'antd/dist/antd.css'
import '@src/asserts/css/index.less'
import 'uno.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AppProviders>
      <Entry />
    </AppProviders>
  </React.StrictMode>
)
