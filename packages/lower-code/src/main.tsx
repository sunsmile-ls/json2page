import Entry from '@src/index'
import 'antd/dist/antd.css'
import '@src/asserts/css/index.less'
import 'uno.css'

function render(schema: any) {
  return <Entry schema={schema} />
}

export default render
