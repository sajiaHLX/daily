export default {
  increment(state){
    state.counter++
  },
  decrement(state){
    state.counter--
  },
  addcounter(state,count){
    state.counter+=count
  }
}