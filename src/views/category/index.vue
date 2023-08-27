<template>
  <!--最顶层的分类商品  -->
  <div style="height: 600px">Top最顶层-Category11111111111111</div>
</template>
<script>
export default {
  name: "TopCategory",
};
</script>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("1111111级分类我被创建了----");
});
</script>

<style scoped lang="less"></style>
