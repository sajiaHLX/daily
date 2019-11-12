<template>
  <div class="goods">
    <goodsListItem v-for="(item ,index) in goods" :key="index" :goodsitem="item">
    </goodsListItem>
  </div>
</template>

<script>
import goodsListItem from './GoodListItem'
export default {
  components: {
    goodsListItem,
  },
  data () {
    return {
    }
  },
  props: {
    goods: {
      type: Array,
      default: []
    },
  },
}

</script>
<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
