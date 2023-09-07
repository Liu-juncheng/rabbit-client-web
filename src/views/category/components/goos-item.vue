<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <img v-lazy="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.tag }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: "GoodsItem",
};
</script>

<script setup>
import { defineProps, toRaw, onMounted } from "vue";
const props = defineProps({
  goods: {
    type: [Array,Object],
    default: () => [] || {},
  },
});
// 为什么打印父级传递的props值,终端展示为[],而页面能渲染数据,又回到了这个老问题,我们可以通过 props.goods直接去打印,或者直接在模板里可以通过标签进行渲染看看有无数据
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
