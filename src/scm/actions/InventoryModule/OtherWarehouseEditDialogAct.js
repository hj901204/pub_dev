/**
 * 其他入库单   编辑  --  新增行弹出窗
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { OHTER_WAREHOUSE_EDIT_DIALOG, TABSREDU, OTHE_WAREHOUSE_EIDT } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import { message } from '../../../base/components/AntdComp'
import OtherWarehouseEditAct from './OtherWarehouseEditAct'

let getStateFun = (getState) => {
    return getState()[TABSREDU];
}
const actions = {
    show: () => (dispatch, getState) => {
        let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set("visible", true);
        dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state });
    },
    hide: () => (dispatch, getState) => {
        let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set("visible", false);
        dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state });
    },
    // tableLoading: (val) => (dispatch, getState) => {
    //     let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set('tableLoading', val);
    //     dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state })
    // },
    // btnLoading: (val) => (dispatch, getState) => {
    //     let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set('btnLoading', val);
    //     dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state })
    // },
    // GetPurchaseList: (data, pm) => (dispatch, getState) => {
    //     let { list, total, page, pageSize } = data;
    //     let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set('search', pm).set('dataSource', list)
    //         .set("paging", { total, current: page, pageSize });
    //     dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state });
    // },
    PurchaseList: (pm = {}) => (dispatch, getState) => {
        pm.status = 1;
        pm.usingWarehouse = 0;
        // dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.GET_MINDATA_LIST,
            pm
        }).then((json) => {
            // if (json.status === 2000) {
            //     dispatch(actions.GetPurchaseList(json.data, pm));
            // }
            // dispatch(actions.tableLoading(false));
            // dispatch(actions.btnLoading(false));
            return json;
        });
    },

    //  ------------ 8.21 --------------
    materialDataList: (materialData) => (dispatch, getState) => {  // 数据整合
        let newRow = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].get('editRow'),
            newList = newRow;
        // newList = Object.assign(newRow, materialData);
        newList.materialCode = materialData.materialCode;
        newList.materialName = materialData.materialName;  
        newList.materialSpec = materialData.materialSpec;  
        newList.materialModel = materialData.materialModel; 
        newList.materialUnitName = materialData.materialUnitName; 
        newList.materialUnitCode = materialData.materialUnitCode;
                    
        dispatch(actions.materialData(newList))
    },
    materialData: (val) => (dispatch, getState) => {   // modal data
        let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set("materialData", val);
        dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state });
    },
    editRow: (data, index) => (dispatch, getState) => {   // 新行数据
        let state = getState()[OHTER_WAREHOUSE_EDIT_DIALOG].set('editRow', data);
        dispatch({ type: OHTER_WAREHOUSE_EDIT_DIALOG, state });
        dispatch(OtherWarehouseEditAct.indexVal(index))
    },
    addNewRowToTable: (val) => (dispatch, getState) => {   // 插入表格
        let dataSource = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'initialOrderInfo']),
            tabledataSource = dataSource;
        let index = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'index']);
        tabledataSource[index] = val;
        dispatch(OtherWarehouseEditAct.changeOrderInfo(tabledataSource))
    }


}

export default actions
