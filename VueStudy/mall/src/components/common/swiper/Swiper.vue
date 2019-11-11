<template>
  <div class="md-card">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
    </div>  
  </div>
</template>

<script>
import Swiper from 'swiper'; 
export default {
  components: {
  },
  data() {
    return {
      swiper:[]
    }
  },
  // mounted(){
    
  // }
}
</script>
<style scoped>
  @import "./swiper.css";

</style>
