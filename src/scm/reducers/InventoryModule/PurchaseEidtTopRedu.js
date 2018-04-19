import {fromJS} from 'immutable';
import {PURCHASE_EIDT_TOP_REDU}from '../../consts/ActTypes';

let initState = fromJS({
    datasource: {},
    formInfo: {},
    pageLoading: false,
    receiveBtnLoading: false,
    orderinfoPagePm: 1,
});

const PurchaseEidtTopRedu = (state = initState, action) => {
    switch (action.type) {
        case PURCHASE_EIDT_TOP_REDU:
            return action.state;
        default:
            return state;
    }
}

export default PurchaseEidtTopRedu;