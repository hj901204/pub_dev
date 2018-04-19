import { fromJS } from 'immutable';
import { AUTHORITYREDU }from '../consts/ActTypes';

let initState = fromJS({
    side_visible:false,
    add_visible:false,
    dialog_loading:false,
    table_loading:false,
    sidebar_loading:false,
    men_table_loading:false,
    treeChecked:[],
    selRows:[],//选中的权限人数组
    authSearch:{
        page:1,
        pageSize:10
    },
    menSearch:{
        page:1,
        pageSize:10,
        roleCode:"",
        roleName:""
    },
    authTreeData:[],
    menTreeData:[],
    authDetail:{},
    menData:[],
    authData:[],
    authPaging:{
        page:1,
        pageSize:10,
        total:0
    },
    menPaging:{
        page:1,
        pageSize:10,
        total:0
    }
});

const AuthorityRedu = (state = initState, action) => {
    switch (action.type) {
        case AUTHORITYREDU:
            return action.state;
        default:
            return state;
    }
}

export default AuthorityRedu;