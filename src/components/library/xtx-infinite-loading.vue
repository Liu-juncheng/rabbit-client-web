<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "XtxInfiniteLoading",
};
</script>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});
import { defineProps, reactive, ref } from "vue";
//导入vue3  组合式API 库函数,useIntersectionObserver()用于监听元素是否进入可视区了
import { useIntersectionObserver } from "@vueuse/core";
const target = ref(null); //监听当前的元素
//在vue3中,需要触发emit的事件，需要单独罗列出来,主动设置，写在外面，供业务逻辑使用,不需要引入,这是个自带api
const emit = defineEmits(["infinite"]);

// stop 解构出停止观察函数
//useIntersectionObserver() 三个参数:1,target被监听的元素，2，回调函数，3配置对象。相交比例
//isIntersecting 元素是否进入可视区,如果进入则做某些逻辑
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      //如果不是loding加载中的话,并且不是加载完成的情况下，我们就应该去拉取数据数据
      //给父级触发一个数据加载事件，让父级去拉取数据
      if (!props.loading && !props.finished) {
        emit("infinite");
      }
    }
  },
  {
    //配置对象交叉比例
    threshold: 0,
  }
);
</script>
<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
