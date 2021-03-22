<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"></goods-list-item>
  </grid-view>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem.vue'
import GridView from 'components/common/gridView/GridView.vue'

export default {
  name: "TabContentDetail",
  components: {
    GoodsListItem,
    GridView,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>