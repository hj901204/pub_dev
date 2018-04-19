import { fromJS } from 'immutable';
import { PURCHASE_EIDT_TABLE_TAB_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    orderInfoTableData: { // 订单信息
        dataSource: [],
        paging: {
            page: 1,
            pageSize: 10,
            total: 0
        },
        tableLoading: false,
    },
    receiveGoodsTableData: { //预收货信息
        dataSource: [],
        paging: {
            page: 1,
            pageSize: 10,
            total: 0
        },
        tableLoading: false,
    }
});

const PurchaseEidtTopRedu = (state = initState, action) => {
    switch (action.type) {
        case PURCHASE_EIDT_TABLE_TAB_REDU:
            return action.state;
        default:
            return state;
    }
}

export default PurchaseEidtTopRedu;