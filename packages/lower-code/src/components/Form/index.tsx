import { forwardRef, useImperativeHandle } from 'react'
import { Form, Button } from 'antd'
import { FormProps as antdFormProps, FormItemProps } from 'antd'
import { useContext, useEffect, useMemo } from 'react'
import common from '@src/utils/constant'
import EnvContext from '@src/context/envContext'
import { BaseApiObject } from '@src/types/types'
import render from '@src/schema'

export type LabelAlign = 'right' | 'left'
const FormItem = Form.Item

const defaultLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const defaultTailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
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
const empty = {}
export interface FormProps extends antdFormProps {
  data?: any // 用于渲染编辑的数据
  $path: string
  [propName: string]: any
}
function CustomForm(props: FormProps, ref: any) {
  const {
    api,
    searchText = common.search,
    actions,
    isModal = false,
    $path,
    setFiledsValue,
    body: _,
    onFinish,
    actionsProps = empty,
    saveFormInst,
    children,
    actionProps,
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
        setFiledsValue({
          formSource: res,
          ...values,
        })
      })
  }

  const handleClick = () => {
    form.submit()
  }
  const actionsRender = useMemo(() => {
    if (isModal || !actions) return null
    // if () {
    // return (
    //   <FormItem {...(props.layout !== 'vertical' ? defaultTailLayout : empty)} {...actionsProps}>
    //     <Button onClick={handleClick}>{searchText}</Button>
    //   </FormItem>
    // )
    // }

    return (
      <FormItem {...(props.layout !== 'vertical' ? defaultTailLayout : empty)} {...actionsProps}>
        {render(actions)}
      </FormItem>
    )
  }, [actions, searchText, isModal, props.layout])
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
      {...(props.layout !== 'vertical' ? defaultLayout : empty)}
      size="middle"
      {...rest}
      onFinish={onFinishFunc}
    >
      {children as React.ReactNode}
      {actionsRender}
    </Form>
  )
}
const costomFormForward = forwardRef(CustomForm)

export default costomFormForward
