<template>
  <div class="home-banner">
    <!-- :autoPlay="true" :duration="120"  这里需要这样传参,指向一个具体的value值!
     这个value值可以是通过计算属性或者在什么方式获取到的结果, 总之props传参以Key:value
     的形式传参,key是子组件的定义的参数字段, value是具体的值!
     :autoPlay="true"  => autoPlay 简写为true
    -->
    <XtxCarousel :sliders="sliders" autoPlay />
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref } from "vue";

export default {
  name: "HomeBanner",
  setup() {
    //定义轮播图数组变量
    const sliders = ref([]);

    //调用接口,获取轮播图图片,通过props传递给轮播图组件
    const { $http, $api } = getCurrentInstance().proxy;
    $http.get($api.getBannerList).then((data) => {
      sliders.value = data;
    });
    return { sliders };
  },
};
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}

//重置左右按钮,以及指示器的样式,让其在可视区居中
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
