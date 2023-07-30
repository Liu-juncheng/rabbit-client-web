<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <Transition name="fade">
      <ul ref="pannel" class="goods-list" v-if="list.length">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else></HomeSkeleton>
    </Transition>
  </HomePanel>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue";
import { useLazyData } from "@/hooks";

defineOptions({
  name: "HomeHot",
});

//获取数据
const list = ref([]);
const target = ref(null);
const { $http, $api } = getCurrentInstance().proxy;

//只有到可视区才会去调用接口,才能获取数据,再通过 list.value = data赋值渲染dom
useLazyData(target, () => {
  return $http.get($api.getHomeList).then((data) => {
    list.value = data;
    return data;
  });
});
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
