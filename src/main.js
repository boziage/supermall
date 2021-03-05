import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fa/css/all.min.css'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件(调用里面的install)
Vue.use(toast)

// 解决移动端300ms延迟--fastClick
/* 安装fastclick
   导入
   调用attach函数
*/
FastClick.attach(document.body)
// 使用懒加载的插件
/* 什么是图片的懒加载 
     图片需要现在在屏幕上时，再加载这图片
   使用vue-lazyload
     安装、导入、Vue.use、修改img ：src -> v-lazy
*/
Vue.use(VueLazyLoad ,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
