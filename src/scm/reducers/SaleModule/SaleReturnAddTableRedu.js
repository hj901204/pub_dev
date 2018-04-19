import { fromJS, Record ,Map} from 'immutable';
import { SALERETURNADDTABLEREDU }from '../../consts/ActTypes';

let initState = fromJS({
    visible: false,
    list: [],
    record:{},
    value:'',
});

const SaleReturnAddTableRedu = (state = initState, action) => {
    switch (action.type) {
        case SALERETURNADDTABLEREDU:  
            return action.state;    
        default:    
            return state;
    }
}

export default SaleReturnAddTableRedu;