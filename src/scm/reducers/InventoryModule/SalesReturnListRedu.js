import { fromJS, Record  } from 'immutable'
import { SALES_RETURN_LIST_REDU } from '../../consts/ActTypes'

let initialData = fromJS({
    dataSource: [],
    paging:{
        current:1,
        pageSize:10,
        total:10,
       // showQuickJumper: true, 
    },
    search:{
         pageSize:10,
         page:1,
         sourceOrderType:32
    },
    suplierData:{},
    side_Loading: false,
    side_visible: false,
    side_visible_sub :false,
    takeOrderPm : '',
    openSideBarLoading:false,
    openSideBarSubLoading:false,
    tableLoading:false,
    dataSourceSide:[],
    openSideBarList:{},
    btnLoading:false
});

const SalesReturnListRedu = ( state = initialData, action) => {
    switch (action.type) {
        case SALES_RETURN_LIST_REDU: 
            return action.state;
        default:
            return state;
    }
}

export default SalesReturnListRedu