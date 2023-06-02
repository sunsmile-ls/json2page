import { createProdMockServer } from 'vite-plugin-mock/client'
import roleMock from '../mock'

export async function setupProdMockServer() {
  const mockModules = [...roleMock]
  createProdMockServer(mockModules)
}
