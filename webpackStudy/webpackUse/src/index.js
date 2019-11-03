const {sum,mul}=require('./js/aaa');
//依赖css文件
require('./css/normal.css')
//依赖less文件
require('./css/spe.less')
console.log(sum(10,20));
console.log(mul(10,20));
//使用vue进行开发
import Vue from 'vue'
import App from './vue/App.vue'

new Vue({
  el:'#app',
  template:`<App></App>`,
  components:{
    App
  }
})