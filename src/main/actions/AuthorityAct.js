import { AUTHORITYREDU }from '../consts/ActTypes';
import { ReqApi } from '../../base/services/ReqApi'
import {message} from '../../base/components/AntdComp'
import DeptUrls from '../../base/consts/DeptUrls'
import AuthorityUrls from '../../base/consts/AuthorityUrls';
import * as AT from '../consts/ActTypes';

let AuthorityAct = {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@调接口@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    getAuthorityList:(pm)=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setTableLoading(true));
        ReqApi.get({
            url: AuthorityUrls.GET_LIST,
            pm
        }).then((res) => {
            dispatch(AuthorityAct.setTableLoading(false));
            let state = getState()[AUTHORITYREDU]
                .setIn(["authData"] , res.data.list)
                .setIn(["authPaging","page"],res.data.page)
                .setIn(["authPaging","pageSize"],res.data.pageSize)
                .setIn(["authPaging","total"],res.data.total)
                .setIn(["authSearch","pageSize"],res.data.pageSize);
            dispatch({type:AUTHORITYREDU , state});
        });
    },
    getAuthorityDetail:(id)=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setSideLoading(true));
        let pm = {roleCode:id};
        let state = getState()[AUTHORITYREDU]
            .setIn(["menSearch","roleCode"] , id)
            .setIn(["selRows"] , []);
        dispatch({type:AUTHORITYREDU , state});
        dispatch(AuthorityAct.getMenberList(getState()[AUTHORITYREDU].get("menSearch").toJS()));
        ReqApi.get({
            url: AuthorityUrls.GET_ROLE_INFO,
            pm
        }).then((res) => {
            dispatch(AuthorityAct.setSideLoading(false));
            state = getState()[AUTHORITYREDU].setIn(["authDetail"] , res.data);
            dispatch({type:AUTHORITYREDU , state});
        });
    },
    addAuthority:(pm)=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setDialogLoading(true));
        ReqApi.post({
            url: AuthorityUrls.ADD_ROLE,
            pm
        }).then((res) => {
            dispatch(AuthorityAct.setDialogLoading(false));
            if(res.status === "2000"){
                dispatch(AuthorityAct.setAddVisible(false));
                dispatch(AuthorityAct.getAuthorityList(getState()[AUTHORITYREDU].get("authSearch")));
                message.success("权限添加成功");
            }
        });
    },
    updataAuthority:(pm)=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setSideLoading(true));
        pm = {roleCode:getState()[AUTHORITYREDU].get("authDetail").roleCode , ...pm}
        ReqApi.post({
            url: AuthorityUrls.EDIT,
            pm
        }).then((res) => {
            if(res.status === "2000"){
                dispatch(AuthorityAct.setSideLoading(false));
                dispatch(AuthorityAct.setSideVisible(false));
                dispatch(AuthorityAct.getAuthorityList(getState()[AUTHORITYREDU].get("authSearch").toJS()));
                message.success("权限编辑成功");
            }
        });
    },
    deleteAuthority:()=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setSideLoading(true));
        let pm = {roleCode:getState()[AUTHORITYREDU].get("authDetail").roleCode};
        ReqApi.post({
            url: AuthorityUrls.DELETE,
            pm
        }).then((res) => {
            if(res.status === "2000"){
                dispatch(AuthorityAct.setSideLoading(false));
                dispatch(AuthorityAct.setSideVisible(false));
                dispatch(AuthorityAct.getAuthorityList(getState()[AUTHORITYREDU].get("authSearch").toJS()));
                message.success("权限删除成功");
            }
        });
    },
    getMenberList:(pm)=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setSideLoading(true));
        ReqApi.get({
            url: AuthorityUrls.GET_EMP_LIST,
            pm
        }).then((res) => {
            dispatch(AuthorityAct.setSideLoading(false));
            let state = getState()[AUTHORITYREDU]
                .setIn(["menData"] , res.data.list)
                .setIn(["menPaging","page"],res.data.page)
                .setIn(["menPaging","pageSize"],res.data.pageSize)
                .setIn(["menPaging","total"],res.data.total)
                .setIn(["menSearch","pageSize"],res.data.pageSize);
            dispatch({type:AUTHORITYREDU , state});
        });
    },
    addMenbers:(pm = {})=>(dispatch,getState)=>{
        dispatch({type:AT.SELECTOR_LOADING});
        pm = {roleCode:getState()[AUTHORITYREDU].get("authDetail").roleCode , empCodes:pm};
        return ReqApi.post({
            url: AuthorityUrls.ADD_EMP_RESOURCE,
            pm
        }).then((res) => {
            if(res.status === "2000"){
                dispatch(AuthorityAct.getMenberList(getState()[AUTHORITYREDU].get("menSearch").toJS()));
                message.success("新增权限人成功");
            }
            return res;
        });
    },
    deleteMenbers:()=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setSideLoading(true));
        let redu = getState()[AUTHORITYREDU];
        let roleCode = redu.get("authDetail").roleCode;
        let empCodes = redu.get("selRows");
        let pm = {roleCode , empCodes};
        ReqApi.post({
            url: AuthorityUrls.BATCH_MOVE,
            pm
        }).then((res) => {
            if(res.status === "2000"){
                dispatch(AuthorityAct.setSideLoading(false));
                //清除标识授权人表格的选中数组
                let state = getState()[AUTHORITYREDU].setIn(["selRows"],[]);
                dispatch({type:AUTHORITYREDU , state});
                dispatch(AuthorityAct.getMenberList(getState()[AUTHORITYREDU].get("menSearch").toJS()));
                message.success("授权人删除成功");
            }
        });
    },
    getAuthorityTree:()=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setSideLoading(true));
        ReqApi.get({
            url: AuthorityUrls.GET_TREE,
        }).then((res) => {
            dispatch(AuthorityAct.setSideLoading(false));
            let state = getState()[AUTHORITYREDU].setIn(["authTreeData"] , res.data.list);
            dispatch({type:AUTHORITYREDU , state});
        });
    },
    getMenberTree:()=>(dispatch,getState)=>{
        dispatch(AuthorityAct.setDialogLoading(true));
        ReqApi.get({
            url: DeptUrls.DEPT_LIST,
        }).then((res) => {
            dispatch(AuthorityAct.setDialogLoading(false));
            let state = getState()[AUTHORITYREDU].setIn(["menTreeData"] , res.data);
            dispatch({type:AUTHORITYREDU , state});
        });
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@设置状态@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    setSideVisible:(bool)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["side_visible"],bool);
        dispatch({type:AUTHORITYREDU ,state});
    },
    setAddVisible:(bool)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["add_visible"],bool);
        dispatch({type:AUTHORITYREDU ,state});
    },
    setDialogLoading:(bool)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["dialog_loading"],bool);
        dispatch({type:AUTHORITYREDU ,state});
    },
    setSideLoading:(bool)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["sidebar_loading"],bool);
        dispatch({type:AUTHORITYREDU ,state});
    },
    setTableLoading:(bool)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["table_loading"],bool);
        dispatch({type:AUTHORITYREDU ,state});
    },
    setMenTableLoading:(bool)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["men_table_loading"],bool);
        dispatch({type:AUTHORITYREDU ,state});
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@设置值@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    setTreeChecked:(keys)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["treeChecked"],keys);
        dispatch({type:AUTHORITYREDU ,state});
    },
    setSelectedRows:(keys)=>(dispatch,getState)=>{
        let state = getState()[AUTHORITYREDU].setIn(["selRows"],keys);
        dispatch({type:AUTHORITYREDU ,state});
    },
}
export default AuthorityAct;