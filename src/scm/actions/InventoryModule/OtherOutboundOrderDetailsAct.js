/**
 * Created by MW on 2017/7/21.
 * 其他出库单详情页面action
 */

import {OTHER_OUTBOUND_ORDER_DETAILS_REDU} from '../../consts/ActTypes'
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {message} from '../../../base/components/AntdComp'
import TabsAct from '../../actions/TabsAct'

let OtherOutboundOrderDetailsAct = {
    loading: (sign,flag) => (dispatch, getState) => {
        let state = getState()[OTHER_OUTBOUND_ORDER_DETAILS_REDU].set(sign,flag);
        dispatch({type:OTHER_OUTBOUND_ORDER_DETAILS_REDU, state});
    },
    getList: (orderCode) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderDetailsAct.loading('loading',true));
        Promise.all([
            dispatch(OtherOutboundOrderDetailsAct.getOtherInfo({orderCode:orderCode})),
            dispatch(OtherOutboundOrderDetailsAct.getTable({outCode:orderCode,page:1,pageSize:10})),
            dispatch(OtherOutboundOrderDetailsAct.getRemarks({outCode:orderCode,isPage:1,status:2})),
        ]).then(values => {
            dispatch(OtherOutboundOrderDetailsAct.loading('loading',false));
        }, reason => {
            dispatch(OtherOutboundOrderDetailsAct.loading('loading',false));
        });
    },

    //Other information
    getOtherInfo: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.OUT_GETDETAIL,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_DETAILS_REDU].set('orderInfoData',json.data);
                dispatch({type:OTHER_OUTBOUND_ORDER_DETAILS_REDU, state});
            }
        });
    },

    // Access to distribution records
    getTable: (pm = {}) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderDetailsAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_DETAILS_REDU].set('tableList',json.data.list)
                    .set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:OTHER_OUTBOUND_ORDER_DETAILS_REDU, state});
            }
            dispatch(OtherOutboundOrderDetailsAct.loading('tableLoading',false));
        });
    },

    // Access to distribution records
    getRemarks: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GETALLOCATEINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_DETAILS_REDU].set('remarkList',json.data.list);
                dispatch({type:OTHER_OUTBOUND_ORDER_DETAILS_REDU, state});
            }
        });
    },
}

export default OtherOutboundOrderDetailsAct