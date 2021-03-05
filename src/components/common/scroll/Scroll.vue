<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* 七 解决首页中Bs可滚动区域的问题(已解决,2.0版本用observeImage: true)
  BS决定多少区域可滚动时,根据scrollerHeight属性决定
    其属性根据放BS的content中的子组件的高度
    但首页刚开始在计算scrollerHeight属性时,是没将图片计算在内的
    所以计算出来高度错误
    后来图片加载进来有新高度但scrollerHeight属性没有进行更新,所以出现问题
  解决问题:
    监听每张图片是否加载完成,只要有一张图片加载完成了,执行一次refresh()
    如何监听图片加载完成?
      原生的js监听图片:img.onload = function() {}
      Vue中监听:@load='方法'
    调用scroll的refresh
  如何将GoodsListitem.vue中的事件传入到Home.vue中
    因为涉及非父子组件的通信，这里我们选择事件总线
      bus ->总线
      Vue.prototype.$bus = new Vue()
      this.$bus.$emit
      this.$bus.$on
  对于refresh非常频繁的问题,进行防抖操作
    防抖debounce/节流throttle
    防抖函数起作用的过程:
      如果我们直接执行refresh,那么refresh函数会执行30次
      可以将refresh函数传入到debounce函数中,生成一个新的函数
      之后在调用非常频繁的时候，就是用新生成的函数
      而新生成的函数，并不会非常频繁的调用，如果下一次执行的非常快，那么将上一次取消掉
*/
/* 八 上拉加载更多的功能
  监听滚动到底部

*/
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      observeImage: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
     })
    } 

    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
     this.scroll && this.scroll.scrollTo(x, y, time)
    },
    
    // 封装加载后需要的finish函数
    finishPullUp() {
      this.scroll.finishPullUp()
    },

    refresh() {
      this.scroll && this.scroll.refresh()
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>