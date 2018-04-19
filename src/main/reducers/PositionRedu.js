import { fromJS, Record ,Map} from 'immutable';
import { POSITIONREDU }from '../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    positionLoading: false,
    add_position_visiable: false,
    edit_position_visiable: false,
    sidebar_visiable: false,
    position: {
        positionCode: "",
        positionName: "",
        positionNo: "",
        positionDesc: "",
    },
    positionId: "",
    dataSource: [],
    paging: {
        // current: page || act.current,
        // total,
        // pageSize
    },
    record: {},
});

const PositionRedu = (state = initState, action) => {
    switch (action.type) {
        case POSITIONREDU:  
            return action.state;    
        default:    
            return state;
    }
}

export default PositionRedu;