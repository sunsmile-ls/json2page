import { FormProps } from '../Form'
import Table, { TableProps, ColumnType } from '../Table'
import dealWithProps from '../Form/dealWithProps'
import render from '@src/schema'
import { RendererProps } from '@src/types/schema'
import { BaseApiObject } from '@src/types/types'
import { useContext, useEffect, useRef, useState } from 'react'
import EnvContext from '@src/context/envContext'
import { AppStorePropsType } from '@src/store/AppStore/AppHoc'
import { useFormInst } from '@src/hooks'
import { defaultDataSourceField } from '@src/utils/config'

interface CRUDProps {
  $path: string
  filter?: FormProps
  table: TableProps
  form?: FormProps
  api?: BaseApiObject | string
  dataSourceField?: string
}
function dealTable(columns: ColumnType<any>, path: string) {
  const searchBody = columns
    .filter(
      (item) =>
        !item.hideInSearch &&
        !item.hidden &&
        item.dataIndex !== 'index' &&
        item.dataIndex !== 'operation'
    )
    .map((item) => {
      return {
        type: item.valueType || 'input',
        label: item.title,
        name: item.dataIndex as string,
      }
    })

  return {
    type: 'form',
    $path: path,
    ignorePath: true,
    body: searchBody,
  }
}
const CRUD: React.FC<CRUDProps & AppStorePropsType> = (props) => {
  const {
    filter,
    $path,
    table,
    api,
    setFieldValueByPath,
    getFieldValue,
    dataSourceField = defaultDataSourceField,
  } = props
  const [formRef, saveFormInst] = useFormInst()
  const search = dealTable(table.columns, $path)
  const envContent = useContext(EnvContext)
  const [value, setValues] = useState({})
  const searchProps = filter?.body
    ? filter
    : {
        ...filter,
        ...search,
      }

  const onFinish = (values: any) => {
    if (values) {
      setValues(values)
    }
    if (api) {
      // todo 解析参数一个utils方法
      envContent.fetcher(api, values || value).then((res) => {
        // 刷新缓存
        setFieldValueByPath!({
          ...values,
          ...res,
        })
      })
    }
  }

  useEffect(() => {
    formRef.current?.submit()
  }, [])

  const searchProp = dealWithProps({ ...searchProps, onFinish, saveFormInst })

  const dataSource = getFieldValue($path)[dataSourceField] || []
  return (
    <>
      {searchProp ? render(searchProp as RendererProps) : null}
      {table ? render({ type: 'table', ...table, $path, onFinish, dataSource }) : null}
    </>
  )
}

export default CRUD
