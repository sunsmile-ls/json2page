import { RendererProps } from '@src/types/schema'
import { isSchema } from '.'

export function dealFormProps(props: RendererProps) {
  const { itemProps, body } = props
  if (Array.isArray(body)) {
    return body.map((item) => {
      return {
        type: 'formItem',
        ...itemProps,
        ...item.itemProps,
        label: item.label,
        name: item.name,
        body: item,
      }
    })
  } else if (isSchema(body)) {
    return {
      type: 'formItem',
      ...itemProps,
      ...body.itemProps,
      label: body.label,
      name: body.name,
      body: body,
    }
  }
  return body
}
