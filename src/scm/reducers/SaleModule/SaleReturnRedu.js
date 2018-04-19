import { fromJS } from 'immutable';
import { SALE_RETURN_REDU } from '../../consts/ActTypes';

let initState = fromJS({

    tabLoading: false,
    saleReturnLoading: false,
    saleReturnDetailLoading: false,
    fetching :false,
    detail:{
        saleReturnCode: ""
    },
    add: {
        saleReturn_visiable: false,
        saleReturnMaterial_visible: false,
        saleOrderDetail: {},
        saleOrderDetailList: [],
    },
    saleOrderDetail: {},
    edit:{
        saleReturnCode: "",
        saleOrderDetail: {},
        saleReturnMaterial_visible: false,
        saleReturn_visiable: false,
        saleOrderDetailList: [],
    },
    add_table_visiable: false,
    edit_table_visiable: false,
    materialSource: [],
    dataSource: [],
    paging: {
        // current: page || act.current,
        // total,
        // pageSize
    },

    originalOrderSource: [],
    initialSaleOrderList: [],
    saleReturnDetailInfo:{
        add:{},
        edit:{},
        detail:{}
    },
    saleOrder: {},
    saleOrderCode: '',
    customerList: [],
    contactsList: [],
    receiveAdrList: [],
    salesmanList: [],
    takeDelOfAddressList: [],
    salesorgList: []


});

const SaleReturnRedu = (state = initState, action) => {
    switch (action.type) {
        case SALE_RETURN_REDU:
            return action.state;
        default:
            return state;
    }
}
export default SaleReturnRedu;
