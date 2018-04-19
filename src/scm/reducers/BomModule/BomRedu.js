import { fromJS } from 'immutable';
import { BOMREDU } from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    bomLoading: false,
    fetching:false,
    showModal:false,
    showEditModal:false,
    showDetailModal:false,
    detail:{
        version: "",
        bomCode: ""
    },
    edit:{
        version: "",
        bomCode: ""
    },
    copy:{
        version: "",
        bomCode: ""
    },
    upgrade:{
        version: "",
        bomCode: ""
    },

    dataSource: [],
    materialSource: [],
    paging: {
        // current: page || act.current,
        // total,
        // pageSize
    },
    bomDetailInfo:{add:{},
        copy:{},
        edit:{},
        upgrade:{},
        detail:{}
    }

});

const BomRedu = (state = initState, action) => {
    switch (action.type) {
        case BOMREDU:
            return action.state;
        default:
            return state;
    }
}
export default BomRedu;

