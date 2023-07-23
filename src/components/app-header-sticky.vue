<template>
  <div class="app-header-sticky" :class="{ show : y >= 78}">
    <div class="container" v-show=" y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted, ref } from 'vue';
//通过vue3 npm i @vueuse/core@4.9.0 的工具库实现监听获取页面滚动的Y.X轴线的px值
import AppHeaderNav from './app-header-nav'
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  // setup() {
  //   const y = ref(null)   //当前的y轴线顶部卷曲的高度
  //   //监听当前顶部卷曲的高度
  //   onMounted(() => { 
  //     window.onscroll = () => {
  //     //获取当前鼠标Y轴滚动的距离
  //       const scrollTop = document.documentElement.scrollTop
  //       y.value = scrollTop
  //     }
  //   })
  //   return { y }
  // }
   //基于vue3的npm i @vueuse/core@4.9.0 工具库,实现页面滚动监听,报错记得重新装依赖, npm install
   setup () {
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  //当前顶部吸顶呗隐藏
  transform: translateY(-100%);
  opacity: 0;
  //如果到达这个顶部的卷曲高度后,则展示
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
    }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
