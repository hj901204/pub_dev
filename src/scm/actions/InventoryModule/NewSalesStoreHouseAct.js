/**
 * Created by MW on 2017/4/20.
 */
import {NEWSALES_OUTBOUND_DETAILS_REDU} from '../../consts/ActTypes'
import { Urls } from '../../consts/InventoryUrls'
import { ReqApi } from '../../../base/services/ReqApi'
import {message} from '../../../base/components/AntdComp'
import TabsAct from '../TabsAct'
import SalesStoreHouseAct from './SalesStoreHouseAct'


import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}

let NewSaleaStoreHouseAct = {
    // Whether load loading
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[NEWSALES_OUTBOUND_DETAILS_REDU].set(loading,flag);
        dispatch({type:NEWSALES_OUTBOUND_DETAILS_REDU, state});
    },

    getSelectedList: (pm={}) => (dispatch, getState) => {
        let state = getState()[NEWSALES_OUTBOUND_DETAILS_REDU].set('dataSource',{});
        dispatch({type:NEWSALES_OUTBOUND_DETAILS_REDU,state});
        ReqApi.get({
            url: Urls.SALE_SALEORDER_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[NEWSALES_OUTBOUND_DETAILS_REDU].set('selectedList',json.data.list);
                dispatch({type:NEWSALES_OUTBOUND_DETAILS_REDU,state});
            }
        });
    },

    //onSelect information
    onSelect: (pm ={}) => (dispatch, getState) => {
        dispatch(NewSaleaStoreHouseAct.loading('loading',true));
        ReqApi.get({
            url: Urls.GET_SALEORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[NEWSALES_OUTBOUND_DETAILS_REDU].set('dataSource',json.data);
                dispatch({type:NEWSALES_OUTBOUND_DETAILS_REDU,state});
            }
            dispatch(NewSaleaStoreHouseAct.loading('loading',false));
        });
    },

    //save the information
    saveInfo: (pm ={}) => (dispatch, getState) => {
        dispatch(NewSaleaStoreHouseAct.loading('saveLoading',true));
        dispatch(NewSaleaStoreHouseAct.loading('loading',true));
        ReqApi.post({
            url: Urls.SALE_OUT_INVENTORY_ADD,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(TabsAct.TabRemove('inventoryNewSalesStoreHouse','inventorySalesStoreHouse'));
                if(getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventorySalesStoreHouse'
                })){
                    dispatch(SalesStoreHouseAct.getList({page:1, pageSize:10,sourceOrderType:12}));
                }
                dispatch(TabsAct.TabAdd({title:'销售出库单',key:'inventorySalesStoreHouse'}));
                message.success('保存成功');
            }
            dispatch(NewSaleaStoreHouseAct.loading('saveLoading',false));
            dispatch(NewSaleaStoreHouseAct.loading('loading',false));
        });
    }
};

export default NewSaleaStoreHouseAct