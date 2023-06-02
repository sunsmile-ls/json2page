import React, { useEffect, useMemo, useState, useContext } from 'react'
import { Drawer, DrawerProps as antdDrawerProps, FormInstance } from 'antd'
import EventContext from '@src/context/emitterContext'
import EnvContext from '@src/context/envContext'
import { BaseApiObject } from '@src/types/types'
import render from '@src/schema'
import { RendererProps } from '@src/types/schema'
interface configType {
  reload?: string
  api?: BaseApiObject | string
  open: boolean | undefined
}
interface DrawerProps extends antdDrawerProps, Omit<configType, 'open'> {
  body?: RendererProps
  $path?: string
}

const CustomDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [body, setBody] = useState<RendererProps>()
  const [formRef, setFormRef] = useState<FormInstance<any>>()
  const context = useContext(EventContext)
  const [config, setConfig] = useState<Omit<DrawerProps, 'body'>>({})
  const children = useMemo(() => {
    if (body) {
      return render({ ...body, onSaveRef: setFormRef })
    }
    return null
  }, [body])
  const handleOk = async () => {
    formRef?.submit()
  }
  const handleCancel = () => {
    setConfig({
      ...config,
      open: false,
    })
  }
  useEffect(() => {
    const dialogOn = (options: DrawerProps) => {
      const { body, ...props } = options
      if (!props.$path) {
        throw new Error('path parameter is required')
      }
      setBody(body)
      setConfig({
        open: true,
        ...props,
      })
    }
    // 监听数据的变化
    context.on('dialog', dialogOn)
    return () => {
      context.removeListener('dialog', dialogOn)
    }
  }, [])
  return (
    <Drawer destroyOnClose={true} {...config}>
      {children}
    </Drawer>
  )
}

export default CustomDrawer
