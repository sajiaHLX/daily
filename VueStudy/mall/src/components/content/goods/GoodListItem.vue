<template>
  <div class="goodsitem">
    <img :src="goodsitem.img" alt="" @load="imgload">
    <div class="goodsinfo">
      <p>{{goodsitem.msg}}</p>
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
    goodsitem: {
      type: Object,
      default: []
    },
  },
  methods: {
    imgload() {
      this.$bus.$emit('imgload')
    },
  },
}

</script>
<style scoped>
  .goodsitem{
    padding-bottom: 30px;
    position: relative;
    
    width: 48%;
  }
  .goodsitem img{
    width: 100%;
    border-radius: 5px;
  }
  .goodsinfo{
    font-size: 15px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goodsinfo p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
</style>
