import render from '@src/schema/index'
import EnvContext from '@src/context/envContext'
import EventContext from '@src/context/emitterContext'
import EventEmitter from 'eventemitter3'
import { ConfigProvider } from 'antd'
import store from './store'
import { Provider } from 'react-redux'
import AppStore, { createStore } from '@src/store/AppStore'
import Modal from './components/Modal'
import { BaseApiObject } from './types/types'
import axios from 'axios'
import moment from 'moment'
import zhCN from 'antd/es/locale/zh_CN'
moment.locale('zh-cn')
const eventEmitter = new EventEmitter()
interface renderProps {
  schema: any
}
function App({ schema }: renderProps) {
  const env = {
    fetcher(api: BaseApiObject | string, data: any) {
      let method = 'get'
      let url = api as string
      if (typeof api === 'string' && api.indexOf(':') > -1) {
        // 截取字符串
        const idx = api.indexOf(':')
        method = api.substring(0, idx)
        url = api.substring(idx + 1)
      }
      let promise
      if (['get'].includes(method)) {
        promise = axios({
          method,
          url,
          params: data,
        })
      } else {
        promise = axios({
          method,
          url,
          data,
        })
      }
      return promise.then((res) => res.data.data)
    },
  }
  const children = render({ $path: '', ...schema })
  const [appStore] = createStore()
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <EventContext.Provider value={eventEmitter}>
          <AppStore appStore={appStore}>
            <EnvContext.Provider value={env}>
              <Modal />
              {children}
            </EnvContext.Provider>
          </AppStore>
        </EventContext.Provider>
      </Provider>
    </ConfigProvider>
  )
}

export default App
