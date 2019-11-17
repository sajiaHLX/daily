<template>
  <div class="category">
    <categorylist></categorylist>
  </div>
</template>

<script>
import categorylist from './child/CategoryList'
export default {
  name:'category',
  data () {
    return {
    }
  },
  components: {
    categorylist,
  },
}

</script>
<style scoped>
  .category{
  }
</style>
