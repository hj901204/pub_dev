//采购订单
import { fromJS } from 'immutable';
import { PURCHASEREDU } from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    dataSource: [],
    Record: {},
    hiddenVisible: false,
    purchaseBaseSource: { list: [] },
    purchaseViewLoading: false,
    PurchaseViewData: {},//概览表格数据
    purchaserId: null,
    defaultBuyer: {},
    purchaseDetail: {},
    sourceType: '',
    supplierCode: '',
    materialList:[],
    add: {
        supplierList: [],
        shippingAddressList: [],
        contactsList: [],
        buyerlist: [],
        siteList: [],
        purchaseOrgList: [],
        curList: [],
        costCenterList: [],
        measurelist: [],
        paymentList: [],
        purchaseLoading: false,
        orgCode: '',
        dialog: {
            add: { visible: false, },
            edit: { visible: false, },
        }
    },
    edit: {
        supplierList: [],
        shippingAddressList: [],
        contactsList: [],
        buyerlist: [],
        siteList: [],
        purchaseOrgList: [],
        curList: [],
        costCenterList: [],
        measurelist: [],
        paymentList: [],
        purchaseLoading: false,
        orgCode: '',
        dialog: {
            add: { visible: false, },
            edit: { visible: false, },
        }
    }
});

const PurchaseRedu = (state = initState, action) => {
    switch (action.type) {
        case PURCHASEREDU:  
            return action.state;
        default:
            return state;
    }
}

export default PurchaseRedu;