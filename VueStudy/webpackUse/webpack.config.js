const path=require('path')
// const webpack=require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    publicPath:'dist/'
  },
  module:{
    rules:[
      //css打包需要的
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      //less打包需要的
      {
        test:/\.less$/,
        use:[
          {loader:"style-loader"},
          {loader:"css-loader"},
          {loader:"less-loader"}
        ]
      },
      //图片打包需要的loader
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      //es6转换为es5
      {
        test:/\.js$/,
        //exclude:排除
        //include:包含
        exclude:/(node_modules|bower_components)/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['es2015']
          }
        }
      },
      {
        test:/\.vue$/,
        use:{
          loader : 'vue-loader'
        }
      }
    ]
  },
  resolve:{
    //alias别名
    alias:{
      'vue$':'vue/dist/vue.esm.js'
    }
  },
  plugins:[
    new webpack.BannerPlugin({
      banner:'made by hlx'
    }),
    new HtmlWebpackPlugin()
  ]
}