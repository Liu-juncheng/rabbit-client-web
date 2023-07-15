//数据仓库实例
import { createStore } from 'vuex'
//导入各个模块
import user from './modules/user'
import cart from './modules/cart.js'
import category from './modules/category.js'
//导入持久化插件
import persistedstate from 'vuex-persistedstate'

// vue2.8 创建仓库 new Vuex.store({})   new Vuex.store
// vue3.0 创建仓库 createstore({})       createStore
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  //pulgins是vuex注册插件的配置
  // 默认是存储在localStorage中
  //key是存储数据的键名
  //paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如user.token
  // 修改state后触发才可以看到本地存储数据的的变化。
  plugins: [
    persistedstate({
      //设置Key,存储在localStorage中的key名
      key: 'rabbit-client-web',
      paths: ['user', 'cart']
    })
  ]
})
