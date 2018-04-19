import { fromJS, Record  } from 'immutable'
import { PURCHASELISTREDU } from '../../consts/ActTypes'

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
         sourceOrderType:11
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

const PurchaseListRedu = ( state = initialData, action) => {
    switch (action.type) {
        case PURCHASELISTREDU: 
            return action.state;
        default:
            return state;
    }
}

export default PurchaseListRedu