<template>
  <div class="item">
    <img :src="product.img" alt="">
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
</style>
