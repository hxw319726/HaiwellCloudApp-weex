const pathTo = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');

const entry = {};
const weexEntry = {};
const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
var isWin = /^win/.test(process.platform);

//生成对呀的js文件/temp
function getEntryFileContent(entryPath, vueFilePath) {
  let relativePath = pathTo.relative(pathTo.join(entryPath, '../'), vueFilePath);
  let contents = '';
  if (hasPluginInstalled) {
    const plugindir = pathTo.resolve('./web/plugin.js');
    contents = 'require(\'' + plugindir + '\') \n';
  }
  if (isWin) {
    relativePath = relativePath.replace(/\\/g,'/');
  }
  contents += 'var App = require(\'' + relativePath + '\')\n';
  contents += 'var mixins = require('+'\'../src/js/mixins.js\''+')\n';
  contents += 'Vue.mixin(mixins)\n';
  contents += 'App.el = \'#root\'\n';
  contents += 'new Vue(App)\n';
  return contents;
}

//.vue或.we文件
var fileType = '';
//遍历文件入口,动态生成入口
function walk(dir) {
  dir = dir || '.';
  const directory = pathTo.join(__dirname, 'src/views', dir);//遍历目录
  fs.readdirSync(directory)
    .forEach((file) => {
      const fullpath = pathTo.join(directory, file);
      const stat = fs.statSync(fullpath);
      const extname = pathTo.extname(fullpath);
      if (stat.isFile() && extname === '.vue' || extname === '.we') {
        if (!fileType) {
          fileType = extname;
        }
        if (fileType && extname !== fileType) {
          console.log('Error: This is not a good practice when you use ".we" and ".vue" togither!');
        }
        const name = pathTo.join(dir, pathTo.basename(file, extname));
        if (extname === '.vue') {
          const entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + '.js');
          fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath));
          
          entry[name] = pathTo.join(__dirname, entryFile) + '?entry=true';
        } 
        weexEntry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
        const subdir = pathTo.join(dir, file);
        walk(subdir);
      }
    });
}

walk();
// web need vue-loader
//  文件拷贝插件
var CopyWebpackPlugin = require('copy-webpack-plugin')
const plugins = [
  // new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.BannerPlugin({
    banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
    raw: true,
    exclude: 'Vue'
  }),
  new CopyWebpackPlugin([
    {from: './src/image', to: "./image"},
    {from: './src/font', to: "./font"}
  ])
];

const webConfig = {
  context: pathTo.join(__dirname, ''),
  entry: entry,
  output: {
    path: pathTo.join(__dirname, 'dist/web'),
    filename: '[name].js',
  },
  module: {
    // webpack 2.0 
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style!css!sass'
        }]
      }
    ]
  },
  plugins: plugins
};
const weexConfig = {
  entry: weexEntry,
  output: {
    path: pathTo.join(__dirname, 'dist/weex'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader'
        }]
      },
      {
        test: /\.we(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'sass-loader'
        }]
      }
    ]
  },
  plugins: plugins,
};

var exports = [webConfig, weexConfig];

if (fileType === '.we') {
  exports = weexConfig;
}
module.exports = exports;
