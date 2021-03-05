<template>
<!-- 十八、购物车的展示
    18.1 购物车的导航栏展示
    18.2 购物车商品的展示
      Cartlist -> Scroll（滚动问题）
      CartlistItem -> CheckButton
    18.3 商品的选中和不选中切换
      修改模型对象，改变选中和不选中
    18.4 底部工具栏的汇总
      全选按钮
      计算总价格
      去计算：
 -->
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters }  from 'vuex'

export default {
  name: "Cart",
  components: { 
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength',
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>