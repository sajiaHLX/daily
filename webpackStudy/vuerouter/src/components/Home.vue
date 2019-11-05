<template>
  <div id="home">
    <h2>我是首页</h2>
    <h2>我是哈哈哈</h2>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">信息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'home',
  data () {
    return {
    }
  }
}

</script>
<style scoped>
</style>
