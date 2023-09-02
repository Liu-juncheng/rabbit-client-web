<!-- 首页布局容器 -->
<!-- 终于理解什么是Layout了 什么是一级路由出口,什么是二级路由出口 -->
<template>
  <!--顶部通栏组件 -->
  <AppTopnav />
  <!--头部组件 -->
  <AppHeader />
  <!-- 头部吸顶组件 -->
  <AppHeaderSticky />
  <!-- 中间内容容器，中间内容组件需要切换,头部底部大部分不需要动 -->
  <main class="app-body">
    <!-- 二级路由出口,二级路由包含中心的轮播图,推荐需要切换的商品详情页,个人中心组件等 -->
    <!-- <router-view>
      为什么你要在二级路由出口你放一个home组件??? 他只是提供出口的作用,这里只是提供
      布局的作用,想象这里就是div块级的上下文,千万不要在<RouterView />里包含任何的组件,
      他只提供出口,展示的内容由路由绑定的组件决定！看整体的布局上下文,以及路由绑定的组件
      当路由跳转以及当前的页layout面布局,则展示当前所呈现的内容！
      <Home/>
    </router-view> -->
    <RouterView />
  </main>
  <!-- 底部组件 -->
  <AppFooter />
</template>

<script>
import AppTopnav from "@/components/app-topnav";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppHeaderSticky from "@/components/app-header-sticky";
// import Home from "@/views/home/index"; // 中间主体内容,左侧树形导航,右侧轮播图

import { useStore } from "vuex";

export default {
  name: "xtx-Layout",
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky,
    // Home,
  },
  setup() {
    //主组件提交一次action.获取所有分类数据
    // 在主组件里被提交了ispatch('category/getList')获取到顶级分类的数据了,做初始化准备,所有子级组件进行数据共享！
    const store = useStore();

    store.dispatch("category/getList");
  },
};
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
