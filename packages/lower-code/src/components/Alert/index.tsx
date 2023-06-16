import { AlertProps, Alert } from 'antd'
import ParseHtml, { ParseHtmlProps } from '../ParseHtml'
import { useMemo } from 'react'

const CustomAlert: React.FC<AlertProps & ParseHtmlProps> = (props) => {
  const { message, $path, description, ...rest } = props
  const msg = useMemo(() => {
    return message ? <ParseHtml $path={$path} child={message as string} /> : null
  }, [message])
  const desc = useMemo(() => {
    return description ? <ParseHtml $path={$path} child={description as string} /> : null
  }, [description])
  return <Alert {...rest} className="my-2" message={msg} description={desc} />
}

export default CustomAlert
