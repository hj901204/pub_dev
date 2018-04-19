/**
 * Created by MW on 2017/4/24.
 */
import {PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU} from '../../consts/ActTypes'
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'


let ProductionIssueOutboundDetailsAct = {
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU].set(loading,flag);
        dispatch({type:PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU, state});
    },
    getList: (pm = {}) => (dispatch, getState) => {
        dispatch(ProductionIssueOutboundDetailsAct.loading('loading',true));
        Promise.all([
            dispatch(ProductionIssueOutboundDetailsAct.getOtherInfo({orderCode:pm})),
            dispatch(ProductionIssueOutboundDetailsAct.getTable({outCode:pm,page:1,pageSize:10})),
            dispatch(ProductionIssueOutboundDetailsAct.getRemarks({outCode:pm,isPage:1,status:2})),
        ]).then(values => {
            dispatch(ProductionIssueOutboundDetailsAct.loading('loading',false));
        }, reason => {
            dispatch(ProductionIssueOutboundDetailsAct.loading('loading',false));
        });
    },

    //Other information
    getOtherInfo: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.OUT_GETDETAIL,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU].set('dataSource',json.data);
                dispatch({type:PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU, state});
            }
        });
    },

    // Access to distribution records
    getTable: (pm = {}) => (dispatch, getState) => {
        dispatch(ProductionIssueOutboundDetailsAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU].set('list',json.data.list).set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU, state});
            }
            dispatch(ProductionIssueOutboundDetailsAct.loading('tableLoading',false));
        });
    },

    // Access to distribution records
    getRemarks: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GETALLOCATEINFO,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU].set('remarkList',json.data.list);
                dispatch({type:PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU, state});
            }
        });
    },
};

export default ProductionIssueOutboundDetailsAct