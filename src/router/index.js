// 导入vue-router插件 createRouter路由实例函数,createWebHashHistory路由模式函数
import { createRouter, createWebHashHistory } from "vue-router";
const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/home");
const TopCategory = () => import("@/views/category/index");
const SubCategory = () => import("@/views/category/sub");
const Goods = () => import("@/views/goods/index");

const routes = [
  {
    path: "/",
    component: Layout, //一级路由,包含整体的页面布局
    //二级路由,父级路由下的子路由,包含子内容！
    children: [
      { path: "/", component: Home },
      { path: "/category/:id", component: TopCategory },
      { path: "/category/sub/:id", component: SubCategory },
      { path: "/product/:id", component: Goods },
    ],
  },
];

// vue2. new VueRouter({}) 创建路由实例  vue2 不管什么插件都需要通过new 来创建实例
// vue3. createRouter({}) 创建路由实例   vue3 改为create + 插件名
const router = createRouter({
  //选择的默认为hash默认
  history: createWebHashHistory(),
  //路由标表实例
  routes,
  //路由跳转默认在当前浏览的位置（卷曲的高度），我们需要会到顶部。
  //注意：vue2.0 使用  x:0  y：0
  //      vue3.0  left:0,top:0
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
