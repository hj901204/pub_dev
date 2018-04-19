/**
 * Created by MW on 2017/4/20.
 */
import { fromJS, Record,List } from 'immutable';
import { PRODUCTION_ISSUE_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    dataSource: [],
    paging: {
        total: 1,
        current: 1,
        pageSize: 10
    },
    search: {
        page: 1,
        pageSize: 10,
        sourceOrderType:14
    },
    productionDetails: {},
    sideDetails: false,
    sideClient: false,
    tableLoading: true,
    detailsLoading: true,
    clientLoading:true,
    searchLoading:false,
});

const ProductionIssueRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTION_ISSUE_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionIssueRedu