import EnvContext from '@src/context/envContext'
import { BaseApiObject } from '@src/types/types'
import { Button, Modal } from 'antd'
import { MouseEvent, useCallback, useContext, useMemo } from 'react'
import EventContext from '@src/context/emitterContext'
import { evaluate } from '@src/formula'

export interface ButtonProps {
  api: BaseApiObject | string
  children?: any
  [propsName: string]: any
}

function CustromButton(props: ButtonProps) {
  const {
    children,
    actionType,
    api,
    $path,
    data,
    title,
    form,
    record,
    options,
    confirmText,
    modalProps,
    callback,
    ...rest
  } = props
  const envContent = useContext(EnvContext)
  const context = useContext(EventContext)
  const onOk = useCallback((close?: any) => {
    let computedApi = ''
    if (typeof api === 'string') {
      // 计算值
      computedApi = evaluate(api, record, options)
    }
    envContent.fetcher(computedApi, data).then((res) => {
      close && close()
      // 刷新请求
      callback && callback()
    })
  }, [])
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    switch (actionType) {
      case 'submit':
      case 'reset':
        break
      case 'dialog':
      case 'drawer':
        context.emit(actionType, {
          title,
          $path,
          api,
          callback,
          body: {
            ...form,
            isModal: true,
            initialValues: {
              ...record,
            },
          },
        })
        break
      case 'ajax':
        if (confirmText) {
          Modal.confirm({
            onOk: onOk,
            content: confirmText,
            ...modalProps,
          })
          return
        } else {
          onOk()
        }

      // envContent.fetcher()
      default:
    }
  }
  const type = useMemo(() => {
    switch (actionType) {
      case 'submit':
      case 'reset':
        return actionType
      default:
        return 'button'
    }
  }, [actionType])
  // @ts-ignore
  return (
    <Button htmlType={type} onClick={handleClick} {...rest}>
      {children}
    </Button>
  )
}

export default CustromButton
