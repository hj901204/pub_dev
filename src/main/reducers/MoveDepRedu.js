import { fromJS, Record ,Map} from 'immutable';
import { MOVEDEPREDU }from '../consts/ActTypes';

let initState = fromJS({
    //sidebar_visiable: false,
    MoveDepVisiable:false,
    MoveDepLoading:false,
   // dataSource: [],
    //record: {},
});


const MoveDepRedu = (state = initState, action) => {
    switch (action.type) {
        case MOVEDEPREDU:
            return action.state; 
        default:    
            return state;
    }
}

export default MoveDepRedu;