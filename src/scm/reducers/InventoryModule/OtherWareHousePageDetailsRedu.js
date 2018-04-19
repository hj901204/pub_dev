import { fromJS, Record  } from 'immutable'
import { OTHERWAREHOUSEPAGEDETAILSREDU } from '../../consts/ActTypes'

let initialData = fromJS({
    dataSource: [],
    paging:{
        current:1,
        pageSize:10,
        total:100,
       // showQuickJumper: true, 
    },
     search:{
         pageSize:10,
         page:1,
    },
    tableLoading: false,
    DetailsPmLoading:false,
    materialLoading:false,
    takeOrderDetailsPm:{},
    takeOrderDetailsListPm:{},
});

const OtherWareHousePageDetailsRedu = ( state = initialData, action) => {
    switch (action.type) {
        case OTHERWAREHOUSEPAGEDETAILSREDU: 
            return action.state;
        default:
            return state;
    }
}

export default OtherWareHousePageDetailsRedu