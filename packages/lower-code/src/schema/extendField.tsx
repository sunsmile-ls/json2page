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
        body: item,
      }
    })
  } else if (isSchema(body)) {
    return {
      type: 'formItem',
      ...itemProps,
      ...body.itemProps,
      label: body.label,
      body: body,
    }
  }
  return body
}
