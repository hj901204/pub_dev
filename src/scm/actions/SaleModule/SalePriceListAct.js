import { ReqApi } from '../../../base/services/ReqApi'
import { Urls, MemberManage, BasicUrls } from '../../../base/consts/urls';
import BusinessUrls from '../../../base/consts/BusinessUrls';
import { SALEPRICEREDU } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp'

const actions = {
     SalePriceList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_GETLIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetSalePriceList(json.data));
            }
         dispatch(actions.TabLoading(false));
            return json;
        });
    },
    GetSalePriceList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[SALEPRICEREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SALEPRICEREDU, state });
    },

    MaterialList: (pm = {}) => (dispatch, getState) => {
        //dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_GETLIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetMaterialList(json.data));
            }
            //dispatch(actions.TabLoading(false));
            return json;
        });
    },
     GetMaterialList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[SALEPRICEREDU].set('dataSourceMaterial', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SALEPRICEREDU, state });
    },

    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('tabLoading', value);
        dispatch({ type: SALEPRICEREDU, state });
     },
    EidtLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('editLoading', value);
        dispatch({ type: SALEPRICEREDU, state });
     },
    materialLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('materialLoading', value);
        dispatch({ type: SALEPRICEREDU, state });
    },
    supplierLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('supplierLoading', value);
        dispatch({ type: SALEPRICEREDU, state });
    },
    supplierBaseLoading: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('supplierBaseLoading', value);
        dispatch({ type: SALEPRICEREDU, state });
    },
    getSupplierData: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.supplierBaseLoading(true));
        return ReqApi.get({
            url: BusinessUrls.SALEPRICE_GETDETAIL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
              dispatch(actions.supplierDetail(json.data));
            }
              dispatch(actions.supplierBaseLoading(false));
            return json;
        });
    },
    supplierDetail: (data) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('materialBaseSource', data)
        dispatch({ type: SALEPRICEREDU, state });
    },
    // supplierEditData: (data) => (dispatch, getState) => {
    //     let state = getState()[SALEPRICEREDU].set('Record', data)
    //     dispatch({ type: SALEPRICEREDU, state });
    // },
    detailPriceList: (data) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('priceList', data)
        dispatch({ type: SALEPRICEREDU, state });
    },
    AddSalePrice: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.supplierLoading(true));
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_ADD,
            pm
        }).then(json => {
             if (json.status === 2000) {
                message.success("新增成功");
            }
            dispatch(actions.supplierLoading(false));
            
            return json;
        })
    },

    SalePriceAddDataSource: (data) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('salePriceAddDataSource', data)
        dispatch({ type: SALEPRICEREDU, state });
    },
    // SalePriceEditDataSource: (data) => (dispatch, getState) => {
    //     let state = getState()[SALEPRICEREDU].set('salePriceEditDataSource', data)
    //     dispatch({ type: SALEPRICEREDU, state });
    // },
    EditSalePrice: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.supplierLoading(true));
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.supplierLoading(false));
            return json;
        })
    },
     delMaterial:(pm={})=>(dispatch,getState)=>{
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_DELETE,
            pm
        }).then(json => {
            return json;
        })
    },
    //提交
    SalePriceSubmit:(pm={})=>(dispatch, getState)=>{
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_SUBMIT,
            pm
        }).then(json => {
            if (json.status === 2000) {
                message.success("提交成功");
            }
            dispatch(actions.SalePriceList());
            return json;
        })
    },
    //撤回
    SalePriceRepeal:(pm={})=>(dispatch, getState)=>{
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_REPEAL,
            pm
        }).then(json => {
            if (json.status === 2000) {
                message.success("撤回成功");
            }
            dispatch(actions.SalePriceList());
            return json;
        })
    },
     //驳回
    SalePriceReject:(pm={})=>(dispatch, getState)=>{
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_REJECT,
            pm
        }).then(json => {
            if (json.status === 2000) {
                message.success("驳回成功");
            }
            dispatch(actions.SalePriceList());
            return json;
        })
    },
    //编码规则
    GetCodeRule: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GET_CODERULE,
            pm
        }).then(json => {
            if(json.status===2000){
                let state = getState()[SALEPRICEREDU].set('materialCodeRule', json.data.ruleType);
                dispatch({ type: SALEPRICEREDU, state });
            }
            return json;
        })
    },
     SourceCodeDilog: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('sourceCodeDilog', value);
        dispatch({ type: SALEPRICEREDU, state });
    },

    SourceEditDilog: (value) => (dispatch, getState) => {
        let state = getState()[SALEPRICEREDU].set('sourceEditDilog', value);
        dispatch({ type: SALEPRICEREDU, state });
    },
   
    SalePriceTableList: (pm = {}) => (dispatch, getState) => { 
        return ReqApi.post({
            url: BusinessUrls.SALEPRICE_GETDETAIL,
            pm
        }).then(json => {
            if (json.status == 2000) {
            let { list, total, page, pageSize } = json.data;
            let state = getState()[SALEPRICEREDU].set('dataPriceList', list)
            .set("paging", { total, current: page, pageSize });
            }
           
        })
    },
   
    
    
 

    
}
export default actions;