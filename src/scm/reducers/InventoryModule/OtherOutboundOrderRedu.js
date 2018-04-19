/**
 * Created by MW on 2017/7/20.
 * 其它出库单reduce
 */

import {fromJS, Record,  List,} from 'immutable'
import {OTHER_OUTBOUND_ORDER_REDU} from '../../consts/ActTypes'

let initialState = fromJS({
    dataSource: [],
    paging: {
        total: 1,
        current: 1,
        pageSize: 10
    },
    search: {
        page: 1,
        pageSize: 10,
        sourceOrderType: 15
    },
    dataTypeSource:[],
    loading: true,
    searchLoading: false,
    tableLoading: false,
});

let OtherOutboundOrderRedu = (state = initialState, action) => {

    switch (action.type){

        case OTHER_OUTBOUND_ORDER_REDU :
            return action.state;

        default :
            return state;
    }
}

export default OtherOutboundOrderRedu
