/**
 * Created by MW on 2017/4/20.
 */
import { fromJS, Record,List } from 'immutable';
import { PURCHASE_RETURN_HOUSE_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    dataSource: [],
    paging: {
        total: 1,
        current: 1,
        pageSize: 10
    },
    search: {
        page: 1,
        pageSize:10,
        sourceOrderType:31
    },
    supplierData: [],
    purchaseDetails: {},
    sideDetails: false,
    sideSupplier: false,
    tableLoading: true,
    detailsLoading: true,
    searchLoading:false,
});

const PurchaseReturnHouseRedu = (state = initState, action) => {
    switch (action.type) {
        case PURCHASE_RETURN_HOUSE_REDU:
            return action.state;
        default:
            return state;
    }
}

export default PurchaseReturnHouseRedu