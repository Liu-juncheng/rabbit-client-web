<template>
  <!-- 查看更多组件 -->
  <RouterLink :to="props.path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>
<script>
import { defineProps } from "vue";
export default {
  name: "XtxMore",
};
</script>

<!-- name="xtxMore" 在vue-cli脚手架 不支持 -->
<script setup name="xtxMore">

//vue-clie脚手架使用注册name属性,或者如上写两个script标签！！

//props参数
const props = defineProps({
  path: {
    type: String,
    default: "/",
  },
});
</script>

<style scoped lang="less">
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,
    i {
      color: @xtxColor;
    }
  }
}
</style>
