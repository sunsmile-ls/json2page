import { useEffect, useMemo } from 'react'
import { Table } from 'antd'
import { FormProps } from '../Form'
import renderComp from '@src/schema'
import type { ColumnsType, TableProps as antdTableProps } from 'antd/es/table'
import dealWithProps from '../Form/dealWithProps'
import { cloneDeep } from 'lodash-es'
import useAppStore from '@src/store/AppStore/useAppStore'
import { FilterMap, ParserOptions, EvaluatorOptions } from '@src/formula/types'
import { evaluate } from '@src/formula'

export type ColumnType<T> = (ColumnsType<T> & {
  dataIndex: string | string[]
  render: (text: string, record: any, index: number) => React.ReactNode
  children: ColumnsType<T>
  body: any | any[]
  hideInSearch?: boolean
  hideInTable?: boolean
  hideInForm?: boolean
  valueType?: string
  title: string
  hidden?: boolean
  formCol?: object
  col?: object
  renderText?: string
  options?: ParserOptions | EvaluatorOptions
})[]

export interface TableProps extends antdTableProps<any> {
  $path: string
  columns: ColumnType<any>
  form?: FormProps
  filterMap?: FilterMap
  [propName: string]: any
}

function dealTable(columns: ColumnType<any>, path: string) {
  const body = columns
    .filter((item) => !item.hidden && !['index', 'operation'].includes(item.dataIndex as string))
    .map((item) => {
      return {
        type: item.valueType || 'input',
        label: item.title,
        name: item.dataIndex as string,
      }
    })
  const formProps = dealWithProps({
    type: 'form',
    $path: path,
    ignorePath: true,
    body: cloneDeep(body),
    defaultCol: { span: 12 },
  })
  return formProps
}
const CustomTable: React.FC<TableProps> = (props) => {
  const { columns, $path, setStoreValue, pagination, dataSource, filterMap, onFinish, ...rest } =
    props
  const { getFieldValue } = useAppStore()
  useEffect(() => {}, [])
  const formProps = useMemo(() => {
    return dealTable(columns, $path)
  }, [columns, $path])
  // 处理每个一个 columns
  const column = columns!.map((item) => {
    let render
    if (item.dataIndex === 'index') {
      render = (text: string, record: any, index: number) => {
        return index + 1
      }
    } else if (item.dataIndex === 'operation') {
      render = (text: string, record: object, index: number) => {
        // 处理数据
        const obj: any = { ...record }
        columns
          .filter((item) => item.dataIndex !== 'index' && item.dataIndex !== 'operation')
          .map((item) => {
            const dataIndex = item.dataIndex as string
            if (item.renderText) {
              obj[dataIndex] = evaluate(item.renderText!, record, {
                ...(item.options || {}),
              })
            } else {
              // @ts-ignore
              obj[dataIndex] = record[dataIndex]
            }
          })
        if (Array.isArray(item.body)) {
          return item.body.map((item) => {
            return renderComp({ ...item, record: obj, callback: onFinish, $path, form: formProps })
          })
        }

        return renderComp({ ...item.body, record: obj, callback: onFinish, $path, form: formProps })
      }
    } else if (item.renderText) {
      render = (text: string, record: object, index: number) => {
        if (!text) return '--'
        return evaluate(item.renderText!, record, {
          ...(item.options || {}),
        })
      }
    }
    return { ...item, render }
  })

  return <Table size={'small'} columns={column} dataSource={dataSource} {...rest}></Table>
}
export default CustomTable
