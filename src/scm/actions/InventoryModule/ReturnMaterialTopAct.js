import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import * as REDU from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../TabsAct'
import ProductionListAct from './ProductionListAct';
let getStateFun = (getState) => {
    return getState()[REDU.TABSREDU];
}
let pageNumForOrderInfo = 10,
    pageNumForReceiveGoodsInfo = 10;
const actions = {
    setPageLoading: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.RETURN_MATERIAL_TOP_REDU].set("pageLoading", bool);
        dispatch({ type: REDU.RETURN_MATERIAL_TOP_REDU, state });
    },
    setReceiveBtnLoading: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.RETURN_MATERIAL_TOP_REDU].set("receiveBtnLoading", bool);
        dispatch({ type: REDU.RETURN_MATERIAL_TOP_REDU, state });
    },
    receiptHandle: (val) => (dispatch, getState) => {
        let documentNo = getState()[REDU.PRODUCTIONLISTREDU].get('takeOrderPm'),
            pm = { orderCode: documentNo, ...val };
        dispatch(actions.setReceiveBtnLoading(true));
        ReqApi.get({
            url: Urls.RECEIVE,
            pm: pm || {}
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.setReceiveBtnLoading(false));
                dispatch(TabsAct.TabRemove('inventoryReturnMaterialCont', 'inventoryProductionListCont'));
                message.success('收货成功');
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventoryProductionListCont'
                })) {
                    dispatch(ProductionListAct.PurchaseList({ page: 1, pageSize: 10, sourceOrderType: 33 }));
                }
                dispatch(TabsAct.TabAdd({ title: '生产退料单', key: 'inventoryProductionListCont' }));
            } else {
                dispatch(actions.setReceiveBtnLoading(false))
            }
        })
    },
    preReceiptInfoStatus: () => (dispatch, getState) => { // 查看预收货信息单状态  是否有‘未收货’
        let dataList = getState()[REDU.RETURN_MATERIAL_TABLE_TAB_REDU].getIn(['receiveGoodsTableData', 'dataSource']);
        if (dataList.length > 0 && dataList.some((list) => {
            return list.status == 1   // ture '未收货' --- 可以收货
        })) {
            return true;
        } else { // 没有数据   直接不可收货  弹窗
            return false;
        }
    },
    getInitialData: (pagePM) => (dispatch, getState) => {
        let documentNo = getState()[REDU.PRODUCTIONLISTREDU].get('takeOrderPm');
        dispatch(actions.setPageLoading(true));
        let orderInfoPM = { orderCode: documentNo, page: 1, pageSize: 10 }; // 订单信息参数
        if (pagePM) {  // 订单信息当前页码判断
            orderInfoPM = { ...orderInfoPM, ...pagePM }
        }
        return Promise.all([
            dispatch(actions.getPurchaseWareHouseFormInfo({ orderCode: documentNo })),
            dispatch(actions.getOrderInfoTableList(orderInfoPM)),
            dispatch(actions.getPreReceiveTableList({ orderCode: documentNo, page: 1, pageSize: 10, status: 0 })),
        ]).then(values => {
            dispatch(actions.setPageLoading(false));
            return true;
        }, reason => {
            dispatch(actions.setPageLoading(false));
            return true;
        });
    },
    getPurchaseWareHouseFormInfo: (pm = {}) => (dispatch, getState) => {  //get 采购入库单 信息总览
        return ReqApi.get({
            url: Urls.GET_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000 && json.data) {
                dispatch(actions.storePurchaseWareHouseFromInfo(json.data))
            }
        })
    },
    storePurchaseWareHouseFromInfo: (formInfo) => (dispatch, getState) => { // store 采购入库单 信息总览
        let state = getState()[REDU.RETURN_MATERIAL_TOP_REDU].setIn(['formInfo'], formInfo);
        dispatch({ type: REDU.RETURN_MATERIAL_TOP_REDU, state });
    },

    getOrderInfoTableList: (pm = {}) => (dispatch, getState) => { //get 采购入库单 订单信息
        return ReqApi.get({
            url: Urls.GET_ORDER_INFO,
            pm
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.storeOrderInfoTableList(json.data))
            }
            dispatch(actions.tableLoadingForOrderInfoTable(false));
        })
    },
    storeOrderInfoTableList: (val) => (dispatch, getState) => { //store 采购入库单 订单信息
        let { list, page, pageSize, total } = val;
        let state = getState()[REDU.RETURN_MATERIAL_TABLE_TAB_REDU].setIn(['orderInfoTableData', 'dataSource'], list).setIn(['orderInfoTableData', 'paging'], { page, pageSize, total });
        dispatch({ type: REDU.RETURN_MATERIAL_TABLE_TAB_REDU, state })
    },

    getPreReceiveTableList: (pm = {}) => (dispatch, getState) => { //get 采购入库单 预收货信息
        return ReqApi.get({
            url: Urls.GET_PRE_PUT_INFO,
            pm
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.storePreReceiveTableList(json.data))
            }
            dispatch(actions.tableLoadingForReceiveGoodsTable(false));
        })
    },
    storePreReceiveTableList: (val) => (dispatch, getState) => {// store 采购入库单 预收货信息
        let { list, page, pageSize, total } = val;
        let state = getState()[REDU.RETURN_MATERIAL_TABLE_TAB_REDU].setIn(['receiveGoodsTableData', 'dataSource'], list).setIn(['receiveGoodsTableData', 'paging'], { page, pageSize, total });
        dispatch({ type: REDU.RETURN_MATERIAL_TABLE_TAB_REDU, state })
    },
    tableLoadingForReceiveGoodsTable: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.RETURN_MATERIAL_TABLE_TAB_REDU].setIn(['receiveGoodsTableData', 'tableLoading'], bool)
        dispatch({ type: REDU.RETURN_MATERIAL_TABLE_TAB_REDU, state })
    },
    tablePagingForReceiveGoodsTable: (page) => (dispatch, getState) => {
        let loading = getState()[REDU.RETURN_MATERIAL_TOP_REDU].get("pageLoading"),
            documentNo = getState()[REDU.PRODUCTIONLISTREDU].get('takeOrderPm'),
            pm = { orderCode: documentNo, page: 1, pageSize: 10, status: 0 };
        dispatch(actions.tableLoadingForReceiveGoodsTable(true));
        if (!loading) {
            if (typeof page === "number") {
                pm.page = page;
                pm.pageSize = pageNumForReceiveGoodsInfo;
            } else {
                pageNumForReceiveGoodsInfo = page.pageSize;
                pm = { ...pm, ...page };
            };
            dispatch(actions.getPreReceiveTableList(pm))
        }
    },
    tableLoadingForOrderInfoTable: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.RETURN_MATERIAL_TABLE_TAB_REDU].setIn(['orderInfoTableData', 'tableLoading'], bool)
        dispatch({ type: REDU.RETURN_MATERIAL_TABLE_TAB_REDU, state })
    },
    tablePagingForOrderInfoTable: (page) => (dispatch, getState) => {
        let loading = getState()[REDU.RETURN_MATERIAL_TOP_REDU].get("pageLoading"),
            documentNo = getState()[REDU.PRODUCTIONLISTREDU].get('takeOrderPm'),
            pm = { page: 1, pageSize: 10 };
        dispatch(actions.tableLoadingForOrderInfoTable(true));
        if (!loading) {
            if (typeof page === "number") {
                pm.page = page;
                pm.pageSize = pageNumForOrderInfo;
            } else {
                pageNumForOrderInfo = page.pageSize;
                pm = { ...pm, ...page };
            };
            // page 参数 
            let state = getState()[REDU.RETURN_MATERIAL_TOP_REDU].set("orderinfoPagePm", pm);
            dispatch({ type: REDU.RETURN_MATERIAL_TOP_REDU, state });
            //
            dispatch(actions.getOrderInfoTableList(Object.assign({ orderCode: documentNo }, pm)))
        }
    },
    // 预收货信息删除
    onDelete: (index, id) => (dispatch, getState) => {
        let pm = { id: id }
        ReqApi.get({
            url: Urls.PRE_PUT_INFO_DELETE,
            pm: pm
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.getInitialData())
            }
        })
    }
}

export default actions