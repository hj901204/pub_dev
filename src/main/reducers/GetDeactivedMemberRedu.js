import { fromJS, Record  } from 'immutable'
import { GETDEAVTIVEMEMER } from '../consts/ActTypes'



let initialData = fromJS({
    outInfoData: [],
    paging:{},
    tableLoading: false,
    searchDeactiveMemberVal: {
        employeeName:'', 
        phone:'',
        page:1, 
        pageSize:10, 
    }
});

const GetActivedMemberRedu = ( state = initialData, action) => {
    switch (action.type) {
        case GETDEAVTIVEMEMER: 
            return action.state; 
        default:
            return state;
    }
}

export default GetActivedMemberRedu