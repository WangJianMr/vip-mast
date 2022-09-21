const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      [process.env.VUE_APP_DEV]: {
        target: process.env.VUE_APP_SERVE_API,
        changeOrigin: true,
        pathRewrite: {
          ['^'+process.env.VUE_APP_DEV]:''
        },
      },
    },
  },
})
