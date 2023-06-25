import { PageSchema } from '@src/components/Page'
import { ListenerAction, debounceConfig } from './types'
import { FlexSchema } from '@src/components/Flex'

/**
 * 组件名字，这个名字可以用来定位，用于组件通信
 */
export type SchemaName = string
/**
 * css类名，配置字符串，或者对象。
 *
 *     className: "red"
 *
 * 用对象配置时意味着你能跟表达式一起搭配使用，如：
 *
 *     className: {
 *         "red": "data.progress > 80",
 *         "blue": "data.progress > 60"
 *     }
 */
export type SchemaClassName =
  | string
  | {
      [propName: string]: boolean | undefined | null | SchemaExpression
    }
/**
 * 表达式，语法 `data.xxx > 5`。
 */
export type SchemaExpression = string

export type SchemaTokenizeableString = string

export type SchemaUrlPath = SchemaTokenizeableString

export interface SchemaApiObject {
  /**
   * API 发送类型
   */
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'jsonp' | 'js'

  /**
   * API 发送目标地址
   */
  url: SchemaUrlPath

  /**
   * 用来控制携带数据. 当key 为 `&` 值为 `$$` 时, 将所有原始数据打平设置到 data 中. 当值为 $$ 将所有原始数据赋值到对应的 key 中. 当值为 $ 打头时, 将变量值设置到 key 中.
   */
  data?: {
    [propName: string]: any
  }

  /**
   * 默认数据映射中的key如果带点，或者带大括号，会转成对象比如：
   *
   * {
   *   'a.b': '123'
   * }
   *
   * 经过数据映射后变成
   * {
   *  a: {
   *   b: '123
   *  }
   * }
   *
   * 如果想要关闭此功能，请设置 convertKeyToPath 为 false
   */
  convertKeyToPath?: boolean

  /**
   * 用来做接口返回的数据映射。
   */
  responseData?: {
    [propName: string]: any
  }

  /**
   * 如果 method 为 get 的接口，设置了 data 信息。
   * 默认 data 会自动附带在 query 里面发送给后端。
   *
   * 如果想通过 body 发送给后端，那么请把这个配置成 false。
   *
   * 但是，浏览器还不支持啊，设置了只是摆设。除非服务端支持 method-override
   */
  attachDataToQuery?: boolean

  /**
   * 发送体的格式
   */
  dataType?: 'json' | 'form-data' | 'form'

  /**
   * 如果是文件下载接口，请配置这个。
   */
  responseType?: 'blob'

  /**
   * 携带 headers，用法和 data 一样，可以用变量。
   */
  headers?: {
    [propName: string]: string | number
  }

  /**
   * 设置发送条件
   */
  sendOn?: SchemaExpression

  /**
   * 默认都是追加模式，如果想完全替换把这个配置成 true
   */
  replaceData?: boolean

  /**
   * 是否自动刷新，当 url 中的取值结果变化时，自动刷新数据。
   *
   * @default true
   */
  autoRefresh?: boolean

  /**
   * 当开启自动刷新的时候，默认是 api 的 url 来自动跟踪变量变化的。
   * 如果你希望监控 url 外的变量，请配置 traceExpression。
   */
  trackExpression?: string

  /**
   * 如果设置了值，同一个接口，相同参数，指定的时间（单位：ms）内请求将直接走缓存。
   */
  cache?: number

  /**
   * 强制将数据附加在 query，默认只有 api 地址中没有用变量的时候 crud 查询接口才会
   * 自动附加数据到 query 部分，如果想强制附加请设置这个属性。
   * 对于那种临时加了个变量但是又不想全部参数写一遍的时候配置很有用。
   */
  forceAppendDataToQuery?: boolean

  /**
   * qs 配置项
   */
  qsOptions?: {
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
    indices?: boolean
    allowDots?: boolean
  }

