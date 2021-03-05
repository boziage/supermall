<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" v-show="isTabFixed" ref="tabControl1"/>
    <!-- 五、滚动重构：Better-Scroll
      5.1 在 Vue项目中使用Better-Scroll

        一、对Better-Scroll封装：Scroll.vue
        import
        在mounted里:this.scroll = new BScroll(el, {})
        注意：wrapper -> content -> 很多内容
        1.监听滚动
          probeType：动态获取——0、1、2（手指滚动）、3（只要是滚动）
          bscroll.on('scroll', (position) => {})
        2.上拉加载
          pullUpLoad: 动态获取
          bscroll.on('pullingUp', (position) => {})
        3.click: false
          button可以监听点击
          div不可以

        二、Home.vue与Scroll.vue之间进行通信
          Home.vue将probeType设置为3
          Scroll.vue需要通过$emit，实时将事件发送到Home.vue

     -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 轮播图下面的推荐 div>a>img -->
      <recommend-view :recommends="recommends"/>
      <!-- 一、FeatureView
        div>a>img
       -->
      <feature-view/>
      <!-- 二、TabControl
        1.props -> titles
        2.div>根据titles v-for遍历div->span{{title}}
        3.css相关
        4.选中哪个tab，哪个tab文字颜色改变————border-bottom
        currentIndex
      -->
      <!-- 九、tabControl的吸顶效果
        9.1 获取到tabControl的offsetTop
          必须知道滚动到多少时，开始有吸顶效果,这时候就需要获取tabControl的offsetTop
          但如果直接在mounted中获取tabControl的offsetTop，那么值是不正确的
          如何获取正确的值？
            监听HomeSwiper中img的加载完成
            加载完成后，发出事件，在Home.vue中，获取正确的值
            补充：
              为了不让HomeSwiper多次发出事件，
              可以使用isLoad变量进行状态的记录
            注意：这里不多次调用和debounce的区别
        9.2 监听滚动，动态的改变tabControl的样式
          问题：动态的改变tabControl的样式时，会出现两个问题：
            问题一：下面的呢商品内容，会秃然上移
            问题二：tabControl虽然设置了fixed，但是也随着Better-Scroll一起滚出去
          其他方案解决停留问题
            在最上面，多复制了一份TabControl组件对象，利用它来实现停留效果
       -->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <!-- 四、对商品数据进行展示
        1. 封装GoodsList.vue组件
          props： goods -> 其中一个list[30]
          v-for goods -> GoodsListItem[30]
          GoodsListItem(组件) -> GoodsItem(数据)
        2. 封装GoodsListItem.vue组件
          props：goodsItem
          goodsItem取出数据，并且使用正确的div、span、img基本标签进行展示
       -->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 六、回到顶部BackTop
      6.1 对BackTop.vue组件的封装
      6.2 如何监听组件的点击
        直接监听back-top的点击，但是可以直接监听？
          vue2.X不可以，必须添加修饰.native
        回到顶部
          拿到scroll对象，调用scroll.scrollTo(x, y, time)
            （Home.vue上，scroll标签上已经定义了ref，
            只要this.$refs.scroll就能拿到scroll对象并调用属性、方法）
      6.3 backTop组件的显示和隐藏
        isShowBackTop：false
        监听滚动，拿到滚动的位置：
          -position.y > 1000 -> isShowBackTop：true
          即：isShowBackTop = -position.y > 1000
     -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMulitdata, getHomeGoods} from 'network/home'
import {itemListenerMixin ,backTopMixin} from 'common/mixin.js'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  mixins: [itemListenerMixin ,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      /* 三、首页商品数据的请求
        3.1 设计数据结构，用于保存数据：goods：{}
        3.2 发送数据请求
        在home.js中封装getHomeGoods(type，page)
        在Home.vue中，又在methods中封装getHomeGoods（type）
        调用getHomeGoods('pop')/new/sell.....
          page:动态的获取对应的page
        获取到数据：res
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        goods: {
        'pop': {page: 1, list: [30]},
        'new': {page: 1, list: [30]},
        'sell': {page: 1, list: [30]},
      }
      */ 
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  // 钩子函数
  activated() {
    // console.log(this.saveY);
    this.$refs.scroll.refresh()

    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);

    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMulitdata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
   
  },
  mounted() {
  }, 
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 右下角返回首页按钮
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0)
    // },
    // 高度判断触发事件
    contentScroll(position) {
      // 1. 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2. 决定tabControl是否吸顶（position： fixed）
      this.isTabFixed = (-position.y ) > this.tabOffsetTop
    },
    // 上拉加载
    loadMore() {
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.scroll.refresh()
    },
    // mounted 2.获取tabControl的offsetTop
    // 所有的组件都有一个属性$el：用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法

    getHomeMulitdata() {
      // 1.请求多个数据
      getHomeMulitdata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      // 要先执行完初始化函数才有机会执行异步函数 console.log(this.result);
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      // 2.请求商品数据
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // console.log(res);
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
  

</script>

<style scoped>
  #home {
    /* margin-top: 44px; */
    /* 视口高度 */
    height: 100vh;

    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

  }

  /* .tab-control {
    position: sticky;
    top: 44px;
  } */

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>