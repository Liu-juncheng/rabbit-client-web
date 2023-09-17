<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="TopCategory.id">{{
            TopCategory.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in TopCategory.children" :key="item.id">
            <a href="javascript:;">
              <img v-lazy="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 顶级分类下关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">{{ sub.desc }}</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <!-- 父传子的props参数:这个goods只是我们临时定义的变量而已,可以随意起,不需要去data定义,只要子组件能正常接收到即可 -->
          <GoodsItem v-for="sub in sub.goods" :key="sub.id" :goods="sub" />
        </div>
      </div>
    </div>
  </div>
</template>
<!--在vue cile脚手架中,目前没有找到好的方式去处理name名称的问题,目前打算使用两个script来处理 -->
<script>
export default {
  name: "TopCategory",
};
</script>

<script setup>
import XtxBread from "@/components/library/xtx-bread.vue";
import { getCurrentInstance, onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
//全局注册的组件是不需要导入的,而当前目录下的子组件是需要导入的
//记住在vue3中子组件只需要导入即可,是不需要通过components去注册的.直接在模板使用即可
import GoodsItem from "./components/goos-item.vue";
// components: {
//    GoodsItem
//   }

//获取轮播图数据
const sliders = ref([]);
const { $http, $api } = getCurrentInstance().proxy;
$http.get($api.getBannerList).then((data) => {
  sliders.value = data;
});
//获取分类数据
const store = useStore(); //vuex中获取所有的分类
const route = useRoute(); //从点击进来的url获取当前的分类id

//通过计算属性去动态匹配带你给钱的url中分类id是不是在vuex中存在的,如果存在则返回相关的子级分类数据
const TopCategory = computed(() => {
  //计算属性必须依赖某个值才能触发,否则是打印不了的！！！
  let cate = {};
  // const categoryList = store.state.category.list;  //从vuex的category模块下获取所有的分类
  const categoryList = store.getters.categoryList; //通过getters建立的全局快捷访问进行映射
  const routeCategoryId = route.params.id;
  let flag = categoryList.find((item) => item.id === routeCategoryId);
  if (flag) cate = flag;
  return cate; //最终匹配查找成功到的cate分类  这个computed计算属性的返回值是cate
});

//通过url中的顶级分类id,去获取该顶级分类下的关联的推荐商品
const subList = ref([]);
const getSubCategory = () => {
  // get的Query查询参数,又忘了公司的写法嘛？
  //1,公司的写法,(url接口,null,{params：{limt:xxx}})  中间为null,
  //2,(url接口 + 查询参数)
  //3, findTopCategory(route.params.id) 直接传参
  try {
    $http
      .get($api.getCategory, null, { params: { id: route.params.id } })
      .then((data) => {
        subList.value = data.children;
      });
  } catch (error) {
    throw error;
  }
};

//通过监听url中id的变化的方式,动态去发请求,从而展示不同分类推荐数据,否则分类页面是不改变的
watch(
  //监听对象属性必须用回调函数的形式
  () => route.params.id,
  (val) => {
    //存在顶级id,并且路由地址的是一级分类路由地址,当前只请求一级分类路由地址！
    if (val && `/category/${val}` === route.path) getSubCategory();
  },
  {
    immediate: true, //进入该组件页面,立即监听
  }
);
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  //分类相关商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
