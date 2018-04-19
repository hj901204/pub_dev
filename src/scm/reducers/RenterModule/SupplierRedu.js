import { fromJS } from 'immutable';
import { SUPPLIERREDU }from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    edit_supplier_visiable: false,
    dataSource: [],
    add_supplier_visiable:false,
    supplierLoading:false,
    componentMsg:false,
    Record:{},
    hiddenVisible:false,
    supplierBaseSource:{},
    supplierBaseLoading:false,
    dept_Name:[],
    businessPartner:[],
    empList:[],
    curList:[],
    supplierId:null,
    subjectData: {},
    bpData: {},
    Ppage:null,
    userInfo:{},
    contactPaging: {},
    message: "",
    importViewLoading: false,
    importViewVisiable: false,
    progressVisible: false,
    percent: 0,
    errorExcelUrl: "",
    alertVisible: false,
});

const SupplierRedu = (state = initState, action) => {
    switch (action.type) {
        case SUPPLIERREDU:
            return action.state;
        default:
            return state;
    }
}

export default SupplierRedu;