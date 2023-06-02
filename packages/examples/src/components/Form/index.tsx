import { RendererProps } from '@src/types/schema'
import { forwardRef, useImperativeHandle } from 'react'
import { Form, Button } from 'antd'
import { FormProps as antdFormProps } from 'antd'
import { useContext, useEffect, useMemo } from 'react'
import common from '@src/utils/constant'
import EnvContext from '@src/context/envContext'
import { BaseApiObject } from '@src/types/types'

export type LabelAlign = 'right' | 'left'

export interface FormSchemaBase {
  api?: BaseApiObject | string
  body: Array<{
    type: string
    name: string
    label: string
    [propName: string]: any
  }>
  actions?: Array<{
    type: string
    actionType: string
    body: any
  }>
}

export interface FormProps
  extends Omit<antdFormProps, 'layout'>,
    Omit<RendererProps, 'className'>,
    Omit<FormSchemaBase, 'mode' | 'className'> {
  data?: any // 用于渲染编辑的数据
  [propName: string]: any
  $path: string
  layout?: 'grid' | 'inline' | 'horizontal' | 'vertical'
}
function CustomForm(props: FormProps, ref: any) {
  let { children } = props
  const {
    api,
    searchText = common.search,
    actions,
    layout = 'grid',
    isModal = false,
    $path,
    setStoreValue,
    onFinish,
    saveFormInst,
    ...rest
  } = props
  const [form] = Form.useForm()
  const envContent = useContext(EnvContext)
  const onFinishFunc = (values: any) => {
    if (onFinish) {
      onFinish(values)
      return
    }
    if (api)
      envContent.fetcher(api, values).then((res) => {
        // 成功的话刷新页面
        // reload(target)
        setStoreValue({
          formSource: res,
          ...values,
        })
      })
  }

  const handleClick = () => {
    form.submit()
  }

  const actionsRender = useMemo(() => {
    if (isModal) return null
    if (!actions) return <Button onClick={handleClick}>{searchText}</Button>
    return null
  }, [actions, searchText, isModal])
  useEffect(() => {
    // 获取接口数据
    if (api) {
      envContent.fetcher(api, rest.initialValues)
    }
    saveFormInst && saveFormInst(form)
  }, [])
  useImperativeHandle(
    ref,
    () => ({
      form: form,
    }),
    []
  )
  return (
    <Form
      form={form}
      size="middle"
      {...rest}
      layout={layout === 'grid' ? 'horizontal' : layout}
      onFinish={onFinishFunc}
    >
      {/* @ts-ignore */}
      {children}
      {actionsRender}
    </Form>
  )
}
const costomFormForward = forwardRef(CustomForm)

export default costomFormForward
