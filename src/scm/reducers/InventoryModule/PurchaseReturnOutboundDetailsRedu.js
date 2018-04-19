/**
 * Created by MW on 2017/4/24.
 */
import {fromJS, Record, List} from 'immutable'
import {PURCHASE_RETURN_OUTBOUND_DETAILS_REDU} from '../../consts/ActTypes'

let initStat = fromJS({
    dataSource: [],
    list: [],
    remarkList:[],
    paging:{
        total:0,
        current:1,
        pageSize:10
    },
    loading: true,
    tableLoading:true,
});

let PurchaseReturnOutboundDetailsRedu = (state = initStat, action) => {
    switch (action.type){
        case PURCHASE_RETURN_OUTBOUND_DETAILS_REDU:
            return action.state;
        default:
            return state;
    }
}

export default PurchaseReturnOutboundDetailsRedu