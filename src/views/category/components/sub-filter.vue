<template>
  <div class="sub-filter" v-if="filterData && !loading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: item.id === filterData.brands.selectedBrand }"
          v-for="item in filterData.brands"
          :key="item.id"
          @click="changeBrand(item.id)"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          href="javascript:;"
          @click="changeProp(item, prop.id)"
          :class="{ active: prop.id === item.selectedProp }"
          v-for="prop in item.properties"
          :key="prop.id"
        >
          {{ prop.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton
      class="item"
      width="800px"
      height="40px"
      v-for="i in 5"
      :key="i"
    />
  </div>
</template>
<script>
export default {
  name: "SubFilter",
};
</script>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, getCurrentInstance } from "vue";
import { fixedDataType } from "element-plus/es/components/table-v2/src/common";

//初始化数据
const filterData = ref(null);
//数据加载loading
const loading = ref(false);

//通过监听路由变化,动态获取数据
const route = useRoute(); //获取路由器
const { $http, $api } = getCurrentInstance().proxy;

//事件
const emit = defineEmits(["filter-change"]);

watch(
  () => route.params.id,
  (val) => {
    //这里必须判断是否有值,且当前是否处于在二级分类
    if (val && `/category/sub/${val}` === route.path) {
      loading.value = true;
      //符合条件则去发请求获取数据
      const subCategoryId = route.params.id;
      $http
        .get($api.filterCateGory, null, { params: { id: subCategoryId } })
        .then((data) => {
          //处理数据，添加根目录全部
          //1,总品牌
          //添加唯一标识符,用于点击选中
          data.brands.selectedBrand = null;
          data.brands.unshift({ id: null, name: "全部" });
          //2,属性
          data.saleProperties.forEach((item) => {
            item.selectedProp = null;
            item.properties.unshift({ id: null, name: "全部" });
          });
          filterData.value = data;
          //false 表示数据加载完成了
          loading.value = false;
        });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

//获取筛选参数的函数的,返回参数对象,提供给负组件
const getFilterParams = () => {
  //拼装参数对象
  const obj = {
    brandId: "", //品牌id
    attrs: [], //属性数组
  };
  obj["brandId"] = filterData.value.brands.selectedBrand;
  //销售属性
  filterData.value.saleProperties.forEach((item) => {
    if (item.selectedProp) {
      //如果选择的值存在
      const prop = item.properties.find(
        (prop) => prop.id === item.selectedProp
      );
      if (prop && prop !== undefined) {
        //拼装后台所需要的属性数组
        obj["attrs"].push({ groupName: item.name, propertyName: prop.name });
      }
    }
  });
  if (!obj["attrs"].length) obj["attrs"] = null;
  return obj;
};

//1,记录当前选择的品牌,选择id 当作参数传递,筛选数据,重发请求！
const changeBrand = (brandId) => {
  if (filterData.value.brands.selectedBrand === brandId) return; //避免重复选择
  filterData.value.brands.selectedBrand = brandId;
  emit("filter-change", getFilterParams()); //传递给父组件
};

//2,记录选择的销售属性
const changeProp = (item, propId) => {
  if (item.selectedProp === propId) return;
  item.selectedProp = propId;
  emit("filter-change", getFilterParams()); //传递给父组件
};
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
