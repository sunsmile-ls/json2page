import { RendererProps } from '@src/types/schema'
import { isSchema } from '.'

export function dealFormProps(props: RendererProps) {
  const { itemProps: prop, body } = props
  if (Array.isArray(body)) {
    return body.map((item) => {
      const { itemProps, label, name, colProps, ...rest } = item
      return {
        type: 'formItem',
        ...prop,
        ...itemProps,
        colProps,
        label,
        name,
        body: rest,
      }
    })
  } else if (isSchema(body)) {
    const { itemProps, label, name, colProps, ...rest } = body
    return {
      type: 'formItem',
      ...prop,
      ...itemProps,
      colProps,
      label,
      name,
      body: rest,
    }
  }
  return body
}

export function gridFormProps(props: RendererProps) {
  const { body, mode, rowProps, colProps: col } = props
  switch (mode) {
    case 'grid':
      if (Array.isArray(body)) {
        return {
          type: 'row',
          gutter: [4, 4],
          ...rowProps,
          body: body.map((item) => {
            const { colProps, ...rest } = item
            return {
              type: 'col',
              span: 6,
              ...col,
              ...colProps,
              body: rest,
            }
          }),
        }
      } else if (isSchema(body)) {
        const { colProps, ...rest } = body
        return {
          type: 'row',
          gutter: [4, 4],
          ...rowProps,
          body: {
            type: 'col',
            span: 6,
            ...col,
            ...colProps,
            body: rest,
          },
        }
      }
  }
  return body
}
