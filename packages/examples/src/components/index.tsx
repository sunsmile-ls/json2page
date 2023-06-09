import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}
interface ItemProps {
  label: string
  children: ItemProps[]
}
const App: React.FC = () => {
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    axios.get('/api/menu/list').then((res) => {
      setItems(res as ItemProps[])
    })
  }, [])

  const menu: MenuItem[] = useMemo(() => {
    return []
  }, [items])
  return (
    <div className="pa-1">
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={menu}
      />
      <div className=""></div>
    </div>
  )
}

export default App
