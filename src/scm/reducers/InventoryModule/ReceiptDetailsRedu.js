import { fromJS, Record  } from 'immutable'
import { RECEIPTDETAILSREDU } from '../../consts/ActTypes'

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

const ReceiptDetailsRedu = ( state = initialData, action) => {
    switch (action.type) {
        case RECEIPTDETAILSREDU: 
            return action.state;
        default:
            return state;
    }
}

export default ReceiptDetailsRedu