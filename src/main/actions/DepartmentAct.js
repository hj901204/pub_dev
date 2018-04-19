import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import * as AT from '../consts/ActTypes';

const actions = {
    // pickApple:()=>(dispatch, getState)=>{
    //     dispatch(actions.biginPick());
    //     // fetch(`http://10.99.2.70:9092/apple`)
    //     // .then(Response=>Response.json())
    //     // .then(json=>dispatch(actions.donePick(json.weight)))
    //     // .then(e=>dispatch(actions.failPick(e))
    //     // )
    //     dispatch(actions.donePick(222))
    // },
    // biginPick:()=>({
    //     type:'BIGINPICKAPPLE'
    // }),
    // donePick:(weight)=>({
    //     type:'DONEPICKAPPLE',
    //     weight
    // }),
    // failPick:()=>({
    //     type:'FAILPICKAPPLE',
    // }),
    // eatapple:(id)=>({
    //     type:'EATAPPLE',
    //     id
    // })
    TabLoading: (tabLoading) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].setIn(['tabLoading'], tabLoading);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },
    DepartmentLoading: (departmentLoading) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].setIn(['departmentLoading'], departmentLoading);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },
    sideLoading: (sideLoading) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].setIn(['side_Loading'], sideLoading);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    getDepartmentList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        ReqApi.post({
            url: Urls.DEPARTMENT_LIST,
            pm
        }).then(json => {
            dispatch(actions.initTable(json.data));
            dispatch(actions.TabLoading(false));
        })
    },

    initTable: (data) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].set('dataSource', [data])
            .set('defaultRowKey',[data.id]);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    detail:(pm={},type)=>(dispatch, getState)=>{
        dispatch(actions.sideLoading(true));
        return ReqApi.get({
            url:Urls.DEPARTMENT_DETAIL,
            pm
        }).then(json=>{
            if(type=="Pdetail"){
                dispatch(actions.sideLoading(false));
                return json.data?json.data.addrCode:null;
            }else{
                dispatch(actions.get_detail(json.data));
                dispatch(actions.sideLoading(false));
            }
        })
    },

    get_detail:(data)=>(dispatch, getState)=>{
        dispatch(actions.get_addDetail({"addressCode":data.addrCode}));
        let state=getState()[AT.DEPARTMENTREDU].set('detail',data);
        dispatch({type: AT.DEPARTMENTREDU, state})
    },

    getEditData:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.DepartmentLoading(true));
        return ReqApi.get({
            url:Urls.DEPARTMENT_DETAIL,
            pm
        }).then(json=>{
            dispatch(actions.get_editData(json.data));
            dispatch(actions.DepartmentLoading(false));
            return json
            //dispatch(actions.deptMgrName({id:json.data.id}))
        })
    },

    get_editData:(data)=>(dispatch, getState)=>{
        let state=getState()[AT.DEPARTMENTREDU].set('record',data);
        dispatch({type: AT.DEPARTMENTREDU, state})
    },

    deptMgrName:(pm={})=>(dispatch, getState)=>{
        ReqApi.get({
            url: Urls.DEPARTMENT_MANAGER,
            pm
        }).then(json=>{
            dispatch(actions.get_deptMgrName(json.data.list));
        })
    },

    get_deptMgrName:(data)=>(dispatch, getState)=>{
        let state=getState()[AT.DEPARTMENTREDU].set('deptMgrName',data);
        dispatch({type: AT.DEPARTMENTREDU, state})
    },

    openAddmodal: (tag) => (dispatch, getState) => {
        dispatch(actions.add_visiableLoading(tag));
        dispatch(actions.DepartmentLoading(tag));
    },

    openEditmodal: (tag) => (dispatch, getState) => {
        dispatch(actions.edit_visiableLoading(tag));
        dispatch(actions.DepartmentLoading(tag));
    },

    getSelectData:(tag,param)=>(dispatch, getState)=>{
        dispatch(actions.deptMgr(param.mgrPm));
        dispatch(actions.Address(param.addPm));
        dispatch(actions.DepartmentLoading(tag));
        return dispatch(actions.pDeptName(param.deptNamePm));
    },

    Address:(pm={})=>(dispatch, getState)=>{
        return ReqApi.post({
            url: Urls.ADDRESS_GET_SENIOR_ADDRESS,
            pm
        }).then(json=>{
            dispatch(actions.get_Address(json.data.list));
            return json;
        })
    },

    get_Address:(data)=>(dispatch, getState)=>{
        let state=getState()[AT.DEPARTMENTREDU].set('address',data);
        dispatch({type: AT.DEPARTMENTREDU, state})
    },

    deptMgr:(pm={})=>(dispatch, getState)=>{
        ReqApi.get({
            url: Urls.DEPARTMENT_MANAGER,
            pm
        }).then(json=>{
            dispatch(actions.get_deptMgr(json.data.list));
        })
    },

    get_deptMgr:(data)=>(dispatch, getState)=>{
        let state=getState()[AT.DEPARTMENTREDU].set('deptMgr',data);
        dispatch({type: AT.DEPARTMENTREDU, state})
    },

    pDeptName:(pm={})=>(dispatch, getState)=>{
        return ReqApi.post({
            url: Urls.DEPARTMENT_LIST,
            pm
        }).then(json=>{
            dispatch(actions.get_pDeptName(json.data));
            return dispatch(actions.detail({"id":json.data.id},"Pdetail"));
        })
    },
    get_pDeptName:(data)=>(dispatch, getState)=>{
        let state=getState()[AT.DEPARTMENTREDU].set('pDeptName',data);
        dispatch({type: AT.DEPARTMENTREDU, state})
    },

    add_visiableLoading: (tag) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].set('add_department_visiable', tag);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    edit_visiableLoading: (tag,id) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].set('edit_department_visiable', tag);
        if (id||id===null) state = state.set('DepartmentId', id);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    opensidebar: (tag,id) => (dispatch, getState) => {
        dispatch(actions.detail(id));
        let state = getState()[AT.DEPARTMENTREDU].set('side_visible', tag);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    closeSidebar: (tag) => (dispatch, getState) => {
        if (getState()[AT.DEPARTMENTREDU].get('side_Loading')) {
            return
        };
        let state = getState()[AT.DEPARTMENTREDU].set('side_visible', tag);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    cancel: (tag) => (dispatch, getState) => {
        let state = getState()[AT.DEPARTMENTREDU].set('add_department_visiable', tag);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    newAddress:(tag)=>(dispatch, getState)=>{
        let state = getState()[AT.DEPARTMENTREDU].set('add_address_visiable', tag);
        dispatch({ type: AT.DEPARTMENTREDU, state })
    },

    EditDepartment: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.DepartmentLoading(true));
        let departmentNumber = getState()[AT.DEPARTMENTREDU].get('DepartmentId');
        return ReqApi.post({
            url: Urls.DEPARTMENT_ADD,
            pm: { ...pm, departmentNumber,callBack:true}
        }).then(json => {
            dispatch(actions.DepartmentLoading(false));
            return json
        })
    },

    AddDepartment: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.DepartmentLoading(true));
        return ReqApi.post({
            url: Urls.DEPARTMENT_ADD,
            pm
        }).then(json => {
            dispatch(actions.DepartmentLoading(false));
            return json
        })
    },

    setUpDpartment:(pm={})=>(dispatch, getState)=>{
        dispatch(actions.sideLoading(true));
        return ReqApi.post({
            url:Urls.DEPARTMENT_SETUP,
            pm
        }).then(json=>{
            //dispatch(actions.sideLoading(false));
            return json
        })
    },

    get_addDetail:(pm={})=>(dispatch,getState)=>{
        return ReqApi.get({
            url:Urls.ADDRESS_DETAIL,
            pm,
        }).then(json=>{
            if(json.status==2000&&json.data.list.length>0){
                let state = getState()[AT.DEPARTMENTREDU].set('detailAddressName', json.data.list[0].addressDetl);
                dispatch({ type: AT.DEPARTMENTREDU, state })
            }
        })
    }

}

export default actions;

