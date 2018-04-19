import { fromJS } from 'immutable';
import { OTHER_WAREHOUSE_CARRYOUT_TABLE } from '../../consts/ActTypes';

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

const OtherWarehouseCarryOutTableRedu = (state = initState, action) => {
    switch (action.type) {
        case OTHER_WAREHOUSE_CARRYOUT_TABLE:
            return action.state;
        default:
            return state;
    }
}

export default OtherWarehouseCarryOutTableRedu;