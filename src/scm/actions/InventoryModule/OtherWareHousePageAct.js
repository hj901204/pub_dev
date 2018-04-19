import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { OHERWAREHOUSEPAGEREDU, OTHERWAREHOUSEPAGEDETAILSREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import OtherWarehouseCarryOutAct from './OtherWarehouseCarryOutAct';
import OtherWarehouseEditAct from './OtherWarehouseEditAct';
import { message } from '../../../base/components/AntdComp'

const actions = {
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[OHERWAREHOUSEPAGEREDU].set(loading, value);
        dispatch({ type: OHERWAREHOUSEPAGEREDU, state });
    },
    takeOrderPm: (pm = {}) => (dispatch, getState) => {//执行传参
        let state = getState()[OHERWAREHOUSEPAGEREDU].set('takeOrderPm', pm);
        dispatch({ type: OHERWAREHOUSEPAGEREDU, state })
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
                let state = getState()[OTHERWAREHOUSEPAGEDETAILSREDU].set('takeOrderDetailsPm', json.data);
                dispatch({ type: OTHERWAREHOUSEPAGEDETAILSREDU, state })
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
                let state = getState()[OTHERWAREHOUSEPAGEDETAILSREDU].set('takeOrderDetailsListPm', json.data);
                dispatch({ type: OTHERWAREHOUSEPAGEDETAILSREDU, state })
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
                let state = getState()[OTHERWAREHOUSEPAGEDETAILSREDU].set('search', pm).set('dataSource', json.data.list).set('paging', { total: json.data.total, current: json.data.page, pageSize: json.data.pageSize });
                dispatch({ type: OTHERWAREHOUSEPAGEDETAILSREDU, state });
            }
            dispatch(actions.materialLoading(false));
            return json;

        });
    },
    materialLoading: (val) => (dispatch, getState) => {//详情传参获取物料列表查询Loading
        let state = getState()[OTHERWAREHOUSEPAGEDETAILSREDU].set('materialLoading', val);
        dispatch({ type: OTHERWAREHOUSEPAGEDETAILSREDU, state })
    },
    setLoading: (bool) => (dispatch, getState) => {//详情传参loading
        let state = getState()[OTHERWAREHOUSEPAGEDETAILSREDU].set('DetailsPmLoading', bool);
        dispatch({ type: OTHERWAREHOUSEPAGEDETAILSREDU, state })
    },
    takeOrderDelete: (pm = {}) => (dispatch, getState) => {//删除销售出库单行
        dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.GET_PURCHASE_DELETE,
            pm,
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.PurchaseList(getState()[OHERWAREHOUSEPAGEREDU].get('search')));
                return json;
            } else {
                dispatch(actions.tableLoading(false));
                return json;
            }
        });
    },
    tableLoading: (val) => (dispatch, getState) => {
        let state = getState()[OHERWAREHOUSEPAGEREDU].set('tableLoading', val);
        dispatch({ type: OHERWAREHOUSEPAGEREDU, state })
    },
    GetPurchaseList: (data, pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[OHERWAREHOUSEPAGEREDU].set('search', pm).set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: OHERWAREHOUSEPAGEREDU, state });
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
                dispatch(OtherWarehouseCarryOutAct.getInitialData())
                dispatch(TabsAct.TabAdd({ title: '执行其他入库单', key: 'inventoryOtherWarehouseCarryOutCont' }));
            } else if(json.status === 2000 && json.data.isLock == 1){
               message.success('此单据处于锁定中');
            }
        });
    },
    btnLoading: (val) => (dispatch, getState) => {
        let state = getState()[OHERWAREHOUSEPAGEREDU].set('btnLoading', val);
        dispatch({ type: OHERWAREHOUSEPAGEREDU, state })
    },
     BusCodeList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: Urls.PUB_BASIC_BUSCODE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
               let state = getState()[OHERWAREHOUSEPAGEREDU].set('busCodeData', json.data.list);
                dispatch({ type: OHERWAREHOUSEPAGEREDU, state });
            }
            return json;
        });
    },
     EditIslock: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.GET_TAKE_ISLOCK,
            pm
        }).then((json) => {
            if (json.status === 2000 && json.data.isLock == 0) {
                dispatch(actions.editOrderPm(pm.orderCode))   // -----------------------------
                dispatch(OtherWarehouseEditAct.getInfo())   // ---------------------------
                dispatch(TabsAct.TabAdd({ title: '编辑其他入库单', key: 'inventoryOtherWarehouseEditCont' }));  // -------------------
            } else if(json.status === 2000 && json.data.isLock == 1){
               message.success('此单据处于锁定中');
            }
        });
    },
    editOrderPm: (pm = {}) => (dispatch, getState) => {//编辑传参
        let state = getState()[OHERWAREHOUSEPAGEREDU].set('editOrderPm', pm);
        dispatch({ type: OHERWAREHOUSEPAGEREDU, state })
    }
}

export default actions
