<template>
    <ul class="app-header-nav">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <li v-for="item in list " :key="item.id"> 
        <RouterLink to="/">{{item.name}}</RouterLink>
        <div class="layer">
          <ul>
            <li v-for="sub in item.children " :key="sub.id">
              <RouterLink to="/">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </template>
  
  <script setup>
import { onMounted ,computed,getCurrentInstance} from 'vue';
import { useStore } from 'vuex'
const store = useStore()  
// const { $http }  = getCurrentInstance().proxy
  //categoryList 再js模板中必须使用.value获取到这个数组对象,而再模板中使用传统的方式渲染这个数组对象！
   const  list = computed(() => {
      return store.state.category.list
     })
    console.log("list",list)
 
  </script>
  
  <style scoped lang='less'>
  .app-header-nav {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative; 
    z-index: 998;  
    > li {
      margin-right: 40px;
      width: 38px;
      text-align: center; 
      > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {  
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        > .layer {
          height: 132px;
          opacity: 1;
        }
      }
    }
  }
  .layer {
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all .2s .1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
  </style>