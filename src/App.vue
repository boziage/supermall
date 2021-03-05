<template>
  <div id="app">
    <!-- 十、让Home保持原来的状态（BS 2.X已经修复？？）
      10.1 让Home不要随意销毁掉
        keep-alive
      10.2 让Home中的内容保持原来的位子
        离开时，保存一个位子信息saveY
        进来时，将位置设置为原来保存的位子saveY信息即可
          注意：最好回来时，进行一次refresh
     -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
