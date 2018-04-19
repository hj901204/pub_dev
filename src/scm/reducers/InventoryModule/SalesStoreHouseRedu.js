/**
 * Created by MW on 2017/4/20.
 */
import { fromJS, Record,List } from 'immutable';
import { SALES_STOREHOUSE_REDU } from '../../consts/ActTypes';

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
        sourceOrderType: 12
    },
    clientData:{},
    salesDetails: {},
    sideDetails: false,
    sideClient: false,
    tableLoading: true,
    detailsLoading: true,
    searchLoading:false,
});

const SalesStoreHouseRedu = (state = initState, action) => {
    switch (action.type) {
        case SALES_STOREHOUSE_REDU:
            return action.state;
        default:
            return state;
    }
}

export default SalesStoreHouseRedu