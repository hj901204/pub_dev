import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/Urls';
import { IMPORTEMPLOYEEREDU } from '../consts/ActTypes';
import {message } from '../../base/components/AntdComp.js';
import TabsAct from '../actions/TabsAct';

const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[IMPORTEMPLOYEEREDU].set('tabLoading', value);
        dispatch({ type: IMPORTEMPLOYEEREDU, state });
    },
    importViewLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[IMPORTEMPLOYEEREDU].set('importViewLoading', value);
        dispatch({type:IMPORTEMPLOYEEREDU, state});
    },
    importViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORTEMPLOYEEREDU].set('importViewVisiable',value);
       dispatch({type:IMPORTEMPLOYEEREDU,state});
   },
   againImportViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORTEMPLOYEEREDU].set('againImportViewVisiable',value);
       dispatch({type:IMPORTEMPLOYEEREDU,state});
   },
    GetPositionList: (data,message) => (dispatch, getState) => {
        let { list, total, page, pageSize} = data;
        let state = getState()[IMPORTEMPLOYEEREDU].set('dataSource', list)
            .set("paging", { total, page, pageSize }).set("message",message);
        dispatch({ type: IMPORTEMPLOYEEREDU, state });
    },
    PositionList: (pm={}) => (dispatch, getState) => {
        dispatch(actions.importViewLoading(true));
        dispatch(actions.TabLoading(true));
        ReqApi.post({
            url: Urls.IMPORT_FILE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                 message.info("导入成功");
            }else if(json.status && json.status == 4301){
                 dispatch(actions.GetPositionList(json.data,json.message));
             }
            dispatch(actions.importViewLoading(false));
            dispatch(actions.TabLoading(false));
            dispatch(actions.importViewVisiable(false));
            dispatch(actions.againImportViewVisiable(false));
            dispatch(TabsAct.TabAdd({ title:"导入员工", key:"ImportEmployeeCont"}))            
        });
    },
}

export default actions;