    
export/                         //打包后代码目录
src/                            //源代码目录
    --base                      //基础模块
        --components            //基础组件目录            
        --consts                //枚举目录
        --images                //全局图片目录
        --services              //基础服务代码
        --styles                //基础CSS目录
    --login                     //登录模块
        --actions               //登录模块actions
        --components            //登录模块components        文件*Comp.jsx结尾
        --consts                //登录模块枚举目录
        --containers            //登录模块containers        文件*Cont.jsx结尾
        --images                //登录模块图片目录
        --reducers              //登录模块reducers
        --styles                //登录模块CSS目录
        LoginEntry.jsx          //登陆模块入口文件
        LoginEntryConfig.json   //入口配置文件
    --manage                    //企业管理后台
        --actions               //企业管理后台actions             文件*Act.js结尾
        --components            //企业管理后台components          
        --consts                //企业管理后台枚举目录
        --containers            //企业管理后台containers          
        --data                  //企业管理后台store数据
        --dialogConts           //企业管理后台弹出框containers      文件*Cont.jsx结尾         
        --images                //企业管理后台图片目录
        --reducers              //企业管理后台reducers            文件*Redu.js结尾
        --styles                //企业管理后台CSS目录
        ManageEntry.jsx         //企业管理后台入口文件
        ManageEntryConfig.json  //入口配置文件
    --main                      //C2M平台模块
        --actions               //C2M平台actions
        --components            //C2M平台components       
        --consts                //C2M平台枚举目录
        --containers            //C2M平台containers       
        --data                  //C2M平台store数据
        --dialogConts      //C2M平台弹出框containers     
        --images                //C2M平台图片目录
        --reducers              //C2M平台reducers
        --styles                //C2M平台CSS目录
        MainEntry.jsx           //C2M平台入口文件
        MainEntryConfig.json    //入口配置文件
template                //平台template
.gitignore              //git忽略文件
mynode.js               //本地node服务
package.json            //所需组件配置文件
webpack.config          //打包配置文件