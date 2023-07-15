import { createApp } from 'vue'
//引入根组件，并注册在vue3应用程序上
import App from './App.vue'
import router from './router'
import store from './store'
//导入请求模块
import { http } from './utils/request'

const app = createApp(App)

// 在 app.config.globalProperties进行全局挂载模块
app.config.globalProperties.$http = http
app.config.globalProperties.$post = http.post
app.config.globalProperties.$get = http.get
//页面使用getCurrentInstance()调用导入
// const { proxy }: any = getCurrentInstance();
// proxy.$axios()   可以把这里的proxy 想象成this

//use()注册全局的插件
app.use(store).use(router).mount('#app')
