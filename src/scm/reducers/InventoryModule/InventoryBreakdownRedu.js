import { fromJS,Map} from 'immutable';
import { INVENTORYBREAKDOWNREDU }from '../../consts/ActTypes';

let initState = fromJS({
    listLoading:false,
    dataSource:[],
    paging:{}
});

const InventoryBreakdownRedu = (state = initState, action) => {
    
    switch (action.type) {
        case INVENTORYBREAKDOWNREDU:
            return action.state;    
        default:    
            return state;
    }
}

export default InventoryBreakdownRedu;


