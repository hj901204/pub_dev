import { fromJS, Record  } from 'immutable'
import { ADDPURCHASELISTREDU } from '../../consts/ActTypes'

let initialData = fromJS({
    dataSource: [],
    searchSource: [],
    listLoading:false,
    saveLoading:false,
});

const AddPurchaseListRedu = ( state = initialData, action) => {
    switch (action.type) {
        case ADDPURCHASELISTREDU: 
            return action.state;
        default:
            return state;
    }
}

export default AddPurchaseListRedu