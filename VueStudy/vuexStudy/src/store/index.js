import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
  state:{
    counter:2,
    student:[
      {name:'hlx',age:23},
      {name:'lll',age:18}
    ],
  },
  mutations:{
    increment(state){
      state.counter++
    },
    decrement(state){
      state.counter--
    },
    addcounter(state,count){
      state.counter+=count
    }
  },
  actions:{

  },
  getters:{
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
  },


  modules:{

  }
})

//导出store对象
export default store