// hooks 用于封装复用的逻辑   hooks是钩子函数的意思

//导入vue3  组合式API 库函数
import { useIntersectionObserver } from "@vueuse/core";

// 使用 @vueuse/core 中的 useIntersectionObserver 来实现监听进入可视区域行为，但是必须配合vue3.0的组合API的方式才能实现,最终实现数据懒加载

import { ref } from "vue";
// 数据懒加载函数
export const useLazyData = (target, apiFn) => {
  // target  是被监听的dom 对象
  //aipiFn 是一个获取数据的接口函数, 我这里返回的是一个 () => 自定义函数 通过 .then的方式将result数据返回给dom

  const result = ref([]); //最终返回的数据
  // stop 解构出停止观察函数
  const { stop } = useIntersectionObserver(
    // target 被监听的dom对象
    target,
    // isIntersecting  是否进入可视区
    ([{ isIntersecting }], observerElement) => {
      // 如果进入可视区了
      if (isIntersecting) {
        //则立即停止监听
        // console.log("进入可视区了=========")
        stop();
        //apiFn最终返回的是一个Promis的 调用API获取数据
        apiFn()
          .then((data) => {
            // console.log("进入可视区后最终返回的数据",data)
            result.value = data;
          })
          .catch((err) => err);
      }
    },
    //配置对象,相交的比例大于0就触发,不能出现留白想象
    {
      threshold: 0,
    }
  );
  // 返回给dom--->数据（dom,后台数据）
  return { result };
};
