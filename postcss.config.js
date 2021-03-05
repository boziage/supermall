module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度（750 retina retina 1点 2个像素， 375 -> 15px， 750 -> 30px）
      viewportHeigth: 667, // 视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5, // 'px'转换为视窗单位值后的精度，即小数点位数
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      exclude: [/node_modules/, /TabBar/], // 设置忽略文件，用正则做目录名匹配
    }
  }
}

// 1.在js中使用正则： /正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则：
// 正则的规则：
// 1> ^abc:表示匹配的内容，必须以什么内容开头(abc)
// 2> abc$:表示匹配的内容，必须以什么内容结尾(abc)