<template>
  <div>
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
import {get} from 'network/home'


export default {
  name:'home',
  components: {
    navBar,
  },
  data () {
    return {
      result:null
    }
  },
  created(){
    // 请求多个数据
    get().then(res=>{
      this.result=res;
    })
  }
}

</script>
<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .home-nav img{
    width: 60px;
    height:60px;
  }
</style>
