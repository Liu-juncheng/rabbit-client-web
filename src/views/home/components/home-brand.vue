<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        href="javascript:;"
        @click="toggle(-1)"
        :class="{ disabled: index === 0 }"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        href="javascript:;"
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul
          v-if="brands.length"
          class="list"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <!--  :style="{ transform: `translateX(${-index * 1240}px)` }" 平移的关键 -->
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>

        <div v-else class="skeleton">
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import HomePanel from "./home-panel";
import { useLazyData } from "@/hooks";

defineOptions({
  name: "HomeBrand",
});
const brands = ref([]);
const target = ref(null);

const { $http, $api } = getCurrentInstance().proxy;

useLazyData(target, () => {
  return $http
    .get($api.getBrandList, null, { params: { limit: 10 } })
    .then((data) => {
      brands.value = data;
      return data;
    });
});

//左侧按钮的切换效果
let index = ref(0);
const toggle = (setup) => {
  //Setup 当前传递的参数
  const newIndex = index.value + setup; //默认-1 不能点
  // 0  1切换
  if (newIndex < 0 || newIndex > 1) return;
  index.value = newIndex;
};

useLazyData();
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
