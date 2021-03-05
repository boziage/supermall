<template>
    <div id="tab-bar" >
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar',
  // props: {
  //   path: String,
  //   activeColor: {
  //     type: String,
  //     default: 'red'
  //   },
  //   activeBGColor: {
  //     type: String,
  //     default: 'grey'
  //   }
  // },
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
  #tab-bar{
    display: flex;
    background-color: #bfa;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .3);
    
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

   /* #tab-bar :hover{
     background-color: blue;
   } */

</style>