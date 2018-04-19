/**
 * Created by dell on 2017/3/24.
 */
import { fromJS, Record ,Map} from 'immutable';
import { LINKAGEREDU }from '../consts/ActTypes';

let initState = fromJS({
    source:{
        countrySource: [],
        provinceSource: [],
        citySource: [],
        countySource: [],
    }
});


const LinkageRedu = (state = initState, action) => {
    switch (action.type) {
        case LINKAGEREDU:
            return action.state;
        default:
            return state;
    }
}
export default LinkageRedu;
