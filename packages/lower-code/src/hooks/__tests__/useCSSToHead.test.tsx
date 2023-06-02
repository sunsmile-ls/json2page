import { screen } from '@utils/test/app-test-utils'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { useCSSToHead } from '../index'
import { useEffect } from 'react'
// 构建组件
const App: React.FC = () => {
  const setCSS = useCSSToHead()
  // 构建css
  const css = {
    '.render': {
      display: 'none',
    },
  }
  useEffect(() => {
    setCSS(css)
  }, [])
  return <div className="render"></div>
}

describe('useCSSToHead', () => {
  it('css mount', () => {
    const wrapper = render(<App />)
    expect(wrapper.container.querySelector('.render')).toHaveStyle('display: none')
  })
})
