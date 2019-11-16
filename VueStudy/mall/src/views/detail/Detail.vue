<template>
  <div class="detail">
    <Navbar class="detailnav"></Navbar>
    <DetailMessage></DetailMessage>
  </div>
</template>
<script>
import Navbar from 'views/detail/childComps/Detailnavbar'
import DetailMessage from 'views/detail/childComps/DetailMessage'

export default {
  name:"Detail",
  data () {
    return {
    }
  },
  components: {
    Navbar,
    DetailMessage
  }
}

</script>
<style scoped>
  .detail{
    height: calc(100vh - 49px);
    overflow: hidden;
  }
  .detailnav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /*  */
</style>
