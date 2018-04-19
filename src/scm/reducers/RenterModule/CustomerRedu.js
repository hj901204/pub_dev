import { fromJS } from 'immutable';
import { CUSTOMERREDU }from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    dataSource: [],
    add_customer_visiable:false,
    customerLoading:false,
    componentMsg:false,
    hiddenVisible:false,
    customerBaseLoading:false,
    customerBaseSource:{},
    Record:{},
    dept_Name:[],
    businessPartner:[],
    empList:[],
    curList:[],
    subjectData: {},
    bpData: {},
    Ppage: null,
    paging: {
        // current: page || act.current,
        // total,
        // pageSize
    },
//导入模块------------------------------------
    importViewLoading:false,
    importViewVisiable:false,
    progressVisible:false,
    percent:0,
    errorExcelUrl:"",
    alertVisible:false,
});

const CustomerRedu = (state = initState, action) => {
    switch (action.type) {
        case CUSTOMERREDU:
            return action.state;
        default:
            return state;
    }
}

export default CustomerRedu;