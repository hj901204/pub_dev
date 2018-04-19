//生产退料申请单
import { ReqApi } from '../../../base/services/ReqApi'
import ProductionReturnUrls from '../../consts/ProductionReturnUrls';
import { Urls } from '../../../base/consts/urls';
import { PRODUCTIONRETURNREDU } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
const actions = {
    ProductionReturnList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: ProductionReturnUrls.PRODUCTIONRETURN_GETLIST,
            pm
        }).then((json) => {
            dispatch(actions.GetProductionReturnList(json.data,pm));
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRETURNREDU].set('tabLoading', value);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },
    ProReturnLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRETURNREDU].set('proReturnLoading', value);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },
    //概览Act-----------------------------------------------------------------
    ProductionReturnViewData: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.ProReturnLoading(true));
        return ReqApi.get({
            url: ProductionReturnUrls.PRODUCTIONRETURN_GETDETAIL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetProRetViewData(json.data));
            }
            dispatch(actions.ProReturnLoading(false));
            return json;
        });
    },
    GetProRetViewData: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PRODUCTIONRETURNREDU].set('proReturnViewData', data);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },

    //----------------------------------------------------------------------------------------------- 
    GetProductionReturnList: (data,pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PRODUCTIONRETURNREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize })
            .set("newPM",pm);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },

    //生产退料新增
    ProductionOrderList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: ProductionReturnUrls.PRODUCTION_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let state = getState()[PRODUCTIONRETURNREDU].setIn([type, 'productionOrderList'], json.data.list);
                dispatch({ type: PRODUCTIONRETURNREDU, state });
            }
        });
    },
    GetDepartment: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.AddProductionReturnLoading(true));
        ReqApi.get({
            url: ProductionReturnUrls.DEPARTMENT_LIST,
            pm
        }).then(json => {
            if (json.status == 2000) {
                let state = getState()[PRODUCTIONRETURNREDU].setIn([type, 'deptList'], json.data.list)
                .setIn([type, 'empList'], [])
                dispatch({ type: PRODUCTIONRETURNREDU, state });
            }
            dispatch(actions.AddProductionReturnLoading(false));
        })
    },
    ProductionOrderDetail: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: ProductionReturnUrls.PRODUCTION_GETDETAIL,
            pm
        }).then(json => {
            if (json.status == 2000) {
                if(json.data){
                    let state = getState()[PRODUCTIONRETURNREDU].setIn([type, 'productionOrg'], json.data.productionOrg);
                    dispatch({ type: PRODUCTIONRETURNREDU, state });
                } 
            }
            return json;
        })
    },
    EmpList: (pm = {}, type) => (dispatch, getState) => {
        ReqApi.get({
            url: ProductionReturnUrls.EMPLOYEES_GETLIST,
            pm
        }).then(json => {
            if (json.status == 2000) {
                let state = getState()[PRODUCTIONRETURNREDU].setIn([type, 'empList'], json.data.list);
                dispatch({ type: PRODUCTIONRETURNREDU, state });
            }
        })
    },
    ProEdit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EditProductionReturnLoading(true));
        let state = getState()[PRODUCTIONRETURNREDU].setIn(['edit', 'empList'], []);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
        return ReqApi.get({
            url: ProductionReturnUrls.PROEDIT,
            pm
        }).then(json=>{
            return json;
        })
    },
    GetProductionReturnDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EditProductionReturnLoading(true));
        return ReqApi.get({
            url: ProductionReturnUrls.PRODUCTIONRETURN_GETDETAIL,
            pm
        }).then(json => {
            if (json.status == 2000) {
                let state = getState()[PRODUCTIONRETURNREDU].set('ReturnGetDetail', json.data)
                    .set('EditReturnDataSource', json.data.list);
                dispatch({ type: PRODUCTIONRETURNREDU, state });
            }
            dispatch(actions.EditProductionReturnLoading(false));
            return json;
        })
    },
    resetNull: (type) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRETURNREDU].setIn([type, 'productionOrg'], "")
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },
    ProductionReturn_Add: (pm = {}, back) => (dispatch, getState) => {
        dispatch(actions.AddProductionReturnLoading(true));
        let pt = getState()[PRODUCTIONRETURNREDU].get("newPM");
        return ReqApi.post({
            url: ProductionReturnUrls.PRODUCTIONRETURN_ADD,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                message.success('保存成功！');
                dispatch(actions.ProductionReturnList(pt));
                dispatch(actions.resetNull('add'));
                if (back) {
                    dispatch(TabsAct.TabRemove("addProductionReturnCont", "productionReturn"));
                    
                }
            }
            dispatch(actions.AddProductionReturnLoading(false));
            return json;
        });

    },
    ProductionReturn_Edit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EditProductionReturnLoading(true));
        let pt = getState()[PRODUCTIONRETURNREDU].get("newPM");
        ReqApi.post({
            url: ProductionReturnUrls.PRODUCTIONRETURN_EDIT,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                message.success('编辑成功！');
                dispatch(TabsAct.TabRemove("editProductionReturnCont", "productionReturn"));
                dispatch(actions.ProductionReturnList(pt));

            }
            dispatch(actions.EditProductionReturnLoading(false));
        });
    },

    EditProductionReturnLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRETURNREDU].set('editProductionReturnLoading', value);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },
    AddProductionReturnLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRETURNREDU].set('addProductionReturnLoading', value);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },
    ReturnTabLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRETURNREDU].set('returnTabLoading', value);
        dispatch({ type: PRODUCTIONRETURNREDU, state });
    },
    ReturnDataSource: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.ReturnTabLoading(true));
        return ReqApi.get({
            url: ProductionReturnUrls.GETLISTBYORDER,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (type == 'add') {
                    let state = getState()[PRODUCTIONRETURNREDU].set('AddReturnDataSource', json.data.list);
                    dispatch({ type: PRODUCTIONRETURNREDU, state });
                } else {
                    let state = getState()[PRODUCTIONRETURNREDU].set('EditReturnDataSource', json.data.list);
                    dispatch({ type: PRODUCTIONRETURNREDU, state });
                }
            }
            dispatch(actions.ReturnTabLoading(false));
            return json.data.list||[];
        });
    },
    NullReturnDataSource: (type) => (dispatch, getState) => {
        if (type == 'add') {
            let state = getState()[PRODUCTIONRETURNREDU].set('AddReturnDataSource', []).setIn([type, 'empList'], []);
            dispatch({ type: PRODUCTIONRETURNREDU, state });
        } else {
            let state = getState()[PRODUCTIONRETURNREDU].set('EditReturnDataSource', []);
            dispatch({ type: PRODUCTIONRETURNREDU, state });
        }

    },
    // UpdateReturnDataSource :(pm = {},type) => (dispatch, getState) => {
    //     dispatch(actions.NullReturnDataSource(type));
    //     dispatch(actions.ReturnTabLoading(true));
    //     ReqApi.get({
    //         url: ProductionReturnUrls.GETLISTBYORDER,
    //         pm
    //     }).then((json) => {
    //         if (json.status == 2000) {
    //             let state = getState()[PRODUCTIONRETURNREDU].set('EditReturnDataSource', json.data.list)
    //             dispatch({ type: PRODUCTIONRETURNREDU, state });
    //         } 
    //         dispatch(actions.ReturnTabLoading(false));
    //     });
    // },
    DelProductionReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        let pt = getState()[PRODUCTIONRETURNREDU].get("newPM");
        ReqApi.post({
            url: ProductionReturnUrls.DELPRODUCTIONRETURN,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                message.success('删除成功！');
                dispatch(actions.ProductionReturnList(pt))
            }
            dispatch(actions.TabLoading(false));
        });
    },

    //生产退料单更多操作
    ProRetnStatus: (status, pm = {}) => (dispatch, getState) => {
        let pt = getState()[PRODUCTIONRETURNREDU].get("newPM");
        dispatch(actions.ProReturnLoading(true));
        ReqApi.post({
            url: ProductionReturnUrls.PRODUCTION_RETURN_STATUS(status),
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.ProductionReturnViewData(pm));
                dispatch(actions.ProductionReturnList(pt));
            } else {
                dispatch(actions.ProReturnLoading(false));
            }
        });
    },

    GetCodeRule: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GET_CODERULE,
            pm
        }).then(json => {
            return json;
        })
    },  
}
export default actions;
