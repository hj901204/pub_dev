import {fromJS} from 'immutable';
import { SALES_RETURN_STORE_EDIT_TOP }from '../../consts/ActTypes';

let initState = fromJS({
    datasource: {},
    formInfo: {},
    pageLoading: false,
    receiveBtnLoading: false,
    orderinfoPagePm: 1,
});

const SalesReturnStoreEidtTopRedu = (state = initState, action) => {
    switch (action.type) {
        case SALES_RETURN_STORE_EDIT_TOP:
            return action.state;
        default:
            return state;
    }
}

export default SalesReturnStoreEidtTopRedu;