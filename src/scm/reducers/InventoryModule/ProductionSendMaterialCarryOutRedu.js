import { fromJS,Map} from 'immutable';
import { PRODUCTIONSENDMATERIALCATTYOUT }from '../../consts/ActTypes';

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

const ProductionSendMaterialCarryOutRedu = (state = initState, action) => {
    
    switch (action.type) {
        case PRODUCTIONSENDMATERIALCATTYOUT:
            return action.state;    
        default:    
            return state;
    }
}

export default ProductionSendMaterialCarryOutRedu;
