<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <subBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filteChange" />
      <!-- 商品列表(排序 + 列表) -->
      <div class="goods-list">
        <!-- 排序 -->
        <subSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "subCategory",
};
</script>

<!-- 如果你想使用vue3的子组件的注册方式,不想用componets去手动注册
,而使用setUp函数,则必须把子组件的引入放在<script setup>标签之下!
-->
<script setup>
import subBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import subSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goos-item.vue";
import { ref, getCurrentInstance, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/api";

const route = useRoute();
const { $http, $api } = getCurrentInstance().proxy;
//当前的加载状态
const loading = ref(false); // 加载中
const finished = ref(false); //加载完成,无数据了
const goodsList = ref([]);

//请求分类商品参数
let categoryParams = {
  page: 1,
  pageSize: 30,
  categoryId: route.params.id,
};

//加载数据
const getData = () => {
  loading.value = true;
  $http.post($api.getGoodsTemporaryList, categoryParams).then((res) => {
    if (res && res.items.length) {
      goodsList.value.push(...res.items);
      //注意每次分页加载完毕,需要将分页加++.进行下一页的加载
      categoryParams.page++;
    } else {
      finished.value = true;
    }
    loading.value = false;
  });
};

//监听切换二级分类ID数据的变化,如果切换了分类,则清空数组，重置入参,重新发请求

watch(
  () => route.params.id,
  (val) => {
    //判断是否是处于当前的二级分类,判断路径是否相等
    if (val && `/category/sub/${val}` === route.path) {
      //如果切换了,重新加载
      finished.value = false;
      goodsList.value = [];
      //重置入参
      categoryParams = {
        page: 1,
        pageSize: 30,
        categoryId: route.params.id,
      };
    }
  }
);

//1,获取点击排序组件的点击筛选条件传过来的参数,重新发请求,以及勾选的筛选
const sortChange = (sortParams) => {
  finished.value = false;
  // 重构入参,合并入参，重新发请求
  categoryParams = {
    ...categoryParams,
    ...sortParams,
    categoryId: route.params.id,
    page: 1,
  };
  goodsList.value = [];
};

//2,点击筛选品牌,已经筛选的品牌的各种属性
const filteChange = (objParams) => {
  finished.value = false;
  // 重构入参,合并入参，重新发请求
  categoryParams = {
    ...categoryParams,
    ...objParams,
    categoryId: route.params.id,
    page: 1,
  };
  goodsList.value = [];
};
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
