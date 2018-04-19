import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { ADDWAREHOUSINGREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import WareHousingAct from './WareHousingAct'
import { message } from '../../../base/components/AntdComp'
import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) => {
    return getState()[TABSREDU];
}
const actions = {
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[ADDWAREHOUSINGREDU].set(loading, value);
        dispatch({ type: ADDWAREHOUSINGREDU, state });
    },
    onAutochange: (pm = {}) => (dispatch, getState) => {
        let state = getState()[ADDWAREHOUSINGREDU].set('dataSource', []);
        dispatch({ type: ADDWAREHOUSINGREDU, state });
        ReqApi.get({
            url: Urls.GET_NEW_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDWAREHOUSINGREDU].set('searchSource', json.data.list);
                dispatch({ type: ADDWAREHOUSINGREDU, state });
            }
        });
    },
    materielList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.loading('listLoading', true));
        ReqApi.get({
            url: Urls.GET_NEW_SIDE,
            pm
        }).then((json) => {
            if (json.status === 2000 && json.data) {
                let state = getState()[ADDWAREHOUSINGREDU].set('dataSource', [json.data]);
                dispatch({ type: ADDWAREHOUSINGREDU, state });
            }
            dispatch(actions.loading('listLoading', false));
        });
    },
    siteList: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.GET_NEW_SITE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[ADDWAREHOUSINGREDU].set('siteSource', json.data.list);
                dispatch({ type: ADDWAREHOUSINGREDU, state });
            }
        });
    },
    sendSave: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.loading('listLoading', true));
        ReqApi.get({
            url: Urls.GET_PURCHASE_SAVE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(TabsAct.TabRemove('inventoryAddWareHousingCont', 'inventoryWareHousingCont'));
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventoryWareHousingCont'
                })) {
                    dispatch(WareHousingAct.PurchaseList({ page: 1, pageSize: 10,sourceOrderType:13 }));
                }
                dispatch(TabsAct.TabAdd({ title: '生产入库单', key: 'inventoryWareHousingCont' }));
                message.success('保存成功');
            }
              dispatch(actions.loading('listLoading', false));
              dispatch(actions.loading('saveLoading', false));
        });
    },
}

export default actions
