<template>
  <div id="app">
    <tabbar>
      <tabbaritem path='/home' activeColor='blue'>
        <img slot="item-icon" src="./assets/img/home.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tabbaritem>
      <tabbaritem path='/category'>
        <img slot="item-icon" src="./assets/img/category.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tabbaritem>
      <tabbaritem path='/cart'>
        <img slot="item-icon" src="./assets/img/shopcart.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tabbaritem>
      <tabbaritem path='/profile'>
        <img slot="item-icon" src="./assets/img/profile.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tabbaritem>
    </tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from './components/tabbar/Tabbar'
import tabbaritem from './components/tabbar/TabbarItem'

export default {
  name: 'App',
  components:{
    tabbar,
    tabbaritem,
  }
}
</script>

<style>
  @import url('./assets/css/reset.css');
  
</style>
