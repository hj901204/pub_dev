//采购订单
import { ReqApi } from '../../../base/services/ReqApi'
import { PURCHASEREDU } from '../../consts/ActTypes';
import { Urls, MemberManage, BasicUrls } from '../../../base/consts/urls';
import PurchaseUrls from '../../consts/PurchaseUrls';
import BusinessUrls from '../../consts/BusinessUrls';
import SupplierUrls from '../../consts/SupplierUrls';
import { message } from '../../../base/components/AntdComp'
const PurchaseActions = {
    PurchaseList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: PurchaseUrls.PURCHASE_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetPurchaseList(json.data));
            }

            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[PURCHASEREDU].set('tabLoading', value);
        dispatch({ type: PURCHASEREDU, state });
    },
    PurchaseLoading: (value, type) => (dispatch, getState) => {
        let state = getState()[PURCHASEREDU].setIn([type, 'purchaseLoading'], value);
        dispatch({ type: PURCHASEREDU, state });
    },
    PurchaseViewLoading: (value) => (dispatch, getState) => {
        let state = getState()[PURCHASEREDU].set('purchaseViewLoading', value);
        dispatch({ type: PURCHASEREDU, state });
    },
    //概览Act-----------------------------------------------------------------
    PurchaseCode: (orderCode) => (dispatch, getState) => {
        let state = getState()[PURCHASEREDU].set('PurchaseViewData', {});
        dispatch({ type: PURCHASEREDU, state });
        dispatch(actions.PurchaseViewTable({ orderCode: orderCode }));
    },
    PurchaseViewTable: (pm = {}) => (dispatch, getState) => {
        let orderCode = pm.orderCode;
        dispatch(actions.PurchaseViewLoading(true));
        return ReqApi.get({
            url: PurchaseUrls.GETDETAILBYCODE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (json.data) {
                    dispatch(actions.GetPurViewTableList(json.data, orderCode));
                }
            }
            dispatch(actions.PurchaseViewLoading(false));
            return json;
        });
    },
    GetPurViewTableList: (data, orderCode) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PURCHASEREDU].set('PurchaseViewData', data);
        dispatch({ type: PURCHASEREDU, state });
    },

    //----------------------------------------------------------------------------------------------- 
    GetPurchaseList: (data) => (dispatch, getState) => {
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

        let state = getState()[PURCHASEREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: PURCHASEREDU, state });
    },
    PurchaseDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        ReqApi.post({
            url: PurchaseUrls.PURCHASE_DEL,
            pm
        }).then(json => {
            if(json.status===2000){
                message.success("删除成功");
                dispatch(actions.PurchaseList({ page: 1, pageSize: 10 }))
            }
            dispatch(actions.TabLoading(false));
        })
    },

    /* ----------------------wuqiong--------------------------------------------*/

    CurList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: BasicUrls.CURRENCYLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'curList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },

    SupplierList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.GET_SUPPLIER_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'supplierList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
            return json;
        })
    },
    ShippingAddressList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.GET_SHIPPINGADDRESS_LIST,
            pm: { isSog: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'shippingAddressList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },
    ContactsList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.GET_CONTACTLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'contactsList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },
    PurchaseOrgList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.COSTCENTER_LIST,
            pm: { orgType: "2", status: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'purchaseOrgList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },
    SiteList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: Urls.SITE_LIST,
            pm: { status: 1, isSog: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'siteList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },
    Buyerlist: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: MemberManage.POSITION_INFO_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'buyerlist'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });

            }
        })
    },

    CostCenterList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.COSTCENTER_LIST,
            pm: { status: 1, ...pm }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'costCenterList'], json.data.list)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },
    Paymentlist: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: BasicUrls.SUBJECT_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].setIn([type, 'paymentList'], json.data.catList)
                dispatch({ type: PURCHASEREDU, state });
            }
        })
    },


    MeasureList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.GET_MEASURELIST,
            pm: { page: 1, pageSize: 10 }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].set('measureList', json.data.list)
                dispatch({ type: PURCHASEREDU, state });
                return json.data.list;
            } else { return [] }
        })
    },
    MaterialList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.GET_MATERIALLIST,
            pm: { status: 1, materialCode: pm, materialName: pm, page: 1, pageSize: 10 }
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].set('materialList', json.data.list)
                dispatch({ type: PURCHASEREDU, state });
                return json.data.list;
            } else { return [] }
        })
    },
    MaterialList2: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.GET_MATERIALLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PURCHASEREDU].set('materialList', json.data.list)
                dispatch({ type: PURCHASEREDU, state });
                // return json.data.list;
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
                   let { buyerCode, purchaseOrgCode, buyerPhone, buyerName, purchaseOrgName } = json.data;
                let state = getState()[PURCHASEREDU].set('defaultBuyer', { buyerCode, purchaseOrgCode, buyerTel: buyerPhone, buyerName, purchaseOrgName })
                    .setIn(['add', 'orgCode'], purchaseOrgCode);
                    dispatch(actions.Buyerlist({ deptCode: purchaseOrgCode, page: 1, pageSize: 10 }, 'add'));
                    dispatch({ type: PURCHASEREDU, state });
                    return json;
                }
            }
        })
    },

    AddPurchase: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PurchaseLoading(true, 'add'));
        return ReqApi.post({
            url: PurchaseUrls.ADD_PURCHASE,
            pm
        }).then(json => {
            dispatch(actions.PurchaseLoading(false, 'add'));
            return json;

        })
    },

    EditPurchase: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PurchaseLoading(true, 'edit'));
        let orderCode = getState()[PURCHASEREDU].get('purchaserId');
        return ReqApi.post({
            url: PurchaseUrls.UPDATE_PURCHASE,
            pm: { ...pm, orderCode }
        }).then(json => {
            dispatch(actions.PurchaseLoading(false, 'edit'));
            return json;

        })
    },

    PurchaseDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PurchaseLoading(true, 'edit'));
        return ReqApi.get({
            url: PurchaseUrls.GETDETAILBYCODE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (json.data) {
                    let { supplierCode, purchaseOrgCode, shippingAddressCode, contactsCode, costCenterCode, buyerCode, curCode, siteCode, payCode,
                        sourceOrderType
                     } = json.data;
                    let page = { page: 1, pageSize: 10 };
                    let state = getState()[PURCHASEREDU].set('purchaseDetail', json.data).set('supplierCode', supplierCode).setIn(['edit', 'orgCode'], purchaseOrgCode);
                    dispatch(actions.SupplierList({ supplierCode: supplierCode, ...page }, 'edit'));
                    dispatch(actions.ShippingAddressList({ bpCode: supplierCode, addressCode: shippingAddressCode, ...page }, 'edit'));
                    dispatch(actions.ContactsList({ bpCode: supplierCode, contactsCode: contactsCode, ...page }, 'edit'));
                    dispatch(actions.CostCenterList({ orgCode: costCenterCode, ...page }, 'edit'));
                    dispatch(actions.Buyerlist({ deptCode: purchaseOrgCode, employeeCode: buyerCode, ...page }, 'edit'));
                    dispatch(actions.CurList({ curCode: curCode, ...page }, 'edit'));
                    dispatch(actions.SiteList({ siteCode: siteCode, ...page }, 'edit'));
                    dispatch(actions.Paymentlist({ subCode: 'C013', status: 1, catCode: payCode, ...page }, 'edit'));
                    if(sourceOrderType == 1) {
                        dispatch(actions.PurchaseOrgList({ orgType: '', orgCode: purchaseOrgCode, ...page }, 'edit'));
                    }else{
                        dispatch(actions.PurchaseOrgList({ orgCode: purchaseOrgCode, ...page }, 'edit'));
                    }
                    dispatch({ type: PURCHASEREDU, state });
                }

            }
            dispatch(actions.PurchaseLoading(false, 'edit'));
        })
    },

    CanPurchaseEdit: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchaseUrls.CAN_PURCHASE_EDIT,
            pm
        }).then(json => {
            if (json.status === 2000) {
                if (type) {
                    let state = getState()[PURCHASEREDU].set('purchaserId', pm.orderCode).set('sourceType', type);
                    dispatch({ type: PURCHASEREDU, state });
                }
            }
            return json;
        })
    },

    DeleteData: (value, type) => (dispatch, getState) => {
        let state;
        if (value == 'purchaseOrgCode') {
            state = getState()[PURCHASEREDU].setIn([type, 'buyerlist'], []);
        } else {
            state = getState()[PURCHASEREDU].setIn([type, 'shippingAddressList'], []).setIn([type, 'contactsList'], []);
        }

        dispatch({ type: PURCHASEREDU, state });
    },

    GetSelectData: () => (dispatch, getState) => {
        dispatch(actions.PurchaseLoading(true, 'add'));
        let page = { page: 1, pageSize: 10 };
        let p1, p2, p3, p4, p5, p6, p7;
        p1 = dispatch(actions.SupplierList(page, 'add')),
            p2 = dispatch(actions.CurList(page, 'add')),
            p3 = dispatch(actions.SiteList(page, 'add')),
            p4 = dispatch(actions.CostCenterList(page, 'add')),
            p5 = dispatch(actions.PurchaseOrgList(page, 'add')),
            p6 = dispatch(actions.Paymentlist({ subCode: 'C013', status: 1, ...page }, 'add')),
            p7 = dispatch(actions.IsBuyer());
        Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(function () {
            dispatch(actions.PurchaseLoading(false, 'add'));
        })

    },

    PurchaseStatus: (status, pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchaseUrls.PURCHASE_STATUS(status),
            pm,
            callBack: true
        }).then((json) => {
            if (json.status == 2100 || json.status == 2200 || json.status == 2300 || json.status == 2400) {
                // dispatch(actions.PurchaseCode(pm.orderCode))
            }
            return json
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
    //明细行弹框
    DetailLineVisible: (type, dtype, value) => (dispatch, getState) => {
        let state = getState()[PURCHASEREDU].setIn([type,'dialog',dtype,'visible'], value);
        dispatch({ type: PURCHASEREDU, state });
    },
}
const actions = {
    ...PurchaseActions,
}
export default actions;