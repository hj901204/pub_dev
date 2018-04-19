/**
 * Created by MW on 2017/4/20.
 */
import {NEWPURCHASE_RETURN_REDU} from '../../consts/ActTypes'
import { Urls } from '../../consts/InventoryUrls'
import { ReqApi } from '../../../base/services/ReqApi'
import {message} from '../../../base/components/AntdComp'
import TabsAct from '../TabsAct'
import PurchaseReturnAct from './PurchaseReturnAct'

import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}

let NewPurchaseReturnAct = {
    // Whether load loading
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[NEWPURCHASE_RETURN_REDU].set(loading,flag);
        dispatch({type:NEWPURCHASE_RETURN_REDU, state});
    },

    getSelectedList: (pm={}) => (dispatch, getState) => {
        let state = getState()[NEWPURCHASE_RETURN_REDU].set('dataSource',{});
        dispatch({type:NEWPURCHASE_RETURN_REDU,state});
        ReqApi.get({
            url: Urls.PURCHASE_RETURN_GETLIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[NEWPURCHASE_RETURN_REDU].set('selectedList',json.data.list);
                dispatch({type:NEWPURCHASE_RETURN_REDU,state});
            }
        });
    },
    //onSelect information
    onSelect: (pm ={}) => (dispatch, getState) => {
        dispatch(NewPurchaseReturnAct.loading('loading',true));
        ReqApi.get({
            url: Urls.PURCAHSE_RETURN_GET_DETAIL,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[NEWPURCHASE_RETURN_REDU].set('dataSource',json.data);
                dispatch({type:NEWPURCHASE_RETURN_REDU,state});
            }
            dispatch(NewPurchaseReturnAct.loading('loading',false));
        });
    },

    //save the information
    saveInfo: (pm ={}) => (dispatch, getState) => {
        dispatch(NewPurchaseReturnAct.loading('saveLoading',true));
        dispatch(NewPurchaseReturnAct.loading('loading',true));
        ReqApi.post({
            url: Urls.SALE_OUT_INVENTORY_ADD,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(TabsAct.TabRemove('inventoryNewPurchaseReturn','inventoryPurchaseReturnHouse'));
                if(getStateFun(getState).get('tabs').some((tab) => {
                        return tab.key == 'inventoryPurchaseReturnHouse'
                    })){
                    dispatch(PurchaseReturnAct.getList({page:1, pageSize:10,sourceOrderType:31}));
                }
                dispatch(TabsAct.TabAdd({title:'采购退货出库单',key:'inventoryPurchaseReturnHouse'}));
                message.success('保存成功');
            }
            dispatch(NewPurchaseReturnAct.loading('saveLoading',false));
            dispatch(NewPurchaseReturnAct.loading('loading',false));
        });
    }
};

export default NewPurchaseReturnAct