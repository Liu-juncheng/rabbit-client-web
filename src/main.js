import { createApp } from "vue";
//引入根组件，并注册在vue3应用程序上
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入封装的请求模块
import { http } from "./utils/request";
//导入api接口, 使用公司的写法，使用全局挂载,不喜欢函数的形式
import api from "./api/api.js";
//elemnt-puls组件库
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//样式重置包  通过npm i normalize.css 下包
import "normalize.css";
//自己的公共样式
import "@/assets/styles/common.less";

//导入全局注册的组件
import UI from "@/components/library";

//app应用程序实例
const app = createApp(App);

// 在 app.config.globalProperties进行全局挂载模块
app.config.globalProperties.$http = http;
app.config.globalProperties.$post = http.post;
app.config.globalProperties.$get = http.get;
app.config.globalProperties.$api = api;
//页面使用getCurrentInstance()调用导入
// const { proxy }: any = getCurrentInstance();
// proxy.$axios()   可以把这里的proxy 想象成this

//use()注册全局的插件/组件
app.use(store).use(router).use(ElementPlus).use(UI).mount("#app");

// vue2 使用Vue.use方法 注册全局组件
// Vue.use(Component);

//vue2挂载注册实例,需要根组件
// new Vue({
//     router,
//     store,
//     render: (h) => h(App),
//   }).$mount("#app"
