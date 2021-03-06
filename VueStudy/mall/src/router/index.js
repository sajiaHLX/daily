import Vue from 'vue'
import Router from 'vue-router'

const Home=()=>import('views/home/Home')
const Category=()=>import('views/category/Category')
const Cart=()=>import('views/cart/Cart')
const Profile=()=>import('views/profile/Profile')
const Detail=()=>import('views/detail/Detail')

const originnalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originnalPush.call(this, location).catch(err => err)
}

// 安装插件
Vue.use(Router)

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail',
    component:Detail
  }
]

//创建router
const router = new Router({
  routes,
  mode:'history'
}) 

export default router