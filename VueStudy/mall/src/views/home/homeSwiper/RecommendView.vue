<template>
  <div class="recommend"> 
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.img" alt="">
        <div class="recommend-text">{{item.name}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    recommends: {
      type: Array,
      default: []
    },
  },
}

</script>
<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    height: 85px;
    width:85px;
    border-radius: 50%;
    margin-bottom: 8px;
  }
</style>
