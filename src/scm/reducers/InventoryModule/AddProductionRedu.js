import { fromJS, Record  } from 'immutable'
import { ADDPRODUCTIONREDU } from '../../consts/ActTypes'

let initialData = fromJS({
    dataSource: [],
    searchSource: [],
    siteSource:[],
    listLoading:false,
    saveLoading:false,
});

const AddProductionRedu = ( state = initialData, action) => {
    switch (action.type) {
        case ADDPRODUCTIONREDU: 
            return action.state;
        default:
            return state;
    }
}

export default AddProductionRedu