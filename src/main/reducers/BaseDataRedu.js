import { fromJS } from 'immutable';
import { BASEDATAREDU }from '../consts/ActTypes';

let initState = fromJS({
    baseType:0, //基础数据类型
    tableLoading: false, //控制页面加载
    dialogLoading: false, //控制弹框加载
    add_visiable: false, //控制新增弹框的显示
    edit_visiable: false, //控制编辑弹框的显示
    record: {}, //待编辑的记录数据
    recordId: null, //待编辑的数据ID
    dataSource: [], //列表数据
    paging: {},     //显示分页
    searchPm:{
        "page":1,
        "pageSize":20,
    },     //控制分页
    selectData:{
        "country":[],
        "region":[],
        "province":[],
        "city":[]
    },
    resetFlag:false
});

const BaseDataRedu = (state = initState, action) => {
    switch (action.type) {
        case BASEDATAREDU:
            return action.state;
        default:
            return state;
    }
}

export default BaseDataRedu;