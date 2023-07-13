import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//use()注册全局的插件
createApp(App).use(store).use(router).mount('#app')
