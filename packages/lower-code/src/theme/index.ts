import dark from './style/index.dark.less?inline'
import lighter from './style/index.less?inline'

// 调用方法
export const handleSkin = (theme: string) => {
  if (theme === 'lighter') {
    // 明亮主题
    addSkin(lighter)
  } else {
    // 暗色主题
    addSkin(dark)
  }
}
// 添加皮肤的方法
function addSkin(content: string) {
  let head = document.getElementsByTagName('head')[0]
  const getStyle = head.getElementsByTagName('style')
  // 查找style是否存在，存在的话需要删除dom
  if (getStyle.length > 0) {
    for (let i = 0, l = getStyle.length; i < l; i++) {
      if (getStyle[i].getAttribute('data-type') === 'theme') {
        getStyle[i].remove()
      }
    }
  }
  // 最后加入对应的主题和加载less的js文件
  let styleDom = document.createElement('style')
  styleDom.dataset.type = 'theme'
  styleDom.innerHTML = content
  head.appendChild(styleDom)
}
