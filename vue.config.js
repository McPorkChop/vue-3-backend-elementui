// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
module.exports = {
  //基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  //输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  //eslint-loader 是否在保存时检查
  lintOnSave: true,
  /*
   * web-pack配置
   */
  chainWebpack: config => {
    const rules = {
      svg: config.module.rule("svg")
    };
    rules.svg.uses.clear();
    rules.svg
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/assets/svg"]
      });
  },
  configureWebpack: config => {
    config.resolve = {
      //配置别名解析
      extensions: [".js", ".json", ".vue", ".ts"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        public: path.resolve(__dirname, "./public"),
        components: path.resolve(__dirname, "./src/components"),
        common: path.resolve(__dirname, "./src/common"),
        "@api": path.resolve(__dirname, "./src/api"),
        views: path.resolve(__dirname, "./src/views"),
        data: path.resolve(__dirname, "./src/data"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@utils": path.resolve(__dirname, "./src/utils")
      }
    };
  },
  //生产环境是否生成sourceMap文件
  productionSourceMap: false,
  //css相关配置
  css: {
    //是否使用css分离插件 ExtractTextPlugin
    extract: true,
    //开启 css source maps？
    sourceMap: false,
    //css预设配置项
    loaderOptions: {
      scss: {
        prependData: `
                @import "./src/styles/main.scss";
                `
      }
    },
    //启用css modules for all css/ pre-processor files.
    requireModuleExtension: true
  },
  //use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,

  // PWA 插件相关配置
  pwa: {},
  //webpack-dev-server 相关配置
  devServer: {
    open: false, //编译完成是否打开网页
    host: "0.0.0.0", //指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, //访问端口
    https: false, //编译失败时刷新页面
    hot: true, //启用热编译
    hotOnly: false,
    proxy: {
      //设置跨域代理
      [process.env.VUE_APP_API]: {
        //指向target的虚拟路径
        target: "http://www.web-jshtml.cn/vue_admin_api/token", //api服务器地址 http://www.web-jshtml.cn/api
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_API}`]: ""
        }
      }
    }, //设置代理
    overlay: {
      //全屏模式下是否显示脚本配置
      warnings: true,
      errors: true
    }
    // before: app => { }
  },
  //第三方插件配置
  pluginOptions: {}
};
