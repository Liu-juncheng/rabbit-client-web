<template>
  <div class="xtx-bread-item">
    <!--有to参数则是父级 -->
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <!-- 否则就是最最后一级的 -->
    <span v-else><slot /></span>
    <!-- 如何去掉最后一个箭头?最末尾的面包屑是不需要箭头的,用 &:last-of-type 确定类型去除,
    或者使用&:last-child {display:none} 进行去除    
    -->
  </div>
</template>
<script>
export default {
  name: "XtxBreadItem",
};
</script>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  to: {
    type: [Object, String],
    default: "",
  },
});
</script>
