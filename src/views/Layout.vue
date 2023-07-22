   <!-- 首页布局容器 -->
<template>
  <!--顶部通栏组件 -->
  <AppTopnav/>
   <!--头部组件 -->
  <AppHeader/>
    <!-- 中间内容容器，中间内容组件需要切换,头部底部大部分不需要动 -->
    <main class="main-body">
      <!-- 二级路由出口,二级路由包含需要切换的商品详情页,个人中心组件等 -->
   <router-view></router-view>
    </main>
 <!-- 底部组件 -->
     <AppFooter/>
  </template>
  
  <script >
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import { useStore } from 'vuex';

  export default {
    name: 'xtx-Layout',
    components: {
      AppTopnav,
      AppHeader,
      AppFooter
    },
    setup() {
      //主组件提交一次action.获取所有分类数据
      // 在主组件里被提交了ispatch('category/getList')获取到顶级分类的数据了,做初始化准备,所有子级组件进行数据共享！
      const store = useStore()
        store.dispatch('category/getList')
    }
  
  }
  </script>
  
  <style scoped lang='less'>
.main-body {
  min-height: 600px;
}
</style>