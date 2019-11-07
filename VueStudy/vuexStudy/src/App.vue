<template>
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <button @click="add">+</button>
    <button @click="dec">-</button>
    <button @click="addcount(5)">+5</button>
    <button @click="addcount(10)">+10</button>
    <h2>{{$store.getters.bigger}}</h2>
    <h2>{{$store.getters.biggerLength}}</h2>
    <h2>{{$store.getters.biggerL(15)}}</h2>
        
    <hello></hello>
  </div>
</template>

<script>
import hello from './components/hello'
export default {
  name: 'App',
  data() {
    return {
      message: 'woshimessage'
    }
  },
  components: {
    hello,
  },
  methods: {
    add() {
      this.$store.commit('increment')
    },
    dec(){
      this.$store.commit('decrement')
    },
    addcount(count){
      this.$store.commit('addcounter',count)
    }
  },
  computed: {
  },
}
</script>

<style>

</style>
