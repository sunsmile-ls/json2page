import { defineMock } from 'vite-plugin-mock-dev-server'
import mock from 'mockjs'
import { cloneDeep } from 'lodash-es'
import moment from 'moment'
let data = mock.mock({
  'body|10-20': [
    {
      'id|+1': 1,
      'reportDate': '@date("T")',
      'name': '@cword(2,3)',
      'status|0-89': 100,
    },
  ],
})
interface singleData {
  id: number
  reportDate: string
  name: string
  status: number
}
export default defineMock([
  {
    url: '/api/user/info',
    method: 'GET',
    body: { body: 'sunsmile' },
  },
  {
    url: '/api/user/list',
    response(req, res) {
      const { body } = req
      const { reportDate, status, name } = body
      let filterData = cloneDeep(data)
      if (reportDate)
        filterData.body = filterData.body.filter(
          (item: { reportDate: string }) => item.reportDate == reportDate
        )
      if (name)
        filterData.body = filterData.body.filter((item: { name: string }) => item.name == name)
      if (status)
        filterData.body = filterData.body.filter(
          (item: { status: string }) => item.status == status
        )
      res.end(
        JSON.stringify({
          code: 0,
          data: filterData,
        })
      )
    },
  },
  {
    url: '/api/user/info',
    method: 'PUT',
    response(req, res) {
      // 获取参数
      const { id, status, reportDate, name } = req.body
      const findData = data.body.find((item) => item.id == id)
      findData.status = status
      findData.reportDate = moment(reportDate).valueOf()
      findData.name = name
      res.end(
        JSON.stringify({
          code: 0,
          data: data,
        })
      )
    },
  },
  {
    url: '/api/user/delete/:id',
    method: ['DELETE'],
    response(req, res) {
      const { id } = req.params
      data.body = data.body.filter((item: singleData) => item.id != id)
      res.end(
        JSON.stringify({
          code: 0,
          data: data,
        })
      )
    },
  },
])
