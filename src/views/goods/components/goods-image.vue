<template>
  <div class="goods-image">
    <!-- 左侧固定大图 -->
    <div
      v-show="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <!-- 当前悬浮,选中，方法的中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩层  -->
      <div class="layer" v-show="show" :style="layerPosition"></div>
    </div>
    <!-- 右侧五个小图,鼠标移动进入赋值给currIndex,展示当前的图片 -->
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref, defineProps, reactive, watch } from "vue";
import { useMouseInElement } from "@vueuse/core"; //导入vue3函数库,使用useMouseInElement()获取元素XY坐标和是否离开元素
export default {
  name: "GoodsImage",
};
</script>

<script setup>
//当前预览的索引图,初始化为第一张,鼠标进入切换索引,从而变更图片,与轮播图类似！
const currIndex = ref(0);
const target = ref(null);

//1,是否显示遮罩层和大图
const show = ref(false);
//2,遮罩的坐标(样式),已提起设置定位，只需动态设置left和top的值即可,根据坐标动态赋值即可
const layerPosition = reactive({
  x: 0,
  y: 0,
});

//3, 选中悬浮，放大中图的坐标,动态参入x,y坐标样式,背景定位(样式)
const largePosition = reactive({
  backgroundPositionX: 0,
  backgroundPositionY: 0,
});

//4,导入useMouseInElement()函数,获取对应方法参数
//该函数入参是绑定的元素,返回值x,y坐标,是否离开元素
const { elementX, elementY, isOutside } = useMouseInElement(target);

//计算坐标,给遮罩层,悬浮放大的图片动态赋值
const position = reactive({ left: 0, top: 0 }); //定义初始化变量

watch([elementX, elementY, isOutside], () => {
  //在元素内才展示放大效果
  show.value = !isOutside.value;
  // 控制X轴方向的定位 0-200 之间
  if (elementX.value < 100) position.left = 0;
  else if (elementX.value > 300) position.left = 200;
  else position.left = elementX.value - 100;
  // 控制Y轴方向的定位 0-200 之间
  if (elementY.value < 100) position.top = 0;
  else if (elementY.value > 300) position.top = 200;
  else position.top = elementY.value - 100;
  // 设置遮罩容器的定位
  layerPosition.left = position.left + "px";
  layerPosition.top = position.top + "px";
  // 设置大背景的定位
  largePosition.backgroundPositionX = -position.left * 2 + "px";
  largePosition.backgroundPositionY = -position.top * 2 + "px";
});

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
