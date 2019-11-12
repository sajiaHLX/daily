<template>
  <div class="backtop" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    
  },
}

</script>
<style scoped>
  .backtop{
    position: fixed;
    z-index: 99999;
    right: 10px;
    bottom: 55px;
  }
  .backtop img{
    height: 50px;
    width: 50px;
  }
</style>
