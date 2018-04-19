import { fromJS, Record  } from 'immutable'
import { ADDWAREHOUSINGREDU } from '../../consts/ActTypes'

let initialData = fromJS({
    dataSource: [],
    searchSource: [],
    listLoading:false,
    saveLoading:false,
});

const AddWareHousingRedu = ( state = initialData, action) => {
    switch (action.type) {
        case ADDWAREHOUSINGREDU: 
            return action.state;
        default:
            return state;
    }
}

export default AddWareHousingRedu