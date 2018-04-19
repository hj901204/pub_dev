//采购退货单
import { ReqApi } from '../../../base/services/ReqApi'
import PurchaseReturnUrls from '../../consts/PurchaseReturnUrls';
import { PURCHASERETURNREDU } from '../../consts/ActTypes';
import { Urls, MemberManage, BasicUrls } from '../../../base/consts/urls';
import BusinessUrls from '../../consts/BusinessUrls';
import PurchaseUrls from '../../consts/PurchaseUrls';
import { message } from '../../../base/components/AntdComp'
const actions = {
    PurchaseReturnList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: PurchaseReturnUrls.PURCHASERETURN_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetPurchaseReturnList(json.data));
            }

            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].set('tabLoading', value);
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    purchaseReturnLoading: (value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].set('purchaseReturnLoading', value);
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    //采购退货单新增开始------------------------------------------------------------------------------------------

    PurchaseReLoading: (value, type) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].setIn([type, 'purchaseReLoading'], value);
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    GetPurOrderList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.PURCHASE_LIST,
            pm: { orderStatus: '2,3', ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'purchaseList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
            return json;
        })
    },

    CurList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: BasicUrls.CURRENCYLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'curList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
        })
    },

    SupplierList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.GET_SUPPLIER_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'supplierList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
            return json;
        })
    },
    ShippingAddressList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.GET_SHIPPINGADDRESS_LIST,
            pm: { isRep: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'shippingAddressList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
        })
    },
    ContactsList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.GET_CONTACTLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'contactsList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
        })
    },
    PurchaseOrgList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.COSTCENTER_LIST,
            pm: { orgType: "2", status: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'purchaseOrgList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
        })
    },
    SiteList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: Urls.SITE_LIST,
            pm: { status: 1, isSog: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'siteList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
        })
    },
    Buyerlist: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: MemberManage.POSITION_INFO_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'buyerlist'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
            return json
        })
    },

    CostCenterList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.COSTCENTER_LIST,
            pm: { status: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASERETURNREDU].setIn([type, 'costCenterList'], json.data.list)
                dispatch({ type: PURCHASERETURNREDU, state });
            }
        })
    },

    GetSelectData: () => (dispatch, getState) => {
        dispatch(actions.PurchaseReLoading(true, 'add'));
        let page = { page: 1, pageSize: 10 };
        let p1 = dispatch(actions.GetPurOrderList(page, 'add')),
            p2 = dispatch(actions.SupplierList(page, 'add')),
            p3 = dispatch(actions.SiteList(page, 'add')),
            p4 = dispatch(actions.CostCenterList(page, 'add')),
            p5 = dispatch(actions.PurchaseOrgList(page, 'add')),
            p6 = dispatch(actions.CurList(page, 'add')),
            p7 = dispatch(actions.IsBuyer());
        Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(function () {
            dispatch(actions.PurchaseReLoading(false, 'add'));
        })

    },

    PurchaseDetail: (pm = {}, type) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].setIn([type, 'purchaseDetail'], {})
            .setIn([type, 'purchaseDetailList'], []);
        dispatch({ type: PURCHASERETURNREDU, state });
        return ReqApi.get({
            url: PurchaseUrls.GETDETAILBYCODE,
            pm: { purchaseType: 0, ...pm }
        }).then((json) => {
            if (json.status == 2000) {
                if (json.data) {
                    let state = getState()[PURCHASERETURNREDU].setIn([type, 'purchaseDetail'], json.data)
                    .setIn([type, 'purchaseDetailList'], json.data.list);
                    dispatch({ type: PURCHASERETURNREDU, state });
                }
                return json;
            }
        })
    },
    PurchaseDetailList: (data, type) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].setIn([type, 'purchaseDetailList'], data);
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    DeleteData: (value, type) => (dispatch, getState) => {
        let state;
        if (value == 'purchaseOrgCode') {
            state = getState()[PURCHASERETURNREDU].setIn([type, 'buyerlist'], []);
        } else if(value == 'supplierCode') {
            state = getState()[PURCHASERETURNREDU].setIn([type, 'shippingAddressList'], []).setIn([type, 'contactsList'], []);
        }
        dispatch({ type: PURCHASERETURNREDU, state });
    },

    PurchaseReturnDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PurchaseReLoading(true, 'edit'))
        return ReqApi.get({
            url: PurchaseReturnUrls.GETDETAILBYCODE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (json.data) {
                    let { purchaseCode, supplierCode, purchaseOrgCode, receivingAddressCode, contactsCode, costCenterCode, buyerCode, curCode, siteCode,
                          supplierName, receivingAddressName, contactsName, purchaseOrgName, costCenterName, buyerName, curName, siteName
                        } = json.data;
                    let page = { page: 1, pageSize: 10 };
                    let state = getState()[PURCHASERETURNREDU].set('purchaseReturnDetail', json.data)
                        .setIn(['edit', 'orgCode'], purchaseOrgCode).set('supplierCode', supplierCode);
                    dispatch(actions.GetPurOrderList({ orderCode: purchaseCode, ...page }, 'edit'));
                    dispatch(actions.SupplierList({ supplierCode: supplierCode, ...page }, 'edit'));
                    dispatch(actions.ShippingAddressList({ bpCode: supplierCode, addressCode: receivingAddressCode, ...page }, 'edit'));
                    dispatch(actions.ContactsList({ bpCode: supplierCode, contactsCode: contactsCode, ...page }, 'edit'));
                    dispatch(actions.PurchaseOrgList({ orgCode: purchaseOrgCode, ...page }, 'edit'));
                    dispatch(actions.CostCenterList({ orgCode: costCenterCode, ...page }, 'edit'));
                    dispatch(actions.Buyerlist({ deptCode: purchaseOrgCode, employeeCode: buyerCode, ...page }, 'edit'));
                    dispatch(actions.CurList({ curCode: curCode, ...page }, 'edit'));
                    dispatch(actions.SiteList({ siteCode: siteCode, ...page }, 'edit'));
                    dispatch({ type: PURCHASERETURNREDU, state });
                    if (purchaseCode) {
                        dispatch(actions.PurchaseDetail({ orderCode: purchaseCode }, 'edit'))
                    }
                }
            }
            dispatch(actions.PurchaseReLoading(false, 'edit'))
        })
    },

    CanPurchaseReturnEdit: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseReturnUrls.CAN_PURCHASERETURN_EDIT,
            pm
        }).then(json => {
            if (json.status === 2000) {
                if (type) {
                    let state = getState()[PURCHASERETURNREDU].set('purchaseReturnId', pm.returnCode).set('sourceType', type);
                    dispatch({ type: PURCHASERETURNREDU, state });
                }
            }
            return json;
        })
    },

    IsBuyer: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.ISBUYER,
            pm,
            callBack: true
        }).then(json => {
            if (json.status === 2000) {
                if (json.data) {
                    let { buyerCode, purchaseOrgCode, buyerName, purchaseOrgName, buyerPhone } = json.data;
                    let state = getState()[PURCHASERETURNREDU].set('defaultBuyer', { buyerCode, purchaseOrgCode, buyerName, purchaseOrgName, buyerTel:buyerPhone })
                        .setIn(['add', 'orgCode'], purchaseOrgCode);
                    dispatch({ type: PURCHASERETURNREDU, state });
                    dispatch(actions.Buyerlist({ deptCode: purchaseOrgCode, page: 1, pageSize: 10 }, 'add'));
                }
            }
             return json;
        })
    },

    AddPurchaseReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PurchaseReLoading(true, 'add'));
        return ReqApi.post({
            url: PurchaseReturnUrls.ADD_PURCHASERETURN,
            pm
        }).then(json => {
            dispatch(actions.PurchaseReLoading(false, 'add'));
            return json;
        })
    },

    EditPurchaseReturn: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PurchaseReLoading(true, 'edit'));
        let returnCode = getState()[PURCHASERETURNREDU].get('purchaseReturnId');
        return ReqApi.post({
            url: PurchaseReturnUrls.UPDATE_PURCHASERETURN,
            pm: { ...pm, returnCode }
        }).then(json => {
            dispatch(actions.PurchaseReLoading(false, 'edit'));
            return json;
        })
    },

    // 采购明细选择弹窗

    PurRetDialogVisiable: (value, type) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].setIn([type, 'purRet_visiable'], value);
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    //采购退货单新增结尾---------------------------------------------------------------------------------------------
    //概览Act-----------------------------------------------------------------
    PurRetCode: (returnCode) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNREDU].set('PurRetViewData', {});
        dispatch({ type: PURCHASERETURNREDU, state });
        dispatch(actions.PurRetViewData({ returnCode: returnCode }));
    },
    PurRetViewData: (pm = {}) => (dispatch, getState) => {
        let returnCode = pm.returnCode;
        dispatch(actions.purchaseReturnLoading(true));
        return ReqApi.get({
            url: PurchaseReturnUrls.GETDETAILBYCODE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (json.data) {
                    dispatch(actions.GetPurRetViewData(json.data, returnCode));
                }
            }

            dispatch(actions.purchaseReturnLoading(false));
            return json;
        });
    },
    GetPurRetViewData: (data, returnCode) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PURCHASERETURNREDU].set('PurRetViewData', data);
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    //----------------------------------------------------------------------------------------------- 
    GetPurchaseReturnList: (data) => (dispatch, getState) => {
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

        let state = getState()[PURCHASERETURNREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: PURCHASERETURNREDU, state });
    },
    PurchaseReturnDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        ReqApi.get({
            url: PurchaseReturnUrls.PURCHASERETURN_DEL,
            pm
        }).then(json => {
            if (json.status === 2000) {
                message.success("删除成功");
                dispatch(actions.PurchaseReturnList({ page: 1, pageSize: 10 }))
            }
            dispatch(actions.TabLoading(false));
        })
    },

    PurchaseReturnStatus: (status, pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseReturnUrls.PURCHASERETURN_STATUS(status),
            pm,
            callBack: true
        }).then((json) => {
            if (json.status == 2100 || json.status == 2200 || json.status == 2300 || json.status == 2400) {
                // dispatch(actions.PurRetCode(pm.returnCode))
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
}
export default actions;