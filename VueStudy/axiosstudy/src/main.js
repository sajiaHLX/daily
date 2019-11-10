import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {request1} from './network/request'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

request1({
  url:'data',
  params:{
    id:1
  }
}).then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})


// 带参数的请求
  /*axios({
    url:'http://127.0.0.1:3000/data',
    params:{
      id:1
    }
  }).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  })*/

  // 同时进行多次请求
  /*axios.all([axios({
      url:'http://127.0.0.1:3000/users'
  }),axios({
      url:'http://127.0.0.1:3000/data',
      params:{
        id:1
      }
  })]).then(res=>{
    console.log(res);
  })*/

  // 用spread将多次请求的结果展开
  // axios.all([axios({
  //   url:'http://127.0.0.1:3000/users'
  // }),axios({
  //   url:'http://127.0.0.1:3000/data',
  //   params:{
  //     id:1
  //   }
  // })]).then(axios.spread(
  //   (res1,res2)=>{
  //     console.log(res1);
  //     console.log(res2);
  //   }
  // ))

  // 使用全局的配置
  // axios.defaults.baseURL='http://127.0.0.1:3000'
  // axios.defaults.timeout=5000
  // axios.all([axios({
  //   url:'/users'
  // }),axios({
  //   url:'/data',
  //   params:{
  //     id:1
  //   }
  // })]).then(res=>{
  //   console.log(res);
  // }).catch(err=>{
  //   console.log(err);
  // })
