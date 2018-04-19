/**
 * Created by MW on 2017/4/24.
 * 采购退货出库单详情页面
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {PURCHASE_RETURN_OUTBOUND_DETAILS_REDU} from '../../consts/ActTypes'


let PurchaseReturnOutboundDetailsAct = {
    loading: (sign,flag) => (dispatch, getState) => {
        let state = getState()[PURCHASE_RETURN_OUTBOUND_DETAILS_REDU].set(sign,flag);
        dispatch({type:PURCHASE_RETURN_OUTBOUND_DETAILS_REDU, state});
    },
    getList: (pm = {}) => (dispatch, getState) => {
        dispatch(PurchaseReturnOutboundDetailsAct.loading('loading',true));
        Promise.all([
            dispatch(PurchaseReturnOutboundDetailsAct.getOtherInfo({orderCode:pm})),
            dispatch(PurchaseReturnOutboundDetailsAct.getTable({outCode:pm,page:1,pageSize:10})),
            dispatch(PurchaseReturnOutboundDetailsAct.getRemarks({outCode:pm,isPage:1,status:2})),
        ]).then(values => {
            dispatch(PurchaseReturnOutboundDetailsAct.loading('loading',false));
        }, reason => {
            dispatch(PurchaseReturnOutboundDetailsAct.loading('loading',false));
        });
    },

    //Other information
    getOtherInfo: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.OUT_GETDETAIL,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PURCHASE_RETURN_OUTBOUND_DETAILS_REDU].set('dataSource',json.data);
                dispatch({type:PURCHASE_RETURN_OUTBOUND_DETAILS_REDU, state});
            }
        });
    },

    // Access to distribution records
    getTable: (pm = {}) => (dispatch, getState) => {
        dispatch(PurchaseReturnOutboundDetailsAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PURCHASE_RETURN_OUTBOUND_DETAILS_REDU].set('list',json.data.list).set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:PURCHASE_RETURN_OUTBOUND_DETAILS_REDU, state});
            }
            dispatch(PurchaseReturnOutboundDetailsAct.loading('tableLoading',false));
        });
    },

    // Access to distribution records
    getRemarks: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GETALLOCATEINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PURCHASE_RETURN_OUTBOUND_DETAILS_REDU].set('remarkList',json.data.list);
                dispatch({type:PURCHASE_RETURN_OUTBOUND_DETAILS_REDU, state});
            }
        });
    },
};

export default PurchaseReturnOutboundDetailsAct