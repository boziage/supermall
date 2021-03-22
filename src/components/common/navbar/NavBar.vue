<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    text-align: center;
    /* height: 44px; */

    box-shadow: 0 0 3px rgba(0, 0, 0, .3);
  }

  .center {
    flex: 1;
    /* background-color: green; */
  }

  .left, .right {
    width: 60px;
    /* background-color: #bfa; */
  }
</style>