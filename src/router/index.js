// 导入vue-router插件 createRouter路由实例函数,createWebHashHistory路由模式函数
import { createRouter, createWebHashHistory } from "vue-router";
const  Layout  =  () => import("@/views/Layout");
const Home = () => import("@/views/home")
const TopCategory = () => import('@/views/category/index') 
const SubCategory = () => import('@/views/category/sub') 
const Product = () => import("@/views/home/components/home-product")

//配置路由规则数组
// const routes = [
//   {
//     path: "/",
//     component: () => import("@/views/Layout.vue"),
//     children: [
//       {
//         path: "/",
//         component: () => import("@/views/category/index.vue"), // 首页
//       },
//       {
//         //必须通过 <RouterLink :to="`/category/sub/${sub.id}`"/ > 需传递对应的id 才能跳转到指定的页面！
//         //如果不希望通过这个方式跳转,同样可以通过编写函数的形式$router.psuh(/category/sub/${sub.id}`")的方式跳转
//         path: "/category/:id",
//         component: () => import("@/views/category/index.vue"), //-级分类 固定最顶层的分类
//       },
//       {
//         path: "/category/sub/:id", //跳转导致这个指定的页面,必须传递对应的分类的id才行！
//         component: () => import("@/views/category/sub.vue"), //二级分类 悬浮的分类
//       },
//     ],
//   },
// ];

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      // { path: '/Product/sub/:id', component: Product },
    ],
  },
];

// vue2. new VueRouter({}) 创建路由实例  vue2 不管什么插件都需要通过new 来创建实例
// vue3. createRouter({}) 创建路由实例   vue3 改为create + 插件名
const router = createRouter({
  //选择的默认为hash默认
  history: createWebHashHistory(),
  routes,
});

export default router;
