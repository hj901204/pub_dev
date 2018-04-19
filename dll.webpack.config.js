const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var languages = {
    "ch": require("./src/language/ch.json"),
    // "en": require("./src/language/en.json")
};

module.exports = Object.keys(languages).map(function(lang){
    return {
        resolve: {
            extensions: ['.jsx', '.js']
        },
        entry: {
            lux: ["react", "react-dom", "Redux", "react-redux", "react-router", "react-custom-scrollbars", "rc-queue-anim"],
            // dll_antd: ["./src/base/components/AntdComp.js"]
        },
        output: {
            publicPath: '/export/'+lang+'/',
            //某些人品差的windows电脑专用语句
            path: path.join(__dirname,"export",lang),
            // path: './export/'+lang+'/',
            filename: '[name].js',
            library: '[name]'               // 必填项，将此dll包暴露到window上，给app.js调用
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DllPlugin({
                context: __dirname,                // 必填项，用来标志manifest中的路径
                path: './manifest.json',    // 必填项，存放manifest的路径
                name: '[name]'                     // 必填项，manifest的name
            }),
            // new HtmlWebpackPlugin({              // 利用该插件实现vendor被插入到html中
            // filename: '../export/lux.html',
            // inject: 'body',
            // template: './src/template/template.html',
            // })
        ]
    }
});