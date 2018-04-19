/**
 * Created by MW on 2017/5/15.
 */
import { ReqApi } from '../../../base/services/ReqApi';
import {Urls} from "../../consts/InventoryUrls"
import {initState} from "../../reducers/InventoryModule/StorageRedu";
import {STORAGEREDU} from "../../consts/ActTypes"




export let init =  (args ={}) => (dispatch,getState)=>{
    let state = initState.merge(args);
    dispatch({type:STORAGEREDU, state});
}


const initialPaging = {
    page: 1,
    pageSize: 15
};
export let inventoryFreightSpaceGetList = (pm =initialPaging) => (dispatch, getState) => {
    dispatch(setLoading(true));

    return ReqApi.get({
        url:Urls.INVENTORY_FREIGHTSPACE_GETLIST,
        pm : pm
    }).then((json)=>{
       if(json.status === 2000 && json.data){
           dispatch(setDataSource(json.data.list))
           dispatch(setPagination({
               current:json.data.page,
               total:json.data.total,
               pageSize:json.data.pageSize,
           }))
       }
       dispatch(setLoading(false));
       return json;
    });
};


export let inventoryFreightSpaceIsDisable = (pm ={
    code:"",
    status:null  // "int,状态;0：保存 1：启用 2：禁用"
}) => (dispatch, getState) => {
    return ReqApi.post({
        url:Urls.INVENTORY_FREIGHTSPACE_ISDISABLE,
        pm : pm
    });
};

export let inventoryFreightSpaceDelete = (pm ={
    code:"",
}) => (dispatch, getState) => {
    return ReqApi.post({
        url:Urls.INVENTORY_FREIGHTSPACE_DELETE,
        pm : pm
    });
};







export let setDataSource = (dataSource=[]) => (dispatch, getState) => {
    let state = getState()[STORAGEREDU].setIn(["dataSource"],[].concat(dataSource));
    dispatch({type:STORAGEREDU, state});
};


export let setLoading = (bool) => (dispatch, getState) => {
    let state = getState()[STORAGEREDU].setIn(["loading"],bool);
    dispatch({type:STORAGEREDU, state});
};



export let setPagination = (pagination = {
    current:1,
    total:0,
    pageSize:15,
}) => (dispatch, getState) => {
    let state = getState()[STORAGEREDU].setIn(["pagination"],pagination);
    dispatch({type:STORAGEREDU, state});
};