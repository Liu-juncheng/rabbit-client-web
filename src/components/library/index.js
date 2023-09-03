// 此入口文件用来注册,挂载全局的组件,自定义指令

//导入需要组件在全局的组件
// 这里使用的传统的方式,每一个全局的组件需要一个个的导入,后期将使用全局批量自动注册
// import XtxSkeleton from "./xtx-skeleton.vue";
// import XtxCarousel from "./xtx-carousel.vue";
// import xtxMore from "./xtx-more.vue";
// import xtxBread from "./xtx-bread.vue"; //面包屑父级
// import xtxBreadItem from "./xtx-bread-item.vue"; //面包屑父级
import defaultImg from "@/assets/images/200.png"; //图片报错的默认图片

// context()函数的参数,参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context("./", false, /\.vue$/);
//omportFn()函数里有一个属性,这个属性keys()是个函数,是所有匹配.vue文件的集合数组
export default {
  // vue2  vue3注册全局的组件/插件都使用install()方法，只不过是参数不同vue2使用vue,vue3使用app
  //手动的一个个进行注册，不推荐,后续使用自动读取注册
  install(app) {
    //   app.component('XtxSkeleton',XtxSkeleton)  方式一
    // app.component(XtxSkeleton.name, XtxSkeleton); //方式二
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(xtxMore.name, xtxMore);
    // app.component(xtxBread.name, xtxBread);
    // app.component(xtxBreadItem.name, xtxBreadItem);

    //vue3通过自动注册全局组件,不再手动手动注册了
    // 导入library文件夹下的所有组件
    // 批量导入需要使用一个函数 require.context(dir,deep,matching)
    // 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
    // 批量注册全局组件
    importFn.keys().forEach((key) => {
      // 导入组件  //拿到获取所有的组件
      // console.log("每一项key其实就是被遍历的组件名",key)
      const component = importFn(key).default;
      //注册所有的组件
      app.component(component.name, component);
    });

    //将图片懒加载自定义指令挂载在全局,defineDirective()用于注册全局自定义指令
    defineDirective(app);
  },
};

//基于vue3的图片懒加载
//基于原生的webAPI 创建观察对象实例
// const observer = new IntersectionObserver(callback[options]);
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom
const defineDirective = (app) => {
  //directive()函数用来创建自定义指令
  app.directive("lazy", {
    //vue2自定义指令 监听dom元素是否创建好,使用inserted()插入
    //vue3自定义指令 监听dom元素是否创建好,直接使用钩子函数mouted()
    //监听dom的函数接收两个参数,1,el==>监听的dom元素   2,binding 绑定携带的参数
    mounted(el, binding) {
      //创建一个观察对象,来观察当前使用指令的元素
      const observer = new IntersectionObserver(
        // - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            //如果被观察到了，就停止观察
            // console.log("我被观察到了",'此时的DOM',el,'此时的dom绑定的值',binding)
            observer.unobserve(el);
            //图片加载错误，赋值默认图像,onerror加载失败回调  onload加载成功回调
            el.onerror = () => {
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        //配置选项,交叉比例
        {
          threshold: 0.01,
        }
      );
      //开启观察
      observer.observe(el);
    },
  });
};
//在组件中在img上使用使用v-lazy值为图片地址，不设置src属性。

//基于vue2封装的图片加载失败的自定义指令
export const imgerror = {
  // inserted 这个钩子是dom元素插入的时候触发
  // dom为dom 元素   options/bindings为选项对象,外界传入的值
  inserted(dom, options) {
    // onerror为原生事件, img.onerror发生错误/失效会触发这个函数！
    dom.onerror = function () {
      // optionse.value 使外界传递/提供的默认值！
      dom.src = options.value;
    };
  },
};

// vue2 在main进行全局自动注册所有的自定义指令
//import * as xxx(名称,里面是一个对象的集合,key是所有函数的名称,value是具体的函数方法)
// import * as directives from "@/directives/index.js";
// // Object.keys里是一个数组,遍历整个自定义指令名称,所有的自定义方法都维护在这个数组里！
// Object.keys(directives).forEach((key) => {
//   // key 自定义名称
//   // directives[key] 自定义对象
//   //directive 挂载指令的,directives自定义指令名称的
//   Vue.directive(key, directives[key]);
// });
