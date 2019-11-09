export default {
  powerCounter(state){
    return state.counter*state.counter
  },
  bigger(state) {
    return state.student.filter(s=> s.age>=19)
  },
  biggerLength(state,getters){
    return getters.bigger.length
  },
  biggerL(state){
    return function(age){
      return state.student.filter(s => s.age>age)
    }
  }
}