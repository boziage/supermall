<template>
  <grid-view class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.id"/>
  </grid-view>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
import GridView from 'components/common/gridView/GridView'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem,
    GridView
    },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  /* .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  } */
</style>