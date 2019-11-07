<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'tabbaritem',
  props: {
    path: {
      type: String
    },
    activeColor:{
      type: String,
      default:'palevioletred'
    }

  },
  data () {
    return {
      // isActive:false
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !==-1
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    },
  },
}

</script>
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 15px;
  }
  .tab-bar-item img{
    width: 26px;
    height: 26px;
    margin-top: 2px;
    vertical-align: middle;
  }
  .tab-bar-word {
    padding-bottom: 2px;
  }
  
</style>
