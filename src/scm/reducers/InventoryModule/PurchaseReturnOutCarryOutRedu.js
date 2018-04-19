import { fromJS,Map} from 'immutable';
import { PURCHASERETURNOUTCARRYOUT }from '../../consts/ActTypes';

let initState = fromJS({
    inventorySelectVisiable:false,
    orderTableLoading:false,
    distributeTableLoading:false,
    inventorySelectLoading:false,
    listLoading:false,
    carryOutOrderInfoLoading:false,
    carryOutDistributeInfoLoading:false,
    outCode:"",
    orderInfoData:[],
    dataSource:[],
    InventorySelectData:[],
    InventorySelectTableData:[],
    distributeInfoData:[],
    OrderPaging:{},
    distributePaging:{}
});

const PurchaseReturnOutCarryOutRedu = (state = initState, action) => {
    
    switch (action.type) {
        case PURCHASERETURNOUTCARRYOUT:
            return action.state;    
        default:    
            return state;
    }
}

export default PurchaseReturnOutCarryOutRedu;
