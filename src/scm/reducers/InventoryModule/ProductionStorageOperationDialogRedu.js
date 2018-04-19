import { fromJS } from 'immutable';
import { PRODUCTION_STORAGE_DIALOG_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    loading: false,
    visible: false,
    data: {
        dataSource: [],
        formInitData: {}
    },
    editable: true,
    record: {}
});

const ProductionStorageOperationDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTION_STORAGE_DIALOG_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ProductionStorageOperationDialogRedu;