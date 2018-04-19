/**
 * Created by MW on 2017/3/13.
 */
import { fromJS, Record ,Map} from 'immutable';
import { TREE }from '../consts/ActTypes';

let initState = fromJS({
    data: [],
    loading: true
});

let TreeRedu = (state = initState, action) => {
    switch (action.type) {
        case TREE:
            return action.state;
        default:
            return state;
    }
}

export default TreeRedu