<template>
  <div class="home-product" ref="target">
    <HomePanel title="生鲜" v-for="cate in goodsList" :key="cate.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            :to="`/category/${sub.id}`"
            v-for="sub in cate.children"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          >
        </div>
        <!-- 查看更多 -->
        <XtxMore :path="`/category/${cate.id}`" />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-lazy="cate.picture" alt="" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 8个商品 这里8个小商品以被渲染,只需把具体的item传过去即可 -->
        <ul class="goods-list">
          <li v-for="item in cate.goods" :key="item.id">
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
export default {
  name: "HomeProduct",
  components: { HomePanel, HomeGoods },
};
</script>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { useLazyData } from "@/hooks";
import HomePanel from "./home-panel";
import HomeGoods from "./home-goods";

//vue3的 setup语法糖必须用ref去绑定,并声明ref的DOM对象
const target = ref(null);
//在setup语法糖里必须声明响应式的数据[],用于去渲染列表
const goodsList = ref([]);

const { $http, $api } = getCurrentInstance().proxy;

//数据懒加载,传一个接口函数的返回值,或者定义api,在内部实现接口函数,并返回数据
useLazyData(target, () => {
  return $http.get($api.getGoodsList).then((data) => {
    goodsList.value = data;
    return data;
  });
});
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    width: 100%;
    height: 100%;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
