import { isSchema } from '@src/schema'
import { RendererProps } from '@src/types/schema'
const formItemProps = new Set([
  'colon',
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'hidden',
  'htmlFor',
  'initialValue',
  'label',
  'labelAlign',
  'labelCol',
  'messageVariables',
  'name',
  'normalize',
  'noStyle',
  'preserve',
  'required',
  'rules',
  'shouldUpdate',
  'tooltip',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',
])
function createFormItem(body: any) {
  const formItem: {
    [propName: string]: any
  } = {
    type: 'formItem',
    labelCol: body.labelCol || { span: 10 },
  }
  Object.keys(body).map((key) => {
    if (formItemProps.has(key)) {
      formItem[key] = body[key]
    }
  })
  formItem.body = body
  return formItem
}
function createCol(body: any, layout: string, defaultCol = { span: 4 }) {
  if (layout !== 'grid') return body
  const colProps = body?.body?.col ? body.body.col : defaultCol
  const colItem: {
    [propName: string]: any
  } = {
    type: 'col',
    ...colProps,
    body: body,
  }
  return colItem
}
type RendererProp = Omit<RendererProps, '$path'>
export default function dealWithProps(props: RendererProp): RendererProp {
  const {
    type,
    body,
    actions = '',
    layout = 'grid',
    row = {
      gutter: [8, 8],
    },
    defaultCol,
  } = props
  if (!type) return props
  if (type === 'form') {
    if (isSchema(body)) {
      const formItem = createCol(createFormItem(body), layout, defaultCol)
      props.body = [formItem, createCol(createFormItem(actions), layout, defaultCol)]
    } else {
      const formItemArr: { [propName: string]: any }[] = []
      body.map((item: any) => {
        const formItem = createCol(createFormItem(item), layout, defaultCol)
        formItemArr.push(formItem)
      })
      if (layout === 'grid') {
        props.body = {
          type: 'row',
          ...row,
          body: formItemArr.concat(createCol(createFormItem(actions), layout, defaultCol)),
        }
      } else {
        props.body = formItemArr.concat(createCol(createFormItem(actions), layout, defaultCol))
      }
    }
  }
  return props
}
