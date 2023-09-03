<template>
  <!--最顶层的分类商品/中间面包屑点击商品详情  -->
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem>首页</XtxBreadItem>
        <XtxBreadItem>电器</XtxBreadItem>
        <XtxBreadItem>空调</XtxBreadItem>
      </XtxBread>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopCategory",
};
</script>

<script setup>
import XtxBread from "@/components/library/xtx-bread.vue";
import { onMounted } from "vue";
onMounted(() => {});
</script>

<style scoped lang="less"></style>
