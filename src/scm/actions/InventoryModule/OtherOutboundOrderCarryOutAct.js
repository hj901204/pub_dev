/**
 * Created by MW on 2017/7/21.
 * 其它出库单执行Action
 */
import {OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU} from '../../consts/ActTypes'
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {message} from '../../../base/components/AntdComp'
import OtherOutboundOrderAct from './OtherOutboundOrderAct'
import TabsAct from '../TabsAct'
import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}

let OtherOutboundOrderCarryOutAct = {
    loadingOrVisible: (mark, flag) => (dispatch, getState) => {
        let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set(mark, flag);
        dispatch({type: OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state})
    },

    getList: (orderCode) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('loading',true));
        let orderPaging = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].get('orderPaging');
        Promise.all([
            dispatch(OtherOutboundOrderCarryOutAct.getDetail(orderCode)),
            dispatch(OtherOutboundOrderCarryOutAct.getOrderInfo({page:orderPaging.current?orderPaging.current:1,pageSize:orderPaging.pageSize?orderPaging.pageSize:10,outCode:orderCode.orderCode})),
            dispatch(OtherOutboundOrderCarryOutAct.getAllocateInfo({page:1,pageSize:10,outCode:orderCode.orderCode,isFlag: 0,status: 0}))
        ]).then(values => {
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('loading',false));
        }, reason => {
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('loading',false));
        });
    },

    popup: (orderCode, lineNum) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('popupLoading',true));
        let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set('popupSearch',{outCode: orderCode,lineNum: lineNum});
        dispatch({type:OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state});
        Promise.all([
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('visible',true)),
            dispatch(OtherOutboundOrderCarryOutAct.popupGetOrderInfo({outCode: orderCode,lineNum: lineNum})),
            dispatch(OtherOutboundOrderCarryOutAct.getInventoryList({outCode: orderCode,lineNum: lineNum}))
        ]).then(values => {
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('popupLoading',false));
        }, reason => {
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('popupLoading',false));
        });
    },



    //获取基本信息
    getDetail: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.OUT_GETDETAIL,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set('orderInfoData',json.data)
                    .set('orderCode',json.data.orderCode);
                dispatch({type:OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state});
            }
        });
    },

    //获取订单信息
    getOrderInfo: (pm ={}) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('orderLoading',true));
        return ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set('orderList',json.data.list)
                    .set('orderPaging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state});
            }
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('orderLoading',false));
        });
    },

    //获取分配记录信息
    getAllocateInfo: (pm = {}) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('allotInfoLoading',true));
        ReqApi.get({
            url: Urls.GETALLOCATEINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let status = json.data.list.some((perList) => {
                    return perList.status == 1;
                });
                let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set('allotInfoList',json.data.list)
                    .set('allotPaging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize})
                    .set('status',status);

                dispatch({type:OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state});
            }
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('allotInfoLoading',false));
        });
    },

    //删除分配记录
    confirmDelete: (pm ={}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.ALLOCATEINFO_DELETE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                message.success('数据删除成功！');
                dispatch(OtherOutboundOrderCarryOutAct.getAllocateInfo(
                    {
                        page:1, pageSize:10,
                        outCode:getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].get('orderInfoData').orderCode,
                        isFlag: 0,
                        status: 0
                    }));
            }
        });
    },

    //发货
    shipping: (pm = {}) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible("sendLoading",true));
        ReqApi.get({
            url: Urls.SHIPPING,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(TabsAct.TabRemove('inventoryOtherOutboundOrderCarryOut','inventoryOtherOutbound'));
                if(getStateFun(getState).get('tabs').some((tab) => {
                        return tab.key == 'inventoryOtherOutbound'
                    })){
                    dispatch(OtherOutboundOrderAct.getList({page:1, pageSize:10,sourceOrderType:15}));
                }
                dispatch(TabsAct.TabAdd({title:'其他出库单',key:'inventoryOtherOutbound'}));
                message.success('发货成功！');
            }
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible("sendLoading",false));
        });
    },

    //获取弹窗上部信息
    popupGetOrderInfo: (pm ={}) => (dispatch, getState) =>{
        return ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set('popupData',json.data.list[0]);
                dispatch({type:OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state});
            }
        });
    },

    //获取弹窗里面的表格的信息
    getInventoryList: (pm ={}, mark) => (dispatch, getState) => {
        mark ? dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('searchLoading',true)) : '';
        return ReqApi.get({
            url: Urls.ALLOCATE_GETINVENTORYLIST,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].set('popupList',json.data.list);
                    // .set('popupPaging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU, state});
            }
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('popupLoading',false));
            dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('searchLoading',false));
        });
    },

    //保存分配记录
    allocateSave: (pm ={}) => (dispatch, getState) => {
        ReqApi.post({
            url: Urls.ORDERINFO_ALLOCATESAVE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('visible',false));
                dispatch(OtherOutboundOrderCarryOutAct.getList({orderCode:getState()[OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU].get('orderCode')}));
            }
        });
    },

    //关闭
    close: (pm = {}) => (dispatch,getState) => {
        ReqApi.get({
            url: Urls.CLOSE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(TabsAct.TabRemove('inventoryOtherOutboundOrderCarryOut','inventoryOtherOutbound'));
                if(getStateFun(getState).get('tabs').some((tab) => {
                        return tab.key == 'inventoryOtherOutbound'
                    })){
                    dispatch(OtherOutboundOrderAct.getList({page:1, pageSize:10,sourceOrderType:15}));
                }
                dispatch(TabsAct.TabAdd({title:'其他出库单',key:'inventoryOtherOutbound'}));
            }
        });
    }
}


export default OtherOutboundOrderCarryOutAct