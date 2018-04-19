import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls';
import { IMPORT_STORAGE_REDU } from '../../consts/ActTypes';
import {message } from '../../../base/components/AntdComp.js';
import TabsAct from '../TabsAct';

const actions = {
    importViewLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[IMPORT_STORAGE_REDU].set('importViewLoading', value);
        dispatch({type:IMPORT_STORAGE_REDU, state});
    },
    Percent:(value)=>(dispatch,getState)=>{
        let state = getState()[IMPORT_STORAGE_REDU].set('percent', value);
        dispatch({type:IMPORT_STORAGE_REDU, state});
    },
    AlertVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORT_STORAGE_REDU].set('alertVisible',value);
       dispatch({type:IMPORT_STORAGE_REDU,state});
   },
    ProgressVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORT_STORAGE_REDU].set('progressVisible',value);
       dispatch({type:IMPORT_STORAGE_REDU,state});
   },
    ImportViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORT_STORAGE_REDU].set('importViewVisiable',value);
       dispatch({type:IMPORT_STORAGE_REDU,state});
   },
    GetUpLoadFile: (data) => (dispatch, getState) => {
        let state = getState()[IMPORT_STORAGE_REDU].set('errorExcelUrl', data.errorExcel);
        dispatch({ type: IMPORT_STORAGE_REDU, state });
    },
    UpLoadFile: (pm={}) => (dispatch, getState) => {
        dispatch(actions.importViewLoading(true));
        return ReqApi.post({
            url: Urls.SCM_INVENTORY_FREIGHTSPACE_IMPORTEXCEL,
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