import { setPathData, deletePathData } from '@src/store/pathDataSlice'
import { RootState } from '@src/store'
import { useAppSelector, useAppDispatch } from '@src/store'
import { useEffect } from 'react'

const usePathData = (path: string) => {
  const pathData = useAppSelector((state: RootState) => state.pathData[path])
  const dispatch = useAppDispatch()
  const setData = (val: any) => dispatch(setPathData(val))
  useEffect(() => {
    return () => {
      deletePathData(path)
    }
  }, [])

  return {
    pathData,
    setPathData: setData,
  }
}

export default usePathData
