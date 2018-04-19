
export default (cfg={})=>{
    let a = {},n,
        {type,label=""} = cfg;
    switch (type) {
        //座机号码前缀 3|4 位
        case "telPrefix3|4":
            a = {
                type: "string",
                pattern: /^\d{3,4}$/,
                message: `${label} 正确的座机号`
            };  
            break;
        //座机号码后缀 7|8 位
        case "telPrefix7|8":
            a = {
                type: "string",
                pattern: /^\d{7,8}$/,
                message: `${label} 正确的座机号`
            };  
            break;
        //验证码,要求4位数字
        case "checkCode4":
            a = {
                type: "string",
                pattern: /^\d{4}$/,
                message: `${label} 不是一个正确的验证码`
            };  
            break;
        //身份证
        case "idcard":
            a = {
                type: "string",
                pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
                message: `${label} 不是一个有效的大陆身份证号`,
            };
            break;
        //手机号
        case "phone":
            a = {
                type: "string",
                pattern: /^1[34578]\d{9}$/,
                message: `${label} 不是一个有效的手机号`,
            };
            break;
        //英文（不区分大小写）
        case "english":
            a = {
                type: "string",
                pattern: /^[ A-Za-z]+$/,
                message: `${label} 请输入英文`,
            };
            break;
        //中英文
        case "cnOrEn":
            a = {
                type: "string",
                pattern: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
                message: `${label} 请输入中文或英文`,
            };
            break;
        //数字字母
        case "numOrLetter":
            a = {
                type: "string",
                pattern: /^[0-9a-zA-Z]+$/,
                message: `${label} 请输入数字或字母`,
            };
            break;
        //数字字母汉字
        case "numOrCnEn":
            a = {
                type: "string",
                pattern: /^[\u4e00-\u9fa5_0-9a-zA-Z]+$/,
                message: `${label} 请输入汉字字母或数字`,
            };
            break;
        //图形验证码
        case "imgValid":
            a = {
                type: "string",
                pattern: /^[0-9A-z]{4}$/,
                message: `${label} 请输入图形验证码`,
            };
            break;
        //邮编：
        case "zip":
            a= {
                type: "string",
                pattern: /^[1-9][0-9]{5}$/,
                message: `${label} 正确的邮编`,
            };
            break;
        //统一社会认证代码：
        case "socialCredit":
            a= {
                type: "string",
                pattern: /^[0-9A-Za-z]{18}$/,
                message: `${label} 正确的信用代码认证格式`,
            };
            break;
        //护照：
        case "passport":
            a= {
                type: "string",
                pattern: /^[0-9A-Za-z]{0,20}$/,
                message: `${label} 不是正确的护照号`,
            };
            break;
        //自动下拉
        case "autoselect":
            a = {
                validator(rule, value, callback) {
                    let result = true;
                    if (value && Array.isArray(cfg.list)) {
                        result = cfg.list.map(item => String(item[cfg.keyName])).includes(String(value));
                    }
                    if (!result) callback(null);
                    else callback();
                }
            };
            break;
        //单位用量：
        case "unit":
            a = {
                validator(rule, value, callback) {
                    if (value === "" || value === undefined) {
                        callback(`${label} 必填`);
                    } else {
                        let num;
                        try {
                            num = Number(value);
                        } catch (ex) {
                            callback(`${label} 请输入数字类型！`)
                        };
                        if (isNaN(num)) {
                            callback(`${label} 请输入数字类型！`)
                        } else if (/^0\d+/.test(value + "")) {
                            callback(`${label} 请输入数字类型！`)
                        }else if (!/^\d{0,9}(\.\d{0,2})?$/g.test(value + "")) {
                            callback(`${label} 只能是9位内整数或加2位内小数！`)
                        }
                        else {
                            if(Number(value)==0){
                                callback(`${label} 不能等于0！`)
                            } else if(value<0){
                                callback(`${label} 不能小于0！`)
                            }else{
                                let v = (value+"").match(/\.\d+/);
                                if(v!=null && cfg.decimal != undefined && v[0].length>Number(cfg.decimal)+1){
                                    callback(`${label} 小数位数不超过${cfg.decimal}位!`);
                                }else if(cfg.max && value > Number(cfg.max)){
                                    callback(`${label} 不能大于${cfg.max}!`);
                                }else if(cfg.min && value < Number(cfg.min)){
                                    callback(`${label} 不能小于${cfg.min}!`);
                                }else{callback()};
                            }
                        }
                    }
                }
            };
            break;
        //大于0的自然数，可控制小数位数  greater0
        case "gtZero":        
        //大于等于0的自然数，可控制小数位数
        case "gtEqZero":
            a = {
                validator(rule, value, callback) {
                    if (value === "" || value === undefined) {
                        callback(`${label} 必填`);
                    } else {
                        let num;
                        try {
                            num = Number(value);
                        } catch (ex) {
                            callback(`${label} 请输入数字类型！`)
                        };
                        if (isNaN(num)) {
                            callback(`${label} 请输入数字类型！`)
                        } else if (/^0\d+/.test(value + "")) {
                            callback(`${label} 请输入数字类型！`)
                        } else {
                            if(Number(value)==0){
                                if(cfg.type == "gtZero"){
                                    callback(`${label} 不能等于0！`)
                                }else{
                                    callback()
                                }
                            } else if(value<0){
                                callback(`${label} 不能小于0！`)
                            }else{
                                let v = (value+"").match(/\.\d+/);
                                if(v!=null && cfg.decimal != undefined && v[0].length>Number(cfg.decimal)+1){
                                    callback(`${label} 小数位数不超过${cfg.decimal}位!`);
                                }else if(cfg.max && value > Number(cfg.max)){
                                    callback(`${label} 不能大于${cfg.max}!`);
                                }else if(cfg.min && value < Number(cfg.min)){
                                    callback(`${label} 不能小于${cfg.min}!`);
                                }else{callback()};
                            }
                        }
                    }
                }
            };
            break;
        //密码不能输入空格
        case "pswempty":
            a = {
                type: "string",
                pattern: /^[^\s]*$/,
                message: `${label} 输入内容包含空格，请重新输入`
            };
            break;
        //编码规则前缀
        case 'prefix':
            a = {
                validator(rule, value, callback) {
                    if (value != "" && !/^[\w\-]+$/.test(value)) {
                        callback(`${label} 存在特殊字符！`)
                    } else callback();
                }
            };
            break;
        //天数：
        case "day":
            a = {
                validator(rule, value, callback) {
                    if (value === "" || value === undefined) {
                        callback(`${label} 必填`);
                    } else {
                        let num;
                        try {
                            num = Number(value);
                        } catch (ex) {
                            callback(`${label} 请输入数字类型！`)
                        };
                        if (isNaN(num)) {
                            callback(`${label} 请输入数字类型！`)
                        } else if (/^0\d+/.test(value + "")) {
                            callback(`${label} 请输入数字类型！`)
                        }else if ((value + "").indexOf('.')!=-1 ) {
                            callback(`${label} 只能输入正整数！`)
                        }else{callback()};
                    }
                }
            };
            break;
            //控制小数点前后位数：
            case "gtEqZeroNum":
                a = {
                    validator(rule, value, callback) {
                        if (value === "" || value === undefined) {
                            callback(`${label} 必填`);
                        } else {
                            let num;
                            try {
                                num = Number(value);
                            } catch (ex) {
                                callback(`${label} 请输入数字类型！`)
                            };
                            if (isNaN(num)) {
                                callback(`${label} 请输入数字类型！`)
                            } else if (/^0\d+/.test(value + "")) {
                                callback(`${label} 请输入数字类型！`)
                            }else if (!/^\d{0,9}(\.\d{0,11})?$/g.test(value + "") ) {
                                callback(`${label} 只能输入9位整数和11位小数！`)
                            }else{callback()};
                        }
                    }
                };
                break;
    
        default:
            //验证必须保留小数点后n位,例如: decimal2
            if(/^decimal\d$/.test(type)){
                n = type.match(/\d+/);
                if(n){
                    a = {
                        validator: (rule,val,callback)=>{
                            if(!new RegExp("^\\d+\\.\\d{"+n[0]+"}$").test(val)){
                                callback(`${label} 小数点后保留${n[0]}位`);
                            }else callback();
                        },
                        transform: (value)=>{
                            return (/^\d+$/.test(value))?(value+".00"):value;
                        }
                    }
                }
            }else return cfg;
            break;
    }
    
    return Object.assign(a,cfg,{type: "string"});
}

