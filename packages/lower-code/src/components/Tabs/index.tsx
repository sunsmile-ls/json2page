import { Tabs } from 'antd'
import React, { useState } from 'react'
import render from '@src/schema'
interface tabProps {
  label: string
  key: string
  children?: any
  body: any
  [propName: string]: any
}
interface TabsProps {
  $path: string
  items: Array<tabProps>
  [propName: string]: any
}
const Tab: React.FC<TabsProps> = (props) => {
  const { items, $path, defaultActiveKey, ...rest } = props
  const [activeKey, setActiveKey] = useState<string>()
  const onChange = (key: string) => {
    setActiveKey(key)
  }
  const itemsContent = items.map((item, index) => {
    const { key, body, ...rest } = item
    item.key = key || index + ''
    item.children = render({ ...rest, body, $path })
    return {
      key,
      ...rest,
    }
  })
  return (
    <Tabs
      {...rest}
      activeKey={activeKey ? activeKey : defaultActiveKey}
      onChange={onChange}
      items={itemsContent}
    />
  )
}

export default Tab
