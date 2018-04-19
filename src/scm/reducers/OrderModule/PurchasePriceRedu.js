import { fromJS, Record, Map } from 'immutable';
import { PURCHASEPRICEREDU } from '../../consts/ActTypes';
let initState = fromJS({
    //列表页面
    list: {
        loading: false,
        dataSource: [],
        curList: [],
        paging: {},
    },
    //新增页面
    add: {
        loading:false,
        detail: {
            orderCode: "",
            startTime: "",
            endTime:"",
            supplierCode: "",
            supplierName: "",
            currencyCode: "",
            priceName: "",
            orderStatus: 0,
            includeTaxFlag: 1,
            taxRate: "17",
            remark: "",
            list: [],
            isTaxValue:['includeTaxFlag']
        },
        supplierList: [],
        curList: [],
        addPurPriceDetail_visible: false,
        editPurPriceDetail_visible:false
    },
    //编辑页面
    edit: {
        loading: false,
        current:"",
        detail: {},
        supplierList: [],
        curList: [],
        addPurPriceDetail_visible: false,
        editPurPriceDetail_visible:false
    },
    //详情界面
    view: {
        loading: false,
        current:"",
        detail: {
            orderCode: "",
            priceName: "",
            supplierCode:'',
            supplierName: "",
            currencyCode: "",
            currencyName: "",
            startTime: "",
            endTime: "",
            orderStatus: 0,
            includeTaxFlag: 0,
            taxRate: 2.9,
            remark: '',
        },
        paging: {
            current:1,
            pageSize:10,
            total:0
        },
        viewList: [],
        curList: [],
    },

    //导入
    import:{
        importViewLoading:false,
        importViewVisiable:false,
        progressVisible:false,
        percent:0,
        errorExcelUrl:"",
        alertVisible:false,
    }
});

const PurchasePriceRedu = (state = initState, action) => {
    switch (action.type) {
        case PURCHASEPRICEREDU:
            return action.state;
        default:
            return state;
    }
}
export default PurchasePriceRedu;