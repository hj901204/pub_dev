import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import { OTHE_WAREHOUSE_EIDT, OTHER_WAREHOUSE_CARRYOUT, OHERWAREHOUSEPAGEREDU, TABSREDU } from '../../consts/ActTypes'
import TabsAct from '../TabsAct'
import OtherWareHousePageAct from './OtherWareHousePageAct'
import { message } from '../../../base/components/AntdComp'

// 获取订单编码
let wareHouseOrderCode = (getState) => {
    return getState()[OHERWAREHOUSEPAGEREDU].get('editOrderPm');
}

let getStateFun = (getState) => {
    return getState()[TABSREDU];
}

const actions = {
    //--- form
    loading: (loading, value) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', loading], value);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //站点自动补全
    onAutochange: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.PUB_BASIC_SITE_GETLIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'searchSource'], json.data.list);
                dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
            }
        });
    },
    //保存
    sendSave: (formInfo = {}) => (dispatch, getState) => {
        formInfo.status = 1;
        let tableDataList = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'tableData']),
            delTableDataList = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'delRows']);
        let temp, x = tableDataList;
         if(x.length==0){
           message.info('明细项不能为空');
        }else if (x.some((item) => {
            return item.isEdit == 1
        })) {
            message.info('请确认订单信息');
        } else if (x.some((item) => {
            return item.materialCode == ""||item.planAmount==""
        })) {
            message.info('明细项物料编码,计划数量不能为空');
        }else {
            dispatch(actions.loading('saveLoading', true))
            dispatch(actions.loading('pageloading', true))
            // for (var i = x.length - 1; i >= 0; i--) {
            //     if (x[i].materialCode == '') { // 为空行
            //         temp = x.splice(i, 1);
            //     }
            // }
            formInfo.details = [].concat(x).concat(delTableDataList.toJS())
            ReqApi.post({
                url: Urls.OTHER_SAVE,
                pm: formInfo
            }).then((json) => {
                if (json.status === 2000) {
                    dispatch(actions.returnButton())
                    message.success('保存成功')
                }
                dispatch(actions.loading('saveLoading', false))
                dispatch(actions.loading('pageloading', false))
            });
        }
    },
    //编辑 --- 获取编辑页面信息
    getInfo: () => (dispatch, getState) => {
        let orderCode = wareHouseOrderCode(getState);
        dispatch(actions.loading('pageloading', true))
        Promise.all([
            dispatch(actions.getOrderInfo({ orderCode: orderCode, page: 1, pageSize: 10 })), // 2、--- 获取订单信息
            dispatch(actions.getOrderTypes({ billType: 0 })), // 3、--- 获取其他入库单据类型
            dispatch(actions.onAutochange({ page: 1, pageSize: 10 })), // 4、 --- 收货站点
            dispatch(actions.getFormInfo({ orderCode: orderCode })), // 1、--- 获取表单信息
        ]).then(values => {
            dispatch(actions.loading('pageloading', false))
        }, reason => {
            dispatch(actions.loading('pageloading', false))
        })
    },
    //编辑 --- 获取订单信息
    getOrderInfo: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.GET_ORDER_INFO,
            pm
        }).then(json => {
            if (json.status === 2000 && json.data) {
                dispatch(actions.storeInitOrderInfo(json.data))
            }
        })
    },
    //编辑 --- 存储订单信息  ---  分页 ？ 当前不分页  由前端分页
    storeInitOrderInfo: (data) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'initialOrderInfo'], data.list);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
        dispatch(actions.tableData(data.list))
    },
    //编辑 --- 主界面form信息
    getFormInfo: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.GET_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000 && json.data) {
                dispatch(actions.storeFormInfo(json.data))
                if (json.data.deliverySiteCode) {
                    dispatch(actions.onAutochange({ siteCode: json.data.deliverySiteCode, siteName: json.data.deliverySiteCode }))
                }
            }
        })
    },
    storeFormInfo: (val) => (dispatch, getState) => { // 编辑  主界面数据
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'formInfo'], val);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //getOrderTypes 
    getOrderTypes: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: Urls.PUB_BASIC_BUSINESS_GETLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.storeOrderTypes(json.data.list))
            }
        })
    },
    //其他入库类型
    storeOrderTypes: (val) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'orderTypes'], val);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //dialog actions
    checkedTableList: (val) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'checkedTableList'], val);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
        val == {} ? '' : dispatch(actions.dataChange(val))
    },
    //表格数据回填
    dataChange: (val) => (dispatch, getState) => {
        let index = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'index']);
        let dataSource = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'initialOrderInfo']);
        if (dataSource[index]) {
            dataSource[index].materialCode = val.materialCode;
            dataSource[index].materialName = val.materialName;
            dataSource[index].materialSpec = val.materialSpec;
            dataSource[index].materialModel = val.model;
            dataSource[index].materialUnitName = val.measureUnitName;
        }
        dispatch(actions.changeOrderInfo(dataSource))
    },
    changeOrderInfo: (dataSource) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'initialOrderInfo'], dataSource);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //选中行 index
    indexVal: (index) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'index'], index);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //修改过的订单信息列表
    tableData: (val) => (dispatch, getState) => {
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'tableData'], val);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //当前删除行
    delRow: (delRow) => (dispatch, getState) => {
        let rows = getState()[OTHE_WAREHOUSE_EIDT].getIn(['editWareHouse', 'delRows']).concat(delRow);
        let state = getState()[OTHE_WAREHOUSE_EIDT].setIn(['editWareHouse', 'delRows'], rows);
        dispatch({ type: OTHE_WAREHOUSE_EIDT, state });
    },
    //返回按钮
    returnButton: () => (dispatch, getState) => {
        dispatch(TabsAct.TabRemove('inventoryOtherWarehouseEditCont', 'inventoryOtherWareHousePageCont'));
        if (getStateFun(getState).get('tabs').some((tab) => {
            return tab.key == 'inventoryOtherWareHousePageCont'
        })) {
            dispatch(OtherWareHousePageAct.PurchaseList({ page: 1, pageSize: 10, sourceOrderType: 89 }));
        }
        dispatch(TabsAct.TabAdd({ title: '其他入库单', key: 'inventoryOtherWareHousePageCont' }));
    },
}

export default actions
