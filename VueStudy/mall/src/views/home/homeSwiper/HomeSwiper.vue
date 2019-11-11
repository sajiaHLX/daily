<template>
  <Swiper>
      <SwiperItem v-for="(item,index) in computer" :key="index">
        <a :href="item.link">
          <img :src="item.img" alt="">
        </a>
      </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    computer: {
      type: Array,
      default: []
    },
  },
  data () {
    return {
    }
  }
}

</script>
<style scoped>
</style>
