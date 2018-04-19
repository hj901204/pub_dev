import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls';
import { OTHER_WAREHOUSE_CARRYOUT_DIALOG, OTHER_WAREHOUSE_CARRYOUT } from '../../consts/ActTypes';
import OtherWarehouseCarryOutAct from './OtherWarehouseCarryOutAct';
import { fromJS, toJS } from 'immutable';
import { message } from '../../../base/components/AntdComp'

let wareHouseOrderCode = (getState) => {
    return getState()[OTHER_WAREHOUSE_CARRYOUT].get('formInfo')
}

const actions = {
    show: () => (dispatch, getState) => {
        let state = getState()[OTHER_WAREHOUSE_CARRYOUT_DIALOG].set("visible", true);
        dispatch({ type: OTHER_WAREHOUSE_CARRYOUT_DIALOG, state });
    },
    hide: () => (dispatch, getState) => {
        let state = getState()[OTHER_WAREHOUSE_CARRYOUT_DIALOG].set("visible", false);
        dispatch({ type: OTHER_WAREHOUSE_CARRYOUT_DIALOG, state });
    },
    setLoading: (bool) => (dispatch, getState) => {
        let state = getState()[OTHER_WAREHOUSE_CARRYOUT_DIALOG].set("loading", bool);
        dispatch({ type: OTHER_WAREHOUSE_CARRYOUT_DIALOG, state });
    },
    initDataSource: (record) => (dispatch, getState) => {
        let state = getState()[OTHER_WAREHOUSE_CARRYOUT_DIALOG].set('record', record);
        dispatch({ type: OTHER_WAREHOUSE_CARRYOUT_DIALOG, state });
        dispatch(actions.show())
    },
    searchPosition: (pm = {}) => (dispatch, getState) => {
        let siteCode = wareHouseOrderCode(getState).deliverySiteCode;
        return ReqApi.get({
            url: Urls.GET_FREIGHT_SPACE,   // √
            pm: { siteCode: siteCode||'' }//, code: pm, name: pm }  // 不分页
        }).then((json) => {
            if (json.status === 2000 && json.data) {
                return json.data.list
            } else {
                return []
            }
        });
    },
    tableData: (list) => (dispatch, getState) => {
        let record = getState()[OTHER_WAREHOUSE_CARRYOUT_DIALOG].get('record'),
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
        let pagePM = getState()[OTHER_WAREHOUSE_CARRYOUT].get('orderinfoPagePm');
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
                    dispatch(OtherWarehouseCarryOutAct.getInitialData(pagePM))
                } else {
                    dispatch(actions.setLoading(false));
                }
            });
        }
    }
}

export default actions