import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modulesA from './modules/modulesA'

//安装插件
Vue.use(Vuex)

const state={
  counter:2,
  student:[
    {name:'hlx',age:23},
    {name:'lll',age:18}
  ],
}

//创建对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    a: modulesA
  }
})

//导出store对象
export default store