import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { ADDPURCHASELISTREDU ,TABSREDU} from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import PurchaseListAct from './PurchaseListAct'
import { message } from '../../../base/components/AntdComp'

let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}
const actions = {
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[ADDPURCHASELISTREDU].set(loading, value);
        dispatch({ type: ADDPURCHASELISTREDU, state });
    },
    onAutochange: (pm = {}) => (dispatch, getState) => {
        let state = getState()[ADDPURCHASELISTREDU].set('dataSource', []);
        dispatch({ type: ADDPURCHASELISTREDU, state });
        ReqApi.get({
            url: Urls.GET_PURCHASE_GETLIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDPURCHASELISTREDU].set('searchSource', json.data.list);
                dispatch({ type: ADDPURCHASELISTREDU, state });
            }
        });
    },
    materielList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.loading('listLoading', true));
        ReqApi.get({
            url: Urls.GET_PURCHASE_DETAILBYCODE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDPURCHASELISTREDU].set('dataSource', json.data.list);
                dispatch({ type: ADDPURCHASELISTREDU, state });
            }
            dispatch(actions.loading('listLoading', false));
        });
    },
    sendSave: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.loading('listLoading', true));
        ReqApi.get({
            url: Urls.GET_PURCHASE_SAVE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(TabsAct.TabRemove('inventoryAddPurchaseListCont', 'PurchaseListCont'));
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventoryPurchaseListCont'
                })) {
                    dispatch(PurchaseListAct.PurchaseList({ page: 1, pageSize: 10,sourceOrderType:11}));
                }
                dispatch(TabsAct.TabAdd({ title: '采购入库单', key: 'inventoryPurchaseListCont' }));
                message.success('保存成功');
            }
            dispatch(actions.loading('listLoading', false));
            dispatch(actions.loading('saveLoading', false));
        });
    },
}

export default actions
