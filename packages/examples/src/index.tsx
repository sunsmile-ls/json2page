import render from '@src/schema/index'
import EnvContext from '@src/context/envContext'
import EventContext from '@src/context/emitterContext'
import EventEmitter from 'eventemitter3'
import { ConfigProvider } from 'antd'
import store from './store'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import AppStore, { createStore } from '@src/store/AppStore'
import Modal from './components/Modal'
import { BaseApiObject } from './types/types'
import axios from 'axios'
import moment from 'moment'

const eventEmitter = new EventEmitter()
function App() {
  const schema = {
    type: 'page',
    initApi: 'api/user/info',
    body: [
      {
        type: 'divider',
        orientation: 'left',
        body: '检查表',
      },
      {
        type: 'crud',
        api: 'post:/api/user/list',
        filter: {
          size: 'middle',
          initialValues: {},
          actions: [
            {
              type: 'button',
              actionType: 'submit',
              body: '查询',
              style: {
                marginRight: '10px',
              },
            },
            {
              type: 'button',
              actionType: 'download',
              body: '下载',
            },
          ],
        },
        table: {
          columns: [
            {
              title: '索引',
              dataIndex: 'index',
            },
            {
              title: '服务名称',
              dataIndex: 'name',
            },
            {
              title: '服务调用次数',
              dataIndex: 'status',
            },
            {
              title: '日期',
              dataIndex: 'reportDate',
              valueType: 'datepicker',
              renderText: '${reportDate | format}',
              options: {
                filters: {
                  format(val: string) {
                    if (val) {
                      return moment(+val).format('yyyy-MM-DD')
                    }
                    return val
                  },
                },
              },
            },
            {
              title: '操作',
              dataIndex: 'operation',
              body: [
                {
                  type: 'button',
                  level: 'link',
                  actionType: 'dialog',
                  body: '修改',
                  api: 'put:/api/user/info',
                  title: '修改',
                },
                {
                  type: 'button',
                  body: '删除',
                  level: 'link',
                  className: 'text-danger',
                  actionType: 'ajax',
                  confirmText: '确认要删除？',
                  api: 'delete:/api/user/delete/${id}',
                },
              ],
            },
          ],
        },
      },
    ],
  }
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
