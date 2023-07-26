// 此入口文件用来注册全局的组件

//导入需要组件在全局的组件
// 这里使用的传统的方式,每一个全局的组件需要一个个的导入,后期将使用全局批量自动注册
import XtxSkeleton from "./xtx-skeleton.vue";
import XtxCarousel from "./xtx-carousel.vue";

export default {
  // vue2  vue3注册全局的组件/插件都使用install()方法，只不过是参数不同vue2使用vue,vue3使用app
  install(app) {
    //   app.component('XtxSkeleton',XtxSkeleton)  方式一
    app.component(XtxSkeleton.name, XtxSkeleton); //方式二
    app.component(XtxCarousel.name, XtxCarousel);
  },
};
