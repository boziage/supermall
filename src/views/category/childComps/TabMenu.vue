<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div v-for="(item, index) in categories" :key="index"
       :class="{active: index === currentIndex}"
       class="menu-list-item"
       @click="itemClick(index)">
        {{item.title}} 
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  components: { Scroll },
  name: "TabMenu",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

   .menu-list-item {
    /* height: 45px; */
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>