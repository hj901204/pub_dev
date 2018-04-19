/**
 * Created by MW on 2017/4/20.
 */
import { fromJS, Record,List } from 'immutable';
import { NEWPRODUCTION_ISSUE_REDU } from '../../consts/ActTypes';

let initState = fromJS({
    selectedList: [],
    dataSource:{},
    loading: false,
    saveLoading: false,
});

let NewProductionIssueRedu = (state = initState, action) => {
    switch (action.type) {
        case NEWPRODUCTION_ISSUE_REDU:
            return action.state;
        default:
            return state;
    }
}

export default NewProductionIssueRedu