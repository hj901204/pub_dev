/**
 *  其他入库单 执行界面
 */
import { ReqApi } from '../../../base/services/ReqApi'
import * as REDU from '../../consts/ActTypes';
import { Urls } from '../../consts/InventoryUrls'
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../TabsAct';
import OtherWareHousePageAct from './OtherWareHousePageAct';
let getStateFun = (getState) => {
    return getState()[REDU.TABSREDU];
}
// 获取订单编码
let wareHouseOrderCode = (getState) => {
    return getState()[REDU.OHERWAREHOUSEPAGEREDU].get('takeOrderPm');
}
let pageNumForOrderInfo = 10,
    pageNumForReceiveGoodsInfo = 10;
const actions = {
    setPageLoading: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].set("pageLoading", bool);
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT, state });
    },
    setReceiveBtnLoading: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].set("receiveBtnLoading", bool);
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT, state });
    },
    receiptHandle: (val) => (dispatch, getState) => {
        let documentNo = wareHouseOrderCode(getState),
            pm = { orderCode: documentNo, ...val };
        dispatch(actions.setReceiveBtnLoading(true));
        ReqApi.get({
            url: Urls.RECEIVE,
            pm: pm || {}
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.setReceiveBtnLoading(false));
                dispatch(TabsAct.TabRemove('inventoryOtherWarehouseCarryOutCont', 'inventoryOtherWareHousePageCont'));
                message.success('收货成功');
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventoryOtherWareHousePageCont'
                })) {
                    dispatch(OtherWareHousePageAct.PurchaseList({ page: 1, pageSize: 10, sourceOrderType: 89 }));
                }
                dispatch(TabsAct.TabAdd({ title: '其他入库单', key: 'inventoryOtherWareHousePageCont' }));
            } else {
                dispatch(actions.setReceiveBtnLoading(false));
            }
        })
    },
    preReceiptInfoStatus: () => (dispatch, getState) => { // 查看预收货信息单状态  是否有‘未收货’
        let dataList = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE].getIn(['receiveGoodsTableData', 'dataSource']);
        if (dataList.length > 0 && dataList.some((list) => {
            return list.status == 1
        })) {
            return true;
        } else {
            return false;
        }
    },
    getInitialData: (pagePM) => (dispatch, getState) => {
        let orderCode = wareHouseOrderCode(getState);
        dispatch(actions.setPageLoading(true));
        let orderInfoPM = { orderCode: orderCode, page: 1, pageSize: 10 }; // 订单信息参数
        if (pagePM) {  // 订单信息当前页码判断
            orderInfoPM = { ...orderInfoPM, ...pagePM }
        }
        return Promise.all([
            dispatch(actions.getPurchaseWareHouseFormInfo({ orderCode: orderCode })),
            dispatch(actions.getOrderInfoTableList(orderInfoPM)),
            dispatch(actions.getPreReceiveTableList({ orderCode: orderCode, page: 1, pageSize: 10, status: 0 })),
        ]).then(values => {
            dispatch(actions.setPageLoading(false));
            return true;
        }, reason => {
            dispatch(actions.setPageLoading(false));
            return true;
        });
    },
    getPurchaseWareHouseFormInfo: (pm = {}) => (dispatch, getState) => {  //get 其他入库单 信息总览
        return ReqApi.get({
            url: Urls.GET_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000 && json.data) {
                dispatch(actions.storePurchaseWareHouseFromInfo(json.data))
            }
        })
    },
    storePurchaseWareHouseFromInfo: (formInfo) => (dispatch, getState) => { // store 其他入库单 信息总览
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].setIn(['formInfo'], formInfo);
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT, state });
    },

    getOrderInfoTableList: (pm = {}) => (dispatch, getState) => { //get 其他入库单 订单信息
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
    storeOrderInfoTableList: (val) => (dispatch, getState) => { //store 其他入库单 订单信息
        let { list, page, pageSize, total } = val;
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE].setIn(['orderInfoTableData', 'dataSource'], list).setIn(['orderInfoTableData', 'paging'], { page, pageSize, total });
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE, state })
    },

    getPreReceiveTableList: (pm = {}) => (dispatch, getState) => { //get 其他入库单 预收货信息
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
    storePreReceiveTableList: (val) => (dispatch, getState) => {// store 其他入库单 预收货信息
        let { list, page, pageSize, total } = val;
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE].setIn(['receiveGoodsTableData', 'dataSource'], list).setIn(['receiveGoodsTableData', 'paging'], { page, pageSize, total });
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE, state })
    },
    tableLoadingForReceiveGoodsTable: (bool) => (dispatch, getState) => {
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE].setIn(['receiveGoodsTableData', 'tableLoading'], bool)
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE, state })
    },
    tablePagingForReceiveGoodsTable: (page) => (dispatch, getState) => {
        let loading = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].get("pageLoading"),
            documentNo = wareHouseOrderCode(getState),  // 单据号
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
        let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE].setIn(['orderInfoTableData', 'tableLoading'], bool)
        dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT_TABLE, state })
    },
    tablePagingForOrderInfoTable: (page) => (dispatch, getState) => {
        let loading = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].get("pageLoading"),
            documentNo = wareHouseOrderCode(getState),  // 单据号
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
            let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].set("orderinfoPagePm", pm);
            dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT, state });
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
    },
    handleClose: () => (dispatch, getState) => {
        let orderInfoList = getState()[REDU.PRODUCTION_STORAGE_TABLE_TAB_REDU].getIn(['orderInfoTableData', 'dataSource']);
        if (orderInfoList.some((data) => {
            return data.beforehandDeliveryAmount != data.receivedAmount;
        })) {
            let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].set('message', '有预收货货物待收货确认，是否仍要关闭?')
            dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT, state });
        } else {
            let state = getState()[REDU.OTHER_WAREHOUSE_CARRYOUT].set('message', '是否确认关闭当前入库单?')
            dispatch({ type: REDU.OTHER_WAREHOUSE_CARRYOUT, state });
        }

    },
    confirmCloseHandler: () => (dispatch, getState) => {
        let orderCode = wareHouseOrderCode(getState),
            pm = { orderCode: orderCode };
        return ReqApi.get({
            url: Urls.PUT_CLOASE,
            pm: pm || {}
        }).then(json => {
            if (json.status == 2000) {
                dispatch(TabsAct.TabRemove('inventoryOtherWarehouseCarryOutCont', 'inventoryOtherWareHousePageCont'));
                if (getStateFun(getState).get('tabs').some((tab) => {
                    return tab.key == 'inventoryOtherWareHousePageCont'
                })) {
                    dispatch(OtherWareHousePageAct.PurchaseList({ page: 1, pageSize: 10, sourceOrderType: 89 }));
                }
                dispatch(TabsAct.TabAdd({ title: '其他入库单', key: 'inventoryOtherWareHousePageCont' }))
            }
        })
    }
}

export default actions