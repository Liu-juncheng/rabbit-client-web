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
  },
  actions: {
    //此时通过调用接口获取真实分类数据,覆盖原有的固定分类。content整个store的上下文=>{commit}解构
    async getList({ commit }, params) {
      //想用this 调用全局的离不开getCurrentInstance()函数！
      const { $http, $api } = getCurrentInstance().proxy;
      const  result  = await $http.get($api.findAllCategory);
      commit("setList", result); //通过commit提交设置setList,覆盖原来的固定数据！！！
    },
  },
};
