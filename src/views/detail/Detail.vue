<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" :goods="goods"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import Toast from 'components/common/toast/Toast.vue'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'
import {debounce} from 'common/utils'
import {itemListenerMixin ,backTopMixin} from 'common/mixin.js'

import { mapActions } from 'vuex'

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast,
    },
  name: "Detail",
  mixins: [itemListenerMixin ,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false,
    }
  },
  created() {
    // 1.保存传入的iid
    // 动态
    this.iid = this.$route.params.iid
    // params
    // this.iid = this.$route.query.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部图片轮播数据
      const data = res.result;

      // 2.取出轮播图数据
      this.topImages = data.itemInfo.topImages

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
 
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    // 4. 给getThemeTopY赋值
    /* 标题和内容的联动效果
      一、点击标题，滚动到对应主题
        在detail中监听标题的点击,获取index
        滚动到对应的主题:
          获取所有主题的offsetTop
          问题:在哪能获取到正学的offsetTop
          1.created肯定不行,压根组件没挂载
          2.mounted不行,数据还没获取到
          3.获取到数据的回调中也不行,DOM还没有渲染完
          4.$nextTick也不行,因为图片的高度没被计算在内
          5.在图片加载完成后,获取的高度才是正确的
     */
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      // console.log(this.themeTopYs);
    }, 500)

     /*  渲染完后,会回调这个函数,里面肯定有值
    1. 不用nextTick直接获取，值不对的原因：
    this.$refs.param.$el.offsetTop压根没有渲染 */
    this.$nextTick(() => {
        /* 2. 用nextTick直接获取，值不对的原因：图片没有计算在内
        根据最新的数据，对应的DOM已经被渲染出来了
        但是图片依然是没有加载完的（目前获取到的offsetTop不包含其中的图片）
        offsetTop值不对的时候，都是因为图片的问题 */
        // this.themeTopYs = []

        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);

        // console.log(this.themeTopYs);
      })

    
  },
  mounted() {
  },
  // 有数据后,会执行update方法,对界面更新,更新后会回调update()
  updated() {
  },
  destoryed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),

    imageLoad() {
      this.refresh()
      // this.$refs.scroll.refresh()

      this.getThemeTopY()
    },

    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },

    contentScroll(position) {
      // 1.获取Y值
      const positionY = -position.y

      // 2.positionY和主题中的值对比
      /* 条件成立：this.currentIndex = i
        条件一：防止赋值的过程过于频繁
        条件2.1：(this.currentIndex !== i && (( i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
      this.themeTopYs[i + 1])
        条件2.2：( i === length - 1 && positionY >= this.themeTopYs[i])

        上面为老办法，优化后将条件2合并，在themeTopYs最后多个非常大的值即可
       */
    let length = this.themeTopYs.length
    for(let i = 0; i < length-1; i++) {
      // if (this.currentIndex !== i && (( i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
      // this.themeTopYs[i + 1]) || ( i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //   this.currentIndex = i;
      //   this.$refs.nav.currentIndex = this.currentIndex;
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] 
        && positionY < this.themeTopYs[i+1])) {
        this.currentIndex = i;
        // console.log(this.currentIndex);
        this.$refs.nav.currentIndex = this.currentIndex;
      }
    }

    // 3. 判断BackTop是否显示
    this.isShowBackTop = (-position.y) > 1000
    },

    /* 十七、点击加入购物车
      17.1 监听加入购物按钮的点击，并且获取商品信息
        监听：
        获取商品信息：iid/price/image/title/desc

      17.2 将商品添加到Vuex中
        安装、配置、定义mutations，将商品添加到state.cartList
        重构代码：将mutations中的代码抽取actions中（定义两个mutations）
        将mutations/actions单独抽取到文件中
    */
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里(1.Promise 2.mapActions)
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product) //mutations

      // 如果你在vuex里面做了某些操作想让外面知道，用promise
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;
        
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 1500)

        // console.log(this.$toast);
        this.$toast.show(res, 2000)

      })


      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      // console.log('-----');

      // 3.添加到购物车成功
    }
  },

}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    /* 此时高度100%根据父元素，但父元素没设置高度会被内容撑开，因此需要100vh(视口高度) */
    overflow: hidden;
    position: absolute;
    height: calc(100% - 44px - 58px);
    width: 100%;
  }

  .detail-nav {
    position: relative;
    z-index: 100;
    background-color: #fff;
  }
</style>