<template>
  <div class="detail">
    <Navbar class="detailnav"></Navbar>
    <scroll class="content" ref="scroll">
      <ul>
        <li v-for="(item,index) in this.$store.state.fa" :key="index">
          {{item}}
        </li>
      </ul>
      <img :src="topimg" alt="" class="topimg">
      <div class="detailText">
        <div class="title">{{title}}</div>
        <div class="title">收藏数：{{collections}}</div>
        <div @click="colloction">
          <div class="bg" ></div>
          <div class="bg1" v-show="isshow" ></div>
        </div>
      </div>
      <div class="introduce">
        <strong>简介:</strong>
        {{introduce}}
      </div>
    </scroll>
  </div>
</template>
<script>
import Navbar from 'views/detail/childComps/Detailnavbar'
import {getDetail,Goods} from 'network/detail'
import scroll from 'components/common/betterscroll/Scroll'
export default {
  name:"Detail",
  data () {
    return {
      id:0,
      topimg:null,
      goods:null,
      title:null,
      collections:null,
      isshow:false,
      introduce:null,
      product:{}
    }
  },
  components: {
    Navbar,
    getDetail,
    scroll
  },
  created(){
    this.id=this.$route.query.id
    let imgid=this.id-1
    getDetail(this.id).then(res=>{
      let result=res.data.goods[imgid]
      this.topimg=result.img
      this.title=result.itemInfo.title
      this.collections=result.itemInfo.collection
      this.introduce=result.itemInfo.introduce
    })
    
  },
  // mounted(){
    
  // },
  methods: {
    colloction() {
      this.product.img=this.topimg
      this.product.id=this.id
      this.product.title=this.title
      if(this.isshow==false){
        this.isshow=true
        this.collections=Number(this.collections)+1;
      }else{
        this.isshow=false
        this.collections=Number(this.collections)-1;
      }
      
      if(this.isshow==true){
        this.$store.commit("add",this.product)
      }else{
        this.$store.commit('rem',this.product)
      }
    },
  },
}

</script>
<style scoped>
  .detail{
    
  }
  .detailnav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: white;
  }
  .topimg{
    width: 100%;
  }
  .detailText{
    position: relative;
    margin-top: -5px;
    text-align: center;
    font-size: 20px;
    background-color: #f6f6f6;
    box-shadow: 0 1px 1px rgba(100,100,100,.3);
  }
  .title{
    line-height: 25px;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  .bg{
    background: url(~assets/img/detail/detail_bottom.png);
    width:45px;
    height: 45px;
    position: absolute;
    right: 1px;;
    top: 20px;
  }
  .bg1{
    background: url(~assets/img/detail/detail_bottom.png);
    background-position-y: -55px;
    width:45px;
    height: 45px;
    position: absolute;
    right: 0px;
    top: 20px;
  }
  .content{
    padding-top: 44px;
    height: calc(100% - 44px)
  }
  .introduce{
    margin: 15px;
    font-size: 18px;
  }
</style>
