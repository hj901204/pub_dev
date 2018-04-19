import {fromJS} from 'immutable';
import { STORAGEREDU }from '../../consts/ActTypes';

export let initState = fromJS({
    loading:false,
    pagination:{
        current:1,
        total:1,
        pageSize:10,
    },
    dataSource:[]
});

export const StorageRedu = (state = initState, action) => {
    switch (action.type) {
        case STORAGEREDU:
            return action.state;
        default:
            return state;
    }
}


