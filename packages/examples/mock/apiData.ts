export default [
  {
    label: '页面',
    icon: 'yemian',
    children: [
      {
        label: '简单页面',
        path: '/examples/index',
      },
      {
        label: '初始化出错',
        path: '/examples/page/error',
      },
      {
        label: '表单页面',
        path: '/examples/page/form',
      },
    ],
  },
  {
    label: '表单',
    children: [
      {
        label: '表单展示模式',
        path: '/examples/form/mode',
      },

      {
        label: '所有类型汇总',
        path: '/examples/form/full',
      },

      {
        label: '静态展示',
        path: '/examples/form/static',
      },

      {
        label: '输入态、展示态切换',
        path: '/examples/form/switchDisplay',
      },

      {
        label: '输入提示',
        path: '/examples/form/hint',
      },

      {
        label: 'FieldSet',
        path: '/examples/form/fieldset',
      },

      {
        label: 'Tabs',
        path: '/examples/form/tabs',
      },

      {
        label: 'FieldSet Tabs 组合',
        path: '/examples/form/fields-tabs',
      },

      {
        label: '动态数据',
        path: '/examples/form/remote',
      },

      {
        label: '显隐状态联动',
        path: '/examples/form/reaction',
      },

      {
        label: '表单验证',
        path: '/examples/form/validation',
      },

      {
        label: '组合类型',
        path: '/examples/form/combo',
      },

      {
        label: '穿梭器',
        path: '/examples/form/transfer',
      },

      {
        label: '多功能选择器',
        path: '/examples/form/picker',
      },

      {
        label: '子表单',
        path: '/examples/form/sub-form',
      },
      {
        label: '富文本',
        path: '/examples/form/rich-text',
      },

      {
        label: '代码编辑器',
        path: '/examples/form/ide',
      },

      {
        label: '自定义组件',
        path: '/examples/form/custom',
      },

      {
        label: '表格编辑',
        path: '/examples/form/table',
      },

      {
        label: '公式示例',
        path: '/examples/form/formula',
      },
      {
        label: '条件组合',
        path: '/examples/form/condition-builder',
      },

      {
        label: '引用',
        path: '/examples/form/definitions',
      },

      {
        label: '样式编辑',
        path: '/examples/form/style-builder',
      },

      {
        label: '锚点导航',
        path: '/examples/form/anchor-nav',
      },

      {
        label: '复杂嵌套数据',
        path: '/examples/form/input-kvs',
      },

      {
        label: '树形结构',
        path: '/examples/form/tree',
      },
    ],
  },

  {
    label: '增删改查',
    children: [
      {
        label: '表格模式',
        path: '/examples/crud/table',
      },
      {
        label: '表格高度自适应',
        path: '/examples/crud/auto-fill',
      },
      {
        label: '卡片模式',
        path: '/examples/crud/grid',
      },
      {
        label: '列表模式',
        path: '/examples/crud/list',
      },
      {
        label: '加载更多模式',
        path: '/examples/crud/load-more',
      },
      {
        label: '操作交互显示',
        path: '/examples/crud/item-actions',
      },
      {
        label: '列类型汇总',
        path: '/examples/crud/columns',
      },
      {
        label: '可折叠',
        path: '/examples/crud/footable',
      },
      {
        label: '嵌套',
        path: '/examples/crud/nested',
      },
      {
        label: '合并单元格',
        path: '/examples/crud/merge-cell',
      },
      {
        label: '表头分组',
        path: '/examples/crud/header-group',
      },
      {
        label: '表头隐藏',
        path: '/examples/crud/header-hide',
      },
      {
        label: '带边栏（用 tree）',
        path: '/examples/crud/aside',
      },
      {
        label: '带边栏（用 Nav）',
        path: '/examples/crud/aside2',
      },
      {
        label: '固定表头/列',
        path: '/examples/crud/fixed',
      },
      {
        label: '键盘操作编辑',
        path: '/examples/crud/keyboards',
      },
      {
        label: '操作并下一个',
        path: '/examples/crud/jump-next',
      },
      {
        label: '列展示详情',
        path: '/examples/crud/popover',
      },
      {
        label: '一次性加载',
        path: '/examples/crud/load-once',
      },
      {
        label: '点击联动',
        path: '/examples/crud/item-action',
      },
      {
        label: '导出 Excel/CSV',
        path: '/examples/crud/export-excel-csv',
      },
      {
        label: '动态列',
        path: '/examples/crud/dynamic',
      },
    ],
  },

  {
    label: '弹框',
    children: [
      {
        label: '对话框',
        path: '/examples/dialog/simple',
      },
      {
        label: '侧边弹出',
        path: '/examples/dialog/drawer',
      },
    ],
  },

  {
    label: '选项卡',
    children: [
      {
        label: '常规选项卡',
        path: '/examples/tabs/normal',
      },

      {
        label: '表单中选项卡分组',
        path: '/examples/tabs/form',
      },

      {
        label: '动态选项卡',
        path: '/examples/tabs/dynamic',
      },
      {
        label: '选项卡页面1',
        path: '/examples/tabs/tab1',
      },
      {
        label: '选项卡页面2',
        path: '/examples/tabs/tab2',
      },
      {
        label: '选项卡页面3',
        path: '/examples/tabs/tab3',
      },
    ],
  },

  {
    label: '联动',
    children: [
      {
        label: '地址栏变化自动更新',
        path: '/examples/linkpage/page',
      },
      {
        label: '选项联动',
        path: '/examples/linkpage/options-local',
      },
      {
        label: '选项远程联动',
        path: '/examples/linkpage/options',
      },
      {
        label: '表单和表单联动',
        path: '/examples/linkpage/form',
      },
      {
        label: '表单提交后显示结果',
        path: '/examples/linkpage/form-submit',
      },
      {
        label: '表单自动更新',
        path: '/examples/linkpage/form2',
      },
      {
        label: '表单和列表联动',
        path: '/examples/linkpage/crud',
      },
    ],
  },

  {
    label: '事件动作机制',
    children: [
      {
        label: '刷新',
        children: [
          {
            label: '刷新表单',
            path: '/examples/action/reload/form',
          },
          {
            label: '刷新图表',
            path: '/examples/action/reload/chart',
          },
          {
            label: '刷新下拉框',
            path: '/examples/action/reload/select',
          },
        ],
      },
      {
        label: '更新数据',
        children: [
          {
            label: '更新表单数据',
            path: '/examples/action/setdata/form',
          },
          {
            label: '更新弹窗数据',
            path: '/examples/action/setdata/dialog',
          },
          {
            label: '更新向导数据',
            path: '/examples/action/setdata/wizard',
          },
          {
            label: '更新图表数据',
            path: '/examples/action/setdata/chart',
          },
          {
            label: '更新输入框的值',
            path: '/examples/action/setdata/input',
          },
          {
            label: '更新下拉框的值',
            path: '/examples/action/setdata/select',
          },
          {
            label: '更新点选按钮的值',
            path: '/examples/action/setdata/button-group-select',
          },
          {
            label: '更新输入组合的值',
            path: '/examples/action/setdata/combo',
          },
          {
            label: '联动更新',
            path: '/examples/action/setdata/sync',
          },
          {
            label: '数据回填',
            path: '/examples/action/setdata/autofill',
          },
          {
            label: '更新全局变量数据',
            path: '/examples/action/setdata/variable',
          },
        ],
      },
      {
        label: '执行其他组件动作',
        children: [
          {
            label: '按钮类组件',
            path: '/examples/event/button',
          },
          {
            label: '输入类组件',
            path: '/examples/event/input',
          },
          {
            label: '上传类组件',
            path: '/examples/event/upload',
          },
          {
            label: '下拉选择类',
            path: '/examples/event/select',
          },
          {
            label: '时间类组件',
            path: 'examples/event/date',
          },
          {
            label: '可关闭的tag group',
            path: 'examples/event/each-tag',
          },
          {
            label: '开关组件',
            path: 'examples/event/switch',
          },
          {
            label: '选项卡组件',
            path: 'examples/event/tabs',
          },
          {
            label: '评分组件',
            path: 'examples/event/input-rating',
          },
          {
            label: 'excel',
            path: 'examples/event/excel',
          },
          {
            label: '向导组件',
            path: 'examples/event/wizard',
          },
          {
            label: '树形选择框',
            path: 'examples/event/input-tree',
          },
          {
            label: '树形选择器',
            path: 'examples/event/tree-select',
          },
          {
            label: 'form表单',
            path: 'examples/event/form',
          },
          {
            label: '穿梭框类组件',
            path: 'examples/event/transfer',
          },
          {
            label: '轮播图组件',
            path: 'examples/event/carousel',
          },
          {
            label: 'Service组件',
            path: 'examples/event/service',
          },
          {
            label: '表格组件',
            path: 'examples/event/table',
          },
          {
            label: '列表展示类组件',
            path: 'examples/event/list',
          },
          {
            label: 'chart组件',
            path: 'examples/event/chart',
          },
          {
            label: 'SearchBox组件',
            path: 'examples/event/searchbox',
          },
          {
            label: 'input-table组件',
            path: 'examples/event/input-table',
          },
        ],
      },
      {
        label: '阻止组件默认行为',
        children: [
          {
            label: '阻止表单默认行为',
            path: '/examples/action/prevent/form',
          },
        ],
      },
    ],
  },

  {
    label: '动态加载',
    children: [
      {
        label: '动态加载数据',
        path: '/examples/services/data',
      },
      {
        label: '动态加载页面',
        path: '/examples/services/schema',
      },
      {
        label: '动态加载部分表单',
        path: '/examples/services/form',
      },
    ],
  },

  {
    label: '主题编辑器',
    path: '/examples/theme',
  },

  {
    label: '代码高亮',
    path: '/examples/code',
  },

  {
    label: '向导',
    path: '/examples/wizard',
  },

  {
    label: '排版',
    path: '/examples/horizontal',
  },

  {
    label: '图表',
    path: '/examples/chart',
  },

  {
    label: 'ECharts 编辑器',
    path: '/examples/echarts',
  },
  {
    label: '轮播图',
    path: '/examples/carousel',
  },
  {
    label: '音频',
    path: '/examples/audio',
  },
  {
    label: '视频',
    path: '/examples/video',
  },
  {
    label: '异步任务',
    path: '/examples/task',
  },
  {
    label: 'IFrame',
    path: '/examples/iframe',
  },

  {
    label: 'SDK',
    path: '/examples/sdk',
  },

  {
    label: 'Office 文档预览',
    path: '/examples/office-viwewer',
  },

  {
    label: '多 loading',
    path: '/examples/loading',
  },

  {
    label: 'APP 多页应用',
    path: '/examples/app/',
  },
]
