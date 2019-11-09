import axios from 'axios'
export function request1(config) {
    const instance1 = axios.create({
      baseURL: 'http://127.0.0.1:3000',
      timeout: 5000
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
