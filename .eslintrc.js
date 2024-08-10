module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}",
        "postcss.config.cjs",
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },

  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    "quotes": [2, "double"],//双引号
    "indent": [2, 2],//缩进
    "vue/multi-word-component-names": 0, //vue文件命名包含两个单词，关闭
    "semi": ["error", "always"],//要求结尾带分号
    "@typescript-eslint/no-unused-vars": 1,
  }
};
