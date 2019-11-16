<template>
  <div class="collist">
    <div class="nocol" v-show="isshow">你还没有收藏呀!快去找找吧！</div>
    <scroll class="content" ref="scroll">
      <listitem v-for="(item,index) in getfa" :key="index" :product="item"></listitem>
    </scroll>
  </div>

</template>

<script>
import scroll from 'components/common/betterscroll/Scroll'
import listitem from './Listitem'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      isshow:false
    }
  },
  components: {
    scroll,
    listitem
  },
  computed:{
    ...mapGetters(['getfa'])
  },
  activated () {
    // if(this.getfa.length==0){
    //   this.isshow=true
    // }else{
    //   this.isshow=false
    // }
    this.isshow = this.getfa.length == 0 ? true : false 
    this.$refs.scroll.refresh()
  }
}

</script>
<style scoped>
  .collist{
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .content{
    height: calc(100%);
  }
  .nocol{
    position: fixed;
    width: 160px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    font-size: 19px;
    color: #fff;
    text-align: center;
    /* border: 1px solid #000; */
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    padding: 4px;
  }
</style>
