<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    font-size: 14px;
    text-align: center;

    padding: 0 0 20px;
    border-bottom: 10px solid black;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 80%;
    margin: 10px 0;
  }

</style>