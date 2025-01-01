const path = require('path');
const CracoLessPlugin = require('craco-less');
const { whenDev, whenProd, when } = require('@craco/craco');

module.exports = {
  babel: {
    plugins: [
      // 在 bebel 配置中新增 babel-plugin-import，搞定 AntDesign 按需加载
      [
        'import',
        {
          libraryName: 'antd',
          // style: "css",
          libraryDirectory: 'es',
        },
        'antd',
      ],
    ],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // console.log('webpack-config--', paths);
      // console.log('============', webpackConfig);

      // // 修改 output
      // webpackConfig.output = {
      //   ...webpackConfig.output,
      //   ...{
      //     filename: whenProd(() => 'static/js/bundle.js', 'static/js/[name].js'),
      //     chunkFilename: 'static/js/[name].js',
      //   },
      // };

      return webpackConfig;
    },
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  // craco 提供的插件
  plugins: [
    // 配置 less
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // 自定义主题（如果有需要，单独文件定义更好一些）
              // "@primary-color": "#1DA57A",
            },
            javascriptEnabled: true,
            module: true,
          },
        },
      },
    },
  ],
};

// const resolve = (pathname) => {
//   // __dirname :    /Users/kingwei/Desktop/react-diagram-demo-master 2/config
//   console.log("craco-config-dev.js  resolve __dirname ===>", __dirname);
//   return path.resolve(__dirname, pathname);
// };

// module.exports = {
//   webpack: {
//     configure: {
//       entry: resolve("../src/index.tsx"),
//     },
//     alias: {
//       // 别名
//       // "@":path.resolve(__dirname,"src"),
//       "@": resolve("../src"),
//     },
//   },
// };
