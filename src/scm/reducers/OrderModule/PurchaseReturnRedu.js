//采购退货单
import { fromJS } from 'immutable';
import { PURCHASERETURNREDU } from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    dataSource: [],
    purchaseReturnLoading: false,
    Record: {},
    PurRetViewData: {},//概览数据
    purchaserReturnId: null,
    defaultBuyer: {},
    purchaseReturnDetail: {},
    purchaseDetailLoading: false,
    purchaseReturnId: null,
    supplierCode: '',
    sourceType: '',
    add: {
        purRet_visiable: false,
        purchaseDetail: {},
        purchaseDetailList: [],
        purchaseList: [],
        supplierList: [],
        shippingAddressList: [],
        contactsList: [],
        buyerlist: [],
        siteList: [],
        purchaseOrgList: [],
        curList: [],
        costCenterList: [],
        purchaseReLoading: false,
        orgCode: '',
    },
    edit: {
        purRet_visiable: false,
        purchaseDetail: {},
        purchaseDetailList: [],
        purchaseList: [],
        supplierList: [],
        shippingAddressList: [],
        contactsList: [],
        buyerlist: [],
        siteList: [],
        purchaseOrgList: [],
        curList: [],
        costCenterList: [],
        purchaseReLoading: false,
        orgCode: '',
    }
});

const PurchaseReturnRedu = (state = initState, action) => {
    switch (action.type) {
        case PURCHASERETURNREDU:
            return action.state;
        default:
            return state;
    }
}

export default PurchaseReturnRedu;