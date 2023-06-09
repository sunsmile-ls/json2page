import { defineMock } from 'vite-plugin-mock-dev-server'
import exampleData from './examples/apiData'

export default defineMock([
  {
    url: '/api/menu/list',
    method: 'GET',
    body: exampleData,
  },
])
