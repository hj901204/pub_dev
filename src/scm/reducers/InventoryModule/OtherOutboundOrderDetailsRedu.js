/**
 * Created by MW on 2017/7/21.
 * 其他出库单详情reducer
 */

import {fromJS, Record, List} from 'immutable'
import {OTHER_OUTBOUND_ORDER_DETAILS_REDU} from '../../consts/ActTypes'

let initialState = fromJS({
    orderInfoData: [],
    tableList: [],
    remarkList: [],
    loading: false,
    tableLoading: false,
});

let OtherOutboundOrderDetailsRedu = (state = initialState, action) => {
    switch (action.type) {
        case OTHER_OUTBOUND_ORDER_DETAILS_REDU :
            return action.state;
        default :
            return state;
    }
};

export default OtherOutboundOrderDetailsRedu
