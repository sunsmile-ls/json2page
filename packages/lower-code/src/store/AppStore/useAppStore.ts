import { useContext, useMemo } from 'react'
import AppContext from '../../context/AppContext'

const useAppStore = () => {
  const { getFieldValue, setFieldValue } = useContext(AppContext)
  return {
    getFieldValue,
    setFieldValue,
  }
}
export default useAppStore
