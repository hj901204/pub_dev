import { fromJS, Record  } from 'immutable'
import { WAREHOUSINGDETAILSREDU } from '../../consts/ActTypes'

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

const WareHousingDetailsRedu = ( state = initialData, action) => {
    switch (action.type) {
        case WAREHOUSINGDETAILSREDU: 
            return action.state;
        default:
            return state;
    }
}

export default WareHousingDetailsRedu