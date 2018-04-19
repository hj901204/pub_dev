import { fromJS, Record, Map } from 'immutable';
import { SALEORDERREDU } from '../../consts/ActTypes';
let initState = fromJS({
    tabLoading: false,
    saleOrderLoading: false,
    fetching: false,
    dataSourceList: [],
    add_table_visiable:false,//表格
    edit_table_visiable:false,
    newTableOB:{
        saleDetails:[],
        index:0,
    },   
    newVal:{},
    paging: {
        // current: page || act.current,
        // total,
        // pageSize
    },

    customerSource: [],
    orgSource: [],
    receiveAddressSource: [],//收货地址
    employeeSource: [],//销售员
    contactsSource: [],
    materialSource: [],//物料
    currencySource: [],//币种
    categorySource: [],//收款条件
    invaddressSource: [],//发票地址

    editCustomerSource: [],
    editOrgSource: [],
    editReceiveAddressSource: [],//收货地址
    editEmployeeSource: [],//销售员
    editContactsSource: [],
    editMaterialSource: [],//物料
    editCurrencySource: [],//币种
    editCategorySource: [],//收款条件
    editInvaddressSource: [],//发票地址


    siteSource: [],//发货地址 
    //收货人电话
    contactsPhone: '',
    //获取详情和编辑传的参数
    orderDetail: '',
    orderEdit: '',
    //详细信息
    saleOrderDetail:{
    },
    orderEditDetail: {
        customerName: '',
        customerCode: '',
        orderDate: '',
        receiveAddressName: '',
        receiveAddressDetails: '',
        contactsPersonCode: '',
        contactsPerson: '',
        contactsPhone: '',
        saleOrgName: '',
        planDelivery: '',
        shipAddressName: '',
        shipAddressDetails: '',
        salesmanName: '',
        salesmanPhone: '',
        invoiceTitle: '',
        collectionTermsName: '',
        invoiceAddressName: '',
        invoiceAddressDetails: '',
        currency: '',
        isTax: '',
        taxRate: '',
        amount: '',
        tax: '',
        totalAmount: '',
        businessType: '',
        sourceCode: '',
        remark: '',
        currencyName: '',
        saleDetails:[]
    },
    orderAddDetail: {
        customerName: '',
        customerCode: '',
        orderDate: '',
        receiveAddressName: '',
        receiveAddressDetails: '',
        contactsPersonCode: '',
        contactsPerson: '',
        contactsPhone: '',
        saleOrg: '',
        planDelivery: '',
        shipAddressName: '',
        shipAddressDetails: '',
        salesman: '',
        salesmanPhone: '',
        invoiceTitle: '',
        collectionTermsName: '',
        invoiceAddressName: '',
        invoiceAddressDetails: '',
        currency: '',
        isTax: '',
        taxRate: '',
        amount: '',
        tax: '',
        totalAmount: '',
        businessType: '',
        sourceCode: '',
        remark: '',
        currencyName: '',
        saleDetails:[]
    },
    orderTotal:{
        tax:'0.00',
        amount:'0.00',
        totalAmount:'0.00'
    },
    orderEditTotal:{
        tax:'0.00',
        amount:'0.00',
        totalAmount:'0.00'
    },
});
const SaleOrderRedu = (state = initState, action) => {
    switch (action.type) {
        case SALEORDERREDU:
            return action.state;
        default:
            return state;
    }
}
export default SaleOrderRedu;