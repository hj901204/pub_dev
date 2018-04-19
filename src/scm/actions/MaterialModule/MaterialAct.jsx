import { ReqApi } from '../../../base/services/ReqApi'
import { Urls, MemberManage, BasicUrls } from '../../../base/consts/urls';
import BusinessUrls from '../../../base/consts/BusinessUrls';
import { MATERIALREDU } from '../../consts/ActTypes';

const actions = {
     MaterialList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_GETLIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetMaterialList(json.data));
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
     GetMaterialList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[MATERIALREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: MATERIALREDU, state });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('tabLoading', value);
        dispatch({ type: MATERIALREDU, state });
    },
    materialLoading: (value) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('materialLoading', value);
        dispatch({ type: MATERIALREDU, state });
    },
    supplierBaseLoading: (value) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('supplierBaseLoading', value);
        dispatch({ type: MATERIALREDU, state });
    },
    supplierLoading: (value) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('supplierLoading', value);
        dispatch({ type: MATERIALREDU, state: state });
    },
   
    delMaterial:(pm={})=>(dispatch,getState)=>{
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_DELETE,
            pm
        }).then(json => {
            return json;
        })
    },
   showCompMsg: (value) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('componentMsg', value)
        dispatch({ type: MATERIALREDU, state });
    },
   Hidden_visible: (val) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('hiddenVisible', val);
        dispatch({ type: MATERIALREDU, state });
    },
    Hidden_button: (val) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('hiddenButton', val);
        dispatch({ type: MATERIALREDU, state });
    },
   AddMaterial: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.supplierLoading(true));
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_ADD,
            pm
        }).then(json => {
            dispatch(actions.supplierLoading(false));
            return json;
        })
    },
    EditMaterial: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.supplierLoading(true));
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.supplierLoading(false));
            return json;
        })
    },
    getCurList: (pm = {},type) => (dispatch, getState) => {
        ReqApi.get({
            url: BusinessUrls.MEASURE_GETALL,
            pm
        }).then(json => {
            dispatch(actions.curList(json.data.list,type));
        })
    },
    curList: (data,type) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].setIn(['curList',type], data)
        dispatch({ type: MATERIALREDU, state });
    },
    getSupplierData: (pm = {}, type) => (dispatch, getState) => {
        if (type == 'detail') {
            let state = getState()[MATERIALREDU].set('materialCode', pm);
             dispatch({ type: MATERIALREDU, state });
        }
        dispatch(actions.supplierBaseLoading(true));
        return ReqApi.get({
            url: BusinessUrls.MATERIAL_GETDETAIL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                if (type == 'detail') {
                    dispatch(actions.supplierDetail(json.data));
                } else {
                    dispatch(actions.supplierEditData(json.data));
                }
            }
            dispatch(actions.supplierBaseLoading(false));
            return json;
        });
    },
    supplierDetail: (data) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('materialBaseSource', data)
                    .set('inventoryLoading', false)
        dispatch({ type: MATERIALREDU, state });
    },
    supplierEditData: (data) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('Record', data)
        dispatch({ type: MATERIALREDU, state });
    },
    loading: (loadingkey,value) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set(loadingkey, value);
        dispatch({ type: MATERIALREDU, state });
    },
    EditInventoryDetail:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.loading("inventoryLoading",true));
        return ReqApi.post({  
            url: BusinessUrls.MATERIALINVENTORY_UPDATE,
            pm
        }).then(json => {
            if (json.status == 2000) {
                dispatch(actions.loading("inventoryLoading",false));
                return dispatch(actions.getSupplierData({materialCode:pm.materialCode},"detail"));
                return json;
            }
           
        })
    },
    EditSellDetail:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.loading("sellLoading",true));
        return ReqApi.post({
            url: BusinessUrls.MATERIALSELL_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.loading("sellLoading",false));
            return dispatch(actions.getSupplierData({materialCode:pm.materialCode},"detail"));
            return json;
        })
    },
    EditPurchaseDetail:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.loading("purchaseLoading",true));
        return ReqApi.post({
            url: BusinessUrls.MATERIALPURCHASE_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.loading("purchaseLoading",false));
            return dispatch(actions.getSupplierData({materialCode:pm.materialCode},"detail"));
            return json;
        })
    }, 
    
    EditProduceDetail:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.loading("produceLoading",true));
        return ReqApi.post({
            url: BusinessUrls.MATERIALPRODUCE_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.loading("produceLoading",false));
            return dispatch(actions.getSupplierData({materialCode:pm.materialCode},"detail"));
            return json;
        })
    },
    EditPlanDetail:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.loading("planLoading",true));
        return ReqApi.post({
            url: BusinessUrls.MATERIALPLAN_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.loading("planLoading",false)); 
            return dispatch(actions.getSupplierData({materialCode:pm.materialCode},"detail"));
            return json;
        })
    },
    MaterialIsDisable:(pm={})=>(dispatch, getState)=>{
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_ISDISABLE,
            pm
        }).then(json => {
            dispatch(actions.MaterialList());
            return json;
        })
    },
    
    GetCodeRule: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GET_CODERULE,
            pm
        }).then(json => {
            if(json.status===2000){
                let state = getState()[MATERIALREDU].set('materialCodeRule', json.data.ruleType);
                dispatch({ type: MATERIALREDU, state });
            }
            return json;
        })
    },

    //导入
    importViewLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[MATERIALREDU].set('importViewLoading', value);
        dispatch({type:MATERIALREDU, state});
    },
    Percent:(value)=>(dispatch,getState)=>{
        let state = getState()[MATERIALREDU].set('percent', value);
        dispatch({type:MATERIALREDU, state});
    },
    AlertVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[MATERIALREDU].set('alertVisible',value);
       dispatch({type:MATERIALREDU,state});
   },
    ProgressVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[MATERIALREDU].set('progressVisible',value);
       dispatch({type:MATERIALREDU,state});
   },
    ImportViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[MATERIALREDU].set('importViewVisiable',value);
       dispatch({type:MATERIALREDU,state});
   },
    GetUpLoadFile: (data) => (dispatch, getState) => {
        let state = getState()[MATERIALREDU].set('errorExcelUrl', data.errorExcel);
        dispatch({ type: MATERIALREDU, state });
    },
    UpLoadFile: (pm={}) => (dispatch, getState) => {
        dispatch(actions.importViewLoading(true));
        return ReqApi.post({
            url: BusinessUrls.MATERIAL_IMPORTEXCEL,
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
export default actions;