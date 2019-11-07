import Vue from 'vue'
import Router from 'vue-router'

const Home=()=>import('../views/home/Home.vue')
const Category=()=>import('../views/category/Category.vue')
const Cart=()=>import('../views/cart/Cart.vue')
const Profile=()=>import('../views/profile/Profile.vue')

const originnalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originnalPush.call(this, location).catch(err => err)
}

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
  }
]
const router = new Router({
  routes,
  mode:'history'

})

export default router