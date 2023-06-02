import { useState, useEffect, useRef } from 'react'

const useVarsToHead = () => {
  const cssDOMRef = useRef<HTMLStyleElement>()
  const [varCSS, setVarsCSS] = useState<Record<string, string> | undefined>()
  // 构建 css
  const buildVarCSS = (cssVars: Record<string, string>) => {
    let cssVarsContent = ''
    if (!cssVars) return ''
    for (const key in cssVars) {
      if (key.startsWith('--')) {
        if (key.indexOf(':') !== -1) {
          continue
        }
        const value = cssVars[key]
        // 这是为了防止 xss，可能还有别的
        if (
          typeof value === 'string' &&
          (value.indexOf('expression(') !== -1 || value.indexOf(';') !== -1)
        ) {
          continue
        }
        cssVarsContent += `${key}: ${value}; \n`
      }
    }
    return `
    :root {
      ${cssVarsContent}
    }
    `
  }
  useEffect(() => {
    // 1. 构建css
    const css = buildVarCSS(varCSS as any)
    if (!css) return
    // 2. 创建 style标签，标记唯一的key,并把css装入其中
    cssDOMRef.current = document.createElement('style')
    cssDOMRef.current.setAttribute('data-vars', '')
    // 3. 添加内容到style中
    cssDOMRef.current.innerHTML = css
    // 4. 添加页面
    document.getElementsByTagName('head')[0].appendChild(cssDOMRef.current)

    return () => {
      // 5. 在页面卸载的时候，删除
      cssDOMRef.current?.parentNode?.removeChild(cssDOMRef.current)
    }
  }, [varCSS])

  return setVarsCSS
}

export default useVarsToHead
