<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "SubSort",
};
</script>

<script setup>
import { reactive } from "vue";
//在vue3中,需要触发emit的事件，需要单独罗列出来,主动设置，写在外面，供业务逻辑使用,不需要引入,这是个自带api
const emit = defineEmits(["sort-change"]);

// 1. 根据后台需要的参数定义数据对象
// 2. 根据数据对象，绑定组件（复选框，排序按钮）
// 3. 在操作排序组件的时候，需要反馈给数据对象
// sortField====>[publishTime,orderNum,price,evaluateNum]
// sortMethod====>asc为正序 desc为倒序
const sortParams = reactive({
  inventory: false, //	是否有库存
  onlyDiscount: false, //	只显示特惠
  sortField: null, // 商品排序 , 四种商品排序方式=>[publishTime,orderNum,price,evaluateNum]
  sortMethod: null, // 商品排序方法, 正序,倒序,拉取后端正序或者倒序的数据
});

//接收参数字段,根据点击不同的筛选事件,去拉取数据
const changeSort = (sortField) => {
  if (sortField === "price") {
    sortParams.sortField = sortField;
    //处理排序
    if (sortParams.sortMethod === null) {
      //第一次进入的时候为desc为倒序，从大到小
      sortParams.sortMethod = "desc";
    } else {
      //否则就是重新赋值，变成上下箭头的切换类
      sortParams.sortMethod = sortParams.sortMethod === "desc" ? "asc" : "desc"; //变成切换类
    }
  } else {
    if (sortParams.sortField === sortField) return; //表示当前选择的,不再执行下面的内容
    //如果点击不是价格排序，点击的是其他的筛选
    sortParams.sortField = sortField; //点击其他的筛选，例如最新商品，最高人气等
    sortParams.sortMethod = null; //不是点击的价格排序，每次都清空价格排序筛选
  }
  //1,用户点击排序条件，触发emit 通知父级重新拉取数据
  emit("sort-change", sortParams);
};

//2,勾选单选框时,则也要重新拉取数据
const changeCheck = () => {
  emit("sort-change", sortParams);
};
</script>

<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
