<template>
  <div id="home">
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
    <HomeSwiper :computer="computer"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
    <TabControl class="tabcontrol" :titles="['流行','新款','经典']"></TabControl>
    
    
    <ul>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
      <li>列</li>
    </ul>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import Swiper from 'swiper'
import HomeSwiper from './homeSwiper/HomeSwiper'
import RecommendView from './homeSwiper/RecommendView'
import FeatureView from './homeSwiper/Feature'


import {getHome,getHomeGoods} from 'network/home'


export default {
  name:'home',
  components: {
    navBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data () {
    return {
      computer:null,
      recommends:null,
      goods:{
        'pop':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sell':{page:0,list:[]}
      }
    }
  },
  created(){
    // 请求多个数据
    getHome().then(res=>{
      this.computer=res.data.computer;
      this.recommends=res.data.recommends;
    }).then(res=>{
      //等待数据请求结束后再初始化swiper
      const myswiper= new Swiper('.swiper-container',{
        autoplay:{
          autoplay:true,
          disableOnInteraction:false,
        },
        observer:true,
        observeParents:true,
        loop:true,
        loopAdditionalSlides:1,
        pagination:{
          el:'.swiper-pagination'
        }
      })
    })
    this.getHomeGoods()
  },
  methods: {
    getHomeGoods(type) {
      getHomeGoods().then(res=>{
        console.log(res);
      })
    },
  },
}

</script>
<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    right: 0;
  }
  .home-nav img{
    width: 60px;
    height:60px;
  }
  .tabcontrol{
    position: sticky;
    top: 44px;
  }
</style>
