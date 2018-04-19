import {fromJS} from 'immutable';
import { OTHER_OUT_ADD_ROW_DIALOG_REDU }from '../../consts/ActTypes';

export let initState = fromJS({
    visible:false,
    loading:false,
    dataSource:{},
    tablePaging:[],
    enum:[]
});

export const OtherOutAddRowDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case OTHER_OUT_ADD_ROW_DIALOG_REDU:
            return action.state;
        default:
            return state;
    }
}


