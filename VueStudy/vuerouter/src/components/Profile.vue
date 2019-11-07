<template>
  <div>
    我是profile
    <h2>{{$route.query.name}}</h2>
    <h2>{{$route.query.age}}</h2>
    <h2>{{$route.query.height}}</h2>
  </div>
</template>

<script>
export default {
  name:"Profile",
  data () {
    return {
    }
  }
}

</script>
<style scoped>
</style>
