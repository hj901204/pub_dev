/**
 * Created by MW on 2017/3/20.
 */
import { PAGE_LOADING_REDU }from '../consts/ActTypes';

const actions = {
    pageLoading: (bool) => (dispatch, getState) => {
        let state = getState()[PAGE_LOADING_REDU].set('loading', bool);
        dispatch({ type: PAGE_LOADING_REDU, state });
    }
}
export default actions;