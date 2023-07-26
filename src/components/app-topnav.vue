<!-- 顶部通栏组件 -->
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 根据登录状态动态展示 -->
        <!-- <template></template>模板的好处是,它可以被当中一个元素,但不会被渲染成标签
             通常用于包裹某些内容,又不想渲染出标签, 适用于条件渲染，动态渲染
          -->
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</a
            >
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
//根据登录状态动态渲染顶部通栏登录效果
const store = useStore();
// const { token}  = store.usre.token  //错误写法 因为state默认是区分模块的,
// 如果要使用state数据必须先指定具体的模块,再去选择对应的字段  state ==> 具体模块 ==>解构数据
// const { profile } = store.state.user  使用vuex必须使用响应式,这样写是没有响应式的,需使用计算属性
const profile = computed(() => {
  return store.state.user.profile;
});

// 导出函数和变量
defineExpose({
  profile: profile,
});
// console.log("profile",profile.value.token)   //获取响应式数据必须使用value!
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      //这个~ 选择器 代表的是当你选择的第一个li的时候的,后续的li 都会加上这个样式,类似于后代选择器！
      // 波形符 (`~) 组合器有助于应用li第一个之后的元素! 它只作用与当前元素指定的之后的每个元素！
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
