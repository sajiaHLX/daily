import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex);

// 2.创建store对象
const store = new Vuex.Store({
  state:{
    fa:[]
  },
  mutations:{
    add(state,payload){
      state.fa.push(payload)
    },
    rem(state,payload){
      let index=state.fa.indexOf(payload)
      state.fa.splice(index,1)
    }
    
  }
}) 

// 3.挂载vue实例上
export default store 