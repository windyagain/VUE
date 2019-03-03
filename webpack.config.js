//由于webpack是基于Node进行构建的，所有 webpack的配置文件中，任何合法的Node代码都是ok的，
var path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin')

//当以命令行形式运行webpack 或webpack-dev-server 的时候，工具会发现，我们并没有提供要打包的文件的入口和出口文件，
// 此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了到处的这个配置对象，然后根据这个对象，进行打包构建
module.exports = {
      entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),//输出路径
        filename: 'bundle.js'  
    } ,
   
    plugins: [//所有webpack  插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),//指定模板文件路径
            filename: 'index.html'
        })
    ],
    module: {//配置所有第三方模块的
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(jpg|png|gif|jpeg)$/, use: 'url-loader?limit=275056&name=[hash:8]-name=[name].[ext]'},//处理图片路径的loader
            //limit给定的值是图片的大小，单位是byte,如果我们引用的图片，大于或等于给定的limit值，
            //则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},//处理字体文件loader
            {test:/\.js$/, use: 'babel-loader',exclude: /node_modules/}, //配置Babel来转换高级ES语法
            { test: /\.vue$/, use: 'vue-loader'}//加载vue组件
        ]
    },
    resolve: {
        alias: {//修改Vue被导入时候的包路径
          // 'vue$': 'vue/dist/vue.js'
        }
    }
}