/**
 * Created by MW on 2017/4/24.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {SALES_OUTBOUND_DETAILS_REDU} from '../../consts/ActTypes'


let SalesOutboundDetailsAct = {
    loading: (sign,flag) => (dispatch, getState) => {
        let state = getState()[SALES_OUTBOUND_DETAILS_REDU].set(sign,flag);
        dispatch({type:SALES_OUTBOUND_DETAILS_REDU, state});
    },
    getList: (orderCode) => (dispatch, getState) => {
        dispatch(SalesOutboundDetailsAct.loading('loading',true));
        Promise.all([
            dispatch(SalesOutboundDetailsAct.getOtherInfo({orderCode:orderCode})),
            dispatch(SalesOutboundDetailsAct.getTable({outCode:orderCode,page:1,pageSize:10})),
            dispatch(SalesOutboundDetailsAct.getRemarks({outCode:orderCode,isPage:1,status:2})),
        ]).then(values => {
            dispatch(SalesOutboundDetailsAct.loading('loading',false));
        }, reason => {
            dispatch(SalesOutboundDetailsAct.loading('loading',false));
        });
    },

    //Other information
    getOtherInfo: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.OUT_GETDETAIL,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[SALES_OUTBOUND_DETAILS_REDU].set('dataSource',json.data);
                dispatch({type:SALES_OUTBOUND_DETAILS_REDU, state});
            }
        });
    },

    // Access to distribution records
    getTable: (pm = {}) => (dispatch, getState) => {
        dispatch(SalesOutboundDetailsAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[SALES_OUTBOUND_DETAILS_REDU].set('list',json.data.list).set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:SALES_OUTBOUND_DETAILS_REDU, state});
            }
            dispatch(SalesOutboundDetailsAct.loading('tableLoading',false));
        });
    },

    // Access to distribution records
    getRemarks: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GETALLOCATEINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[SALES_OUTBOUND_DETAILS_REDU].set('remarkList',json.data.list);
                dispatch({type:SALES_OUTBOUND_DETAILS_REDU, state});
            }
        });
    },
};

export default SalesOutboundDetailsAct