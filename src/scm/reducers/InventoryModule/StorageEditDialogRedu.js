/**
 * Created by MW on 2017/5/3.
 */
import { fromJS } from 'immutable';
import { STORAGEEDITDIALOGREDU } from '../../consts/ActTypes';

export let  initialData = fromJS({
    visible:false,
    loading:false,
    enumSiteCode:[], //站点枚举
    dataSource: {}
});

export const StorageEditDialogRedu = (state = initialData, action) => {
    switch (action.type) {
        case STORAGEEDITDIALOGREDU:
            return action.state;
        default:
            return state;
    }
}

