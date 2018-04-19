import { fromJS,Map} from 'immutable';
import { INSTANTINVENTREDU }from '../../consts/ActTypes';

let initState = fromJS({
    SidebarVisiable:false,
    listLoading:false,
    dataSource:[],
    paging:{total:10,current:1,pageSize:10},
    materialCode:"",
    dialogLoading:true,
    id:"",
    status:0

});

const InstantInventoryRedu = (state = initState, action) => {
    
    switch (action.type) {
        case INSTANTINVENTREDU:
            return action.state;    
        default:    
            return state;
    }
}

export default InstantInventoryRedu;


