import { fromJS } from 'immutable';
import { PRODUCTION_STORAGE_TABLE_TAB_REDU } from '../../consts/ActTypes';

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
    },
});

const ProductionStorageTableTabRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTION_STORAGE_TABLE_TAB_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionStorageTableTabRedu;