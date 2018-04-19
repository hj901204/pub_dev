/**
 * Created by MW on 2017/4/20.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {SALES_STOREHOUSE_REDU} from '../../consts/ActTypes'
import SaleCarryOutAct from './SaleCarryOutAct'
import TabsAct from '../TabsAct'
import {message} from '../../../base/components/AntdComp'

let SalesStoreHouseAct = {
    // Whether load loading
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[SALES_STOREHOUSE_REDU].set(loading,flag);
        dispatch({type:SALES_STOREHOUSE_REDU, state});
    },
    // To obtain sales outbound single table
    getList: (pm = {}) => (dispatch, getState) => {
        dispatch(SalesStoreHouseAct.loading('tableLoading',true));
        ReqApi.get({
                url: Urls.SALE_GETLIST,
                pm,
            }).then((json) => {
                 if(json.status===2000){
                     let state = getState()[SALES_STOREHOUSE_REDU].set('search',pm).set('dataSource',json.data.list).set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                     dispatch({type:SALES_STOREHOUSE_REDU, state});
                }
                dispatch(SalesStoreHouseAct.loading('searchLoading',false));
                dispatch(SalesStoreHouseAct.loading('tableLoading',false));
            });
    },
    // Sliding window page show and hide
    // sidebarVisible: (title,flag,content) => (dispatch, getState) => {
    //     let state = getState()[SALES_STOREHOUSE_REDU].set(title,flag);
    //     dispatch({ type: SALES_STOREHOUSE_REDU, state });
    //     if(content){
    //         switch (title) {
    //             case 'sideDetails':
    //                 dispatch(SalesStoreHouseAct.getDetailsInfo({saleOrderCode:content}));
    //                 break;
    //             case 'sideClient':
    //                 // According to the customer to obtain the customer interface for details
    //                 let state = getState()[SALES_STOREHOUSE_REDU].set('clientData', content);
    //                 dispatch({ type: SALES_STOREHOUSE_REDU, state });
    //                 break;
    //             default:
    //                 return null;
    //                 break;
    //         }
    //     }
    // },
    // According to the source documents for sales order details interface
    // getDetailsInfo: (pm ={}) => (dispatch, getState) => {
    //     dispatch(SalesStoreHouseAct.loading('detailsLoading',true));
    //     ReqApi.get({
    //         url: Urls.GET_SALEORDER,
    //         pm,
    //     }).then((json) => {
    //         if(json.status===2000){
    //             let state = getState()[SALES_STOREHOUSE_REDU].set('salesDetails', json.data);
    //             dispatch({ type: SALES_STOREHOUSE_REDU, state });
    //         }
    //         dispatch(SalesStoreHouseAct.loading('detailsLoading',false));
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
                    dispatch(TabsAct.TabAdd({title:'执行销售出库单', key:'inventorySaleCarryOut'}));
                    dispatch(SaleCarryOutAct.CarryOutList(pm));
                    dispatch(SaleCarryOutAct.carryOutOrderInfoList({page:1,pageSize:10,outCode:pm.orderCode}));
                } else {
                    message.success('此单据处于锁定中');
                }

            }
        });
    },
    // Delete an order
    confirmDelete: (pm = {}) => (dispatch, getState) =>{
        dispatch(SalesStoreHouseAct.loading('tableLoading',true));
        return ReqApi.get({
            url: Urls.SALE_OUT_INVENTORY_DELETE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(SalesStoreHouseAct.getList(getState()[SALES_STOREHOUSE_REDU].get('search')));
                return json;
            } else {
                dispatch(SalesStoreHouseAct.loading('tableLoading',false));
                return json;
            }
        });
    }
};

export default SalesStoreHouseAct