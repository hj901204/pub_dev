import { ReqApi } from '../../../base/services/ReqApi'
import { Urls, MemberManage, BasicUrls } from '../../../base/consts/Urls';
import CustomerUrls from '../../consts/CustomerUrls';
import BusinessUrls from '../../consts/BusinessUrls';
import SupplierUrls from '../../consts/SupplierUrls';
import { CUSTOMERREDU } from '../../consts/ActTypes';

import { CUSTOMERADDRESSREDU } from '../../consts/ActTypes';
import AddressAct from './AddressAct';
import ContactAct from './ContactAct';
import { message } from '../../../base/components/AntdComp.js';


const CustomerActions = {
    CustomerList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: CustomerUrls.CUSTOMER_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetCustomerList(json.data));
            }
                
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('tabLoading', value);
        dispatch({ type: CUSTOMERREDU, state });
    },
    customerLoading: (value) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('customerLoading', value);
        dispatch({ type: CUSTOMERREDU, state });
    },
    GetCustomerList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[CUSTOMERREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: CUSTOMERREDU, state });
    },
    showCompMsg: (value) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('componentMsg', value)
        dispatch({ type: CUSTOMERREDU, state });
    },
    selectDataList: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('selectDataList', data)
        dispatch({ type: CUSTOMERREDU, state });
    },
    getCustomerData: (pm = {}, type,Ppage) => (dispatch, getState) => {
         if (type == 'detail') {
            let state = getState()[CUSTOMERREDU].set('supplierId', pm.customerCode).set('langCode',pm.langCode);
             dispatch({ type: CUSTOMERREDU, state });
        }else{
            let state = getState()[CUSTOMERREDU].set('Record', {}).set('Ppage',Ppage);
             dispatch({ type: CUSTOMERREDU, state });
        }
        return ReqApi.post({
            url: CustomerUrls.CUSTOMERDETAIL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (type == 'detail') {
                    dispatch(actions.CustomerDetail(json.data));
                } else {
                    dispatch(actions.CustomerEditData(json.data));
                }
                return json.data;
            }
        });
    },
    CustomerDetail: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('customerBaseSource', data)
            .set('customerBaseLoading', false)
        dispatch({ type: CUSTOMERREDU, state });
    },
    CustomerEditData: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('Record', data)
                    .set('customerLoading', false)
                    .set('bpData',"")
        dispatch({ type: CUSTOMERREDU, state });
        // dispatch(actions.getDeptData({"orgType":3,"status":1,"orgCode":data.deptCode,"orgName":data.deptName,"page":1,"pageSize":10}));
        // dispatch(actions.getEmpList({"deptCode":data.deptCode,"employeeCode":data.deptName,"page":1,"pageSize":10}))
    },
    getDeptData: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.DEPARTMENT_GETORGLIST,
            pm
        }).then(json => {
            dispatch(actions.get_pDeptName(json.data));
            dispatch(actions.customerLoading(false));
        })
    },
    get_pDeptName: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('dept_Name', data.list)
        dispatch({ type: CUSTOMERREDU, state });
    },
    getBusinessPartnerData: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: BusinessUrls.BUSINESS_LIST,
            pm
        }).then(json => {
            dispatch(actions.businessPartner(json.data.list));
        })
    },
    businessPartner: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('businessPartner', data)
        dispatch({ type: CUSTOMERREDU, state });
    },
    Hidden_visible: (val) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('hiddenVisible', val);
        dispatch({ type: CUSTOMERREDU, state });
    },
    CustomerBaseLoading: (value) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('customerBaseLoading', value);
        dispatch({ type: CUSTOMERREDU, state });
    },
    CustomerBase: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('customerBaseSource', data);
        dispatch({ type: CUSTOMERREDU, state });
    },
    AddCustomer: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.customerLoading(true));
        return ReqApi.post({
            url: CustomerUrls.CUSTOMERADD,
            pm
        }).then(json => {
            return json;
        })
    },
    EditCustomer: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: CustomerUrls.CUSTOMEREDIT,
            pm
        }).then(json => {
            return json;
        })
    },
    getEmpList: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: MemberManage.POSITION_INFO_LIST,
            pm
        }).then(json => {
            dispatch(actions.empList(json.data.list));
        })
    },
    empList: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('empList', data)
        dispatch({ type: CUSTOMERREDU, state });
    },
    getCurList: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: BasicUrls.CURRENCYLIST,
            pm
        }).then(json => {
            dispatch(actions.curList(json.data.list));
        })
    },
    curList: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('curList', data)
        dispatch({ type: CUSTOMERREDU, state });
    },
    CustomerClickStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: SupplierUrls.SUPPLIERCONTACTSTATUS,
            pm
        }).then(json => {
            dispatch(actions.TableContacts({ bpCode: pm.bpCode, page: 1, pageSize: 20 }))
        })
    },
    DelCustomer: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: CustomerUrls.CUSTOMERDEL,
            pm
        }).then(json => {
            return json;
        })
    },
    onSetup: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.CustomerBaseLoading(true));
        return ReqApi.post({
            url: CustomerUrls.CUSTOMERSETUP,
            pm
        }).then(json => {
            return json;
        })
    },

    getSearchInitData: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: BasicUrls.SUBJECT_LIST,
            pm
        }).then(json => {
            dispatch(actions.subjiectList(json.data, pm.subCode));
        })
    },
    subjiectList:(data,subCode)=>(dispatch,getState)=>{
         let state = getState()[CUSTOMERREDU].setIn(['subjectData',subCode],data.catList)
         dispatch({ type:  CUSTOMERREDU, state });
    },
    getBusinessPartnerDetail: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: BusinessUrls.BUSINESS_BASE,
            pm
        }).then(json => {
            dispatch(actions.bpSearchData(json.data));
        })
    },
    bpSearchData: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('bpData', data)
        dispatch({ type: CUSTOMERREDU, state });
    },
    defaultUser: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: CustomerUrls.DEFAULTUSER,
            pm
        }).then(json => {
           if(json.status==2000){
            //    dispatch(actions.getEmpList({"deptCode":json.data.deptCode,page:1,pageSize:10}));
               let state = getState()[CUSTOMERREDU].set('empCode', json.data.empCode)
                    .set('defaultDeptCode',json.data.deptCode);
               dispatch({ type: CUSTOMERREDU, state });
               return json
           }
        })
    },


    //导入模块---------------------------------------------------------------------------------------------------------------
    importViewLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[CUSTOMERREDU].set('importViewLoading', value);
        dispatch({type:CUSTOMERREDU, state});
    },
    Percent:(value)=>(dispatch,getState)=>{
        let state = getState()[CUSTOMERREDU].set('percent', value);
        dispatch({type:CUSTOMERREDU, state});
    },
    AlertVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[CUSTOMERREDU].set('alertVisible',value);
       dispatch({type:CUSTOMERREDU,state});
   },
    ProgressVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[CUSTOMERREDU].set('progressVisible',value);
       dispatch({type:CUSTOMERREDU,state});
   },
    ImportViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[CUSTOMERREDU].set('importViewVisiable',value);
       dispatch({type:CUSTOMERREDU,state});
   },
    GetUpLoadFile: (data) => (dispatch, getState) => {
        let state = getState()[CUSTOMERREDU].set('errorExcelUrl', data.errorExcel);
        dispatch({ type: CUSTOMERREDU, state });
    },
    UpLoadFile: (pm={}) => (dispatch, getState) => {
        dispatch(actions.importViewLoading(true));
        return ReqApi.post({
            url: CustomerUrls.IMPORT_EXCEL,
            pm,
            callBack:true
        }).then((json) => {
            if(json.status===2000){
                dispatch(actions.ProgressVisible(true));
                message.success("导入成功");                
            }else if(json.status===4303){
                message.error(json.data.errorMessage); 
            }else if(json.status===4304){
                dispatch(actions.AlertVisible(true));
                dispatch(actions.GetUpLoadFile(json.data));            
            }
            dispatch(actions.importViewLoading(false));
            return json
        });
    },

}
const actions = {
    ...CustomerActions,
     ...ContactAct(CUSTOMERREDU),
    ...AddressAct(CUSTOMERADDRESSREDU),    
}   
export default actions;