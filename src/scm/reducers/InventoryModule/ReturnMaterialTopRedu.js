import { fromJS } from 'immutable';
import { RETURN_MATERIAL_TOP_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    datasource: {},
    formInfo: {},
    pageLoading: false,
    receiveBtnLoading: false,
    orderinfoPagePm: 1,
});

const ReturnMaterialTopRedu = (state = initState, action) => {
    switch (action.type) {
        case RETURN_MATERIAL_TOP_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ReturnMaterialTopRedu;