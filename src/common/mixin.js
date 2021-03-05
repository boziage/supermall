import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop.vue'

// 混入：重复利用，能把公共的和mixin的合并？ 不同对象间混入？，类可用继承？
// 生命周期里的函数可抽，会合并，但methods里面不会合并，会覆盖
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    // mounted 1.监听goodslistitem中图片加载完成
    this.refresh = debounce(this.$refs.scroll.refresh, 200)

    this.itemImgListener = () => {
      // this.$refs.scroll && this.$refs.scroll.refresh()
      this.$refs.scroll && this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 右下角返回首页按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}