import Vue from 'vue'
import Router from 'vue-router'
// import home from '../components/Home'
// import about from '../components/About'
// import user from '../components/User'
const home = ()=> import('../components/Home.vue')
const about = ()=> import('../components/About.vue')
const user = () => import('../components/User.vue')
const news = () => import('../components/HomeNews.vue')
const message = ()=> import('../components/HomeMessage.vue')

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

export default new Router({
  routes: [
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
      ]
    },
    {
      path: '/about',
      component: about
    },
    {
      path:'/user/:userId',
      component:user
    }
  ],
  mode:'history',
  linkActiveClass:'active'
})
