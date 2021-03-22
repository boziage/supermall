<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
        <i slot="item-icon" :style="{color: item.iconColor}" :class="item.icon" class="icon"></i>
        <span class="info">{{item.info}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 18px;
    color: #333;
  }
  
  #list .item {
    height: 54px;
    line-height: 54px;
    margin: 0 20px;
    border-bottom: 1px solid rgba(100, 100, 100, .3);
  }
  
  .item .icon {
    font-size: 22px;
    width: 40px;
  }
  
</style>