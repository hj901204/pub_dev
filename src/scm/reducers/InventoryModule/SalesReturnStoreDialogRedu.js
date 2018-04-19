import {fromJS} from 'immutable';
import { SALES_RETURN_STORE_DIALOG_REDU }from '../../consts/ActTypes';

let initState = fromJS({
    loading: false,  
    visible: false,
    data: {
        dataSource: [],    
        formInitData: {} 
    },
    editable: true,
    record: {}, 
});

const SalesReturnStoreDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case SALES_RETURN_STORE_DIALOG_REDU:
            return action.state;
        default:
            return state;
    }
}

export default SalesReturnStoreDialogRedu;