// 1,回顾人资项目, 以往的项目请求都封装成函数导出,类似于以下这种vue2人资项目,其中的对axios的封装,只是配置了基本的create({})配置,以及对请求,响应的封装
//我们都知道axioas({})无论如何封装它都需要接收3个参数,1,url请求地址2,请求方式,3,参数类型(body参数,还是query查询)
//人资的项目,使用最原始的参数传递,未对调用传参进行封装,每次请求都需要传递url,请求方式(默认gte),参数类型字段！
export function getUserDetailByIdAPI(id) {
  return request({
    url: `/sys/user/${id}`,
  });
}

/**
 *
 * @param {*} data id参数
 * @returns Promise
 */

//更新用户信息
export const saveDetailByIdAPI = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: "put",
    data,
  });
};

//2,小兔鲜项目,首先他对create({})进行了配置,对请求/响应进行了封装,并对调用的参数传递进行了建议简易封装。
//同样调用时只需要传递3个参数即可,参数字段以被封装,不需要传递。以下是它的封装函数实例：
// 请求工具函数  vue3 的新式写法
// export default (url, method, submitData) => {
// //调用该请求函数所需要的参数：请求地址，请求方式，提交的数据
//   return instance({
//     url,
//     method,
//     // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
//     // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
//     // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
//     // method参数：get,Get,GET  转换成小写再来判断
//     // 在对象，['params']:submitData ===== params:submitData 这样理解
//     [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
//   });
// }

//3,在公司的项目,封装模式是我喜欢的,我目前按照公司的封装来进行写该函数
export default {
  //首页模块
  findAllCategory: "/home/category/head", //首页-获取顶级分类
  getBrandList: "/home/brand", //首页-左侧导航-品牌分类
  getBannerList: "/home/banner", //首页-轮播图图片
};
