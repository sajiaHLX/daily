<template>
  <div class="tebcontrol"> 
    <div v-for="(item,index) in titles" :key="index" class="tabcontrol-item" 
    :class="{active:activeIndex==index}" @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex:0
    }
  },
  props: {
    titles: {
      type: Array,
      default: []
    },
  },
  methods: {
    itemclick(index) {
      this.activeIndex=index;
    },
  },
}

</script>
<style scoped>
  .tebcontrol{
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    background-color: #fff;
  }
  .tabcontrol-item{
    flex: 1;
  }
  .tabcontrol-item span{
    user-select: none;
    padding: 4px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
