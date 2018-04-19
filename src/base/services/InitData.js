import { ReqApi } from './ReqApi'
import { BasicUrls } from '../consts/Urls';
import { Enum } from '../consts/Enum';

String.prototype.format = function (array) {
    return this.replace(/\{(\d)\}/g, function (s, index) {
        return array[index];
    });
}
// Example
// "a{0}b{1}c{0}d{2}".format([9,8,7])  // a9b8c9d7


let subCode = {
    nationality: "C001",    //民族
    sex: 'C002',	//性别 
    language: 'C003',	//语言 
    marry: 'C004',	//婚姻状况 
    credentials: 'C005',	//证件类型 
    position: 'C006',	//任职类型
    blood: 'C007',	//血型 
    work: 'C008',	//在职状态 
    academic: 'C009',	//学历 
    stock: 'C010',	//库存状态 
    business: 'C011',	//业务类型 
    pay: 'C012',	//支付条款 
    paycondition: 'C013',	//收付款条件 
    payway: 'C014',	//收付款方式 
    industry: 'C015',	//行业 
    scale: 'C016',	//公司规模 
    class: 'C017',	//公司类别 
    nature: 'C018',	//公司性质 
    engage: 'C019',	//经营类型
    invoiceType: 'C021',	//经营类型
};

export default () => {
    return ReqApi.post(BasicUrls.GET_SUBJECT_ALL(Object.values(subCode))).then((json) => {
        let data = {};
        json.data.list.forEach(item => {
            let index = Object.values(subCode).indexOf(item.subCode);
            let key = Object.keys(subCode)[index];
            data[key] = item.catList;
        });
        window.ENUM = {
            ...data,
            ...Enum,
        };
    }).then(() => {
        window.ENUM.getEnum = (key, val) => {
            let ks = window.ENUM[key];
            if(!val){
                return ks;
            }
            for (var i = 0; i < ks.length; i++) {
                if (ks[i].catCode == val) {
                    return ks[i].catName;
                }
            }
            console.error(`错误: 没有找到对应的枚举,key:${key},val:${val}`);
        };
    })
};

// Example

// 直接获取单条属性
// window.ENUM.loadingMsg 

// 获取指定key的指定数据
// window.ENUM.getEnum("sex", 1) 

// 获取指定key的数据列表
// window.ENUM.getEnum("sex")


{/*<Select defaultValue={position.sex} style={{ width: 120 }} onChange={onChange}>
    {
        window.ENUM.getEnum("sex").map(sex => {
            return <Select.Option value={sex.catCode} key={sex.catCode}>{sex.catName}</Select.Option>
        })
    }
</Select>*/}