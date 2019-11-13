<template>
  <div class="detail">
    <Navbar></Navbar>
    <img :src="topimg" alt="" class="topimg">
    <div class="detailText">
      <div class="title">{{title}}
        <p>收藏数：{{collections}}</p>
      </div>
      <div @click="colloction">
        <div class="bg" ></div>
        <div class="bg1" v-show="isshow" ></div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from 'views/detail/childComps/Detailnavbar'
import {getDetail,Goods} from 'network/detail'
export default {
  name:"Detail",
  data () {
    return {
      id:0,
      topimg:null,
      goods:null,
      title:null,
      collections:null,
      isshow:false
    }
  },
  components: {
    Navbar,
    getDetail
  },
  created(){
    this.id=this.$route.query.id
    let imgid=this.id-1
    getDetail(this.id).then(res=>{
      let result=res.data.goods[imgid]
      this.topimg=result.img
      this.title=result.itemInfo.title
      this.collections=result.itemInfo.collection
      console.log(res);
      // this.goods=new Goods(result.itemInfo)
    })
  },
  methods: {
    colloction() {
      if(this.isshow==false){
        this.isshow=true

        this.collections=Number(this.collections)+1;
      }else{
        this.isshow=false
        this.collections=Number(this.collections)-1;
      }
    },
  },
}

</script>
<style scoped>
  *{
    padding: 0;
    margin: 0;
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
    padding-bottom: 10px;
  }
  .bg{
    background: url(~assets/img/detail/detail_bottom.png);
    width:45px;
    height: 45px;
    position: absolute;
    right: 1px;;
    top: 12px;
  }
  .bg1{
    background: url(~assets/img/detail/detail_bottom.png);
    background-position-y: -55px;
    width:45px;
    height: 45px;
    position: absolute;
    right: 0px;
    top: 12px;
  }
</style>
