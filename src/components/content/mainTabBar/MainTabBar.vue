<template>
    <tab-bar>
      <!-- activeBGColor="grey" -->
      <tab-bar-item path="/home" activeColor="pink">
        <i slot="item-icon" class="fas fa-home"></i>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="pink">
        <i slot="item-icon" class="fas fa-book"></i>
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="pink">
        <i slot="item-icon" class="fas fa-shopping-cart shop-icon"></i>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="pink">
        <!-- <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-activa" src="~assets/img/tabbar/profile_active.svg" alt=""> -->
        <i slot="item-icon" class="fas fa-user"></i>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name: "MainTabBar",
    components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>