import { screen } from '@utils/test/app-test-utils'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import Page, { PageProps } from '@src/components/Page'
// 创建schema
describe('Page test', () => {
  it('render children', () => {
    const renderTitle = faker.lorem.word()
    const renderSubTitle = faker.lorem.word()
    const schema: PageProps = {
      type: 'Page',
      title: renderTitle,
      subTitle: renderSubTitle,
      data: null,
    }
    render(<Page {...schema} />)
    expect(screen.getByText(renderTitle)).toBeInTheDocument()
    expect(screen.getByText(renderSubTitle)).toBeInTheDocument()
  })

  it('assert the class attribute', () => {
    const bodyClassName = faker.lorem.word()
    const className = faker.lorem.word()
    const headerClassName = faker.lorem.word()
    const schema: PageProps = {
      type: 'Page',
      bodyClassName,
      className,
      headerClassName,
      title: 'page',
      subTitle: 'page',
      data: null,
    }
    render(<Page {...schema} />)
    expect(document.getElementsByClassName(headerClassName).length).toBeGreaterThanOrEqual(1)
    expect(document.getElementsByClassName(className).length).toBeGreaterThanOrEqual(1)
    expect(document.getElementsByClassName(bodyClassName).length).toBeGreaterThanOrEqual(1)
  })

  it('add class and css vars to header', () => {
    const schema: PageProps = {
      type: 'Page',
      title: 'page',
      data: null,
      cssVars: {
        '--main-color': 'red',
      },
      className: 'page',
      css: {
        page: {
          color: 'var(--main-color)',
        },
      },
    }
    render(<Page {...schema} />)
    const style = document.querySelector('[data-style]')
    expect(style?.innerHTML).toContain('color: var(--main-color);')
    const styleVar = document.querySelector('[data-vars]')
    expect(styleVar?.innerHTML).toContain('--main-color: red')
  })
})
