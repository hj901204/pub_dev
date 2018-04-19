import { fromJS, Record,List } from 'immutable';
import { LAYOUTTOPREDU } from '../consts/ActTypes';

let initState = fromJS({
    dataSource:{},
});

const LayoutTopRedu = (state = initState, action) => {
    switch (action.type) {
        case LAYOUTTOPREDU:
            return action.state;
        default:
            return state;
    }
}
export default LayoutTopRedu;