<template>
  <div class="cart">
    <navbar class="navbar">
      <div slot="center">收藏（{{getlength}}）</div>
    </navbar>
    <collist></collist>
  </div>  
</template>

<script>
import navbar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import collist from './child/ColList'
export default {
  name:'cart',
  data () {
    return {
      
    }
  },
  components: {
    navbar,
    collist,
  },
  computed:{
    ...mapGetters(['getlength'])
  },

}

</script>
<style scoped>
  .navbar{
    background-color: cadetblue;
    position: relative;
    z-index: 10;
  }
  .cart{
    height: calc(100vh - 49px);
    /* padding-bottom: 49px; */
  }
</style>
