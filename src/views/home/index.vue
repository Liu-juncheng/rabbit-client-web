<template>
  <!-- vue3中是没有根div的,不需要唯一的根div,可以有多个div -->
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <homeNew></homeNew>
  <!-- 人气推荐 -->
  <homeHot></homeHot>
  <!-- 热门品牌 -->
  <HomeBrand></HomeBrand>
</template>

<!-- 使用 setup语法糖, //components:{MyComponent}  不需要注册直接使用-->
<!-- <script>
import HomeCategory from "./components/home-category"; //左侧分类
import HomeBanner from "./components/home-banner"; //轮播图
import XtxMore from "@/components/library/xtx-more.vue";
export default {
  name: "HomePage",
  components: {
    HomeCategory,
    HomeBanner,
    此为全局组件
    XtxMore,
  },
};
</script> -->

<script setup>
defineOptions({
  name: "HomePage",
});
// 这里要区分全全局注册的组件,全局组成的组件不需要导入和注册！
//而局部/当前跟目录的组件必须导入,你必须引入,你可以不注册！
//如果你不想导入也不想注册,则使用全局注册-===> 这种只针对全局通用的组件
import HomeCategory from "./components/home-category"; //左侧分类
import HomeBanner from "./components/home-banner"; //轮播图
import homeNew from "./components/home-new"; //新鲜推荐
import homeHot from "./components/home-hot"; //人气推荐
import HomeBrand from "./components/home-brand.vue"; //热门品牌
</script>

<style scoped lang="less"></style>
