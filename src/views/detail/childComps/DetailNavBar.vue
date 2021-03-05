<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <span v-for="(item, index) in titles" :key="item.id"
            class="title-item" :class="{active: currentIndex === index}"
            @click="titleClick(index)">
        {{item}}
      </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>


  .nav-bar {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .title {
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    margin-bottom: -6px;
  }
</style>