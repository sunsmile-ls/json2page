import React, { useEffect, useMemo, useState, useContext, useRef } from 'react'
import { Modal, ModalProps as antdModalProps } from 'antd'
import EventContext from '@src/context/emitterContext'
import { BaseApiObject } from '@src/types/types'
import render from '@src/schema'
import { RendererProps } from '@src/types/schema'
import { useFormInst } from '@src/hooks'
import EnvContext from '@src/context/envContext'
interface configType {
  reload?: string
  open: boolean | undefined
}
interface ModalProps extends antdModalProps, Omit<configType, 'open'> {
  body?: RendererProps
  $path?: string
  api?: string | BaseApiObject
  callback?: () => void
}

const CustomModal: React.FC<ModalProps> = (props: ModalProps) => {
  const [body, setBody] = useState<RendererProps>()
  const [formRef, saveFormInst] = useFormInst<any>()
  const eventContext = useContext(EventContext)
  const envContent = useContext(EnvContext)
  const [config, setConfig] = useState<Omit<ModalProps, 'body'>>({})
  const onFinish = (val: object) => {
    const { api, callback } = config
    const params = {
      ...body?.initialValues,
      ...val,
    }
    if (api) {
      envContent.fetcher(api, params).then((res) => {
        callback && callback()
        handleCancel()
      })
    }
  }
  const children = useMemo(() => {
    if (body) {
      return render({
        ...body,
        saveFormInst: saveFormInst,
        onFinish,
      })
    }
    return null
  }, [body])

  const handleOk = async () => {
    formRef.current?.submit()
  }
  const handleCancel = () => {
    setConfig({
      ...config,
      open: false,
    })
  }
  useEffect(() => {
    const dialogOn = (options: ModalProps) => {
      const { body, ...props } = options
      if (!props.$path) {
        throw new Error('path parameter is required')
      }
      setBody(body)
      setConfig({
        ...props,
        open: true,
      })
    }
    // 监听数据的变化
    eventContext.on('dialog', dialogOn)
    return () => {
      eventContext.removeListener('dialog', dialogOn)
    }
  }, [])
  return (
    <Modal destroyOnClose={true} {...config} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  )
}

export default CustomModal
