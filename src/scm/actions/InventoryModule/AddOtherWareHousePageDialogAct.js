import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { ADDOTHERWAREHOUSEPAGEDIALOGREDU ,TABSREDU} from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import { message } from '../../../base/components/AntdComp'

let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}
const actions = {
    show: () => (dispatch, getState) => {
        let state = getState()[ADDOTHERWAREHOUSEPAGEDIALOGREDU].set("visible", true);
        dispatch({ type: ADDOTHERWAREHOUSEPAGEDIALOGREDU, state });
    },
    hide: () => (dispatch, getState) => {
        let state = getState()[ADDOTHERWAREHOUSEPAGEDIALOGREDU].set("visible", false);
        dispatch({ type: ADDOTHERWAREHOUSEPAGEDIALOGREDU, state });
    },
    tableLoading: (val) => (dispatch, getState) => {
        let state = getState()[ADDOTHERWAREHOUSEPAGEDIALOGREDU].set('tableLoading', val);
        dispatch({ type: ADDOTHERWAREHOUSEPAGEDIALOGREDU, state })
    },
     btnLoading: (val) => (dispatch, getState) => {
        let state = getState()[ADDOTHERWAREHOUSEPAGEDIALOGREDU].set('btnLoading', val);
        dispatch({ type: ADDOTHERWAREHOUSEPAGEDIALOGREDU, state })
    },
     GetPurchaseList: (data, pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[ADDOTHERWAREHOUSEPAGEDIALOGREDU].set('search', pm).set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: ADDOTHERWAREHOUSEPAGEDIALOGREDU, state });
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
   
}

export default actions
