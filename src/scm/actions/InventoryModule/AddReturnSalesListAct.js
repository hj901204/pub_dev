import { ReqApi } from '../../../base/services/ReqApi'
 import { Urls } from '../../consts/InventoryUrls'
import { ADDRETURNSALESLISTREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import SalesReturnListAct from './SalesReturnListAct'
import { message } from '../../../base/components/AntdComp'
import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}
const actions = {
  loading:(loading,value) => (dispatch, getState) => {
        let state = getState()[ADDRETURNSALESLISTREDU].set(loading,value);
        dispatch({type:ADDRETURNSALESLISTREDU, state});
    },
    onAutochange: (pm ={}) => (dispatch, getState) => {
         let state = getState()[ADDRETURNSALESLISTREDU].set('dataSource',[]);
            dispatch({type:ADDRETURNSALESLISTREDU,state});
        ReqApi.get({
            url:Urls.GET_RETURN_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDRETURNSALESLISTREDU].set('searchSource',json.data.list);
                dispatch({type:ADDRETURNSALESLISTREDU,state});
            }
        });
    },
      materielList: (pm ={}) => (dispatch, getState) => {
         dispatch(actions.loading('listLoading',true));
        ReqApi.get({
            url:Urls.GET_RETURN_SIDE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDRETURNSALESLISTREDU].set('dataSource',json.data.saleReturnDetails);
                dispatch({type:ADDRETURNSALESLISTREDU,state});
            }
            dispatch(actions.loading('listLoading',false));
        });
    },
    sendSave: (pm={}) => (dispatch, getState) => {
       dispatch(actions.loading('listLoading',true));
         ReqApi.get({
            url:Urls.GET_PURCHASE_SAVE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                 dispatch(TabsAct.TabRemove('inventoryAddReturnSalesListCont', 'inventorySalesReturnListCont'));
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventorySalesReturnListCont'
                })) {
                    dispatch(SalesReturnListAct.PurchaseList({ page: 1, pageSize: 10,sourceOrderType:32 }));
                }
                dispatch(TabsAct.TabAdd({title:'销售退货入库单', key:'inventorySalesReturnListCont'})); 
                message.success('保存成功');
            }
            dispatch(actions.loading('listLoading',false));
            dispatch(actions.loading('saveLoading',false));
        });
    },
}

export default actions
