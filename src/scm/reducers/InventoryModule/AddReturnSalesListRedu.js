import { fromJS, Record  } from 'immutable'
import { ADDRETURNSALESLISTREDU } from '../../consts/ActTypes'

let initialData = fromJS({
     dataSource: [],
    searchSource: [],
    listLoading:false,
    saveLoading:false,
});

const AddReturnSalesListRedu = ( state = initialData, action) => {
    switch (action.type) {
        case ADDRETURNSALESLISTREDU: 
            return action.state;
        default:
            return state;
    }
}

export default AddReturnSalesListRedu