import AppContext from '../../context/AppContext'
import React from 'react'
import Trie from './Tire'

type fieldEntitiesType = Array<React.Component<Readonly<{ $path?: string }>, Readonly<{}>>>
class AppStore {
  store: Trie
  fieldEntities: fieldEntitiesType
  constructor() {
    this.store = new Trie() //数据仓库
    this.fieldEntities = [] // 存储组件实例
  }
  //
  setFieldEntities = (field: React.Component<Readonly<{ $path?: string }>, Readonly<{}>>) => {
    this.fieldEntities.push(field)
    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter((f) => f !== field)
      if (field.props.$path) this.store.delete(field.props.$path)
    }
  }

  getFieldValue = (path: string, isScopedSearch = false) => {
    if (isScopedSearch) {
      return this.store.search(path)
    }
    return this.store.findClosest(path)
  }

  // set
  setFieldValue = (newStore: { path: string; value: object }) => {
    // 'name': 'value'
    // 更新数据仓库
    const { path, value } = newStore
    this.store.insert(path, value)

    //更新组件
    // forceUpdate
    this.fieldEntities.forEach((field) => {
      if (field.props.$path === path) {
        // @ts-ignore
        field.onStoreChange()
      }
    })
  }

  getAppStore = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      setFieldEntities: this.setFieldEntities,
    }
  }
}
export interface AppStoreType {
  getFieldValue: (name: string, isScopedSearch?: boolean) => object | undefined
  setFieldValue: (newStore: { path: string; value: object }) => void
  setFieldEntities: (
    field: React.Component<Readonly<{ $path?: string }>, Readonly<{}>>
  ) => () => void
}
export function createStore(appStore: AppStoreType | void) {
  const appStoreRef = React.useRef<AppStoreType>()

  if (!appStoreRef.current) {
    if (appStore) {
      appStoreRef.current = appStore
    } else {
      const appStore = new AppStore()
      appStoreRef.current = appStore.getAppStore()
    }
  }

  return [appStoreRef.current]
}

const AppProvider = React.forwardRef<
  any,
  {
    children: any
    appStore: AppStoreType
  }
>(({ children, appStore }, ref) => {
  const [appStoreInstance] = createStore(appStore)

  React.useImperativeHandle(ref, () => appStoreInstance)

  return <AppContext.Provider value={appStoreInstance}>{children}</AppContext.Provider>
})

export default AppProvider
