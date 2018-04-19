import { fromJS } from 'immutable';
import { SALEPRICEREDU }from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    edit_supplier_visiable: false,
    dataSource: [],
    dataSourceMaterial: [],
    add_supplier_visiable:false,
    materialLoading:false,
    componentMsg:false,
    Record:{},
    hiddenVisible:false,
    materialBaseSource:{},
    supplierBaseLoading:false,
    editLoading:false,
    ContactData:[],
    dept_Name:{},
    businessPartner:[],
    empList:[],
    curList:{},
    orderCode:null,
    supplierLoading:false,
    saleReturn_visiable: false,
    sourceCodeDilog:false,
    sourceEditDilog:false,
    add_site_visiable: false,
    priceList:{},
    materialCodeRule:''
    
    
    
});

const SalePriceRedu = (state = initState, action) => {
    switch (action.type) {
        case SALEPRICEREDU:
            return action.state;
        default:
            return state;
    }
}

export default SalePriceRedu;