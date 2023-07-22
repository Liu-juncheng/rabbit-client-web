
// 用户信息模块
export default {
  //   //开启命名空间
  namespaced: true,
  // //注意在vue3 中的state语法是一个函数,而vue2中是一个对象。state:{}
  state () {
    return {
      // 用户信息对象
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '', //用户名
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
