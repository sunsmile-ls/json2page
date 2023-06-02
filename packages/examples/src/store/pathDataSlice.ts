import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PathDataState {
  [path: string]: any
}

const initialState: PathDataState = {}

// 存储 $path 对应的组件的 共享data 数据
export const pathSlice = createSlice({
  name: 'pathData',
  initialState,
  reducers: {
    setPathData: (state, action: PayloadAction<{ value: any; path: string }>) => {
      const { value, path } = action.payload
      state[path] = {
        ...state[path],
        ...value,
      }
    },
    deletePathData: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
      state = { ...state }
    },
  },
})

export const { setPathData, deletePathData } = pathSlice.actions

export default pathSlice.reducer
