import { fromJS } from 'immutable';
import { PRE_RECEIPT_OPERATION } from '../../consts/ActTypes';

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

const PreReceiptOperationDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case PRE_RECEIPT_OPERATION:
            return action.state;
        default:
            return state;
    }
}

export default PreReceiptOperationDialogRedu;