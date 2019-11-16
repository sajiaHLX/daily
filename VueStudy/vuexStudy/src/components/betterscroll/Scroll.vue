<template>
  <div class="wrapper" ref="wrapper">
    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bscroll from 'better-scroll'
export default {
  data () {
    return {
      scroll:null
    }
  },
  props: {
    probetype: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    // 创建betterscrool对象
    this.scroll=new bscroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probetype,
      pullUpLoad:this.pullUpLoad
    })
    // 监听滚动对象
    this.scroll.on('scroll',(position)=>{ 
      this.$emit('scroll',position)
    })
    // 上拉加载更多
    if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll&&this.scroll.refresh()
    }
  },
}

</script>
<style scoped>
  /* .wrapper{
    height: 100%;
  } */
</style>
