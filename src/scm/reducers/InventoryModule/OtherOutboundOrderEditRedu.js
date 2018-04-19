/**
 * Created by MW on 2017/7/20.
 * 其它出库单reduce
 */

import {fromJS} from 'immutable'
import {OTHER_OUTBOUND_ORDER_EDIT_REDU} from '../../consts/ActTypes';

export let initialState = fromJS({
    orderCode:"",//单据号
    isEdit:null,
    baseDataSource:{},    //基本信息
    delDataSource:[],//订单信息
    dataSource: [], //订单信息
    deptEnum:[],//部门枚举
    employeesEnum:[],//员工枚举
    businessEnum:[],//单据类型枚举
    siteEnum:[],//发货站点枚举
    loading: false
});

export let OtherOutboundOrderEditRedu = (state = initialState, action) => {
    switch (action.type) {
        case OTHER_OUTBOUND_ORDER_EDIT_REDU :
            return action.state;
        default :
            return state;
    }
}

