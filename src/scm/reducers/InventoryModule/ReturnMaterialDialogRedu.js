import {fromJS} from 'immutable';
import { RETURN_MATERIAL_DIALOG_REDU }from '../../consts/ActTypes';

let initState = fromJS({
    loading: false,  
    visible: false,
    data: {
        dataSource: [],    // add row  
        formInitData: {}    // initial info
    },
    editable: true,
    record: {}, 
});

const ReturnMaterialDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case RETURN_MATERIAL_DIALOG_REDU:
            return action.state;
        default:
            return state;
    }
}

export default ReturnMaterialDialogRedu;