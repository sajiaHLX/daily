<template>
  <div class="item">
    <img :src="product.img" alt="">
    <p>{{product.title}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    product: {
      type: Object,
      default: {}
    },
  },
}

</script>
<style scoped>
  .item img{
    width: 100%;
  }
  .item p{
    margin: -4px 0 5px 0;
    padding: 5px;
    color: #fff;
    background-color: rgba(0 , 0, 0, 0.7);
    text-align: center;
  }
</style>
