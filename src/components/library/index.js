// 此入口文件用来注册全局的组件

//导入需要组件在全局的组件
import XtxSkeleton from './xtx-skeleton.vue';

export default {
  // vue2  vue3注册全局的组件/插件都使用install()方法，只不过是参数不同vue2使用vue,vue3使用app
  install(app) {
    //   app.component('XtxSkeleton',XtxSkeleton)  方式一
    app.component(XtxSkeleton.name, XtxSkeleton)//方式二
  },
};
 