import { useContext, useEffect, useMemo, useRef } from 'react'
import {
  BaseSchema,
  SchemaCollection,
  SchemaClassName,
  SchemaApi,
  SchemaExpression,
  SchemaMessage,
  SchemaDefaultData,
  RendererProps,
  CSSRule,
} from '../../types/schema'
import classnames from 'classnames'
import { useCSSToHead, useVarsToHead } from '@src/hooks'
import EnvContext from '@src/context/envContext'
import AppContext from '@src/context/AppContext'

/**
 * Page 渲染器
 */
export interface PageSchema extends BaseSchema {
  /**
   * 指定为 page 渲染器。
   */
  type: 'page'

  /**
   * 页面标题
   */
  title?: string

  /**
   * 页面副标题
   */
  subTitle?: string

  /**
   * 内容区域
   */
  body?: SchemaCollection

  /**
   * 内容区 css 类名
   */
  bodyClassName?: SchemaClassName

  /**
   * 配置容器 className
   */
  className?: SchemaClassName

  /**
   * 配置 header 容器 className
   */
  headerClassName?: SchemaClassName

  /**
   * 自定义页面级别样式表
   */
  css?: CSSRule

  /**
   * 页面级别的初始数据
   */
  data?: SchemaDefaultData

  /**
   * 页面初始化的时候，可以设置一个 API 让其取拉取，发送数据会携带当前 data 数据（包含地址栏参数），获取得数据会合并到 data 中，供组件内使用。
   */
  initApi?: SchemaApi

  messages?: SchemaMessage

  /**
   * 配置轮询间隔，配置后 initApi 将轮询加载。
   */
  interval?: number

  /**
   * 是否要静默加载，也就是说不显示进度
   */
  silentPolling?: boolean

  /**
   * 配置停止轮询的条件。
   */
  stopAutoRefreshWhen?: SchemaExpression
  // primaryField?: string, // 指定主键的字段名，默认为 `id`

  /**
   * 是否显示错误信息，默认是显示的。
   */
  showErrorMsg?: boolean

  /**
   * css 变量
   */
  cssVars?: any

  /**
   * 自定义样式
   */
  style?: {
    [propName: string]: any
  }
}

export interface PageProps extends RendererProps, Omit<PageSchema, 'type' | 'className'> {
  data: any
  location?: Location
}
function Page(props: PageProps): JSX.Element {
  const {
    title,
    subTitle,
    children,
    bodyClassName,
    headerClassName,
    className,
    style,
    css,
    cssVars,
    data,
    initApi,
    interval,
    $path: _,
    setStoreValue,
  } = props
  const setCSS = useCSSToHead()
  const setVarsCSS = useVarsToHead()
  const env = useContext(EnvContext)
  const { getFieldValue } = useContext(AppContext)
  const timeRef = useRef<string | number | NodeJS.Timeout | undefined>()

  // 处理 标题部分
  const renderHeader = useMemo(() => {
    if (!title && !subTitle) return null
    return (
      <div className={classnames('pl-1', headerClassName)}>
        {title && <h2 className="font-600 text-size-2xl p-0 m-0 mt-1">{title}</h2>}
        {subTitle && <h6 className="text-size-sm pt-2 m-0">{subTitle}</h6>}
      </div>
    )
  }, [title, subTitle])

  // 设置css
  useEffect(() => {
    setCSS(css)
  }, [css])

  // 设置设置变量的Vars
  useEffect(() => {
    setVarsCSS(cssVars)
  }, [cssVars])

  // 处理请求资源
  const dealData = (res: any) => {}
  const getData = () => {
    if (initApi) env.fetcher(initApi, data).then((res) => dealData(res))
  }
  // 请求初始化资源
  useEffect(() => {
    if (interval) {
      timeRef.current = setInterval(getData, interval)
    } else {
      getData()
    }
    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  // 初始化
  return (
    <div className={classnames('flex flex-col', className)} style={style}>
      {renderHeader}
      <div className={bodyClassName as string}>{children}</div>
    </div>
  )
}

Page.displayName = 'Page'

export default Page
