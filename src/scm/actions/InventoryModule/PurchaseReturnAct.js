/**
 * Created by MW on 2017/4/20.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {PURCHASE_RETURN_HOUSE_REDU} from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import PurchaseReturnOutCarryOutAct from './PurchaseReturnOutCarryOutAct'
import {message} from '../../../base/components/AntdComp'


let PurchaseReturnHouseAct = {
    // Whether load loading
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[PURCHASE_RETURN_HOUSE_REDU].set(loading,flag);
        dispatch({type:PURCHASE_RETURN_HOUSE_REDU, state});
    },
    // To obtain sales outbound single table
    getList: (pm = {}) => (dispatch, getState) => {
        dispatch(PurchaseReturnHouseAct.loading('tableLoading',true));
        ReqApi.get({
            url: Urls.SALE_GETLIST,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[PURCHASE_RETURN_HOUSE_REDU].set('search',pm).set('dataSource',json.data.list).set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:PURCHASE_RETURN_HOUSE_REDU, state});
            }
            dispatch(PurchaseReturnHouseAct.loading('searchLoading',false));
            dispatch(PurchaseReturnHouseAct.loading('tableLoading',false));
        });
    },
    // Sliding window page show and hide
    // sidebarVisible: (title,flag,content) => (dispatch, getState) => {
    //     let state = getState()[PURCHASE_RETURN_HOUSE_REDU].set(title,flag);
    //     dispatch({ type: PURCHASE_RETURN_HOUSE_REDU, state });
    //     if(content){
    //         switch (title) {
    //             case 'sideDetails':
    //                 dispatch(PurchaseReturnHouseAct.getDetailsInfo({returnCode:content}));
    //                 break;
    //             case 'sideSupplier':
    //                 // According to the customer to obtain the customer interface for details
    //                 let state = getState()[PURCHASE_RETURN_HOUSE_REDU].set('supplierData',content);
    //                 dispatch({ type: PURCHASE_RETURN_HOUSE_REDU, state });
    //                 break;
    //             default:
    //                 return null;
    //                 break;
    //         }
    //     }
    // },
    // According to the source documents for sales order details interface
    // getDetailsInfo: (pm ={}) => (dispatch, getState) => {
    //     dispatch(PurchaseReturnHouseAct.loading('detailsLoading',true));
    //     ReqApi.get({
    //         url: Urls.PURCAHSE_RETURN_GET_DETAIL,
    //         pm,
    //     }).then((json) => {
    //         if(json.status===2000){
    //             let state = getState()[PURCHASE_RETURN_HOUSE_REDU].set('purchaseDetails', json.data);
    //             dispatch({ type: PURCHASE_RETURN_HOUSE_REDU, state });
    //         }
    //         dispatch(PurchaseReturnHouseAct.loading('detailsLoading',false));
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
                    dispatch(TabsAct.TabAdd({title:'执行采购退货出库单', key:'inventoryPurchaseReturnOutCarryOut'}));
                    dispatch(PurchaseReturnOutCarryOutAct.CarryOutList(pm));
                    dispatch(PurchaseReturnOutCarryOutAct.carryOutOrderInfoList({page:1,pageSize:10,outCode:pm.orderCode}));
                } else {
                    message.success('此单据处于锁定中');
                }
            }
            dispatch(PurchaseReturnHouseAct.loading('detailsLoading',false));
        });
    },

    // Delete an order
    confirmDelete: (pm = {}) => (dispatch, getState) =>{
        dispatch(PurchaseReturnHouseAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.SALE_OUT_INVENTORY_DELETE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(PurchaseReturnHouseAct.getList(getState()[PURCHASE_RETURN_HOUSE_REDU].get('search')));
                return json;
            } else {
                dispatch(PurchaseReturnHouseAct.loading('tableLoading',false));
                return json;
            }
        });
    }
};

export default PurchaseReturnHouseAct