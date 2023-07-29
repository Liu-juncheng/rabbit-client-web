<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <!-- 在封装的组件里定义了插槽  <slot name="right" />
            组件中使用具名插槽的使用方式
          方式一：使用<template v-slot:right>指令
            方式2：使用<template #right>简写-->
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <!-- HomeSkeleton  记住需要包裹的组件,不要把template 不需要的组件包裹进去
          而且Transition  必须有v-if    v-else 否则会报错-->
      <Transition name="fade">
        <ul class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <!-- &yen;  是日元符号 等于==> ¥2089.00 -->
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else></HomeSkeleton>
      </Transition>
    </HomePanel>
  </div>
</template>

<script setup name="HomeNew">
import { ref, getCurrentInstance, toRaw } from "vue";

import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue";

defineOptions({
  name: "HomeNew",
});

const goods = ref([]);
const {
  proxy: { $http, $api },
} = getCurrentInstance();
$http.get($api.getNewList).then((data) => {
  goods.value = data;
  // console.log("data:通过toRaw函数转为原始数组", toRaw(goods.value));
});
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
