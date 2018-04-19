//生产订单
import { ReqApi } from '../../../base/services/ReqApi'
import ProductionUrls from '../../consts/ProductionUrls';
import PurchaseUrls from '../../consts/PurchaseUrls';
import { Urls } from '../../../base/consts/urls';
import { PRODUCTIONREDU } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
const actions = {
    ProductionList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: ProductionUrls.PRODUCTION_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetProductionList(json.data));
            }

            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].set('tabLoading', value);
        dispatch({ type: PRODUCTIONREDU, state });
    },
    //概览Act-----------------------------------------------------------------
    // ProductionCode:(orderCode) => (dispatch, getState) => {
    //         dispatch(actions.ProductionViewTable({orderCode:orderCode}));
    //     },
    // ProductionViewTable: (pm = {}) => (dispatch, getState) => {
    //     let orderCode=pm.orderCode;
    //     dispatch(actions.TabLoading(true));
    //     return ReqApi.post({
    //         url: PurchaseUrls.GETDETAILBYCODE,
    //         pm
    //     }).then((json) => {
    //         if (json.status == 2000) {
    //             dispatch(actions.GetProductionTableList(json.data,orderCode));
    //         }

    //         dispatch(actions.TabLoading(false));
    //         return json;
    //     });
    // },
    //  GetProductionTableList: (data,orderCode) => (dispatch, getState) => {
    //     let { list, total, page, pageSize } = data;
    //     let state = getState()[PRODUCTIONREDU].set('ProductionViewData', list);
    //     dispatch({ type: PRODUCTIONREDU, state });
    // },

    //----------------------------------------------------------------------------------------------- 
    GetProductionList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let statusO = { status: '启用' }
        let statusN = { status: '禁用' }
        // for (let x in list) {
        //     if (list[x].status == '1') {
        //         Object.assign(list[x], statusO);
        //     } else {
        //         Object.assign(list[x], statusN);
        //     }

        // }

        let state = getState()[PRODUCTIONREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: PRODUCTIONREDU, state });
    },
    ProductionDel: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: ProductionUrls.PRODUCTION_DEL,
            pm
        }).then(json => {
            dispatch(actions.ProductionList({ page: 1, pageSize: 10 }))
        })
    },
    ProductionDetailData: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.ProOrdViewLoading(true));
        ReqApi.post({
            url: ProductionUrls.PRODUCTION_GETDETAIL,
            pm
        }).then(json => {
            let state = getState()[PRODUCTIONREDU].set('ProViewData', json.data);
            dispatch({ type: PRODUCTIONREDU, state });
            dispatch(actions.ProOrdViewLoading(false));
        })
    },

    //销售订单弹窗
    SourceCodeDilog: (type, value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].setIn([type, 'sourceCodeDilog'], value).set('typeInt', type);
        dispatch({ type: PRODUCTIONREDU, state });
    },
    OrderSourceLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].set('orderSourceLoading', value);
        dispatch({ type: PRODUCTIONREDU, state });
    },

    Getsalelist: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.OrderSourceLoading(true));
        return ReqApi.get({
            url: ProductionUrls.PRODUCTION_SALELIST,
            pm
        }).then((json) => {
            dispatch(actions.GetsalelistData(json.data));
            dispatch(actions.OrderSourceLoading(false));
            return json;
        });
    },
    GetsalelistData: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PRODUCTIONREDU].set('saleList', list)
            .set("diaPaging", { total, current: page, pageSize });
        dispatch({ type: PRODUCTIONREDU, state })
    },
    SourceCancel: (type, value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].setIn([type, 'sourceCodeDilog'], value);
        dispatch({ type: PRODUCTIONREDU, state })
    },
    ProductCode: (code, materialCode, orderCode, productionNumber, measureUnitName, lineNumber, materialUnit, type) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].setIn([type, 'productValue'], code)
            .setIn([type, 'materialCode'], materialCode)
            .setIn([type, 'orderCode'], orderCode)
            .setIn([type, 'productionNumber'], productionNumber)
            .setIn([type, "measureUnitName"], measureUnitName)
            .setIn([type, "lineNumber"], lineNumber)
            .setIn([type, 'materialUnit'], materialUnit)
            .set('resetRecord', false);
        dispatch({ type: PRODUCTIONREDU, state })
    },

    BomCodeSelect: (pm = {}, type, updateBom) => (dispatch, getState) => {
        return ReqApi.get({
            url: ProductionUrls.PRODUCTION_GETBOM,
            pm
        }).then((json) => {
            if (json.data) {
                let state = getState()[PRODUCTIONREDU].setIn([type, 'bomVersion'], json.data.version)
                    .set("updateBom", updateBom);
                dispatch({ type: PRODUCTIONREDU, state });
                return json.data;
            } else {
                let state = getState()[PRODUCTIONREDU].setIn([type, 'bomCode'], "")
                    .setIn([type, 'bomVersion'], "")
                    .set("updateBom", updateBom);
                dispatch({ type: PRODUCTIONREDU, state });
            }

        });
    },
    getSiteAll: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: ProductionUrls.SITE_ALLLIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let state = getState()[PRODUCTIONREDU].set('getSiteData', json.data.list);
                dispatch({ type: PRODUCTIONREDU, state })
            }
        });
    },
    FreightSpace: (pm = {}, type) => (dispatch, getState) => {
        ReqApi.get({
            url: ProductionUrls.FREIGHTSPACE_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let state = getState()[PRODUCTIONREDU].setIn([type, 'getFreightSpaceData'], json.data.list);
                dispatch({ type: PRODUCTIONREDU, state })
            }
        });
    },
    getDepartment: (pm = {}, type) => (dispatch, getState) => {
        ReqApi.get({
            url: ProductionUrls.DEPARTMENT_LIST,
            pm
        }).then(json => {
            dispatch(actions.get_pDeptName(json.data.list, type));
            // if (type == "add") {
            //     let state = getState()[PRODUCTIONREDU].setIn([type, 'productValue'], "")
            //         .setIn([type, 'materialCode'], "")
            //         .setIn([type, 'orderCode'], "")
            //         .setIn([type, 'productionNumber'], "")
            //         .setIn([type, "measureUnitName"], "")
            //         .setIn([type, "lineNumber"], "")
            //         .setIn([type, 'materialUnit'], "");
            //     dispatch({ type: PRODUCTIONREDU, state })
            // }
        })
    },
    get_pDeptName: (data, type) => (dispatch, getState) => {

        let state = getState()[PRODUCTIONREDU].setIn([type, 'pDeptName'], data);
        dispatch({ type: PRODUCTIONREDU, state })
    },
    EditProOrdLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].set('editProOrdLoading', value);
        dispatch({ type: PRODUCTIONREDU, state });
    },
    AddProOrdLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].set('addProOrdLoading', value);
        dispatch({ type: PRODUCTIONREDU, state });
    },
    ProOrdViewLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONREDU].set('proOrdViewLoading', value);
        dispatch({ type: PRODUCTIONREDU, state });
    },
    EditProOrderDetail: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.EditProOrdLoading(true));
        ReqApi.get({
            url: ProductionUrls.PRODUCTION_GETDETAIL,
            pm
        }).then((json) => {
            let state = getState()[PRODUCTIONREDU].set('getDetailList', json.data)
                .setIn(["edit", 'getFreightSpaceData'], [{ code: json.data.presetPosition, name: json.data.presetPositionName}]);
            dispatch({ type: PRODUCTIONREDU, state })
            dispatch(actions.Getsalelist({ orderCode: json.data.sourceCode, materialCode: json.data.productCode }));
            dispatch(actions.EditProOrdLoading(false));
        });
    },
    // resetRecord: (value) => (dispatch, getState) => {
    //     let state = getState()[PRODUCTIONREDU].set('resetRecord', value)
    //         .setIn(['add','bomCode'],"");
    //     dispatch({ type: PRODUCTIONREDU, state });
    // },
    Production_Add: (pm = {}, back) => (dispatch, getState) => {
        dispatch(actions.AddProOrdLoading(true));
        return ReqApi.post({
            url: ProductionUrls.PRODUCTION_ADD,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                message.success('保存成功！');
                dispatch(actions.ProductionList({ "page": 1, "pageSize": 10 }))
                if (back) {
                    dispatch(TabsAct.TabRemove("addProductionCont", "production"));
                }
                let state = getState()[PRODUCTIONREDU].set('resetRecord', true).setIn(['add', 'bomCode'], "")
                    .setIn(['add', 'orderCode'], "")
                    .setIn(['add', 'productValue'], "")
                    .setIn(['add', 'productionNumber'], "")
                dispatch({ type: PRODUCTIONREDU, state })
            }
            dispatch(actions.AddProOrdLoading(false));
            return json;
        });

    },
    Production_Edit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.EditProOrdLoading(true));
        ReqApi.post({
            url: ProductionUrls.PRODUCTION_EDIT,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(TabsAct.TabRemove("editProductionCont", "production"));
                dispatch(actions.ProductionList({ "page": 1, "pageSize": 10 }))

            }
            dispatch(actions.EditProOrdLoading(false));
        });
    },
    //生产订单更多操作
    ProductionStatus: (status, pm = {}) => (dispatch, getState) => {
        dispatch(actions.ProOrdViewLoading(true));
        return ReqApi.post({
            url: ProductionUrls.PRODUCTION_STATUS(status),
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.ProductionDetailData(pm));
                dispatch(actions.ProductionList({ "page": 1, "pageSize": 10 }))
                return json;
            } else {
                dispatch(actions.ProOrdViewLoading(false));
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