<template>
  <div id="app">
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link> -->
    <button @click="homeclick">首页</button>
    <button @click="aboutclick">关于</button>
    <button @click="userclick">用户</button>
    <router-link :to="{path:'/profile',query:{name:'hlx',age:'18',height:'188'}}">
      档案
    </router-link>
    <div id="divid">
      <router-view></router-view>
      {{user}}
    </div>
    <div>
      <button @click="btnclick()">按钮</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'hlx'
    }
  },
  computed:{
    user(){
      return this.$route.params.userId;
    }
  },
  methods: {
    homeclick() {
      this.$router.push('/home')
    },
    aboutclick(){
      this.$router.push('/about')
    },
    userclick(){
      this.$router.push('/user/'+this.userId)
    },
    btnclick(){
      console.log(this.$router);
      console.log(this.$route);
    }
  },
}
</script>

<style>
  /* #divid{
    color: aqua;
    font-size: 50px;
    height: 300px;
    width: 300px;
    border: 2px solid #ff0000;
    overflow: hidden;
    padding: auto 50px; 
  } */
  /* .active{
    color:#f00;
  } */
  
</style>
