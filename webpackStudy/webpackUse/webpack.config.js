const path=require('path')

module.exports={
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    publicPath:'dist/'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,
        use:[
          {loader:"style-loader"},
          {loader:"css-loader"},
          {loader:"less-loader"}
        ]
      },
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
      }
    ]
  }
}