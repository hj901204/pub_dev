/**
 * Created by MW on 2017/7/26.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU } from '../../consts/ActTypes'



const actions = {
    show: () => (dispatch, getState) => {
        let state = getState()[OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU].set("visible", true);

        dispatch({ type: OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU, state });
    },
    hide: () => (dispatch, getState) => {
        let state = getState()[OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU].set("visible", false);
        dispatch({ type: OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU, state });
    },
    tableLoading: (val) => (dispatch, getState) => {
        let state = getState()[OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU].set('tableLoading', val);
        dispatch({ type: OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU, state })
    },
    btnLoading: (val) => (dispatch, getState) => {
        let state = getState()[OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU].set('btnLoading', val);
        dispatch({ type: OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU, state })
    },
    GetPurchaseList: (data, pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU].set('search', pm).set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU, state });
    },
    PurchaseList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.GET_MINDATA_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetPurchaseList(json.data, pm));
            }
            dispatch(actions.tableLoading(false));
            dispatch(actions.btnLoading(false));
            return json;
        });
    },
    checkedTableList: (val) => (dispatch, getState) => {
        let state = getState()[OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU].setIn(['addWareHouse', 'checkedTableList'], val);
        dispatch({ type: OTHER_OUT_ADD_SEARCH_MATERIAL_DIALOG_REDU, state });
    }
}

export default actions
