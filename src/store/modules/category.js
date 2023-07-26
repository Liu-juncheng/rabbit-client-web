// 分类模块
import { topCategory } from "@/api/constants"; //固定分类数据
import { getCurrentInstance } from "vue";
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合
      list: topCategory,
    };
  },
  mutations: {
    //设置分类,此时是固定的分类,使用固定分类是担心返回空数组[]
    setList(state, payload) {
      state.list = payload;
    },
    //鼠标移入点击使一级分类和二级分类的展示隐藏
    show(state, id) {
      let currentCategory = state.list.find((top) => top.id === id); //如果是当前的一级分类
      currentCategory.open = true; //如果是当前的分类Id 则展示
    },
    hide(state, id) {
      let currentCategory = state.list.find((top) => top.id === id); //如果是当前的一级分类
      currentCategory.open = false; //如果是当前的分类Id 则隐藏
    },
  },
  actions: {
    //此时通过调用接口获取真实分类数据,覆盖原有的固定分类。content整个store的上下文=>{commit}解构
    async getList({ commit }, params) {
      //想用this 调用全局的离不开getCurrentInstance()函数！
      const { $http, $api } = getCurrentInstance().proxy;
      const result = await $http.get($api.findAllCategory);
      //给分类数据增加open参数,来控制一级分类的展示隐藏
      result.forEach((item) => {
        item.open = false;
      });
      commit("setList", result); //通过commit提交设置setList,覆盖原来的固定数据！！！
    },
  },
};
