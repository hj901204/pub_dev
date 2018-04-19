import { ReqApi } from '../../../base/services/ReqApi'
import { Urls, MemberManage, BasicUrls } from '../../../base/consts/urls';
import { SupplierUrls, BusinessUrls, CustomerUrls} from '../../consts';
import { SUPPLIERREDU } from '../../consts/ActTypes'; 
import { SUPPLIERADDRESSREDU } from '../../consts/ActTypes';
import { CUSTOMERADDRESSREDU } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp.js';

import ContactAct from './ContactAct';
import AddressAct from './AddressAct';

const supplierActions = {
    SupplierList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: SupplierUrls.SUPPLIER_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetSupplierList(json.data));
            }

            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('tabLoading', value);
        dispatch({ type: SUPPLIERREDU, state });
    },
    supplierLoading: (value) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('supplierLoading', value);
        dispatch({ type: SUPPLIERREDU, state });
    },
    GetSupplierList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        // let statusO = { status: '启用' }
        // let statusN = { status: '禁用' }
        // for (let x in list) {
        //     if (list[x].status == '1') {
        //         Object.assign(list[x], statusO);
        //     } else {
        //         Object.assign(list[x], statusN);
        //     }

        // }

        let state = getState()[SUPPLIERREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SUPPLIERREDU, state });
    },
    showCompMsg: (value) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('componentMsg', value)
        dispatch({ type: SUPPLIERREDU, state });
    },
    selectDataList: (data) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('selectDataList', data)
        dispatch({ type: SUPPLIERREDU, state });
    },
    getSupplierData: (pm = {},type,Ppage) => (dispatch, getState) => {
        if (type == 'detail') {
            let state = getState()[SUPPLIERREDU].set('supplierId', pm.supplierCode).set('langCode',pm.langCode);
             dispatch({ type: SUPPLIERREDU, state });
             dispatch(actions.supplierBaseLoading(true));
        }else{
             let state = getState()[SUPPLIERREDU].set('Record', {}).set('Ppage',Ppage);
             dispatch({ type: SUPPLIERREDU, state });
             dispatch(actions.supplierLoading(true));
        }
        return ReqApi.post({
            url: SupplierUrls.SUPPLIERDETAIL,
            pm 
        }).then((json) => {
            if (json.status == 2000) {
                if (type == 'detail') {
                    dispatch(actions.supplierDetail(json.data));
                    dispatch(actions.supplierBaseLoading(false));
                } else {
                    dispatch(actions.supplierEditData(json.data));
                    dispatch(actions.supplierLoading(false));
                }
                dispatch(actions.showCompMsg(false));
            }
            return json.data;
        });
    },
    supplierDetail: (data) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('supplierBaseSource', data)
                    .set('supplierBaseLoading', false)
        dispatch({ type: SUPPLIERREDU, state });
    },
    supplierEditData: (data) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('Record', data)
                    .set('bpData',"")
                    .set('supplierBaseLoading', false)
        dispatch({ type: SUPPLIERREDU, state });
    },
    getDeptData: (pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.DEPARTMENT_GETORGLIST,
            pm
        }).then(json => {
            dispatch(actions.get_pDeptName(json.data));
            dispatch(actions.supplierLoading(false));
        })
    },
    get_pDeptName: (data) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('dept_Name', data.list)
        dispatch({ type: SUPPLIERREDU, state });
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
        let state = getState()[SUPPLIERREDU].set('businessPartner', data)
        dispatch({ type: SUPPLIERREDU, state });
    },
    Hidden_visible: (val) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('hiddenVisible', val);
        dispatch({ type: SUPPLIERREDU, state });
    },
    supplierBaseLoading: (value) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('supplierBaseLoading', value);
        dispatch({ type: SUPPLIERREDU, state });
    },
    SupplierBase: (data) => (dispatch, getState) => {
        let state = getState()[SUPPLIERREDU].set('supplierBaseSource', data);
        dispatch({ type: SUPPLIERREDU, state });
    },
    AddSupplier: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.supplierLoading(true));
        return ReqApi.post({
            url: SupplierUrls.SUPPLIERADD,
            pm
        }).then(json => {
            return json;
        })
    },
    EditSupplier: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: SupplierUrls.SUPPLIEREDIT,
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
        let state = getState()[SUPPLIERREDU].set('empList', data)
        dispatch({ type: SUPPLIERREDU, state });
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
        let state = getState()[SUPPLIERREDU].set('curList', data)
        dispatch({ type: SUPPLIERREDU, state });
    },
    DelSupplier:(pm={})=>(dispatch,getState)=>{
        return ReqApi.post({
            url: SupplierUrls.SUPPLIERDEL,
            pm
        }).then(json => {
            return json;
        })
    },
    onSetup:(pm={})=>(dispatch,getState)=>{
        dispatch(actions.supplierBaseLoading(true));
        return ReqApi.post({
            url: SupplierUrls.SUPPLIERSETUP,
            pm
        }).then(json => {
            return json;
        })
    },
    getSearchInitData:(pm={})=>(dispatch,getState)=>{
        ReqApi.post({
            url: BasicUrls.SUBJECT_LIST,
            pm
        }).then(json=>{
            dispatch(actions.subjiectList(json.data,pm.subCode));
        })
     },
     subjiectList:(data,subCode)=>(dispatch,getState)=>{
         let state = getState()[SUPPLIERREDU].setIn(['subjectData',subCode],data.catList)
             dispatch({ type:  SUPPLIERREDU, state });
     },
     getBusinessPartnerDetail:(pm={})=>(dispatch,getState)=>{
        return ReqApi.post({
            url: BusinessUrls.BUSINESS_BASE,
            pm
        }).then(json=>{
            dispatch(actions.bpSearchData(json.data));
            return json;
        })
     },
     bpSearchData:(data)=>(dispatch,getState)=>{
         let state = getState()[SUPPLIERREDU].set('bpData', data)
             dispatch({ type:  SUPPLIERREDU, state });
     },
     getUserInfo:()=>(dispatch,getState)=>{
        return ReqApi.post({
            url: CustomerUrls.DEFAULTUSER,
        }).then(json => {
            if (json.status == '2000' && json.data.deptCode) {
                let state = getState()[SUPPLIERREDU].set('userInfo', json.data)
                dispatch({ type: SUPPLIERREDU, state });
                return json.data;
            } else { 
                dispatch(actions.supplierLoading(false));
            }
        })
     },
     importViewLoading: (value) => (dispatch, getState) => {
         let state = getState()[SUPPLIERREDU].set('importViewLoading', value);
         dispatch({ type: SUPPLIERREDU, state });
     },
     Percent: (value) => (dispatch, getState) => {
         let state = getState()[SUPPLIERREDU].set('percent', value);
         dispatch({ type: SUPPLIERREDU, state });
     },
     AlertVisible: (value) => (dispatch, getState) => {
         let state = getState()[SUPPLIERREDU].set('alertVisible', value);
         dispatch({ type: SUPPLIERREDU, state });
     },
     ProgressVisible: (value) => (dispatch, getState) => {
         let state = getState()[SUPPLIERREDU].set('progressVisible', value);
         dispatch({ type: SUPPLIERREDU, state });
     },
     ImportViewVisiable: (value) => (dispatch, getState) => {
         let state = getState()[SUPPLIERREDU].set('importViewVisiable', value);
         dispatch({ type: SUPPLIERREDU, state });
     },
     GetUpLoadFile: (data) => (dispatch, getState) => {
         let state = getState()[SUPPLIERREDU].set('errorExcelUrl', data.errorExcel);
         dispatch({ type: SUPPLIERREDU, state });
     },
     UpLoadFile: (pm = {}) => (dispatch, getState) => {
         dispatch(actions.importViewLoading(true));
         return ReqApi.post({
             url: SupplierUrls.IMPORT_EXCEL,
             pm,
             callBack: true
         }).then((json) => {
             if (json.status === 2000) {
                 dispatch(actions.ProgressVisible(true));
                 message.success("导入成功");
             } else if (json.status === 4303) {
                 message.error(json.data.errorMessage);
             } else if (json.status === 4304) {
                 dispatch(actions.AlertVisible(true));
                 dispatch(actions.GetUpLoadFile(json.data));
             }
             dispatch(actions.importViewLoading(false));
             return json
         });
     },
}

const actions = {
    ...supplierActions,
    ...ContactAct(SUPPLIERREDU),
    ...AddressAct(SUPPLIERADDRESSREDU),    
}
export default actions;