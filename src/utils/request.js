
// 导入axios插件
import axios from "axios";
import store from "@/store";
// element-plus 组件库中的 Message 组件并没有以默认导出的方式暴露，而是以命名导出的方式导出的。
import { ElMessage as Message } from "element-plus";
import router from "@/router";

// 导出基准地址
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
const instance = axios.create({
  baseURL,
  timeout: 5000,
});

// 配置请求拦截器
instance.interceptors.request.use(
  (config) => {
    const { profile } = store.state.user;
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 配置响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response && response.status === 200) {
      if (
        response.data.code === 0 ||
        response.data.Code === 0 ||
        response.data.code === "000" ||
        response.data.code === "success" ||
        response.data.state ||
        response.data.success ||
        response.data.code === 200
      ) {
        if (response.data.Message) {
          return Promise.reject(response.data.Message);
        }
        return Promise.resolve(
          response.data.data ||
            response.data.Response ||
            response.data.user ||
            response.data.Message
        );
      } else {
        let msg = null;
        if (response.data.success && response.data.msg) {
          msg = response.data.Response.msg;
        } else if (response.data.Response && response.data.Message) {
          msg = response.data.Response.msg;
        } else {
          msg = response.data.msg || response.data.Message;
        }
        Message({ message: msg, type: "error" });
        return Promise.reject(msg);
      }
    }
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status || err.response.Code) {
        case 400:
          err.message = "请求错误";
          break;
        case 401: {
          err.message = "未授权，请登录";
          //token过期处理方式
          //1,清空无效的(token)用户信息
          store.commit("user/setUser", {});
          //2,跳转到登录页
          //这段代码的解释是:如果用户正在购物结算，而token刚好过期,则要求用户重新登录。待用户重新登录后根据redirectUrl=参数跳转到之前的页面,并完整的保留url参数,而encodeURIComponent会转换url编码,防止出错,参数丢失！
          // js模块中：router.currentRoute.value.fullPath 就是当前路由地址参数，router.currentRoute 是ref响应式数据,由于是vue3的项目所以必须用value的方式进行取值
          const fullPath = encodeURIComponent(
            router.currentRoute.value.fullPath
          );
          router.push("/login?redirectUrl=" + fullPath);
          break;
        }
        case 403:
          err.message = "拒绝访问";
          break;
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = "服务器内部错误";
          break;
        case 501:
          err.message = "服务未实现";
          break;
        case 502:
          err.message = "网关错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网关超时";
          break;
        case 505:
          err.message = "HTTP版本不受支持";
          break;
        case 99991:
          err.message = "HTTP版本不受支持";
          break;
        case 9001:
          err.message = "未授权";
          break;
        default:
          err.message = err.response;
      }
    }
    Message({ message: err.message, showClose: true, type: "error" });
    return Promise.reject(err);
  }
);

// 辅助函数
export const API = (option = {}) => {
  return new Promise((resolve, reject) => {
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 请求模块
export const http = {
  post: (url, data = {}, opts = {}) => {
    return API({
      url: url,
      data: data,
      method: "post",
      ...opts,
    });
  },
  get: (url, data = {}, opts = {}) =>
    API({
      url: url,
      data: data,
      method: "get",
      ...opts,
    }),
  all: (promiseArray) => {
    return axios.all(promiseArray);
  },
  delete: (url, data = {}, opts = {}) =>
    API({
      url: url,
      data: data,
      method: "delete",
      ...opts,
    }),
};


// 请求工具函数  vue3 的新式写法
// export default (url, method, submitData) => {
//   // 负责发请求：请求地址，请求方式，提交的数据
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
// };