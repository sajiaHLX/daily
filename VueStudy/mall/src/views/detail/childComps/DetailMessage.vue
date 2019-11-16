<template>
  <div class="message">
    <scroll class="content" ref="scroll">
      <img :src="topimg" alt="" class="topimg">
        <div class="detailText">
          <div class="title">{{title}}</div>
          <div class="title">快点收藏我吧！</div>
          <div @click="colloction">
            <div class="bg" ></div>
            <div class="bg1" v-show="isshow" ></div>
          </div>
        </div>
        <div class="introduce">
          <strong>简介:</strong>
          {{introduce}}
          {{introduce}}
          {{introduce}}
          {{introduce}}
          {{introduce}}
          {{introduce}}
          {{introduce}}
          {{introduce}}
        </div>
    </scroll>
    <!-- <toast :message="message" :toastshow="toastshow"></toast> -->
  </div>
</template>

<script>
import scroll from 'components/common/betterscroll/Scroll'
import {getDetail,Goods} from 'network/detail'

import toast from 'components/common/toast/Toast'
export default {
  data () {
    return {
      id:0,
      topimg:null,
      goods:null,
      title:null,
      collections:null,
      isshow:false,
      introduce:null,
      product:{},
      // toastshow:false,
      // message:''
    }
  },
  components: {
    scroll,
    getDetail,
    // toast
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
  updated () {
    this.$refs.scroll.refresh()
    this.isshowCheak()
  },
  methods: {
    colloction() {
      this.product.img=this.topimg
      this.product.id=this.id
      this.product.title=this.title
      new Promise((resolve,reject)=>{
        if(this.isshow==false){
          this.isshow=true
          this.collections=Number(this.collections)+1;
        }else{
          this.isshow=false
          this.collections=Number(this.collections)-1;
        }
        
        if(this.isshow==true){
          this.$store.commit("add",this.product)
          resolve('已收藏')
        }else{
          this.$store.commit('rem',this.product)
          resolve('已取消收藏')
        }
      }).then(res =>{
        // this.toastshow=true
        // this.message=res
        // setTimeout(() => {
        //   this.toastshow=false
        // }, 1500);
        this.$toast.show(res,1500)
      })
    },
    isshowCheak(){
      this.id=this.$route.query.id
      let fa=this.$store.state.fa
      // console.log(fa);
      for(var item of fa){
        if(this.id==item.id){
          this.isshow=true;
        }
      }
    }
  },
}

</script>
<style scoped>
  .message{
    position: aabsolute;
    height: calc(100% - 44px);
  }
  .content{
    height: 100%;
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
  .introduce{
    margin: 15px;
    font-size: 18px;
  }
</style>
