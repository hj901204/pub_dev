let transform = (val) => +val;

let int_number = (c) => {
    let flag = { "number": "数字", "float": "小数", "integer": "整数" }, msg;
    if (!isNaN(c.min) && !isNaN(c.max)) {
        msg = `${c.label} 必需在 ${c.min}~${c.max} 范围内的 ${flag[c.type]}`;
    } else if (!isNaN(c.min)) {
        msg = `${c.label} 不得小于 ${c.min}`;
    } else if (!isNaN(c.max)) {
        msg = `${c.label} 不能超过 ${c.max}`;
    } else {
        msg = `${c.label} 不是一个有效的${flag[c.type]}`;
    }
    return {
        message: msg,
        transform,
        ...c
    }
}

let len = (c) => {
    let q = {
        maxLen: c.type.replace(/^[a-z]+/, ''),
        message: `${c.label} 内容长度不能超过 ${c.maxLen} 位`,
        validator(rule, value = "", callback) {
            let n = +rule.maxLen;
            if (value.length > n)
                // callback(new Error("len xuliang"));
                callback(null);
            else callback();
        },
        ...c
    }
    q.type = null;
    return q;
}

let _decimal = (c) => {
    c.digit = c.type.replace(/^[a-z]+/, '');
    return {
        message: `${c.label} 要求保留小数点后 ${c.digit} 位的小数`,
        validator(rule, value, cb) {
            if (!new RegExp("^\\d{1,}\\.\\d{" + c.digit + "}$").test(value)) {
                cb(null);
            } else if (!isNaN(rule.min) && !isNaN(rule.max)) {
                if ((+value) < rule.min || (+value) > rule.max) {
                    // rule.message = `${c.label} 必需在 ${rule.min}~${rule.max} 范围内的小数`;
                    cb(null);
                } else cb();
            } else if (!isNaN(rule.min)) {
                if ((+vaule) < rule.min) {
                    // rule.message = `${c.label} 不得小于 ${rule.min}`;
                    cb(null);
                } else cb();
            } else if (!isNaN(rule.max)) {
                if ((+value) > rule.max) {
                    // rule.message = `${c.label} 不能超过 ${rule.max}`;
                    cb(null);
                } else cb();
            } else cb();
        },
        ...c
    }
}

let _regexp = (c) => {
    let q = {
        regexp: c.type,
        message: `不符合要求的输入`,
        validator(rule, value, cb) {
            if (!rule.regexp.test(value)) {
                cb(null);
            } else cb();
        },
        ...c
    }
    q.type = null;
    return q;
}
let _autoselect = (c) => {
    let q = {
        validator(rule, value, callback) {
            // console.log(c.list,value);
            let result = true;
            if (value) {
                result = c.list.map(item => String(item[c.keyName])).includes(String(value));
            }
            // console.log(result);
            if (!result) callback(null);
            else callback();
        },
        ...c
    }
    q.type = null;
    return q;
}
// rules: [
//     {
//         type: "autoselect",
//         message: "请从下拉列表中选择一项！",
//         list: supplierList,
//         keyName: "supplierCode",
//     }
// ]
export default (c = {}) => {
    switch (c.type) {
        case "float":
        case "number":
        case "integer":
            return int_number(c);
        case "enum":
            return {
                message: `${c.label} 内容必需是 ${c.enum.join(',')} 中的一个`, ...c
            }
        case "callnum":
            c.type = null;
            return {
                message: `${c.label} 不是一个有效的手机号`,
                pattern: /^1[34578]\d{9}$/, ...c
            }
        case "idcard":
            c.type = null;
            return {
                message: `${c.label} 不是一个有效的大陆身份证号`,
                pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, ...c
            }
        case "imgcode":
            c.type = null;
            return {
                message: `${c.label} 是错误的验证码格式`,
                pattern: /^[a-z0-9]{4}$/i, ...c //i代表忽略大小写
            }
        case "idcode":
            c.type = null;
            return {
                message: `${c.label} 是错误的验证码格式`,
                pattern: /^\d{4}$/, ...c
            }
        case "email":
            return { message: `${c.label} 不是一个有效的email`, ...c }
        case "url":
            return { message: `${c.label} 不是一个有效的url地址`, ...c }
        case "required":
            c.type = null;
            return {
                required: true,
                message: `${c.label} 为必填项`, ...c
            }
        case "autoselect":
            return _autoselect(c);
        default:
            if (/^\/.+\/$/.test((c.type || "").toString())) {
                return _regexp(c);
            } else if (/^len\d+$/.test(c.type)) { //密码长度不能超过多少位
                return len(c);
            } else if (/^decimal\d+$/.test(c.type)) { //小数点后保留几位
                return _decimal(c);
            } else return { ...c };
    }
}
// Example:

// rules: [
//     // {type: "len5"}, //只能输入长度为<5的内容 也可以写"len5"
//     // {type: "decimal2",min: 1,max: 10}, //必需输入小数,并且小数点后2位,范围1-10
//     // {type: "integer",min: 10,max: 20}, //只能输入整数
//     // {type: "number",max: 9999}
//     // {type: "required",message: "姓名不允许为空"},
//     // {type: "len50",message: "姓名最多允许50个字符"}
//     { type: /^\w{4,100}$/, message: "要求长度在4～100之间" }
//     //  "required" //非空验证 {required: true}
// ] 
