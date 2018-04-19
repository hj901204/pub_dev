import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { ADDPRODUCTIONREDU ,TABSREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import ProductionListAct from './ProductionListAct'
import { message } from '../../../base/components/AntdComp'

let getStateFun = (getState) => {
    return getState()[TABSREDU];
}
const actions = {
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[ADDPRODUCTIONREDU].set(loading, value);
        dispatch({ type: ADDPRODUCTIONREDU, state });
    },
    onAutochange: (pm = {}) => (dispatch, getState) => {
        let state = getState()[ADDPRODUCTIONREDU].set('dataSource', []);
        dispatch({ type: ADDPRODUCTIONREDU, state });
        ReqApi.get({
            url: Urls.GET_PRODUCTION_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDPRODUCTIONREDU].set('searchSource', json.data.list);
                dispatch({ type: ADDPRODUCTIONREDU, state });
            }
        });
    },
    materielList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.loading('listLoading', true));
        ReqApi.get({
            url: Urls.GET_PRODUCTION_SIDE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDPRODUCTIONREDU].set('dataSource', json.data.list);
                dispatch({ type: ADDPRODUCTIONREDU, state });
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
                 dispatch(TabsAct.TabRemove('inventoryAddInventoryProductionCont', 'inventoryProductionListCont'));
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventoryProductionListCont'
                })) {
                    dispatch(ProductionListAct.PurchaseList({ page: 1, pageSize: 10,sourceOrderType:33 }));
                }
                dispatch(TabsAct.TabAdd({ title: '生产退料单', key: 'inventoryProductionListCont' }));
                message.success('保存成功');
            }
             dispatch(actions.loading('listLoading', false));
             dispatch(actions.loading('saveLoading', false));
        });
    },
}

export default actions
