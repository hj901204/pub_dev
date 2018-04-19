import { fromJS,Map} from 'immutable';
import { SALECARRYOUTREDU }from '../../consts/ActTypes';

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

const SaleCarryOutRedu = (state = initState, action) => {
    
    switch (action.type) {
        case SALECARRYOUTREDU:
            return action.state;    
        default:    
            return state;
    }
}

export default SaleCarryOutRedu;
