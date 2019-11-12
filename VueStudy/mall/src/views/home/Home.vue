<template>
  <div id="home">
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
    <scroll class="content" ref="scroll" 
    :probetype="3" @scroll="contentscroll" :pullUpLoad="true"
    @pullingUp="loadmore"
    >
      <HomeSwiper :computer="computer"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl class="tabcontrol" :titles="['流行','新款','经典']" @tabclick="tabclick"></TabControl>
      <goodsList :goods="goods[currentTab].list"></goodsList>
    </scroll>
    <backtop @click.native="backtop" v-show="isshow"></backtop>

  </div>
</template>

<script>
import navBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import goodsList from 'components/content/goods/GoodList'
import scroll from 'components/common/betterscroll/Scroll'
import backtop from 'components/content/backtop/Backtop'

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
    goodsList,
    scroll,
    backtop
  },
  data () {
    return {
      computer:null,
      recommends:null,
      goods:{
        'pop':{page:0,list:[]},
        'news':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentTab:'pop',
      isshow:true
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
    this.getHomeGoods('pop')
    this.getHomeGoods('news')
    this.getHomeGoods('sell')
  },
  methods: {
    //网络请求 
    getHomeGoods(type) {
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].page+=1;
        this.goods[type].list.push(...res.data.goods)
        // console.log(this.goods[type].list);
        this.$refs.scroll.finishPullUp
      })
    },
    tabclick(index){
      switch (index) {
        case 0:
          this.currentTab='pop'
          break;
        case 1:
          this.currentTab='news'
          break;
        case 2:
          this.currentTab='sell'
          break;
        default:
          break;
      }
    },
    backtop(){
      this.$refs.scroll.scrollTo(0,0,500)
      // console.log(this.$refs.scroll);
    },
    contentscroll(position){
      this.isshow=position.y<=-700
    },
    loadmore(){
      // console.log("shangla");
      this.getHomeGoods(this.currentTab)
    }
  }
}

</script>
<style scoped>
  #home{
    padding-top: 44px;
    width: 100%;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    z-index: 999;
    width: 375px;
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
  .content{
    /* height: 600px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left:0;
    right: 0;
  }
</style>