  /**
   * autoFill 是否显示自动填充错误提示
   */
  silent?: boolean
}
/**
 * 初始数据，设置得值可用于组件内部模板使用。
 */
export type SchemaDefaultData = {
  [propName: string]: any
}
/**
 * 支持两种语法，但是不能混着用。分别是：
 *
 * 1. `${xxx}` 或者 `${xxx|upperCase}`
 * 2. `<%= data.xxx %>`
 *
 */
export type SchemaTpl = string
export type SchemaApi = string | SchemaApiObject
export type SchemaObject = PageSchema | FlexSchema
export type SchemaCollection =
  | SchemaObject
  | SchemaTpl
  | Array<SchemaObject | SchemaTpl>
  | Array<Record<string, string>>

/**
 * 消息文案配置，记住这个优先级是最低的，如果你的接口返回了 msg，接口返回的优先。
 */
export type SchemaMessage = {
  /**
   * 获取失败时的提示
   */
  fetchFailed?: string

  /**
   * 获取成功的提示，默认为空。
   */
  fetchSuccess?: string

  /**
   * 保存失败时的提示。
   */
  saveFailed?: string

  /**
   * 保存成功时的提示。
   */
  saveSuccess?: string
}
export type SchemaType = 'page' | 'flex' | 'flex-item'

export interface BaseSchema extends BaseSchemaWithoutType {
  type: SchemaType
}

export interface BaseSchemaWithoutType {
  /**
   * 容器 css 类名
   */
  className?: SchemaClassName

  /**
   * 配合 definitions 一起使用，可以实现无限循环的渲染器。
   */
  $ref?: string

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 是否禁用表达式
   */
  disabledOn?: SchemaExpression

  /**
   * 是否隐藏
   * @deprecated 推荐用 visible
   */
  hidden?: boolean

  /**
   * 是否隐藏表达式
   * @deprecated 推荐用 visibleOn
   */
  hiddenOn?: SchemaExpression

  /**
   * 是否显示
   */

  visible?: boolean

  /**
   * 是否显示表达式
   */
  visibleOn?: SchemaExpression

  /**
   * 组件唯一 id，主要用于日志采集
   */
  id?: string

  /**
   * 事件动作配置
   */
  onEvent?: {
    [propName: string]: {
      weight?: number // 权重
      actions: ListenerAction[] // 执行的动作集
      debounce?: debounceConfig
    }
  }
  /**
   * 是否静态展示
   */
  static?: boolean
  /**
   * 是否静态展示表达式
   */
  staticOn?: SchemaExpression
  /**
   * 静态展示空值占位
   */
  staticPlaceholder?: string
  /**
   * 静态展示表单项类名
   */
  staticClassName?: SchemaClassName
  /**
   * 静态展示表单项Label类名
   */
  staticLabelClassName?: SchemaClassName
  /**
   * 静态展示表单项Value类名
   */
  staticInputClassName?: SchemaClassName
  staticSchema?: any
}
export interface Schema {
  type: string
  detectField?: string
  visibleOn?: string
  body?: SchemaNode
  hiddenOn?: string
  disabledOn?: string
  staticOn?: string
  visible?: boolean
  hidden?: boolean
  disabled?: boolean
  static?: boolean
  children?: JSX.Element | ((props: any, schema?: any) => JSX.Element) | null
  [propName: string]: any
}
export interface PlainObject {
  [propsName: string]: any
}
export type SchemaNode = Schema | string | Array<Schema | string>
export interface RendererProps {
  render?: (node: RendererProps, props?: PlainObject) => JSX.Element
  $path: string // 当前组件所在的层级信息
  syncSuperStore?: boolean
  data?: {
    [propName: string]: any
  }
  defaultData?: object
  className?: any
  style?: {
    [propName: string]: any
  }
  [propName: string]: any
}

/**
 * css 定义
 */
export interface CSSRule {
  [selector: string]: Record<string, string> | Record<string, Record<string, string>> // 定义
}
