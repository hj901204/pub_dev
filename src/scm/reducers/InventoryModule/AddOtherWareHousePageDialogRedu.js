import { fromJS, Record  } from 'immutable'
import { ADDOTHERWAREHOUSEPAGEDIALOGREDU } from '../../consts/ActTypes'

let initialData = fromJS({
    visible:false,
    tableLoading:false,
    btnLoading:false,
    dataSource: [],
    paging:{
        current:1,
        pageSize:5,
        total:10, 
    },
    search:{
         pageSize:5,
         page:1,
    },
});

const AddOtherWareHousePageDialogRedu = ( state = initialData, action) => {
    switch (action.type) {
        case ADDOTHERWAREHOUSEPAGEDIALOGREDU: 
            return action.state;
        default:
            return state;
    }
}

export default AddOtherWareHousePageDialogRedu