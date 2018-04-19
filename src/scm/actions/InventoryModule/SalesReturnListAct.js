import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { SALES_RETURN_LIST_REDU, SALESRETURNDETAILSREDU, ADDRETURNSALESLISTREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import SalesReturnStoreEidtTopAct from '../../actions/InventoryModule/SalesReturnStoreEidtTopAct'
import { message } from '../../../base/components/AntdComp'

const actions = {
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[SALES_RETURN_LIST_REDU].set(loading, value);
        dispatch({ type: SALES_RETURN_LIST_REDU, state });
    },
    // openSideBar: (value, pm = {}) => (dispatch, getState) => {
    //     dispatch(actions.loading('openSideBarLoading', true))
    //     let state = getState()[SALES_RETURN_LIST_REDU].set('side_visible', value);
    //     dispatch({ type: SALES_RETURN_LIST_REDU, state })
    //     if (value == true) {
    //         return ReqApi.get({
    //             url: Urls.GET_RETURN_SIDE,
    //             pm
    //         }).then((json) => {
    //             if (json.status === 2000) {
    //                 let state = getState()[SALES_RETURN_LIST_REDU].set('dataSourceSide', json.data.saleReturnDetails).set('openSideBarList', json.data);
    //                 dispatch({ type: SALES_RETURN_LIST_REDU, state });
    //             }
    //             dispatch(actions.loading('openSideBarLoading', false))
    //             return json;
    //         });
    //     }
    // },
    // openSideBarSub: (value, pm = {}) => (dispatch, getState) => {
    //     // dispatch(actions.loading('openSideBarSubLoading',true))
    //     let state = getState()[SALES_RETURN_LIST_REDU].set('side_visible_sub', value).set('suplierData', pm);
    //     dispatch({ type: SALES_RETURN_LIST_REDU, state })
    //     // dispatch(actions.loading('openSideBarSubLoading',false))
    // },
    takeOrderPm: (pm = {}) => (dispatch, getState) => {//执行传参
        let state = getState()[SALES_RETURN_LIST_REDU].set('takeOrderPm', pm);
        dispatch({ type: SALES_RETURN_LIST_REDU, state })
    },
    details: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.setLoading(true));
        Promise.all([
            dispatch(actions.takeOrderDetailsPm({ orderCode: pm })),
            dispatch(actions.takeOrderDetailsListPm({ orderCode: pm, pageFlag: 0,status:2 })),
            dispatch(actions.takeOrderDetailsMaterialPm({ orderCode: pm, page: 1, pageSize: 10 })),
        ]).then(values => {
            dispatch(actions.setLoading(false))
        }, reason => {
            dispatch(actions.setLoading(false))
        });
    },
    takeOrderDetailsPm: (pm = {}) => (dispatch, getState) => {//详情传参获取主界面信息
        return ReqApi.get({
            url: Urls.GET_DETAIL,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[SALESRETURNDETAILSREDU].set('takeOrderDetailsPm', json.data);
                dispatch({ type: SALESRETURNDETAILSREDU, state })
            }
            return json;
        });
    },
    takeOrderDetailsListPm: (pm = {}) => (dispatch, getState) => {//详情传参获取收货记录信息
        return ReqApi.get({
            url: Urls.GET_PRE_PUT_INFO,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[SALESRETURNDETAILSREDU].set('takeOrderDetailsListPm', json.data);
                dispatch({ type: SALESRETURNDETAILSREDU, state })
            }
            return json;
        });
    },
    takeOrderDetailsMaterialPm: (pm = {}) => (dispatch, getState) => {//详情传参获取物料列表查询
        dispatch(actions.materialLoading(true));
        return ReqApi.get({
            url: Urls.GET_ORDER_INFO,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[SALESRETURNDETAILSREDU].set('search', pm).set('dataSource', json.data.list).set('paging', { total: json.data.total, current: json.data.page, pageSize: json.data.pageSize });
                dispatch({ type: SALESRETURNDETAILSREDU, state });
            }
            dispatch(actions.materialLoading(false));
            return json;

        });
    },
    materialLoading: (val) => (dispatch, getState) => {//详情传参获取物料列表查询Loading
        let state = getState()[SALESRETURNDETAILSREDU].set('materialLoading', val);
        dispatch({ type: SALESRETURNDETAILSREDU, state })
    },
    setLoading: (bool) => (dispatch, getState) => {//详情传参loading
        let state = getState()[SALESRETURNDETAILSREDU].set('DetailsPmLoading', bool);
        dispatch({ type: SALESRETURNDETAILSREDU, state })
    },
    takeOrderDelete: (pm = {}) => (dispatch, getState) => {//删除销售出库单行
        dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.GET_PURCHASE_DELETE,
            pm,
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.PurchaseList(getState()[SALES_RETURN_LIST_REDU].get('search')));
                 return json;
            } else {
                dispatch(actions.tableLoading(false));
                return json;
            }
            return json;
        });
    },
    tableLoading: (val) => (dispatch, getState) => {
        let state = getState()[SALES_RETURN_LIST_REDU].set('tableLoading', val);
        dispatch({ type: SALES_RETURN_LIST_REDU, state })
    },
    GetPurchaseList: (data, pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[SALES_RETURN_LIST_REDU].set('search', pm).set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SALES_RETURN_LIST_REDU, state });
    },
    PurchaseList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.GET_PURCHASELIST,
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
    GetIslock: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.GET_TAKE_ISLOCK,
            pm
        }).then((json) => {
            if (json.status === 2000 && json.data.isLock == 0) {
                dispatch(actions.takeOrderPm(pm.orderCode))
                dispatch(SalesReturnStoreEidtTopAct.getInitialData());
                dispatch(TabsAct.TabAdd({ title: '执行销售退货入库单', key: 'inventorySalesReturnStoreCont' }));
            } else if(json.status === 2000 && json.data.isLock == 1){
                message.success('此单据处于锁定中');
            }
        });
    },
    btnLoading: (val) => (dispatch, getState) => {
        let state = getState()[SALES_RETURN_LIST_REDU].set('btnLoading', val);
        dispatch({ type: SALES_RETURN_LIST_REDU, state })
    },

}

export default actions
