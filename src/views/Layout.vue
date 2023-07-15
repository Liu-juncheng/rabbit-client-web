<template>
    <!-- 布局容器 -->
    <nav>顶部通栏</nav>
    <header>头部</header>
    <!-- 中间内容容器，中间内容组件需要切换,头部底部大部分不需要动 -->
    <main class="main">
      <!-- 二级路由出口,二级路由包含需要切换的商品详情页,个人中心组件等 -->
      <router-view></router-view>
    </main>
    <footer>底部</footer>
  </template>
  
  <script>
  export default {
    name: 'xtx-Layout'
  }
  </script>
  
  <style scoped lang='less'></style>