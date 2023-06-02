import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

type AppProvidersProps = {
  children: React.ReactNode
}

function AppRoute({ children }: AppProvidersProps) {
  return <BrowserRouter>{children}</BrowserRouter>
}

export default AppRoute
