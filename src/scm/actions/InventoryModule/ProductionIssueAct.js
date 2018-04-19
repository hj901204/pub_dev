/**
 * Created by MW on 2017/4/20.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {PRODUCTION_ISSUE_REDU} from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import ProductionSendMaterialCarryOutAct from '../../actions/InventoryModule/ProductionSendMaterialCarryOutAct';
import {message} from '../../../base/components/AntdComp'


let ProductionIssueAct = {
    // Whether load loading
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[PRODUCTION_ISSUE_REDU].set(loading,flag);
        dispatch({type:PRODUCTION_ISSUE_REDU, state});
    },
    // To obtain sales outbound single table
    getList: (pm = {}) => (dispatch, getState) => {
        dispatch(ProductionIssueAct.loading('tableLoading',true));
        ReqApi.get({
            url: Urls.SALE_GETLIST,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PRODUCTION_ISSUE_REDU].set('search',pm).set('dataSource',json.data.list).set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:PRODUCTION_ISSUE_REDU, state});
            }
            dispatch(ProductionIssueAct.loading('searchLoading',false));
            dispatch(ProductionIssueAct.loading('tableLoading',false));
        });
    },
    // Sliding window page show and hide
    // sidebarVisible: (title,flag,id) => (dispatch, getState) => {
    //     let state = getState()[PRODUCTION_ISSUE_REDU].set(title,flag);
    //     dispatch({ type: PRODUCTION_ISSUE_REDU, state });
    //     if(id){
    //         switch (title) {
    //             case 'sideDetails':
    //                 dispatch(ProductionIssueAct.getDetailsInfo({requisitionCode:id}));
    //                 break;
    //             default:
    //                 return null;
    //         }
    //     }
    // },
    // According to the source documents for sales order details interface
    // getDetailsInfo: (pm ={}) => (dispatch, getState) => {
    //     dispatch(ProductionIssueAct.loading('detailsLoading',true));
    //     ReqApi.get({
    //         url: Urls.PRODUCE_PICKING_GETDETAIL,
    //         pm,
    //     }).then((json) => {
    //         if(json.status===2000){
    //             let state = getState()[PRODUCTION_ISSUE_REDU].set('productionDetails', json.data);
    //             dispatch({ type: PRODUCTION_ISSUE_REDU, state });
    //         }
    //         dispatch(ProductionIssueAct.loading('detailsLoading',false));
    //     });
    // },

    //是否锁定
    isLock:(pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.ISLOCK,
            pm,
        }).then((json) => {
            if(json.status===2000){
                if(json.data.isLock == 0) {
                    dispatch(TabsAct.TabAdd({title:'执行生产发料单', key:'inventoryProductionSendMaterialCarryOut'}));
                    dispatch(ProductionSendMaterialCarryOutAct.CarryOutList(pm));
                    dispatch(ProductionSendMaterialCarryOutAct.carryOutOrderInfoList({page:1,pageSize:10,outCode:pm.orderCode}));
                } else {
                    message.success('此单据处于锁定中');
                }
            }
            dispatch(ProductionIssueAct.loading('detailsLoading',false));
        });
    },

    // Delete an order
    confirmDelete: (pm = {}) => (dispatch, getState) =>{
        dispatch(ProductionIssueAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.SALE_OUT_INVENTORY_DELETE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(ProductionIssueAct.getList(getState()[PRODUCTION_ISSUE_REDU].get('search')));
                return json;
            } else {
                dispatch(ProductionIssueAct.loading('tableLoading',false));
                return json;
            }
        });
    }
};

export default ProductionIssueAct