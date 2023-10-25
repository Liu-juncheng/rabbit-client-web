<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem
        :key="cateGory.top.id"
        v-if="cateGory.top"
        :to="`/cateGory/${cateGory.top.id}`"
        >{{ cateGory.top.name }}</XtxBreadItem
      >
    </Transition>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem
        :key="cateGory.sub.id"
        v-if="cateGory.sub"
        :top="`/cateGory/${cateGory.sub.id}`"
        >{{ cateGory.sub.name }}</XtxBreadItem
      >
    </Transition>
  </XtxBread>
</template>

<script>
export default {
  name: "subBread",
};
</script>

<script setup>
// 全局挂载的插件都是use! 而不是user!
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
//通过计算属性动态获取一级top分类和二级sub分类
const route = useRoute();
const store = useStore();
// 获取从vuex中存储的所有分类
const cateGory = computed(() => {
  const cate = {};
  store.getters.categoryList.forEach((top) => {
    if (top.children && top.children.length) {
      const sub = top.children.find((sub) => sub.id === route.params.id);
      //我们希望最后生成的数据对象对象：{top:{id,name},sub：{id,name}}
      if (sub) {
        cate.top = { id: top.id, name: top.name };
        cate.sub = { id: sub.id, name: sub.name };
      }
    }
  });
  return cate;
});
</script>
