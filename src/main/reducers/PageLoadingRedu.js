/**
 * Created by MW on 2017/3/20.
 */
import { fromJS, Record ,Map} from 'immutable';
import { PAGE_LOADING_REDU }from '../consts/ActTypes';

let initState = fromJS({
    loading: false,
});

const PageLoadingRedu = (state = initState, action) => {
    switch (action.type) {
        case PAGE_LOADING_REDU:
            return action.state;
        default:
            return state;
    }
}

export default PageLoadingRedu;