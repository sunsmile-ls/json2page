import moment from 'moment'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import Page from './components/index'
moment.locale('zh-cn')
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Page />
    </ConfigProvider>
  )
}

export default App
