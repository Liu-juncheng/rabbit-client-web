module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential'],// '@vue/standard'
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'spaced-comment': 'off',
    'no-multiple-empty-lines': 'off'
  },
  //禁用了语法检查
  overrides: [
    {
      files: ['*.js', '*.vue'],
      rules: {
        'spaced-comment': 'off',
        'no-multiple-empty-lines': 'off',
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
