/**
 * Created by MW on 2017/4/24.
 */
import {fromJS, Record, List} from 'immutable'
import {PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU} from '../../consts/ActTypes'

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

let ProductionIssueOutboundDetailsRedu = (state = initStat, action) => {
    switch (action.type){
        case PRODUCTION_ISSUE_OUTBOUND_DETAILS_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionIssueOutboundDetailsRedu