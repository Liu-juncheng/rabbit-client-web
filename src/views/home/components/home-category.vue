<template>
    <div class='home-category'>
      <ul class="menu" >
        <!-- li是 一级分类的渲染, RoterLink 二级的分类的渲染 -->
        <!-- RouterLink为什么用?因为他比较a标签跳转是可以携带跳转到id,与路由搭配 -->
        <!-- RouterLink可以想象成比a标签更好用的跳转方式!! 他的底层实现就是a标签,通常搭配路由使用!-->
        <li v-for="item in menuList" :key="item.id" >
          <RouterLink to="/">{{item.name  }}</RouterLink>
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id" >{{sub.name}}</RouterLink>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
import { reactive, computed } from 'vue'   
import { useStore } from 'vuex';
  //目前明确知道我们只有九个分类,存储在vuex,我们需要自己手动添加一个分类,并保持统一的数据结构
   //从vuex获取9个分类,,存储在category模块下
  const store = useStore()
  //添加新对象。对象的响应式使用reactive  简单数据类型使用ref()
  const brand = reactive({
      id: "brand",
      name: '品牌',
      children: [{
          id: 'brand-children',
          name: '品牌推荐',
      }]
  })

  //通过计算属性结合响应式数据原理给9个分类添加一条数据,并且只需要children下的前两条数据,其他不需要
  //重构这个数组,筛选我们需要的数据,map我们想添加数据
  const menuList = computed(() => {

  const list = store.state.category.list.map(item => {
    return {
        id: item.id,
        name: item.name,
        children:  item.children?.slice(0, 2) ?? [],  //截取前两条的数据 (从哪里开始截取,截取几位)
        goods:item.goods
      }
    })
    //新数组里添加响应式对象
        list.push(brand)
        return list
  })

  </script>
  
  <style scoped lang='less'>
  .home-category {
    width: 250px;
    height: 500px;
    background: rgba(0,0,0,0.8);
    position: relative;
    z-index: 99;
    .menu {
      li {
        padding-left: 40px;
        height: 50px;
        line-height: 50px;
        &:hover {
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
  }
  </style>