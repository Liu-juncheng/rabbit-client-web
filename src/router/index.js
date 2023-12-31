// 导入vue-router插件 createRouter路由实例函数,createWebHashHistory路由模式函数
import { createRouter, createWebHashHistory } from "vue-router";

//配置路由规则数组
const routes = [
  {
    path: "/",
    component: () => import("@/views/Layout.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/views/home/index.vue"),
      },
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
