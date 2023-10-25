<template>
  <div class="xtx-checkbox" @click="changeCheckBox">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 默认插槽,转入label文字 -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
export default {
  name: "XtxCheckbox",
};
</script>

<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";
//善用useModel工具函数
import { useVModel } from "@vueuse/core";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
//setUp语法糖中,需要主动定义emit事件!
//defineEmits([]) 是一个数组列表,可以传递多个数据,暴露多个事件!
const emit = defineEmits(["update:modelValue", "change"]);
//userModel('子组件接收的props参数','modelValue父组件默认v-model绑定的值,字段名字可替换:v-model:a ='xx'',emit暴露的事件)
//这个checked其实就是包装的ref响应式对象!
const checked = useVModel(props, "modelValue", emit);
const changeCheckBox = () => {
  // checke.value =!checked.value; 状态切换类,开关类!
  const newValue = !checked.value;
  //将最新值赋值给父组件,其实就是再执行("updata:modelValue");这段代码
  checked.value = newValue;
  //暴露自定义事件给父组件进行调用!
  emit("change", newValue);
};
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
