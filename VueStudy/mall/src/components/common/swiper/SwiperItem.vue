<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  }
}

</script>
<style scoped>
  .swiper-slide{
    height: 166px;
    overflow: hidden;
  }
</style>
