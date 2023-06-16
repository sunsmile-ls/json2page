import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { createFromIconfontCN } from '@ant-design/icons'
import RenderComp from './renderComp'

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_4126026_2yajrb2ffrp.js'],
})
interface responseData {
  label: string
  path: string
  icon?: string | JSX.Element
  key?: string
  children: responseData[]
}
type MenuItem = Required<MenuProps>['items'][number]

function modifyItem(menuItems: responseData[]) {
  return menuItems.map((item) => {
    if (Array.isArray(item.children)) {
      item.children = modifyItem(item.children)
    }
    return {
      ...item,
      icon: item?.icon ? <IconFont type={'icon-' + item.icon} /> : undefined,
      key: item.path || item.label,
    }
  })
}

const App: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [schema, setSchema] = useState({})
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys)
  }

  const onSelect: MenuProps['onSelect'] = ({ key }) => {
    // 根据 key 获取schema
    axios
      .post('/api/menu/getSchema', {
        schemaPath: key,
      })
      .then((res) => {
        setSchema(JSON.parse(res.data?.data))
      })
  }
  useEffect(() => {
    axios.get('/api/menu/list').then((res) => {
      setItems(modifyItem(res.data))
    })
  }, [])

  return (
    <div className="flex">
      <Menu
        onSelect={onSelect}
        mode="inline"
        className="h-screen overflow-hidden overflow-y-auto"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
      />
      <div className="flex-1">
        <RenderComp schema={schema} />
      </div>
    </div>
  )
}

export default App
