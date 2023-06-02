import { useState, useEffect, useRef } from 'react'
import { CSSRule } from '@src/types/schema'
const useCSSToHead = () => {
  const cssDOMRef = useRef<HTMLStyleElement>()
  const [cssRules, setCSS] = useState<CSSRule | undefined>()
  // 构建 css
  const buildCSS = (cssRules: CSSRule | undefined) => {
    if (!cssRules) {
      return ''
    }
    let css = ''
    let moduleCss = ''
    // 支持模块化
    for (const selector in cssRules) {
      const declaration = cssRules[selector]
      let declarationStr = ''
      let singleModuleCss = ''
      for (const property in declaration) {
        const innerValue = declaration[property]
        if (typeof innerValue === 'string') {
          declarationStr += `   ${property}: ${innerValue};\n`
        } else {
          let innerstr = ''
          for (const propsName in innerValue) {
            innerstr += `   ${propsName}: ${innerValue[propsName]};\n`
          }
          singleModuleCss += `${selector}  ${property} {\n${innerstr}}\n`
        }
      }
      singleModuleCss
        ? (moduleCss += singleModuleCss)
        : (css += `${selector} {\n${declarationStr}}\n`)
    }
    css += moduleCss
    return css
  }
  useEffect(() => {
    // 1. 构建css
    const css = buildCSS(cssRules)
    if (!css) return
    // 2. 创建 style标签，标记唯一的key,并把css装入其中
    cssDOMRef.current = document.createElement('style')
    cssDOMRef.current.setAttribute('data-style', '')
    // 3. 添加内容到style中
    cssDOMRef.current.innerHTML = css
    // 4. 添加页面
    document.getElementsByTagName('head')[0].appendChild(cssDOMRef.current)

    return () => {
      // 5. 在页面卸载的时候，删除
      cssDOMRef.current?.parentNode?.removeChild(cssDOMRef.current)
    }
  }, [cssRules])

  return setCSS
}

export default useCSSToHead
