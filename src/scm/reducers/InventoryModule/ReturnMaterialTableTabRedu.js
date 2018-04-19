import {fromJS} from 'immutable';
import { RETURN_MATERIAL_TABLE_TAB_REDU }from '../../consts/ActTypes';

let initState = fromJS({
    orderInfoTableData:{ // 订单信息
        dataSource: [],
        paging: { 
           page: 1,
            pageSize: 10,
            total: '' 
        },
        tableLoading: false,
    },
    receiveGoodsTableData: { //预收货信息
        dataSource: [],
        paging:{
            page: 1,
            pageSize: 10,
            total: ''
        },
        tableLoading: false,
    }
});

const ReturnMaterialTableTabRedu = (state = initState, action) => {
    switch (action.type) {
        case RETURN_MATERIAL_TABLE_TAB_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ReturnMaterialTableTabRedu;