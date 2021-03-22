<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <!-- 最左边头像 -->
      <div class="login-info-left"><slot name="user-icon"><i slot="item-icon" class="fas fa-user"></i></slot></div>

      <!-- 中间部分 -->
      <div class="login-info-center">
        <div class="user-nickname"><slot name="user-nickname">登录/注册</slot></div>
        <div class="phone">
          <i slot="item-icon" class="fas fa-mobile"></i>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>

      <!-- 右边图标 -->
      <div class="login-info-right"><i slot="item-icon" class="fas fa-angle-right"></i></div>
    </a>
  </div>
</template>

<script>
export default {
  name:"UserInfo"
}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px 15px 10px;
    margin-top: -5px;

    font-size: 16px;
  }

  #user-info a {
    color: #fff;
    display: flex;

    line-height: 60px;
  }

  .login-info-left {
    width: 70px;

    flex-basis: auto;
  }

  .login-info-left i {
    width: 60px;
    /* height: 60px; */
    line-height: 60px;
    text-align: center;
    font-size: 30px;

    background-color: #fff;
    color: #ccc;
    border-radius: 30px;
  }

  .login-info-center {
    /* margin-top: 18px; */
    line-height: 30px;
    margin-left: 12px;

    flex-grow: 1;
  }

  .login-info-center .phone {
    font-size: 14px;
    /* margin-top: 5px; */
    /* margin-left: 15px; */
    font-weight: 300;
  }

  .login-info-center .phone i {
    font-size: 16px;
    
    margin-right: 10px;
  }

  .login-info-right {
    font-size: 30px;
    /* margin-top: 18px; */
    margin-right: 7px;

    flex-basis: auto;
  }
</style>