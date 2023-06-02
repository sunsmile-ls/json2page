import { useRef, MutableRefObject } from 'react'
import { FormInstance } from 'antd'
function useFormInst<T>(): [
  MutableRefObject<FormInstance<T> | undefined>,
  (form: FormInstance<T>) => void
] {
  const formRef = useRef<FormInstance<T>>()
  const saveFormInst = (form: FormInstance<T>) => {
    formRef.current = form
  }
  return [formRef, saveFormInst]
}

export default useFormInst
