import Toast from './Toast.vue'

const obj={}
obj.install=function (vue) {  
  // document.body.appendChild(Toast.$el)

  // 创建组件构造器
  const toastConstrustor = vue.extend(Toast)
  // new的方式，根据组件对象可以创建一个组件对象
  const toast = new toastConstrustor()
  // 将组件对象手动挂载到一个元素上
  toast.$mount(document.createElement('div'))
  // 此时toast.$el就是创建的div
  document.body.appendChild(toast.$el)

  vue.prototype.$toast=toast
}
export default obj