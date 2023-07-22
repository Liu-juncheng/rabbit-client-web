const { defineConfig } = require("@vue/cli-service"); //读取配置服务插件
const path = require("path"); // node.js的导入,path是node.js内置模块导入,读取插件配置路径的,动态拼接路径

//整个vue的配置文件对象！注意修改配置后,必须重启服务！
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭Eslint语法检查

  //less预处理的全局变量,混入,自动全局注入
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      //patterns需要读取的文件路径，必须使用绝对路径,
      patterns: [
        //path.join() 方法是用于修正路径,例如: ../../路径他是无法识别,而是用.join()则可以修复跳过读取下一级路径！
        //__dirname 表示我们项目的根路径！
        path.join(__dirname, "./src/assets/styles/variables.less"), //从这个文件路径读取 全局样书变量
        path.join(__dirname, "./src/assets/styles/mixins.less"), //从这个文件读取全局混入
      ],
    },
  },

  //配置解析 Element Plus 的 CSS 文件
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
  },
});
