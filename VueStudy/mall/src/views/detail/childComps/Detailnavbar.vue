<template>
  <div id="deetailNavbar">
    <Navbar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title" :key="index" class="titleItem" 
        @click="titleitemclick(index)" :class="{active:curindex==index}">{{item}}</div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/NavBar' 
export default {
  data () {
    return {
      title:['图片','评论','推荐'],
      curindex:0
    }
  },
  components: {
    Navbar,
  },
  methods: {
    titleitemclick(index) {
      this.curindex=index
    },
    backclick(){
      this.$router.back()
    }
  }
}

</script>
<style scoped>
  .title{
    display: flex;
    color: #000;
  }
  .titleItem{
    flex: 1;
  }
  .active{
    color:#ff8198;
  }
  .back{
    margin-top: 7px;
  }
</style>
