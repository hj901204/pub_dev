import { ReqApi } from '../../../base/services/ReqApi';
import { fromJS, Record, Map } from 'immutable';
import { Urls } from '../../../base/consts/urls';
import { SALEORDERREDU } from '../../consts/ActTypes';
import SaleOrderUrls from '../../../base/consts/SaleOrderUrls';
import { message } from '../../../base/components/AntdComp'
import TabsAct from '../../actions/TabsAct';
import { store } from '../../data/StoreConfig';
const actions = {

    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].set('tabLoading', value);
        dispatch({ type: SALEORDERREDU, state });
    },
    saleOrderLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].set('saleOrderLoading', value);
        dispatch({ type: SALEORDERREDU, state })
    },
    //下拉loading
    Fetching: (value) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].set('fetching', value);
        dispatch({ type: SALEORDERREDU, state })
    },
    // 新增销售订单
    AddSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.ADD_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("新增订单成功");
                store.dispatch(TabsAct.TabRemove("saleOrderAdd", "saleOrderList"));
                dispatch(actions.SaleOrderList({ page: 1, pageSize: 10 }))
                store.dispatch(TabsAct.TabInsert("saleOrderList"));
            }
            dispatch(actions.saleOrderLoading(false))
            return json;
        })
    },
    //删除销售订单
    DeleteSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: SaleOrderUrls.DELETE_SALE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("销售订单删除成功");
                dispatch(actions.SaleOrderList({ page: 1, pageSize: 10 }))
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    // 获取销售订单列表
    SaleOrderList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_SALE_ORDER_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetSaleOrderList(json.data));
            }
            dispatch(actions.TabLoading(false));
            return json;
        })
    },
    GetSaleOrderList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[SALEORDERREDU].set('dataSourceList', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SALEORDERREDU, state });
    },
    //获取客户列表
    CustomersList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_CUSTOMERS_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCustomersList(json.data, type));
            }
            dispatch(actions.Fetching(false));
            return json;
        })
    },
    GetCustomersList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == 'edit') {
            let state = getState()[SALEORDERREDU].set('editCustomerSource', list);
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('customerSource', list);
            dispatch({ type: SALEORDERREDU, state });
        }

    },

    //获取组织列表
    OrgList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: SaleOrderUrls.GET_ORG_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetOrgList(json.data, type));
            }
            return json;
        })
    },
    GetOrgList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == 'edit') {
            let state = getState()[SALEORDERREDU].set('editOrgSource', list);
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('orgSource', list);
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //获取销售员列表
    EmployeeList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: SaleOrderUrls.GET_EMPLOYEE_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetEmployeeList(json.data, type));
            }
            return json;
        })
    },
    GetEmployeeList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == 'edit') {
            let state = getState()[SALEORDERREDU].set('editEmployeeSource', list);
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('employeeSource', list);
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //获取收货人列表
    ContactsList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_CONTACTS_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetContactsList(json.data, type));
            }
            dispatch(actions.Fetching(false));
            return json;
        })
    },
    GetContactsList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == 'edit') {
            let state = getState()[SALEORDERREDU].set('editContactsSource', list);
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('contactsSource', list);
            dispatch({ type: SALEORDERREDU, state });
        }

    },
    //获取收货地址列表
    ReceiveAddressList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: SaleOrderUrls.RECEIVE_ADDRESS_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetReceiveAddressList(json.data, type));
            }
            return json;
        })

    },
    GetReceiveAddressList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == 'edit') {
            let state = getState()[SALEORDERREDU].set('editReceiveAddressSource', list);
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('receiveAddressSource', list);
            dispatch({ type: SALEORDERREDU, state });
        }

    },
    //销售订单详情
    SaleOrderDetail: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.get({
            url: SaleOrderUrls.GET_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let { customerCode, receiveAddressCode, saleOrgCode, salesmanCode, shipAddressCode, collectionTermsCode, invoiceAddressCode
                } = json.data;
                dispatch(actions.GetSaleOrderDetail(json.data, type));
                if (type == "edit") {
                    dispatch(actions.CustomersList({ customerCode: customerCode, customerFull: '', customerAbt: '', page: 1, pageSize: 10 }, 'edit'))
                    dispatch(actions.OrgList({ orgType: 3, orgCode: saleOrgCode, orgName: '', page: 1, pageSize: 10 }, 'edit'))
                    dispatch(actions.CurrencyList({ curName: '', curCode: '', page: 1, pageSize: 10 }, 'edit'))
                    dispatch(actions.CategoryList({ subCode: 'C013', catCode: collectionTermsCode, catName: '', page: 1, pageSize: 10 }, 'edit'))
                    dispatch(actions.SiteList({ isSog: 1, addressCode: shipAddressCode, addressName: '', page: 1, pageSize: 10 }, 'edit'))
                    dispatch(actions.ContactsList({ bpCode: json.data.customerCode, contactsCode: '', contactsName: json.data.contactsPerson, page: 1, pageSize: 10 }, 'edit'))
                    dispatch(actions.ReceiveAddressList({ bpCode: json.data.customerCode, addressCode: receiveAddressCode, addressName: '', page: 1, pageSize: 10, isRep: 1 }, 'edit'))
                    dispatch(actions.InvaddressList({ isBil: 1, bpCode: json.data.customerCode, addressCode: invoiceAddressCode, addressName: '', page: 1, pageSize: 10 }, 'edit'))
                    if (json.data.saleOrgCode != '') {
                        dispatch(actions.EmployeeList({ deptCode: json.data.saleOrgCode, employeeCode: salesmanCode, employeeName: '', page: 1, pageSize: 10 }, 'edit'))
                    }
                    let amount=json.data.amount,tax=json.data.tax,totalAmount=json.data.totalAmount
                    dispatch(actions.changeMXValEdit(amount, tax, totalAmount))
                }else if(type == "add"){

                }
            }
            dispatch(actions.saleOrderLoading(false))
            return json;
        })
    },
    //更新销售订
    UpdateSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.UPDATE_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("更新订单成功");
                store.dispatch(TabsAct.TabRemove("saleOrderEdit", "saleOrderList"));
                dispatch(actions.SaleOrderList())
                store.dispatch(TabsAct.TabInsert("saleOrderList"));
            }
            dispatch(actions.saleOrderLoading(false))
            return json;
        })
    },
    GetSaleOrderDetail: (data, type) => (dispatch, getState) => {
        if (type == "edit") {
            let state = getState()[SALEORDERREDU].set('orderEditDetail', data)
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('saleOrderDetail', data)
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    SetSaleOrderDetail: (data) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].set('orderDetail', data)
        dispatch(actions.SaleOrderDetail(data, 'detail'));
        dispatch({ type: SALEORDERREDU, state });
    },
    SetSaleOrderEdit: (data) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].set('orderEdit', data)
        dispatch({ type: SALEORDERREDU, state });
    },
    //表格里选择 是否
    handleChangeSelect: (data, typePage) => (dispatch, getState) => {
        if (typePage == 'addPageFlag') {
            let dataSource1 = getState()[SALEORDERREDU].getIn(['orderAddDetail']);
            let state = getState()[SALEORDERREDU].setIn(['orderAddDetail'], { ...dataSource1, saleDetails: data });
            dispatch({ type: SALEORDERREDU, state });
        } else if (typePage == 'edit') {
            let dataSource1 = getState()[SALEORDERREDU].getIn(['orderEditDetail']);
            let state = getState()[SALEORDERREDU].setIn(['orderEditDetail'], { ...dataSource1, saleDetails: data });
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //获取物料编码列表
    MaterialList: (pm = {}) => (dispatch, getState) => {
        // dispatch(actions.Fetching(true));
        pm.status = 1, pm.allowSell = 0
        return ReqApi.get({
            url: SaleOrderUrls.GET_MATERIAL_LIST,
            pm
            // pm: { materialCode: pm, materialName: pm, page: 1, pageSize: 10, status: 1, allowSell: 0 }
        }).then((json) => {
            return json
            // if (json.status === 2000) {
            //     return json.data.list
            // } else { return [] }
        });
    },
    // GetMaterialList: (data) => (dispatch, getState) => {
    //     let { list } = data;
    //     let state = getState()[SALEORDERREDU].set('materialSource', list)
    //     dispatch({ type: SALEORDERREDU, state });
    // },
    //获取币种列表 currency/getlist currencyList
    CurrencyList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_CURRENCY_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCurrencyList(json.data, type));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetCurrencyList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == "edit") {
            let state = getState()[SALEORDERREDU].set('editCurrencySource', list)
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('currencySource', list)
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //获取收款条件列表getcategorylist
    CategoryList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_CATEGORY_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCategoryList(json.data, type));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetCategoryList: (data, type) => (dispatch, getState) => {
        let { catList } = data;
        if (type == "edit") {
            let state = getState()[SALEORDERREDU].set('editCategorySource', catList)
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('categorySource', catList)
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //获取发票地址列表
    InvaddressList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_INV_ADDRESS_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetInvaddressList(json.data, type));
            }
            dispatch(actions.Fetching(false));
            return json;
        });
    },
    GetInvaddressList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == "edit") {
            let state = getState()[SALEORDERREDU].set('editInvaddressSource', list)
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('invaddressSource', list)
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //发货地址
    SiteList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: SaleOrderUrls.GET_SITE_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetSiteList(json.data, type));
            }
            dispatch(actions.Fetching(false));
            return json;
        })
    },
    GetSiteList: (data, type) => (dispatch, getState) => {
        let { list } = data;
        if (type == "edit") {
            let state = getState()[SALEORDERREDU].set('editSiteSource', list)
            dispatch({ type: SALEORDERREDU, state });
        } else {
            let state = getState()[SALEORDERREDU].set('siteSource', list)
            dispatch({ type: SALEORDERREDU, state });
        }
    },
    //详情页中的几个操作
    //提交
    SubmitSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.SUBMIT_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success(`该订单提交成功`);
                store.dispatch(TabsAct.TabRemove("saleOrderDetail", "saleOrderList"));
                dispatch(actions.SaleOrderList({ page: 1, pageSize: 10 }))
                store.dispatch(TabsAct.TabInsert("saleOrderList"));
            }
            dispatch(actions.saleOrderLoading(false))

            return json;
        });
    },
    //撤回
    RecallSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.RECALL_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success(`该订单撤回成功`);
                store.dispatch(TabsAct.TabRemove("saleOrderDetail", "saleOrderList"));
                dispatch(actions.SaleOrderList({ page: 1, pageSize: 10 }))
                store.dispatch(TabsAct.TabInsert("saleOrderList"));
            }
            dispatch(actions.saleOrderLoading(false))

            return json;
        });
    },
    //关闭
    CloseSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.CLOSE_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success(`该订单关闭成功`);
                store.dispatch(TabsAct.TabRemove("saleOrderDetail", "saleOrderList"));
                dispatch(actions.SaleOrderList({ page: 1, pageSize: 10 }))
                store.dispatch(TabsAct.TabInsert("saleOrderList"));
            }
            dispatch(actions.saleOrderLoading(false))

            return json;
        });
    },
    //下推
    PushSaleOrder: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.PUSH_SALE_ORDER,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success(`该单据下推成功，销售出库单号为:` + json.data.invOrderCode);
                store.dispatch(TabsAct.TabRemove("saleOrderDetail", "saleOrderList"));
                dispatch(actions.SaleOrderList({ page: 1, pageSize: 10 }))
                store.dispatch(TabsAct.TabInsert("saleOrderList"));
            }
            dispatch(actions.saleOrderLoading(false))

            return json;
        });
    },
    //編輯鎖定 {saleOrderCode:saleOrderCode}
    CheckLockingStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.saleOrderLoading(true))
        return ReqApi.post({
            url: SaleOrderUrls.CHECK_LOCKING_STATUS,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                store.dispatch(TabsAct.TabAdd({ title: "编辑销售订单", key: "saleOrderEdit" }));
            }
            dispatch(actions.saleOrderLoading(false));
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
    //表格弹框
    SaleOrderAddTableVisiable: (value,type) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].set(`${type}_table_visiable`, value);
        dispatch({ type: SALEORDERREDU, state });
    },
    indexTableVal: (pm) => (dispatch, getState) => {
        let newData = getState()[SALEORDERREDU].getIn(['newTableOB', 'saleDetails']);
        let newVal = getState()[SALEORDERREDU].get('newVal');
        let state = getState()[SALEORDERREDU].setIn(['newTableOB', 'index'], pm.index).set('newVal', newVal);
            dispatch({ type: SALEORDERREDU, state });
        // if (pm.flag == 'add') {
        //     newVal = '';
        //     let state = getState()[SALEORDERREDU].setIn(['newTableOB', 'index'], pm.index).set('newVal', newVal);
        //     dispatch({ type: SALEORDERREDU, state });
        //     return;
        // }
        // let newData = data.toJS();
        // newData.map((item, index) => {
        //     if (pm.index == index) {
        //         newVal = item
        //         console.log('item-----', newVal);
        //     }
        // });
        // let state = getState()[SALEORDERREDU].setIn(['newTableOB', 'index'], pm.index).set('newVal', newVal);
        // dispatch({ type: SALEORDERREDU, state });
    },
    addNewRowToTable: (val, isTax) => (dispatch, getState) => {   // 插入表格

        // let saleDetails = getState()[SALEORDERREDU].get('saleDetails').push({ ...val });
        // let state = getState()[SALEORDERREDU].set('saleDetails', saleDetails);
        // dispatch({ type: SALEORDERREDU, state });

        let newTableOB = getState()[SALEORDERREDU].getIn(['newTableOB', 'saleDetails']);
        let tabledataSource = newTableOB;
        let index = getState()[SALEORDERREDU].getIn(['newTableOB', 'index']);
        let date=tabledataSource.set(index,val).toJS();
        let state = getState()[SALEORDERREDU].setIn(['newTableOB', 'saleDetails'], date);
        dispatch({ type: SALEORDERREDU, state });
        dispatch(actions.ChangeAll(isTax));
    },
    ChangeAll: (isTax) => (dispatch, getState) => {
        let newData = getState()[SALEORDERREDU].getIn(['newTableOB', 'saleDetails']);
        // let newData = data.toJS();
        let taxRate = 0, amount = 0, tax = 0, totalAmount = 0;
        newData.map((item, index) => {
            if (item.isDonation == "0") {
                amount = (Number(amount)).toFixed(2);
                tax = (Number(tax)).toFixed(2);
                totalAmount = (Number(totalAmount)).toFixed(2);
            } else {
                // amount = (Number(amount) + Number(item.amount)).toFixed(2);
                // tax = (Number(tax) + Number(item.tax)).toFixed(2);
                // totalAmount = (Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                if (isTax == 1) {
                    amount = (Number(amount) + Number(item.amount)).toFixed(2);
                    tax = 0;
                    totalAmount = (Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                } else {
                    amount = (Number(amount) + Number(item.amount)).toFixed(2);
                    tax = (Number(tax) + Number(item.tax)).toFixed(2);
                    totalAmount = (Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                }
            }
        });
        let state = getState()[SALEORDERREDU].setIn(['orderTotal', 'amount'], amount)
            .setIn(['orderTotal', 'tax'], tax)
            .setIn(['orderTotal', 'totalAmount'], totalAmount);
        dispatch({ type: SALEORDERREDU, state });
    },
    changeMXVal: ( amount, tax, totalAmount) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].setIn(['orderTotal', 'amount'], amount)
            .setIn(['orderTotal', 'tax'], tax)
            .setIn(['orderTotal', 'totalAmount'], totalAmount);
        dispatch({ type: SALEORDERREDU, state });
    },
    changeMXValEdit:( amount, tax, totalAmount) => (dispatch, getState) => {
        let state = getState()[SALEORDERREDU].setIn(['orderEditTotal', 'amount'], amount)
            .setIn(['orderEditTotal', 'tax'], tax)
            .setIn(['orderEditTotal', 'totalAmount'], totalAmount);
        dispatch({ type: SALEORDERREDU, state });
    },
}
export default actions