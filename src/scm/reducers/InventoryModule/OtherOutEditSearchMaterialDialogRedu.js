/**
 * Created by MW on 2017/7/26.
 */
import { fromJS  } from 'immutable'
import { OTHER_OUT_EDIT_SEARCH_MATERIAL_DIALOG_REDU } from '../../consts/ActTypes'

let initialData = fromJS({
    newState:{},
    visible:false,
    tableLoading:false,
    btnLoading:false,
    dataSource: [],
    paging:{
        current:1,
        pageSize:10,
        total:10,
    },
    search:{
        pageSize:10,
        page:1,
    },
});

let OtherOutEditSearchMaterialDialogRedu = ( state = initialData, action) => {
    switch (action.type) {
        case OTHER_OUT_EDIT_SEARCH_MATERIAL_DIALOG_REDU:
            return action.state;
        default:
            return state;
    }
}

export default OtherOutEditSearchMaterialDialogRedu;
