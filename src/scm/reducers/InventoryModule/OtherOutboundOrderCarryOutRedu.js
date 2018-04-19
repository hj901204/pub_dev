/**
 * Created by MW on 2017/7/21.
 * 其它出库单执行reduce
 */

import {fromJS, Record, List} from 'immutable'
import {OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU} from '../../consts/ActTypes'

let initialState = fromJS({
    orderCode: '',
    status: false,
    orderInfoData: [],
    orderList: [],
    allotInfoList: [],
    popupData: [],
    popupList: [],
    popupSearch:{},
    orderPaging: {},
    allotPaging: {},
    popupPaging: {},
    visible: false,
    loading: false,
    orderLoading: false,
    allotInfoLoading: false,
    popupLoading: false,
    sendLoading: false,
    searchLoading: false,
});

let OtherOutboundOrderCarryOutRedu = (state = initialState, action) => {
    switch (action.type){
        case OTHER_OUTBOUND_ORDER_CARRY_OUT_REDU :
            return action.state;
        default:
            return state;
    }
};

export default OtherOutboundOrderCarryOutRedu
