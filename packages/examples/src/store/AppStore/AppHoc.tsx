import React, { Component, ComponentType, FC } from 'react'
import StoreContext from '../../context/AppContext'
export interface AppStorePropsType {
  getFieldValue: (path: string) => any
  setFieldValueByPath: ((value: any) => void) | null
}
class EventComp extends Component<{
  $path?: string
  target?: string
  ignorePath?: boolean
  children: any
}> {
  static contextType = StoreContext
  declare context: React.ContextType<typeof StoreContext>
  unRegister?: () => void

  componentDidMount() {
    // 注册 和 取消注册要成对出现
    const { $path, ignorePath } = this.props
    if ($path && !ignorePath) this.unRegister = this.context.setFieldEntities(this)
  }

  componentWillUnmount() {
    if (this.unRegister) {
      this.unRegister()
    }
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getControlled: () => AppStorePropsType = () => {
    const { $path } = this.props
    const { setFieldValue, getFieldValue } = this.context
    return {
      getFieldValue: (path: string) => getFieldValue(path),
      setFieldValueByPath: (value: any) => {
        setFieldValue({ path: $path!, value })
      },
    }
  }
  render() {
    const { children } = this.props
    const returnChildNode = React.cloneElement(children, this.getControlled())
    return returnChildNode
  }
}
export interface AppStoreHOCType {
  name: string
  target: string
  ignorePath?: boolean
  [propName: string]: any
}
function StoreHOC<T extends AppStoreHOCType>(
  WrappedComponent: ComponentType<T>
): FC<AppStoreHOCType> {
  const HOC: FC<AppStoreHOCType> = (props) => {
    // 在此处可以对传入的属性进行处理
    const { $path, ignorePath, ...rest } = props
    // 将 hocProp 属性注入到 WrappedComponent 中
    return (
      <EventComp $path={$path} ignorePath={ignorePath}>
        <WrappedComponent {...(rest as T)} $path={$path} />
      </EventComp>
    )
  }

  return HOC
}
export default StoreHOC
