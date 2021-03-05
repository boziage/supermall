import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {  
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) { //数量+1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else { //添加新的商品
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

    // context:上下文
    /*
    addCart(state, payload) { 
      payLoad新添加的商品
      let oldProduct = null;
      for(let item of state.cartList){
        if(item.iid === payLoad.iid){
          oldProduct = item
        }
      }

      2.判断oldProduct
      if (oldProduct){
        oldProduct.count += 1
      }else{
        payLoad.count = 1
        state.cartList.push(payLoad)
      } 
    }
      */

  }
}