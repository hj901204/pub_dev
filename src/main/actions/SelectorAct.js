import { ReqApi } from '../../base/services/ReqApi'
import { MemberManage,Urls } from '../../base/consts/urls';
import * as AT from '../consts/ActTypes';


let actions = {
    //获取用户数据
    fetchDataUsers: (key) => (dispatch,getState)=>{
        dispatch({
            type: AT.SELECTOR_LOADING,
        });
        ReqApi.get({
            url: MemberManage.POSITION_INFO_LIST, 
            pm: {key}
        }).then((json)=>{
            dispatch({
                type: AT.SELECTOR_GET_USERSBYDEP,
                payload:json.data.list
            });
        });
    },
    //获取部门数据
    fetchDataOrgan:(pm={})=>(dispatch,getState) => {
        // let {SelectorRedu} = getState(),
        //     sourceData=SelectorRedu.sourceData;
        // if(sourceData.length==0){
            dispatch({
                type: AT.SELECTOR_LOADING,
            });
            ReqApi.post({
                url: Urls.DEPARTMENT_LIST,
                pm
            }).then((json) => {
                if (json.status == 2000){
                    dispatch({
                        type: AT.SELECTOR_GET_DEPARTMENTS,
                        payload:json.data
                    });
                }
            });
        // } else {return {type: AT.SELECTOR_GET_DEPARTMENTS}}
    },
    updateSeleced: (selecedItem,isAdd) => {
        return {
            type: AT.SELECTOR_UPDATE_CURRENT_SELECED,
            data:{
                selecedItem,
                isAdd
            }
        }
    },
    checkAllSeleced: (isAdd) => {
        return {
            type: AT.SELECTOR_CHECK_ALL_SELECED,
            payload: isAdd
        }
    },
    insertSeleced: (selecedItem) => {
        return {
            type: AT.SELECTOR_INSERT_SELECED,
            selecedItem
        }
    },
    searchSeleced:(key) => {
        return {
            type: AT.SELECTOR_SEARCH_SELECED,
            key
        }
    },
    visibleDialog: (visible,param={}) => (dispatch, getState) => {
        dispatch({ type: AT.SELECTOR_VISIBLE, visible:visible,...param});
    },
    emptyData:()=>{
        return {
            type: AT.SELECTOR_EMPTY
        }
    },
    selectedTree:(record)=>{
        return {
            type: AT.SELECTOR_SELECTED_TREE, 
            record: record,
            lightId:record.id,
        }
    }
}
export default actions;
