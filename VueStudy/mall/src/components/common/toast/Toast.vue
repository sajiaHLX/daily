<template>
  <div class="toast" v-show="toastshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message:'',
      toastshow:false
    }
  },
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // toastshow:{
    //   type:Boolean,
    //   default:false
    // }
  },
  methods: {
    show(message,time=1500) {
      this.message=message
      this.toastshow=true
      setTimeout(()=>{
        this.toastshow=false
        this.message=''
      },time)
    },
  },
}

</script>
<style scoped>
  .toast{
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    padding: 10px;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
  }
</style>
