<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return item.price * item.count + preValue
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).reduce((preValue, item) => item.count + preValue, 0)
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      // every():一假即假，且只要有一个元素假，后面元素不再遍历，some()：一真即真
      // return !this.cartList.find(item => !item.checked)
      for (let item of this.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
/* 十九、购物车的全选按钮
    显示的状态
      判断是否有一个不选中，全选就是选中
      点击全选按钮
      如果原来都是选中，点击一次，全部不选中
      如果原来都是不选中（某些不选中），全部选中
 */
    checkClick() {
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { //部分或全部选中
        this.cartList.forEach(item => item.checked = true)
      }

    // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    font-size: 14px;
    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
    /* line-height: 40px; */
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
    margin-top: 1px;
  }

  .price {
    margin-left: 10px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>