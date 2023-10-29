<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
        </div>
        <div class="spec"></div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XtxGoodsPage",
};
</script>

<script setup>
import GoodsRelevant from "./components/goods-relevant";
import GoodsImage from "./components/goods-image.vue";

import {
  getCurrentInstance,
  getCurrentScope,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router"; //获取路由器,他是单独的，不是包含在vue里的，和store一样是单独的

const { $http, $api } = getCurrentInstance().proxy;
const route = useRoute();

const goods = ref(null); //商品详情数据

//获取商品详情
const getGoods = () => {
  let goodsId = route.params.id;
  //需要监听路由id的变化,从而重新发起请求
  watch(
    () => goodsId,
    (val) => {
      //动态路由必须有值的情况下才发请求,否则会报错的！
      if (val && `/product/${val}` === route.path) {
        $http
          .get($api.findGoods, null, {
            params: {
              id: goodsId,
            },
          })
          .then((res) => {
            //每次监听不同商品的变化，重新销毁和创建！优化渲染性能!
            goods.value = null;
            nextTick(() => {
              goods.value = res;
            });
          })
          .catch((err) => err);
      }
    },
    {
      immediate: true,
    }
  );
};

onMounted(() => {
  getGoods();
});
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
