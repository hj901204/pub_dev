import { fromJS } from 'immutable';
import { MATERIALREDU }from '../../consts/ActTypes';

let initState = fromJS({
    //导入
    importViewLoading:false,
    importViewVisiable:false,
    progressVisible:false,
    percent:0,
    errorExcelUrl:"",
    alertVisible:false,

    tabLoading: false,
    edit_supplier_visiable: false,
    dataSource: [],
    add_supplier_visiable:false,
    materialLoading:false,
    componentMsg:false,
    Record:{},
    hiddenVisible:false,
    materialBaseSource:{},
    supplierBaseLoading:false,
    ContactData:[],
    dept_Name:{},
    businessPartner:[],
    empList:[],
    curList:{},
    materialCode:null,
    supplierLoading:false,
    inventoryLoading:false,
    sellLoading:false,
    purchaseLoading:false,
    produceLoading:false,
    planLoading:false,
    materialInventoryList:[{
        materialCode:"",
        shelfLife:"",
        type:"0",
        usingBatch:"0",
        usingExpiration:"0",
        usingWarehouse:"0"
    }],
    materialCodeRule:''
});

const MaterialRedu = (state = initState, action) => {
    switch (action.type) {
        case MATERIALREDU:
            return action.state;
        default:
            return state;
    }
}

export default MaterialRedu;