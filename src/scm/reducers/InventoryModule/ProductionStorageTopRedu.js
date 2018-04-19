import { fromJS } from 'immutable';
import { PRODUCTION_STORAGE_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    datasource: {},
    formInfo: {},
    pageLoading: false,
    message: '',
    receiveBtnLoading: false,
    orderinfoPagePm: 1,
});

const ProductionStorageTopRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTION_STORAGE_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionStorageTopRedu;