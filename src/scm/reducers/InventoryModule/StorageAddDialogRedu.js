/**
 * Created by MW on 2017/5/3.
 */

import { fromJS } from 'immutable'
import { STORAGEADDDIALOGREDU } from '../../consts/ActTypes'

export let initialData = fromJS({
    visible:false,
    loading:false,
    enumSiteCode:[] //站点枚举
});

export const StorageAddDialogRedu = (state = initialData, action) => {
    switch (action.type) {
        case STORAGEADDDIALOGREDU:
            return action.state;
        default:
            return state;
    }
}

