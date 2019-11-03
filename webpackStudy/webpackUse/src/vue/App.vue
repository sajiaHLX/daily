<template>
  <div id="app">
    <h2 class="class">{{message}}</h2>
      {{message}}
      <Cpn></Cpn>
      <button @click="btnclick">按钮</button>
  </div>
</template>

<script>
import Cpn from './Cpn.vue'
export default {
  // name:'App',
  components:{
    Cpn
  },
  data () {
    return {
      message: 'hello webpack'
    }
  },
  methods: {
    btnclick() {
      console.log("i am hlx");
    },
  }
}

</script>
<style scoped>
  .class{
    color: antiquewhite
  }
</style>
