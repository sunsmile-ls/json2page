import { Col, Row, RowProps } from 'antd'
import render from '@src/schema'

interface GridProps extends RowProps {
  columns: any[]
  $path: string
}

const Grid: React.FC<GridProps> = (props) => {
  const { gutter = [8, 4], $path } = props
  let { columns = [] } = props

  if (Object.prototype.toString.call(columns) === '[object Object]') {
    columns = [columns]
  }
  const span = columns.length > 0 ? 24 / columns.length : 24
  return (
    <Row gutter={gutter}>
      {columns.map((item, idx) => (
        <Col key={idx} span={span}>
          {render({ ...item, $path })}
        </Col>
      ))}
    </Row>
  )
}

export default Grid
