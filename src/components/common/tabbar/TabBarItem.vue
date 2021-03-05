<template>
   <div class="tab-bar-item" :style="activeBGStyle" @click="itemClick">
      <div :style="activeStyle">
        <!-- <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div> -->
        <div :style="activeStyle"><slot name="item-icon"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    },
    activeBGColor: {
      type: String,
      default: 'grey'
    }
  },
  data(){
    return{
      // isActive: true
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    },
    activeBGStyle() {
      return this.isActive ? {backgroundColor: this.activeBGColor} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path).catch(err => err)
    }
  }
}
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }

    .tab-bar-item i {
        font-size: 18px;
        margin:6px 0px 3px;
        vertical-align: middle;
    }
/* 
    .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  } */
</style>