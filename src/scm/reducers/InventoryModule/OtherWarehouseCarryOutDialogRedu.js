import { fromJS } from 'immutable';
import { OTHER_WAREHOUSE_CARRYOUT_DIALOG } from '../../consts/ActTypes';

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

const OtherWarehouseCarryOutDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case OTHER_WAREHOUSE_CARRYOUT_DIALOG:
            return action.state;
        default:
            return state;
    }
}

export default OtherWarehouseCarryOutDialogRedu;