import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
// import home from '../components/Home'
// import about from '../components/About'
// import user from '../components/User'
const home = ()=> import('../components/Home.vue')
const about = ()=> import('../components/About.vue')
const user = () => import('../components/User.vue')
const news = () => import('../components/HomeNews.vue')
const message = ()=> import('../components/HomeMessage.vue')
const profile = () => import('../components/Profile.vue')

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
// 通过vue.use安装插件
Vue.use(VueRouter)

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home,
    children:[
      {
        path:'',
        redirect:'/home/news'
      },
      {
        path:'news',
        component:news
      },
      {
        path:'message',
        component:message
      }
    ],
    meta:{
      title:'首页'
    }
  },
  {
    path: '/about',
    component: about,
    meta:{
      title:'关于'
    }
  },
  {
    path:'/user/:userId',
    component:user,
    meta:{
      title:'用户'
    }
  },
  {
    path:'/profile',
    component:profile,
    meta:{
      title:'档案'
    }
  }
]

const router=new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:'active'
})

router.beforeEach((to, from, next) => {
  window.document.title=to.matched[0].meta.title
  console.log(to);
  next()
})

export default router
