import { RendererProps } from '../types/schema'

export type RendererComponent = React.ComponentType<RendererProps>
// 获取渲染器
export function getRenderer(type: string): RendererComponent {
  const renderer = rendererMap[type]
  if (renderer) {
    return renderer
  }
  throw new Error(`Renderer not found for type: ${type}`)
}

// 渲染器映射表
const rendererMap: Record<string, RendererComponent> = {}

// 注册渲染器函数
export function registerRenderer(type: string, renderer: RendererComponent) {
  if (rendererMap[type]) {
    throw new Error('Render function name exits')
  }
  rendererMap[type] = renderer
}
