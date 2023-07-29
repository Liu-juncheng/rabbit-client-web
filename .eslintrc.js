module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential"], // '@vue/standard'
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "spaced-comment": "off",
    "no-multiple-empty-lines": "off",
  },
  //禁用了语法检查
  overrides: [
    {
      files: ["*.js", "*.vue"],
      rules: {
        "spaced-comment": "off",
        "no-multiple-empty-lines": "off",
        "vue/multi-word-component-names": "off",
      },
    },
  ],
  // 若是项目中使用了eslint，可以在.eslintrc.js配置文件中，配置globals选项
  // 基于npm i unplugin-vue-define-options -D 插件的配置, 用于自动注册组件
  globals: { defineOptions: "writable" },
};
