<template>
  <div>我是hello中的内容
    <h2>{{$store.state.counter}}</h2>
    <h2>{{$store.getters.powerCounter}}</h2>
  </div>
  
</template>

<script>
import scroll from './betterscroll/Scroll'
export default {
  data () {
    return {
    }
  },
  components: {
    scroll,
  },
}

</script>
<style scoped>
</style>
