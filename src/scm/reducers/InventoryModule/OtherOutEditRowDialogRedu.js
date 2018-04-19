import {fromJS} from 'immutable';
import { OTHER_OUT_EDIT_ROW_DIALOG_REDU }from '../../consts/ActTypes';

export let initState = fromJS({
    visible:false,
    loading:false,
    dataSource:[],
    enum:[]
});

export const OtherOutEditRowDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case OTHER_OUT_EDIT_ROW_DIALOG_REDU:
            return action.state;
        default:
            return state;
    }
}


