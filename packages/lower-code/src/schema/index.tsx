import { getRenderer } from './renderFactory'
import { RendererProps, Schema } from '@src/types/schema'
import '../components' // 注册所有的组件
import { uid } from 'uid'
import isHtml from 'is-html'
import { dealFormProps, gridFormProps } from './extendField'

export function isSchema(value: any): value is Schema {
  return typeof value === 'object' && 'type' in value
}
// 只支持value的值
const valueComps = new Set(
  ['AutoComplete', 'Cascader', 'Checkbox', 'DatePicker', 'Input', 'InputNumber'].map((item) =>
    item.toLocaleLowerCase()
  )
)
const getPath = (path: string, type: string, ignorePath: boolean) => {
  if (!type || ignorePath) return path
  if (['page', 'crud', 'form'].includes(type)) {
    return path ? path + '/' + type : type
  }
  return path
}

function extendField(props: RendererProps) {
  const { body, type } = props
  switch (type) {
    case 'form': {
      const body = dealFormProps(props)
      return gridFormProps({ ...props, body })
    }
    default:
      return body
  }
}
function render(props: RendererProps): any {
  const { type, $path = '', ignorePath = false, level, body: _, ...rest } = props
  let children
  const body = extendField(props)
  const path = getPath($path, type, ignorePath)
  if (Array.isArray(body)) {
    children = body.map((child: any) => {
      if (typeof child === 'string') {
        return render({ type: 'ParseHtml', $path: path, child })
      }
      return render({ ...child, $path: path, ignorePath })
    })
  } else if (isSchema(body)) {
    const key = uid()
    body.key = body.key ? body.key : key
    children = render({ ...body, $path: path, ignorePath })
  } else if (body && isHtml(body)) {
    children = render({ type: 'ParseHtml', $path: path, child: body })
  } else {
    children = body
  }
  // 判断type
  if (!type) return children
  // 处理组件中包含 type 属性，需要单独处理
  const [renderType, compType] = [type.toLocaleLowerCase(), level]
  const Component = getRenderer(renderType)
  // 组装剩余参数
  const compProps: RendererProps = {
    ...rest,
    $path: path,
  }
  if (compType) {
    compProps.type = compType
  }
  // 处理只支持 value 的情况
  if (valueComps.has(renderType)) {
    return <Component {...compProps} />
  }
  // 其他组件为支持 children 的情况
  return <Component {...compProps}>{children}</Component>
}
export default render
