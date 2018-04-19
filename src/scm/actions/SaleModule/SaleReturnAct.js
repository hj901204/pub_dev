import { ReqApi } from '../../../base/services/ReqApi'
import SaleReturnUrls from '../../../base/consts/SaleReturnUrls';
import { Urls } from '../../../base/consts/urls';
import { SALE_RETURN_REDU } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp'
import TabsAct from '../../actions/TabsAct';
import { store } from '../../data/StoreConfig';

const actions = {

    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].set('tabLoading', value);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    SaleReturnLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].set('saleReturnLoading', value);
        dispatch({ type: SALE_RETURN_REDU, state })
    },
    Fetching: (value) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].set('fetching', value);
        dispatch({ type: SALE_RETURN_REDU, state })
    },
    // 销售退货单列表
    SaleReturnList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.MAIN_SALERETURN_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetSaleReturnList(json.data));
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    GetSaleReturnList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[SALE_RETURN_REDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    // 新增销售退货单
    AddSaleReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.post({
            url: SaleReturnUrls.ADD_SALERETURN,
            pm
        }).then((json) => {
            // console.log(pm);
            if (json.status === 2000) {
                message.success("新增销售退货单成功！");
                store.dispatch(TabsAct.TabRemove("saleReturnAdd", "saleReturnList"));
                store.dispatch(actions.SaleReturnList({ saleReturnCode: '', customerName: '',  page: 1, pageSize: 10 }));
                store.dispatch(TabsAct.TabAdd({ title: "销售退货单", key: "saleReturnList" }));
            }else {
                // message.error("服务器可能出错了，请稍后再试！");
            }
            dispatch(actions.SaleReturnLoading(false));
            return json;
        });
    },
    // 获取来源订单列表
    InitialSaleOrderList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
      
        return ReqApi.get({
            url: SaleReturnUrls.INITIALSALEORDER_LIST,
            pm
        }).then((json) => {
            // console.log(pm);
            if (json.status === 2000) {       
                dispatch(actions.GetInitialSaleOrderList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetInitialSaleOrderList: (data) => (dispatch, getState) => {
        let { list } = data;
      
        let state = getState()[SALE_RETURN_REDU].set('initialSaleOrderList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    // 获取销售退货明细（可退货来源订单）列表
    OriginalOrderList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        // 一开始清空code
        let state = getState()[SALE_RETURN_REDU].set('saleOrderCode', '');
                    dispatch({ type: SALE_RETURN_REDU, state });
        return ReqApi.get({
            url: SaleReturnUrls.ORIGINALORDER_LIST,
            pm
        }).then((json) => {
            // console.log(pm);
            if (json.status === 2000) {       
                // dispatch(actions.GetOriginalOrderList(json.data));
                // dispatch(actions.GetInitialSaleOrderList(json.data));
                if(pm.saleOrderCode) {    // 如果带参数进来了
                    let state = getState()[SALE_RETURN_REDU].set('saleOrderCode', pm.saleOrderCode);
                    dispatch({ type: SALE_RETURN_REDU, state });
                    dispatch(actions.GetOriginalOrderList(json.data));
                }
                  
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetOriginalOrderList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('originalOrderSource', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
   
     // 获取来源销售订单详情
    SaleOrderDetail: (pm = {}, type) => (dispatch, getState) => {

        let state = getState()[SALE_RETURN_REDU].setIn([type, 'saleOrderDetail'], {})
            .setIn([type, 'saleOrderDetailList'], []);
        dispatch({ type: SALE_RETURN_REDU, state });

        return ReqApi.get({
            url: SaleReturnUrls.GET_SALEORDER,
            pm
        }).then((json) => {
            if (json.status == 2000) {
               
                let state = getState()[SALE_RETURN_REDU].setIn([type, 'saleOrderDetail'], json.data)
                    .setIn([type, 'saleOrderDetailList'], json.data.saleDetails);
                // let state = getState()[SALE_RETURN_REDU].set('saleOrderDetail', json.data);
                dispatch({ type: SALE_RETURN_REDU, state });
                return json;
            }
        })
    },
    // 销售退货明细选择弹窗
    SaleReturnDialogVisiable: (value,type) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].setIn([type,'saleReturn_visiable'], value);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    
    SaleReturnDialogMaterialVisiable: (value, type) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].setIn([type, 'saleReturnMaterial_visible'], value);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    SaleOrderDetailList: (data, type) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].setIn([type, 'saleOrderDetailList'], data);
        dispatch({ type: SALE_RETURN_REDU, state });
    },

    // 客户列表
    CustomerList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleReturnUrls.CUSTOMER_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCustomerList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetCustomerList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('customerList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },


    // 销售员列表
    SalesmanList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleReturnUrls.SALESMAN_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
               
                dispatch(actions.GetSalesmanList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetSalesmanList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('salesmanList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    // 销售组织列表
    SalesorgList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleReturnUrls.SALESORG_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
               
                dispatch(actions.GetSalesorgList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetSalesorgList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('salesorgList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    // 取货地址（销售订单的发货地址）
    TakeDelOfAddressList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleReturnUrls.TAKEADDRESS_LIST,
            pm
        }).then((json) => {
         
            if (json.status === 2000) {
              
                dispatch(actions.GetTakeDelOfAddressList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetTakeDelOfAddressList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('takeDelOfAddressList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    
    // 联系人列表
    ContactsList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleReturnUrls.CONTACTS_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
               
                dispatch(actions.GetContactsList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },

    GetContactsList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('contactsList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },

    // 收货站点列表
    ReceiveAdrList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({ 
            url: SaleReturnUrls.RECEIVE_ADR_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetReceiveAdrList(json.data));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },

    GetReceiveAdrList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('receiveAdrList', list);
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    
    // 得到销售退货单物料列表
    // MaterialList: (pm = {}) => (dispatch, getState) => {
    //     // dispatch(actions.Fetching(true));
    //     return ReqApi.get({
    //         url: SaleReturnUrls.MATERIAL_LIST,
    //         pm: { materialCode: pm, materialName: pm, page: 1, pageSize: 10, status: 1, allowSell: 0 }
    //     }).then((json) => {
    //         if (json.status === 2000) {
    //             return json.data.list
    //         } else { return [] }
    //     });
    // },
     MaterialList: (pm = {}) => (dispatch, getState) => {
        pm.status = 1, pm.allowSell = 0
        return ReqApi.get({
            url: SaleReturnUrls.MATERIAL_LIST,
            pm
        }).then((json) => {
            return json
        });
    },

    //获取表单物料编码列表
    MaterialFormList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleReturnUrls.MATERIAL_LIST,
            pm: { materialCode: pm, page:1 ,pageSize:10 }
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetMaterialList(json.data));
            }
            return json;
        });
    },


    GetMaterialList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[SALE_RETURN_REDU].set('materialSource', list)
        dispatch({ type: SALE_RETURN_REDU, state });
    },
    CleanSaleReturnDetail: (data) => (dispatch, getState) => {
        let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'add'], data)
        dispatch({type: SALE_RETURN_REDU, state});
    },

    DeleteSaleReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.DELETE_SALERETURN,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("删除成功！");
                dispatch(actions.SaleReturnList({}));
            }
            // dispatch(actions.TabLoading(false));
            return json;
        });
    },
    SaleReturnDetail: (pm = {}, flag) => (dispatch, getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.DETAIL_SALERETURN,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                // console.log('****=====!!!! saleReturnDetail...');
                // console.log(json.data);
                dispatch(actions.GetSaleReturnDetail(json.data, flag));
                if(flag == 'edit'){
                    // dispatch(actions.OriginalOrderList({originalOrderSource:''}));  // 来源订单列表
                    dispatch(actions.OriginalOrderList({saleOrderCode:json.data.sourceCode}));   // 过滤订单列表
                    dispatch(actions.CustomerList({customerCode:'', customerFull:'', customerAbt:'', page:1, pageSize:10}));    // 客户列表
                    dispatch(actions.ContactsList({bpCode: json.data.customerCode, contactsCode:'', contactsName:'', page:1, pageSize:10}));    // 联系人
                    dispatch(actions.TakeDelOfAddressList({isSog:1, bpCode:json.data.customerCode, addressCode:'', addressName:'', page:1, pageSize:10}));  //取货地址
                    if(json.data.saleOrgCode){
                        dispatch(actions.SalesmanList({deptCode: json.data.saleOrgCode, employeeCode:'', page:1 , pageSize:10}));

                    }
                    // console.log(json.data.sourceCode);
                    let state = getState()[SALE_RETURN_REDU].set('saleOrderCode', json.data.sourceCode);
                    dispatch({ type: SALE_RETURN_REDU, state });
                }
                // if(flag == 'blank'){
                //     let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'edit'], '')
                //     dispatch({type: SALE_RETURN_REDU, state});
                // }
            }
            dispatch(actions.SaleReturnLoading(false));
            return json;
        });
    },
    GetSaleReturnDetail: (data, flag) => (dispatch, getState) => {
        // console.log('getSaleReturnDetail:');
        // console.log(flag);
        if (flag == "edit") {
            // console.log('edit....');
            // console.log(data);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'edit'], data)
            dispatch({type: SALE_RETURN_REDU, state});
        }
        if (flag == "detail") {
            // console.log(data);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'detail'], data)
            dispatch({type: SALE_RETURN_REDU, state});
        }
    },
    // 提交
    SubmitSaleReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.SUBMIT_SALERETURN,
            pm
        }).then((json) => {
            // console.log(json.status);
            if (json.status === 2000) {
                message.success("成功提交至工作流！");
                dispatch(actions.SaleReturnDetail(pm,"detail"));
            }else {
                dispatch(actions.SaleReturnLoading(false));
            }
            return json;
        });
    },
    // 撤回
    RecallSaleReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.RECALL_SALERETURN,
            pm
        }).then((json) => {
            // console.log(json.status);
            if (json.status === 2000) {
                message.success("已撤回！");
                dispatch(actions.SaleReturnDetail(pm,"detail"));
            }else {
                dispatch(actions.SaleReturnLoading(false));
            }
            return json;
        });
    },
    // 关闭
    CloseSaleReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.CLOSE_SALERETURN,
            pm
        }).then((json) => {
            // console.log(json.status);
            if (json.status === 2000) {
                message.success("关闭成功！！");
                dispatch(actions.SaleReturnDetail(pm,"detail"));
            }else {
                dispatch(actions.SaleReturnLoading(false));
            }
            // dispatch(actions.SaleReturnLoading(false));
            return json;
        });
    },
    // 下推
    PushSaleReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.get({
            url: SaleReturnUrls.PUSH_SALERETURN,
            pm
        }).then((json) => {
            // console.log(json.status);
            if (json.status === 2000) {
                if(json.data.invOrderCode){
                    message.success("下推成功，销售退货入库单号为："+json.data.invOrderCode);
                }else {
                    message.success("下推成功!");
                }
                
                dispatch(actions.SaleReturnDetail(pm,"detail"));
            }else {
                dispatch(actions.SaleReturnLoading(false));
            }
            // dispatch(actions.SaleReturnLoading(false));
            return json;
        });
    },
    // 更新
    UpdateSaleReturn: (pm = {}) => (dispatch, getState) => {

        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.post({
            url: SaleReturnUrls.UPDATE_SALERETURN,
            pm
        }).then((json) => {
            // console.log(pm);
            if (json.status === 2000) {
                message.success("更新成功！");
                store.dispatch(TabsAct.TabRemove("saleReturnEdit", "saleReturnList"));
                store.dispatch(TabsAct.TabAdd({ title: "销售退货单", key: "saleReturnList" }));
                store.dispatch(actions.SaleReturnList({ saleReturnCode: '', customerName: '',  page: 1, pageSize: 10 }));
            }else {

            }
            dispatch(actions.SaleReturnLoading(false));
            return json;
        });
    },
    // 退货单列表中点击编辑或者详情
    GetSaleReturn: (saleReturnCode, flag) => (dispatch, getState) => {
        if (flag == "detail") {
            // console.log('detail:');
            // console.log(saleReturnCode);
            let state = getState()[SALE_RETURN_REDU].setIn(['detail', 'saleReturnCode'], saleReturnCode);
            dispatch({type: SALE_RETURN_REDU, state});
        }
        if (flag == "edit") {
            // console.log('edit');
            let state = getState()[SALE_RETURN_REDU].setIn(['edit', 'saleReturnCode'], saleReturnCode);
            dispatch({type: SALE_RETURN_REDU, state});
        }
       
    },

    
    //编辑锁定 {saleReturnCode:saleReturnCode}
    CheckLockingStatus: (pm = {}) => (dispatch,getState) => {
        dispatch(actions.SaleReturnLoading(true));
        return ReqApi.post({
            url: SaleReturnUrls.CHECK_LOCKING_STATUS,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                store.dispatch(TabsAct.TabAdd({ title: "销售退货单编辑", key: "saleReturnEdit" }));
            } else if (json.status === 2001) {
                dispatch(actions.SaleReturnLoading(false));
                // message.warning("未查询到记录");
            }else if (json.status === 2020) {
                dispatch(actions.SaleReturnLoading(false));
                // message.warning("该订单已被锁定，不能编辑");
            }
            return json;
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

    // 弹出框
     SaleReturnAddTableVisiable: (value,type) => (dispatch, getState) => {
        console.log(type);
        console.log(value);
        let state = getState()[SALE_RETURN_REDU].set(`${type}_table_visiable`, value);
        dispatch({ type: SALE_RETURN_REDU, state });
        console.log(state.toJS());
    },
}
export default actions
