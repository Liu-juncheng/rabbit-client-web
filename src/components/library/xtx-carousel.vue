<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <!-- 如果当前图片数组的i === index的索引,这个加载这个类  opacity: 1;z-index: 1;
      -->
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: i === index }"
      >
        <RouterLink to="/">
          <!-- 图片 -->
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(-1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 指示器   五个点点 加上ative类高亮 -->
    <div class="carousel-indicator">
      <!--  :class="{active :i === index}" 选到/自动切换到这张图片时,则高亮-->
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script>
import { toRaw, onMounted, watch, ref, defineExpose } from "vue";
export default {
  name: "XtxCarousel",
  props: {
    // 注意如果是接口请求的函数,初始化打印时没有数据的,可直接在模板里渲染验证,或者通过定时器验证
    sliders: {
      type: [Array, Object],
      default: () => [],
    },
    //是否开启自动播放
    autoPlay: {
      type: Boolean,
      default: false,
    },
    //控制播放的时长
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    //在setUp()函数中打印props的值
    // watch(props, (newProps) => {
    //   console.log("props更新", toRaw(newProps.sliders));
    // });
    // onMounted(() => {
    //   console.log("11数据", toRaw(props.sliders));
    // });

    //定义一个索引用来控制默认显示第几张图片
    const index = ref(0);

    //定义初始化定时器初始化,后期需要销毁它
    let timer = ref(null);
    //1,定义自动播放的函数
    const onAutoPlay = () => {
      clearInterval(timer); //严谨写法，每次开启定时器都关闭原来的定时器,防止添加重复的定时器,增加内存泄漏风险
      //通过定时器每3秒切换下图片的索引即可实现
      timer.value = setInterval(() => {
        index.value++;
        //播放重置,无限播放
        if (index.value >= props.sliders.length) {
          //sliders轮播图数组长度
          index.value = 0;
        }
      }, props.duration);
    };

    //通过监听,获取调用轮播函数的条件
    //监听一个非ref/reactive 的响应式声明的数据,则必须用函数的形式进行监听,否则就用普通方式
    watch(
      () => props.sliders,
      (val) => {
        //监听的第一val参数为新值,第二值为旧值
        if (val.length && props.autoPlay) {
          onAutoPlay();
        }
      },
      { immediate: true } //立即执行,防止使用固定数据
    );

    //2,鼠标进入停止轮播，鼠标离开开始轮播
    //鼠标进入关闭定时器
    const stop = () => {
      if (timer.value) {
        clearInterval(timer.value); //vue3 不管改任何声明的响应式数据必须使用value去改值
      }
    };
    //鼠标进入开启定时器
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        onAutoPlay();
      }
    };

    //切换上一张，下一张
    const toggle = (step) => {
      const newIndex = index.value + step;
      // 超出当前索引的访问
      if (newIndex >= props.sliders.length - 1) {
        index.value = 0;
        return;
      }
      //太小了  不能时-1
      if (newIndex < 0) {
        index.value = props.sliders.length - 1; //则重置
        return;
      }
      //正常
      index.value = newIndex;
    };

    return { index, stop, start, toggle };
  },
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
