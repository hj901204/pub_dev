import {fromJS} from 'immutable';
import {OTHER_WAREHOUSE_CARRYOUT}from '../../consts/ActTypes';

let initState = fromJS({
    datasource: {},
    formInfo: {},
    pageLoading: false,
    receiveBtnLoading: false,
    message: '',
    orderinfoPagePm: 1,
});

const OtherWarehouseCarryOutRedu = (state = initState, action) => {
    switch (action.type) {
        case OTHER_WAREHOUSE_CARRYOUT:
            return action.state;
        default:
            return state;
    }
}

export default OtherWarehouseCarryOutRedu;