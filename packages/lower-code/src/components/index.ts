import Page from './Page'
import CustomButton from './Button'
import CustomForm from './Form'
import CustomTabs from './Tabs'
import DatePicker from './DatePicker'
import Crud from './CRUD'
import Table from './Table'
import ParseHtml from './ParseHtml'
import CustomAlert from './Alert'
import Flex from './Flex'
import Grid from './Grid'
import { Input, Divider, Pagination, Row, Col, Card, Form, Checkbox } from 'antd'
import { RendererComponent, registerRenderer } from '@src/schema/renderFactory'
import StoreHOC from '@src/store/AppStore/AppHoc'
const { TextArea } = Input

const Comps: { [name: string]: any } = {
  Form: CustomForm,
  Page,
  Crud,
  Table,
}

// 处理可以使用 发布订阅模式的 Event
Object.keys(Comps).map((key) => {
  Comps[key] = StoreHOC(Comps[key] as any)
})

const renderComps = {
  Input,
  ParseHtml,
  Row,
  Col,
  Checkbox,
  Alert: CustomAlert,
  TextArea,
  Divider,
  Pagination,
  FormItem: Form.Item,
  DatePicker,
  Tabs: CustomTabs,
  Button: CustomButton,
  Grid,
  Card,
  Flex,
  ...Comps,
}

for (const [key, value] of Object.entries(renderComps)) {
  registerRenderer(key.toLocaleLowerCase(), value as RendererComponent)
}
