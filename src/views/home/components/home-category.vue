<template>
  <!-- 鼠标移出将id赋值为空,清除样式！ -->
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <!-- li是 一级分类的渲染, RoterLink 二级的分类的渲染 -->
      <!-- RouterLink为什么用?因为他比较a标签跳转是可以携带跳转到id,与路由搭配 -->
      <!-- RouterLink可以想象成比a标签更好用的跳转方式!! 他的底层实现就是a标签,通常搭配路由使用!-->
      <li
        :class="{ active: categoryId === item.id }"
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
      >
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <!-- 二级标签导航, RotrLink就是路由版的跳转需要携带id,自动拼接到路由上！-->
        <template v-if="item.children.length">
          <RouterLink
            :to="`/category/sub/${sub.id}`"
            v-for="sub in item.children"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          > 
        </template>
        <!-- 导入骨架屏组件! -->
        <template v-else>
          <XtxSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>
    <!-- 左侧的弹出层商品 -->
    <div class="layer">
      <h4>
        {{ currCategory && currCategory.id === "brand" ? "品牌" : "分类" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul
        v-if="currCategory && currCategory.goods && currCategory.goods.length"
      >
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 接口调用的品牌分类结构 -->
      <ul
        v-if="currCategory && currCategory.brands && currCategory.brands.length"
      >
        <li class="brand" v-for="brand in currCategory.brands" 
        :key="brand.id">
          <RouterLink to="/">
            <img :src="brand.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ brand.place }}
              </p>
              <p class="name ellipsis">{{ brand.name }}</p>
              <p class="desc ellipsis-2">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
//目前明确知道我们只有九个分类,存储在vuex,我们需要自己手动添加一个分类,并保持统一的数据结构
//从vuex获取9个分类,,存储在category模块下
const store = useStore();
//添加新对象。对象的响应式使用reactive  简单数据类型使用ref()
const brand = reactive({
  id: "brand",
  name: "品牌",
  children: [
    {
      id: "brand-children",
      name: "品牌推荐",
    },
  ],
  brands: [], //动态添加响应式的品牌分类
});

//通过计算属性结合响应式数据原理给9个分类添加一条数据,并且只需要children下的前两条数据,其他不需要
//重构这个数组,筛选我们需要的数据,map我们想添加数据
const menuList = computed(() => {
  const list = store.state.category.list.map((item) => {
    return {
      id: item.id,
      name: item.name,
      children: item.children?.slice(0, 2) ?? [], //截取前两条的数据 (从哪里开始截取,截取几位)
      goods: item.goods,
    };
  });
  //新数组里添加响应式对象
  list.push(brand);
  return list;
});

//获取弹出层的数据, 根据当前的分类的Id获取对应的goods数据
const categoryId = ref(null); //分类Id @mouseenter="categoryId=item.id" 通过鼠标移入动态获取id

//获取当前的分类数据
const currCategory = computed(() => {
  return menuList.value.find((item) => item.id === categoryId.value); //响应式数据必须通过value取值
});

//获取左侧导航的品牌分类
const { $http, $api } = getCurrentInstance().proxy;
$http.get($api.getBrandList, null, { params: { limit: 6 } }).then((data) => {
  brand.brands = data;
});
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 左侧的弹出层分类商品
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      //品牌的样式
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}

//过度样式
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
