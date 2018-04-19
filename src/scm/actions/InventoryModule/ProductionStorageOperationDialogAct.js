import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls';
import { PRODUCTION_STORAGE_DIALOG_REDU, PRODUCTION_STORAGE_REDU } from '../../consts/ActTypes';
import ProductionStorageTopAct from './ProductionStorageTopAct';
import { fromJS, toJS } from 'immutable';
import { message } from '../../../base/components/AntdComp'


const actions = {
    show: () => (dispatch, getState) => {
        let state = getState()[PRODUCTION_STORAGE_DIALOG_REDU].set("visible", true);
        dispatch({ type: PRODUCTION_STORAGE_DIALOG_REDU, state });
    },
    hide: () => (dispatch, getState) => {
        let state = getState()[PRODUCTION_STORAGE_DIALOG_REDU].set("visible", false);
        dispatch({ type: PRODUCTION_STORAGE_DIALOG_REDU, state });
    },
    setLoading: (bool) => (dispatch, getState) => {
        let state = getState()[PRODUCTION_STORAGE_DIALOG_REDU].set("loading", bool);
        dispatch({ type: PRODUCTION_STORAGE_DIALOG_REDU, state });
    },
    initDataSource: (record) => (dispatch, getState) => {
        let state = getState()[PRODUCTION_STORAGE_DIALOG_REDU].set('record', record);
        dispatch({ type: PRODUCTION_STORAGE_DIALOG_REDU, state });
        dispatch(actions.show())
    },
    searchPosition: (pm = {}) => (dispatch, getState) => {
        pm = getState()[PRODUCTION_STORAGE_REDU].get('formInfo');
        return ReqApi.get({
            url: Urls.GET_FREIGHT_SPACE,
            pm: { siteCode: pm.deliverySiteCode || '' }
        }).then((json) => {
            if (json.status === 2000 && json.data) {
                return json.data.list
            } else {
                return []
            }
        });
    },
    tableData: (list) => (dispatch, getState) => {
        let record = getState()[PRODUCTION_STORAGE_DIALOG_REDU].get('record'),
            amount = record.planAmount - record.receivedAmount,
            sumAccount = 0;
        list.map(item => {
            //delete item.warehouseName;
            delete item.line;
            item.id = record.id;
            sumAccount += item.materialAmount * 1;
            return item;
        })
        amount >= sumAccount ? dispatch(actions.submitTableData(list)) : message.error('收货数量不正确')
    },
    submitTableData: (list) => (dispatch, getState) => {
        let pagePM = getState()[PRODUCTION_STORAGE_REDU].get('orderinfoPagePm');
        list.map(item => {
            if (item.list) {
                delete item.list
            }
            return item;
        })
        if (list.some(item => {
            return item.isEdit == 1;
        })) {
            message.info('有待确认信息')
        } else {
            dispatch(actions.setLoading(true));
            ReqApi.post({
                url: Urls.PRE_PUT_SAVE,
                pm: { list: list }
            }).then((json) => {
                if (json.status === 2000) {
                    dispatch(actions.setLoading(false));
                    dispatch(actions.hide())
                    dispatch(ProductionStorageTopAct.getInitialData(pagePM))
                } else {
                    dispatch(actions.setLoading(false));
                }
            });
        }
    }
}

export default actions