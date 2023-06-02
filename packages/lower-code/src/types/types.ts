// 监听器动作定义
export interface ListenerAction {
  actionType: string // 动作类型 逻辑动作|自定义（脚本支撑）|reload|url|ajax|dialog|drawer 其他扩充的组件动作
  description?: string // 事件描述，actionType: broadcast
  componentId?: string // 组件ID，用于直接执行指定组件的动作，指定多个组件时使用英文逗号分隔
  args?: Record<string, any> // 动作配置，可以配置数据映射
  data?: Record<string, any> | null // 动作数据参数，可以配置数据映射
  dataMergeMode?: 'merge' | 'override' // 参数模式，合并或者覆盖
  outputVar?: string // 输出数据变量名
  preventDefault?: boolean // 阻止原有组件的动作行为
  stopPropagation?: boolean // 阻止后续的事件处理器执行
  expression?: string | ConditionGroupValue // 执行条件
  execOn?: string // 执行条件，1.9.0废弃
}

/**
 * 表达式，语法 `data.xxx > 5`。
 */
export type SchemaExpression = string

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

export interface ConditionGroupValue {
  id: string
  conjunction: 'and' | 'or'
  not?: boolean
  children?: Array<ConditionRule | ConditionGroupValue>
}

export type ClassName =
  | string
  | {
      [propName: string]: boolean | undefined | null | string
    }

export type OperatorType =
  | 'equal'
  | 'not_equal'
  | 'is_empty'
  | 'is_not_empty'
  | 'like'
  | 'not_like'
  | 'starts_with'
  | 'ends_with'
  | 'less'
  | 'less_or_equal'
  | 'greater'
  | 'greater_or_equal'
  | 'between'
  | 'not_between'
  | 'select_equals'
  | 'select_not_equals'
  | 'select_any_in'
  | 'select_not_any_in'
  | {
      label: string
      value: string
    }

export interface ConditionRule {
  id: any
  left?: ExpressionComplex
  op?: OperatorType
  right?: ExpressionComplex | Array<ExpressionComplex>
}
export type ExpressionComplex =
  | ExpressionValue
  | ExpressionFunc
  | ExpressionField
  | ExpressionFormula
export type ExpressionSimple = string | number | object | undefined
export type ExpressionValue =
  | ExpressionSimple
  | {
      type: 'value'
      value: ExpressionSimple
    }
export type ExpressionFunc = {
  type: 'func'
  func: string
  args: Array<ExpressionComplex>
}
export type ExpressionField = {
  type: 'field'
  field: string
}
export type ExpressionFormula = {
  type: 'formula'
  value: string
}

export interface debounceConfig {
  maxWait?: number
  wait?: number
  leading?: boolean
  trailing?: boolean
}

export interface BaseApiObject {
  /**
   * API 发送类型
   */
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'jsonp' | 'js'

  /**
   * API 发送目标地址
   */
  url: string

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
  sendOn?: string

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

  /**
   * 提示信息
   */
  messages?: {
    success?: string
    failed?: string
  }
}
