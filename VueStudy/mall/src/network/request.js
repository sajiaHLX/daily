import axios from 'axios'
export function request1(config) {
    const instance1 = axios.create({
      baseURL: 'http://127.0.0.1:3000',
      timeout: 5000
    })
    // 拦截请求，对请求做一些处理
    instance1.interceptors.request.use(config=>{
      // 拦截后需要返回这个请求
      return config;
    },err=>{
      console.log(err);
    })
    //响应拦截
    instance1.interceptors.response.use(res=>{
      return res;
    },err=>{
      console.log(err);
    })
    return instance1(config)
}


// export function request1(config) {
//   return new Promise((resolve, reject) => {
//     const instance1 = axios.create({
//       baseURL: 'http://127.0.0.1:3000',
//       timeout: 5000
//     })
//     instance1(config).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }
