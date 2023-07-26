<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
  <!-- vue3中是没有根div的,不需要唯一的根div,可以有多个div -->
</template>
<script>
import HomeCategory from "./components/home-category"; //左侧分类
import HomeBanner from "./components/home-banner"; //轮播图
export default {
  name: "HomePage",
  components: {
    HomeCategory,
    HomeBanner,
  },
};
</script>
<style scoped lang="less"></style>
