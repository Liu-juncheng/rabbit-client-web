<template>
    <div>
      <div>{{$store.state.user.profile.account}}</div>
      <button @click="$store.commit('user/setUser',{account:'设置用户信息为:snaape'})">设置用户信息</button>
      <hr>
      <div>测试请求模块</div>
      <button @click="testRequest">发送请求</button>
    </div>
  </template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'APP',
  setup () {
    const { $http } = getCurrentInstance().proxy
    const testRequest = () => {
      $http.post('member/profile', null, { params: { a: 10 } })
        .then(res => {
          console.log('请求成功', res)
        })
        .catch(err => {
          console.error('请求失败', err)
        })
    }

    return {
      testRequest
    }
  }
}
</script>

  <style lang="less">
  </style>





