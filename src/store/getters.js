const getters = {
  //   categoryList: state => state.Layout.visitedViews,
  categoryList: (state) => state.category.list, //首选state数据,具体的模块下 =>具体的值！
};
export default getters;
