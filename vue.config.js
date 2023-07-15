const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});

//关闭Eslint语法检查
module.exports = {
  lintOnSave: false,
};

//配置解析 Element Plus 的 CSS 文件
module.exports = {
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
};
