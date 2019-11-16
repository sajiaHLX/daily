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
      for (const item in state.fa) {
        if (state.fa[item].id==payload.id) {
          state.fa.splice(item,1)
          break;
        }
      }
    }
  },
  getters:{
    getlength(state){
      return state.fa.length
    },
    getfa(state){
      return state.fa
    }
  }
}) 

// 3.挂载vue实例上
export default store 