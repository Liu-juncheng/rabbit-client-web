<template>
  <!--最顶层的分类商品--二级分类---悬浮框分类·  -->
  <div style="height: 600px">Sub二级的-Category11111</div>
</template>
<script>
export default {
  name: "SubCategory",
};
</script>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("222222222222222级分类我被创建了----");
});
</script>

<style scoped lang="less"></style>
