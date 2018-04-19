/**
 * Created by MW on 2017/3/24.
 */
import {fromJS} from 'immutable';
import {MEMBERDIALOGREDU}from '../consts/ActTypes';

let initState = fromJS({
    addMemberDialog: {
        loading: false,
        visible: false,
        width: 700,
        addressEnum: [],
        deptEnum: [],
        countryEnum:[],
        positionEnum: []
    },
    eidtMemberDialog: {
        loading: false,
        visible: false,
        width: 700,
        addressEnum: [],
        countryEnum:[],
        deptEnum: [],
        positionEnum: [],
        dataSource:{}
    }
});

const MemberDialogRedu = (state = initState, action) => {
    switch (action.type) {
        case MEMBERDIALOGREDU:
            return action.state;
        default:
            return state;
    }
}

export default MemberDialogRedu;