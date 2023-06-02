export const defaultPrefixCls = 'sunsmile'
let globalPrefixCls: string

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls
}
export function getPrefixCls(suffixCls?: string, customizePrefixCls?: string) {
  if (customizePrefixCls) return customizePrefixCls
  return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls()
}