// let transform = (val)=>+val;

// let int_number = (c)=>{
//     let flag = {"number": "数字","float": "小数", "integer": "整数"},msg;
//     if(!isNaN(c.min) && !isNaN(c.max)){
//         msg = `${c.label} 必需在 ${c.min}~${c.max} 范围内的 ${flag[c.type]}`;
//     }else if(!isNaN(c.min)){
//         msg = `${c.label} 不得小于 ${c.min}`;
//     }else if(!isNaN(c.max)){
//         msg = `${c.label} 不能超过 ${c.max}`;
//     }else {
//         msg = `${c.label} 不是一个有效的${flag[c.type]}`;
//     }
//     return {
//         message: msg,
//         transform,
//         ...c
//     }
// }

// let len = (c)=>{
//     let q = {
//         maxLen: c.type.replace(/^[a-z]+/,''),
//         message: `${c.label} 内容长度不能超过 ${c.maxLen} 位`,
//         validator(rule,value="",callback){
//             let n = +rule.maxLen;
//             if(value.length>n)
//                 // callback(new Error("len xuliang"));
//                 callback(null);
//             else callback();
//         },
//         ...c
//     }
//     q.type = null;
//     return q;
// }

// let _decimal = (c)=>{
//     c.digit = c.type.replace(/^[a-z]+/,'');
//     return {
//         message: `${c.label} 要求保留小数点后 ${c.digit} 位的小数`,
//         validator(rule,value,cb){
//             if(!new RegExp("^\\d{1,}\\.\\d{"+c.digit+"}$").test(value)){
//                 cb(null);
//             }else if(!isNaN(rule.min) && !isNaN(rule.max)){
//                 if((+value)<rule.min||(+value)>rule.max){
//                     // rule.message = `${c.label} 必需在 ${rule.min}~${rule.max} 范围内的小数`;
//                     cb(null);
//                 }else cb();
//             }else if(!isNaN(rule.min)){
//                 if((+vaule)<rule.min){
//                     // rule.message = `${c.label} 不得小于 ${rule.min}`;
//                     cb(null);
//                 }else cb();
//             }else if(!isNaN(rule.max)){
//                 if((+value)>rule.max){
//                     // rule.message = `${c.label} 不能超过 ${rule.max}`;
//                     cb(null);
//                 }else cb();
//             }else cb();
//         },
//         ...c
//     }
// }

