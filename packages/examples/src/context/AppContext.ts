import { createContext } from 'react'
import { AppStoreType } from '../store/AppStore/AppStore'
const AppContext = createContext<AppStoreType>(null!)

export default AppContext
