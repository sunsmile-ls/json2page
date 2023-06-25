import { RendererProps } from '@src/types/schema'
import { isSchema } from '.'

export function dealFormProps(props: RendererProps) {
  const { item: prop, body } = props
  if (Array.isArray(body)) {
    return body.map((ele) => {
      const { item, label, name, col, ...rest } = ele
      return {
        type: 'formItem',
        ...prop,
        ...item,
        col,
        label,
        name,
        body: rest,
      }
    })
  } else if (isSchema(body)) {
    const { item, label, name, col, ...rest } = body
    return {
      type: 'formItem',
      ...prop,
      ...item,
      col,
      label,
      name,
      body: rest,
    }
  }
  return body
}

export function gridFormProps(props: RendererProps) {
  const { body, mode, row, col: colProps } = props
  switch (mode) {
    case 'grid':
      if (Array.isArray(body)) {
        return {
          type: 'row',
          gutter: [4, 4],
          ...row,
          body: body.map((item) => {
            const { col, ...rest } = item
            if (col === null) return item
            return {
              type: 'col',
              span: 6,
              ...colProps,
              ...col,
              body: rest,
            }
          }),
        }
      } else if (isSchema(body)) {
        const { col, ...rest } = body
        if (col === null) return body
        return {
          type: 'row',
          gutter: [4, 4],
          ...row,
          body: {
            type: 'col',
            span: 6,
            ...colProps,
            ...col,
            body: rest,
          },
        }
      }
  }
  return body
}
