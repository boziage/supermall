<template>
  <div id="profile">
    <nav-bar class="nav">
      <div slot="center">我的主页</div>
    </nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <user-info/>

    <!--2.暂时单独封装，功能未实现: 不同的地方太多, 需要传过多的参数-->
    <account/>

    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Account from './childComps/Account.vue'
import UserInfo from './childComps/UserInfo.vue'
import ListView from './childComps/ListView.vue'
export default {
    name: "Profile",
    components: {
      NavBar,
      Account,
      UserInfo,
      ListView,
    },
    data() {
      return {
        orderList: [
          {icon: 'fas fa-mail-bulk', iconColor: '#ff8198', info: '我的消息'},
          {icon: 'fas fa-coins', iconColor: '#fc7b53', info: '积分商城'},
          {icon: 'fas fa-crown', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: 'fas fa-cart-arrow-down', iconColor: '#ff8198', info: '我的购物车'},
          {icon: 'fas fa-shopping-bag', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
}
</script>

<style scoped>
   #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
   background-color: var(--color-tint);
   font-weight: 700;
   color: #fff;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }
</style>