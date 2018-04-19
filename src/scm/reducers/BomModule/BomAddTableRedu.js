import { fromJS, Record ,Map} from 'immutable';
import { BOMADDTABLEREDU }from '../../consts/ActTypes';

let initState = fromJS({
    visible: false,
    list: [],
    record:{},
    value:'',
});

const BomAddTableRedu = (state = initState, action) => {
    switch (action.type) {
        case BOMADDTABLEREDU:  
            return action.state;    
        default:    
            return state;
    }
}

export default BomAddTableRedu;