// let _regexp = (c)=>{
//     let q = {
//         regexp: c.type,
//         message: `不符合要求的输入`,
//         validator(rule,value,cb){
//             if(!rule.regexp.test(value)){
//                 cb(null);
//             }else cb();
//         },
//         ...c
//     }
//     q.type = null;
//     return q;
// }
// export default (c={})=>{
//     switch (c.type) {
//         case "float":
//         case "number":
//         case "integer":
//             return int_number(c);
//         case "enum":
//         return {
//             message: `${c.label} 内容必需是 ${c.enum.join(',')} 中的一个`,...c
//         }
//         case "callnum":
//             c.type = null;
//             return {
//                 message: `${c.label} 不是一个有效的手机号`,
//                 pattern: /^1[34578]\d{9}$/,...c
//             }
//         case "idcard":
//             c.type = null;
//             return {
//                 message: `${c.label} 不是一个有效的大陆身份证号`,
//                 pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,...c
//             }
//         case "idcode":
//             c.type = null;
//             return {
//                 message: `${c.label} 是错误的验证码格式`,
//                 pattern: /^\d{4}$/,...c
//             }
//         case "email":
//             return {message: `${c.label} 不是一个有效的email`,...c}
//         case "url":
//             return {message: `${c.label} 不是一个有效的url地址`,...c}
//         case "required": 
//             c.type = null;
//             return {
//                 required: true,
//                 message: `${c.label} 为必填项`,...c
//             }
//         default:
//             if(/^\/.+\/$/.test((c.type||"").toString())){
//                 return _regexp(c);
//             }else if(/^len\d+$/.test(c.type)){
//                 return len(c);
//             }else if(/^decimal\d+$/.test(c.type)){
//                 return _decimal(c);
//             }else return {...c};
//     }
// }