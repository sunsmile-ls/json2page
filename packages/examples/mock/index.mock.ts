import { defineMock } from 'vite-plugin-mock-dev-server'
import exampleData from './apiData'
import { readFileSync } from 'fs'
import path from 'path'

export default defineMock([
  {
    url: '/api/menu/list',
    method: 'GET',
    body: exampleData,
  },
  {
    url: '/api/page/initData',
    method: 'GET',
    body: {
      status: 200,
      data: {
        date: '2023-06-15',
      },
      msg: ''
    },
  },
  {
    url: '/api/menu/getSchema',
    method: 'POST',
    response(req, res) {
      const { body } = req
      const { schemaPath } = body
      console.log(schemaPath)
      const __dirname = path.resolve()
      try {
        // 同步读取JSON文件
        const data = readFileSync(path.join(__dirname, 'mock', schemaPath + '.json'), 'utf8')
        res.end(
          JSON.stringify({
            code: 0,
            data: data,
          })
        )
      } catch (err) {
        console.log(err)
        res.writeHead(404)
        res.end(JSON.stringify({ code: 404, message: 'schema not found' }))
      }
    },
  },
])
