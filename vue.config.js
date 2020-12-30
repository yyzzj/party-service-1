// 项目配置,请不要随意改动

// vscode 引入类型推导
// import { Configuration } from 'webpack'

const path = require('path')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// JS混淆
const UglifyJSPlugin = require('terser-webpack-plugin')
// bundle分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// cdn源
const cdn = [
  // vue
  'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
  // vue-router
  'https://cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js',
  // axios
  'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
  // vuex
  'https://cdn.bootcss.com/vuex/3.1.3/vuex.min.js',
  // video.js
  'https://cdn.bootcdn.net/ajax/libs/video.js/7.8.3/video.min.js',
  'https://cdn.bootcdn.net/ajax/libs/video.js/7.8.3/video-js.min.css'
]
// 忽略打包
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'video.js': 'videojs'
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 设置默认端口
const port = process.env.port || process.env.npm_config_port || 9090 // 本地服务端口
const plugins = []
const baseUrl = process.env.BASE_URL

/**
 * @type {Configuration}
 */
const config = {
  publicPath: process.env.BASE_URL,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  pages: {
    student: {
      entry: 'src/pages/student/main.js',
      template: 'src/pages/student/student.html',
      filename: 'index.html',
      title: '健康书院-学生端',
      chunks: ['chunk-vendors', 'chunk-common', 'runtime', 'student', 'chunk-libs', 'student~teacher']
    },
    teacher: {
      entry: 'src/pages/teacher/main.js',
      template: 'src/pages/teacher/teacher.html',
      filename: 'teacher.html',
      title: '健康书院-教师端',
      chunks: ['chunk-vendors', 'chunk-common', 'runtime', 'teacher', 'chunk-libs', 'student~teacher']
    }
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: new RegExp(baseUrl + 'student'), to: baseUrl + 'index.html' },
        { from: new RegExp(baseUrl + 'teacher'), to: baseUrl + 'teacher.html' }
      ]
    },
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 跨域
    proxy: {
      '/eapi/student': {
        target: 'https://all.bnuz.edu.cn/eapi/student',
        // target: 'http://172.20.13.16:8084/ComprehensiveSys/eapi/student',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/eapi/student': ''
        }
      },
      '/eapi/teacher': {
        target: 'https://all.bnuz.edu.cn/eapi/teacher',
        // target: 'http://172.20.13.16:8084/ComprehensiveSys/eapi/teacher',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/eapi/teacher': ''
        }
      },
      '/eapi/wechat': {
        target: 'https://all.bnuz.edu.cn/eapi/wechat',
        // target: 'http://172.20.13.16:8084/ComprehensiveSys/eapi/wechat',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/eapi/wechat': ''
        }
      },
      '/eapi/health': {
        target: 'https://all.bnuz.edu.cn/eapi/health',
        // target: 'http://172.20.13.16:8084/ComprehensiveSys/eapi/health',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/eapi/health': ''
        }
      }
    },
    // before: require('./mock/mock-server.js')
  },
  chainWebpack(config) {
    // 代码最小化
    config.optimization.minimize(true)
    // 禁止首屏预加载其它路由
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // 设置保留空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    config.when(process.env.NODE_ENV === 'development',
      config => {
        config.devtool('cheap-source-map')
        plugins.push(new BundleAnalyzerPlugin({
          //  可以是`server`，`static`或`disabled`。
          //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
          //  在“静态”模式下，会生成带有报告的单个HTML文件。
          //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
          analyzerMode: 'server',
          //  将在“服务器”模式下使用的主机启动HTTP服务器。
          analyzerHost: '127.0.0.1',
          //  将在“服务器”模式下使用的端口启动HTTP服务器。
          analyzerPort: 8888,
          //  路径捆绑，将在`static`模式下生成的报告文件。
          //  相对于捆绑输出目录。
          reportFilename: 'report.html',
          //  模块大小默认显示在报告中。
          //  应该是`stat`，`parsed`或者`gzip`中的一个。
          //  有关更多信息，请参见“定义”一节。
          defaultSizes: 'gzip',
          //  在默认浏览器中自动打开报告
          openAnalyzer: true,
          //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
          generateStatsFile: false,
          //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
          //  相对于捆绑输出目录。
          statsFilename: 'stats.json',
          //  stats.toJson（）方法的选项。
          //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
          //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
          statsOptions: null,
          logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        }))
        // htmlwebpack-plugin 注入当前环境
        const chunks = ['student', 'teacher']
        chunks.forEach((i) => {
          config.plugin('html-' + i).tap(args => {
            args[0].env = 'development'
            return args
          })
        })
      }
    )
    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          }
        },
        minChunks: 2
      })
      // 非开发环境忽略打包
      config.externals(externals)
      // 非开发环境挂载cdn外部库，htmlwebpack-plugin 注入当前环境
      const chunks = ['student', 'teacher']
      chunks.forEach((i) => {
        config.plugin('html-' + i).tap(args => {
          args[0].cdn = cdn
          args[0].env = process.env.NODE_ENV
          return args
        })
      })
    })
    config.when(process.env.NODE_ENV === 'production', config => {
      plugins.push(
        new UglifyJSPlugin({
          terserOptions: {
            compress: {
              drop_debugger: true, // 关闭调试
              drop_console: true // 关闭console
            },
            warnings: false // 关闭警告
          },
          sourceMap: false,
          parallel: true // 多进程打包
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({ // 用于gzip
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 100, // 只有大小大于该值的资源会被处理
          minRatio: 0.5, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
    })
    config.optimization.runtimeChunk('single')
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题，以便
    // 可以在index.html中访问它来插入正确的标题。
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: plugins
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/_settings.scss";'
      }
    },
    requireModuleExtension: true
  }
}

module.exports = config
