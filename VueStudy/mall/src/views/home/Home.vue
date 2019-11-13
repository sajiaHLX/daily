<template>
  <div id="home">
    <navBar class="home-nav">
      <div slot="center">何林虓的壁纸库</div>
    </navBar>
    <!-- 使用一个新的tabcontrol来代替划上去的 -->
    <TabControl ref="tabcontrol1" v-show="isshow2" class="tabcontrol" :titles="['流行','最新','经典']" @tabclick="tabclick"></TabControl>
    <scroll class="content" ref="scroll" 
    :probetype="3" @scroll="contentscroll" :pullUpLoad="true"
    @pullingUp="loadmore">
      <HomeSwiper :computer="computer"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <!-- <FeatureView></FeatureView> -->
      <TabControl ref="tabcontrol" class="tabcontrol" :titles="['流行','最新','经典']" @tabclick="tabclick"></TabControl>
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
      isshow:true,
      isshow2:false
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
    this.getHomeG('pop')
    this.getHomeG('news')
    this.getHomeG('sell')
  },
  mounted(){
    const refresh=this.debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('imgload',()=>{
      refresh()
    })
  },
  methods: {
    //网络请求 
    getHomeG(type) {
      const page=this.goods[type].page+1
      if(page>3){
        console.log("已经到底了");
        return;
      }
      getHomeGoods(type,page).then(res=>{
        this.goods[type].page+=1;
        this.goods[type].list.push(...res.data.goods)
        // console.log(this.goods[type].list);
        this.$refs.scroll.finishPullUp()
      })
    },
    tabclick(index){
      switch (index) {
        case 0:
          this.currentTab='pop'
          this.pagerefresh(this.currentTab)
          break;
        case 1:
          this.currentTab='news'
          this.pagerefresh(this.currentTab)
          // this.getHomeG(this.currentTab)
          break;
        case 2:
          this.currentTab='sell'
          this.pagerefresh(this.currentTab)
          break;
        default:
          break;
      }
      this.$refs.tabcontrol1.activeIndex=index
      this.$refs.tabcontrol.activeIndex=index
    },
    backtop(){
      this.$refs.scroll.scrollTo(0,0,500)
      // console.log(this.$refs.scroll);
    },
    contentscroll(position){
      this.isshow=position.y<=-700
      let offsetTop = this.$refs.tabcontrol.$el.offsetTop
      this.isshow2=(-position.y)>offsetTop
    },
    loadmore(){
      // console.log("shangla");
      this.getHomeG(this.currentTab)
    },
    // 防抖
    
    debounce(func,delay){
      return function(...args){
        let timer=null
        if(timer) clearTimeout(timer)
        timer= setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
    pagerefresh(type){
      if(type=='pop'){
        if(this.goods[type].page<this.goods['news'].page||this.goods[type].page<this.goods['sell'].page){
          this.getHomeG(type)
        }
      }
      if(type=='news'){
        if(this.goods[type].page<this.goods['pop'].page||this.goods[type].page<this.goods['sell'].page){
          this.getHomeG(type)
        }
      }
      if(type=='sell'){
        if(this.goods[type].page<this.goods['pop'].page||this.goods[type].page<this.goods['news'].page){
          this.getHomeG(type)
        }
      }
      
    }
  }
}

</script>
<style scoped>
  #home{
    /* padding-top: 44px; */
    width: 100%;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed; */
    /* z-index: 999;
    width: 375px;
    left: 0;
    top: 0;
    right: 0; */
  }
  .home-nav img{
    width: 60px;
    height:60px;
  }
  .tabcontrol{
    position: relative;
    /* top: 44px; */
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
