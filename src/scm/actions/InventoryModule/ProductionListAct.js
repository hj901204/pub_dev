import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { PRODUCTIONLISTREDU, PRODUCTIONDETAILSREDU, ADDPRODUCTIONREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import ReturnMaterialTopAct from '../../actions/InventoryModule/ReturnMaterialTopAct'
import { message } from '../../../base/components/AntdComp'

const actions = {
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONLISTREDU].set(loading, value);
        dispatch({ type: PRODUCTIONLISTREDU, state });
    },
    // openSideBar: (value, pm = {}) => (dispatch, getState) => {
    //     dispatch(actions.loading('openSideBarLoading', true))
    //     let state = getState()[PRODUCTIONLISTREDU].set('side_visible', value);
    //     dispatch({ type: PRODUCTIONLISTREDU, state })
    //     if (value == true) {
    //         return ReqApi.get({
    //             url: Urls.GET_PRODUCTION_SIDE,
    //             pm
    //         }).then((json) => {
    //             if (json.status === 2000) {
    //                 let state = getState()[PRODUCTIONLISTREDU].set('dataSourceSide', json.data.list).set('openSideBarList', json.data);
    //                 dispatch({ type: PRODUCTIONLISTREDU, state });
    //             }
    //             dispatch(actions.loading('openSideBarLoading', false))
    //             return json;
    //         });
    //     }
    // },
    // openSideBarSub: (value, pm = {}) => (dispatch, getState) => {
    //     // dispatch(actions.loading('openSideBarSubLoading',true))
    //     let state = getState()[PRODUCTIONLISTREDU].set('side_visible_sub', value).set('suplierData', pm);
    //     dispatch({ type: PRODUCTIONLISTREDU, state })
    //     // dispatch(actions.loading('openSideBarSubLoading',false))
    // },
    takeOrderPm: (pm = {}) => (dispatch, getState) => {//执行传参
        let state = getState()[PRODUCTIONLISTREDU].set('takeOrderPm', pm);
        dispatch({ type: PRODUCTIONLISTREDU, state })
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
                let state = getState()[PRODUCTIONDETAILSREDU].set('takeOrderDetailsPm', json.data);
                dispatch({ type: PRODUCTIONDETAILSREDU, state })
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
                let state = getState()[PRODUCTIONDETAILSREDU].set('takeOrderDetailsListPm', json.data);
                dispatch({ type: PRODUCTIONDETAILSREDU, state })
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
                let state = getState()[PRODUCTIONDETAILSREDU].set('search', pm).set('dataSource', json.data.list).set('paging', { total: json.data.total, current: json.data.page, pageSize: json.data.pageSize });
                dispatch({ type: PRODUCTIONDETAILSREDU, state });
            }
            dispatch(actions.materialLoading(false));
            return json;

        });
    },
    materialLoading: (val) => (dispatch, getState) => {//详情传参获取物料列表查询Loading
        let state = getState()[PRODUCTIONDETAILSREDU].set('materialLoading', val);
        dispatch({ type: PRODUCTIONDETAILSREDU, state })
    },
    setLoading: (bool) => (dispatch, getState) => {//详情传参loading
        let state = getState()[PRODUCTIONDETAILSREDU].set('DetailsPmLoading', bool);
        dispatch({ type: PRODUCTIONDETAILSREDU, state })
    },
    takeOrderDelete: (pm = {}) => (dispatch, getState) => {//删除销售出库单行
        dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.GET_PURCHASE_DELETE,
            pm,
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.PurchaseList(getState()[PRODUCTIONLISTREDU].get('search')));
                return json;
            } else {
                dispatch(actions.tableLoading(false));
                return json;
            }
        });
    },
    tableLoading: (val) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONLISTREDU].set('tableLoading', val);
        dispatch({ type: PRODUCTIONLISTREDU, state })
    },
    GetPurchaseList: (data, pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PRODUCTIONLISTREDU].set('search', pm).set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: PRODUCTIONLISTREDU, state });
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
                dispatch(ReturnMaterialTopAct.getInitialData());
                dispatch(TabsAct.TabAdd({ title: '执行生产退料单', key: 'inventoryReturnMaterialCont' }));
            } else if(json.status === 2000 && json.data.isLock == 1) {
                message.success('此单据处于锁定中');
            }
        });
    },
    btnLoading: (val) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONLISTREDU].set('btnLoading', val);
        dispatch({ type: PRODUCTIONLISTREDU, state })
    },
}

export default actions
