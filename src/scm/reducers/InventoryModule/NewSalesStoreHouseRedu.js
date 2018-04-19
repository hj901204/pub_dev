/**
 * Created by MW on 2017/4/20.
 */
import { fromJS, Record,List } from 'immutable';
import { NEWSALES_STOREHOUSE_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    selectedList: [],
    dataSource:{},
    loading: false,
    saveLoading: false
});

let NewSalesStoreHouseRedu = (state = initState, action) => {
    switch (action.type) {
        case NEWSALES_STOREHOUSE_REDU:
            return action.state;
        default:
            return state;
    }
}

export default NewSalesStoreHouseRedu