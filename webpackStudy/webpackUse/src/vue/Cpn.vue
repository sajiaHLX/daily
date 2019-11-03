<template>
  <div> 
    <h2>我是cpn中的h2</h2>
    <div class="div">{{message}}</div>
  </div>
</template>

<script>
export default {
  // name:'Cpn',
  data () {
    return {
      message:'我是cpn中的div'
    }
  }
}

</script>
<style scoped>
  .div{
    color: brown
  }
</style>
