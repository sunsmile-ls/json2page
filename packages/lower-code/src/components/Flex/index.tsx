/**
 * @file 简化版 Flex 布局，主要用于不熟悉 CSS 的开发者
 */

import React from 'react'
import { BaseSchema } from '@src/types/schema'
import classNames from 'classnames'
/**
 * Flex 布局
 * 文档：https://baidu.gitee.io/amis/docs/components/flex
 */
export interface FlexSchema extends BaseSchema {
  /**
   * 指定为 flex 展示类型
   */
  type: 'flex'

  /**
   * 水平分布
   */
  justify?:
    | 'start'
    | 'flex-start'
    | 'center'
    | 'end'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'

  /**
   * 垂直布局
   */
  alignItems?: 'stretch' | 'start' | 'flex-start' | 'flex-end' | 'end' | 'center' | 'baseline'

  /**
   * 多行情况下的垂直分布
   */
  alignContent?:
    | 'normal'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'

  /**
   * 方向
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'

  /**
   * 自定义样式
   */
  style?: {
    [propName: string]: any
  }

  children: JSX.Element | null
}
const Flex: React.FC<FlexSchema> = (props) => {
  const {
    style,
    className,
    direction = 'row',
    justify = 'center',
    alignItems = 'center',
    alignContent = 'center',
    children,
  } = props
  const flexStyle = {
    ...style,
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems,
    alignContent,
  }
  return (
    <div style={flexStyle} className={classNames(className)}>
      {children}
    </div>
  )
}

export default Flex
