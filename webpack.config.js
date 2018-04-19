var baseConfig = require("./base.webpack").cfg,
    server_prefix = baseConfig.prefix,
    UglifyJsPluginObj = function(){};
var path = require("path");
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = getConfig("src/*/*Entry.js");
var htmlPlugin = config.htmlPlugin;
var chunks = config.chunks;
var entries = Object.assign({
    // vendor:["react","react-dom",
    // "Redux","react-redux","react-router",
    // "react-custom-scrollbars","rc-queue-anim","antd"],
},config.entries);


var I18nPlugin = require("i18n-webpack-plugin");

var languages = {
    "ch": require("./src/language/ch.json")
    // "en": require("./src/language/en.json")
};

if(baseConfig.isUglifyJs === true){
    UglifyJsPluginObj = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    });
}

module.exports = Object.keys(languages).map(function(language) {
    fs.writeFile(path.join(__dirname,"export/"+language+"/lib","config.js"),
        ["//ajax fetch's url prefix",
        "window.LUX_URL = '';//'http://10.99.2.70:9097';",
        "//local route's url prefix(webRoot dir),for example: /ch",
        "window.LUX_ROUTE = '';",
        "window.LUX_EC_WEB = LUX_URL;"].join('\r\n'),
        {encoding: 'UTF-8'},
        (err)=>{}
    );
    console.log("<-----write complete---->");
    return  {
        //   devtool: "source-map", //css  js  source-map

        // devtool: 'eval',
        resolve: {
            extensions: ['.jsx','.js']
        },
        entry: entries,
        output: {
            publicPath: server_prefix,
            path: path.join(__dirname,"export",language),
            filename: 'scripts/[name].js?[chunkhash]', //scripts/[id].chunk.js?[chunkhash]
        },
        // externals: {
        //     'antd': 'antd'
        // },
        /*   watch:true,*/
        plugins: [
            ...htmlPlugin,
            new webpack.DllReferencePlugin({       // 敲黑板，这里是重点
                context: __dirname,                  // 同那个dll配置的路径保持一致
                manifest: require('./manifest.json') // manifest的缓存信息
            }),
            new ExtractTextPlugin({
                filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
                disable: false,
                allChunks: true
            }),
            new CommonsChunkPlugin({
                name: ["commons"],
                chunks: chunks,
                minChunks:chunks.length
            }),
            new I18nPlugin(languages[language]),
            UglifyJsPluginObj
        ],
        module: {
            loaders: [
                {
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                    //     ignore:[
                    //         "react.js",
                    //         "react-dom.js",
                    //         "react-redux.js",
                    //         "redux.js",
                    //         "ReactRouter.js",
                    //         "react-custom-scrollbars.js",
                    //         "rc-queue-anim.js"
                    //     ],
                        presets: [
                            "es2015",
                            "stage-0",
                            "react"
                        ],
                        plugins:[
                            "transform-runtime",
                            "transform-es2015-shorthand-properties",
                            "transform-es3-property-literals",
                            "transform-es3-member-expression-literals",
                            [
                                "transform-es2015-computed-properties",
                                {
                                    "loose": true
                                }
                            ],
                            ["import", {
                                "libraryName": "antd",
                                "libraryDirectory": "lib",   // default: lib
                                // "style": true
                            },{ "libraryName": "antd", "style": "css" }
                            ]
                        ]
                    }
                },
                {
                    test: /\.(scss|css)$/,          //   /\.(scss|css)$/, /\.(scss|css)$/
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',  //  fallbackLoader: 'style-loader',
                        use:[
                            {
                                loader: "css-loader",
                                // options: {
                                //     sourceMap: true
                                // }
                            },
                            {
                                loader: "sass-loader",
                                // options: {
                                //     sourceMap: true
                                // }
                            }
                        ]
                    })
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?name=img/[hash:8].[name].[ext]&limit=8192&outputPath=/'
                },  //relative
                {test: /\.(eot|svg|ttf|woff)$/,loader: 'url-loader?name=..'+server_prefix+'fonts/[hash:8].[name].[ext]&outputPath=font/'}
            ]
        }
    }
});




function getConfig(filePath) {
    var files = glob.sync(filePath),entries = {},entry,extname,basename,dirname,configPath,htmlConfig,htmlPlugin=[],chunks;

    for (var i = 0; i < files.length; i++) {
        htmlConfig = {};
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        configPath = './'+dirname+'/'+basename+'Config.json';
        entries[basename] = ['./' + entry];
        try {
            htmlConfig = require(configPath);
        }catch (e){

        }
        var defaultsHtmlConfig = {
            title: basename,
            filename: basename+'.html',
            jslibs: '/libs',
            inject: 'body',
            lux_prefix: server_prefix,
            template: './src/template/template.html',
            chunks: ["commons",basename]
            // chunks: [basename],
        };
        var htmlArgs = Object.assign({}, defaultsHtmlConfig, htmlConfig);
        htmlPlugin.push(new HtmlWebpackPlugin(htmlArgs));
    }
    chunks = Object.keys(entries);
    // chunks.push("vendor");
    return {
        entries,
        chunks,
        htmlPlugin
    }
}


