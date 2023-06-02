import { BaseApiObject } from '@src/types/types'
import React from 'react'
export interface EnvStore {
  fetcher: (api: BaseApiObject | string, data: any) => Promise<any>
}
const EnvContext = React.createContext<EnvStore>(null!)

export default EnvContext
