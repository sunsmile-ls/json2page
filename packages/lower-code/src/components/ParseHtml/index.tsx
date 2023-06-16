import React, { useContext } from 'react'
import { evaluate } from '@src/formula'
import AppContext from '@src/context/AppContext'
import { convertHtmlToReact } from '@hedgedoc/html-to-react'

export interface ParseHtmlProps {
  $path: string
  child: string
}
const ParseHtml: React.FC<ParseHtmlProps> = ({ $path, child }) => {
  const { getFieldValue } = useContext(AppContext)
  const data = evaluate(child, getFieldValue($path))
  return convertHtmlToReact(data) as any
}

export default ParseHtml
