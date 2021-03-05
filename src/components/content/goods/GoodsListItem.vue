<template>
  <div class="goods-item" @click="itemClick">
    <!-- :src="showImage" -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <i class="fas fa-star"></i>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return{}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImgLoad')
    },
    itemClick() {
      // 动态路由
      this.$router.push('/detail/' + this.goodsItem.iid)
      // params(query方法)
      /* this.$router.push({
        path: '/detail',
        query: {
          iid: this.goodsItem.iid
        }
      }) */
    }
  }
}
</script>

<style scoped>

  .goods-item {
    /* position: relative; */
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    /* position: absolute; */
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 6px;
  }
/* 
  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
  } */

  
</style>