/**
 * Created by MW on 2017/7/21.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import {OTHER_OUTBOUND_ORDER_EDIT_REDU} from '../../consts/ActTypes';
import { Urls } from '../../consts/InventoryUrls'
import { fromJS} from 'immutable';
import {initialState} from '../../reducers/InventoryModule/OtherOutboundOrderEditRedu';
import TabsAct from '../../actions/TabsAct';



export let show = (orderCode) => (dispatch, getState) => {
    //打开编辑页面
    dispatch(TabsAct.TabAdd({title:'编辑其他出库单据', key:'inventoryOtherOutboundEdit'}));
    dispatch(init());
    dispatch(fetchEnums({orderCode:orderCode}));
}

export let init = (pm={}) => (dispatch, getState) => {
    let state = fromJS(initialState).merge(pm);
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state});
}




export let addRow = (rowData={}) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    rowData.opType = 0;
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state:state.set("dataSource",state.get("dataSource").push(fromJS(rowData)))});
}

export let setOrderCode = (orderCode="") => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =  state.set("orderCode",orderCode);
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state:newState});
}




export let dleRow = (index) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let sourceArray = state.get("dataSource").toJS();
    let delArray  =sourceArray.splice(index,1);
    let newState ;
    if(delArray[0].hasAddOpType){
        newState =  state.set("dataSource",fromJS(sourceArray))
    }else {
        delArray[0].opType = 2;
        newState = state.set("delDataSource",state.get("delDataSource").push(fromJS(delArray[0]))) .set("dataSource",fromJS(sourceArray));
    }
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state:newState  });
}


export let editRow = (rowData={},rowIndex) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =  state.set("dataSource", state.get("dataSource").update(rowIndex,function (item) {
        if(item.get("hasAddOpType") === true){
            rowData.opType = 0;
        }else {
            rowData.opType = 1;
        }
        return item.merge(rowData);
    }));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state:newState});
}





export let setIsEdit = (isEdit = null) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =  state.set("isEdit",isEdit);
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state:newState});
}







//获取所有的枚举
export let  fetchEnums = (pm={orderCode:""}) => (dispatch, getState) => {
    dispatch(setLoading(true));
    let time =   new Promise((resolve, reject)=>{
        dispatch(fetchBaseDataSource(pm)).then((json)=>{
            if (json.status === 2000  && json.data ) {
                if(json.data.ownerDetpCode || json.data.ownerDetpCode.length > 0){
                    dispatch(fetchEmployeesEnum({
                        deptCode:json.data.ownerDetpCode
                    })).then(()=>{
                        resolve();
                    })
                }else {
                    resolve();
                }
            }else {
                reject();
            }
        })
    });
    return  Promise.all([
        time,
        dispatch(fetchDataSource(pm={outCode:pm.orderCode})),
        dispatch(fetchDeptEnum()),
        dispatch(fetchBusinessEnum()),
        dispatch(fetchSiteEnum())
    ]).then(values => {
        dispatch(setLoading(false));
    }, reason => {
        dispatch(setLoading(false));
    });
}





//新增其他出库提交
export let  addSubmit = (pm={}) => (dispatch, getState) => {
    delete pm.orderCode;
    return ReqApi.post({
        url: Urls.SCM_INVENTORY_OUT_OTHER_SAVE,
        pm
    });
}

//编辑其他出库提交
export let  editSubmit = (pm={}) => (dispatch, getState) => {
    return ReqApi.post({
        url: Urls.SCM_INVENTORY_OUT_OTHER_SAVE,
        pm
    });
}










//获取获取部门枚举
export let  fetchDeptEnum = (pm={
    status:1,
    page:1,
    pageSize:10
}) => (dispatch, getState) => {
    return ReqApi.post({
        url: Urls.PUB_DEPT_GET_ORG_LIST,
        pm
    }).then((json) => {
        if (json.status === 2000  && json.data ) {
            dispatch(setDeptEnum(json.data.list));
        }
        return json;
    });
}

export let  setDeptEnum = (deptEnum) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("deptEnum",[].concat(deptEnum));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}






//获取获取员工枚举
export let  fetchEmployeesEnum = (pm={
    deptCode:null
}) => (dispatch, getState) => {
    return ReqApi.get({
        url: Urls.PUB_EMPLOYEES_LIST,
        pm
    }).then((json) => {
        if (json.status === 2000  && json.data ) {
            dispatch(setEmployeesEnum(json.data.list));
        }
    });
}

export let  setEmployeesEnum = (employeesEnum) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("employeesEnum",[].concat(employeesEnum));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}



let  dataSourReFormat = (baseDataSource)=>{
    return baseDataSource.map((item,index)=>{
        item._recordKeyIndex = index;
        return item;
    });
}

//获取订单信息列表
export let  fetchDataSource = (pm={
    outCode:null //单据号
}) => (dispatch, getState) => {
    return ReqApi.get({
        url: Urls.SCM_INVENTORY_OUT_GET_ORDER_INFO,
        pm
    }).then((json) => {
        if (json.status === 2000  && json.data ) {

            let formatData = dataSourReFormat(json.data.list);
            dispatch(setDataSource(json.data.list))
        }
    });
}

export let  setDataSource = (dataSource) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("dataSource", fromJS([].concat(dataSource)));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}





//获取基本信息
export let  fetchBaseDataSource = (pm={
    outCode:null //单据号
}) => (dispatch, getState) => {
    return ReqApi.get({
        url: Urls.SCM_INVENTORY_OUT_GET_DETAIL,
        pm
    }).then((json) => {
        if (json.status === 2000  && json.data ) {
            dispatch(setBaseDataSource(json.data))
        }
        return json;
    });
}

export let  setBaseDataSource = (baseDataSource) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("baseDataSource",fromJS(baseDataSource));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}



//获取单据类型枚举
export let  fetchBusinessEnum = (pm={
    billType:1
}) => (dispatch, getState) => {
    return ReqApi.post({
        url: Urls.PUB_BASIC_BUSINESS_GET_LIST,
        pm
    }).then((json) => {
        if (json.status === 2000  && json.data ) {
            dispatch(setBusinessEnum(json.data.list))
        }
    });
}




export let  setBusinessEnum = (businessEnum) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("businessEnum",[].concat(businessEnum));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}





//获取发货站点枚举
export let  fetchSiteEnum = (pm={
    siteName:"",
    siteCode:"",
    page:1,
    pageSize:10
}) => (dispatch, getState) => {
    return ReqApi.post({
        url: Urls.PUB_BASIC_SITE_GETLIST,
        pm
    }).then((json) => {
        if (json.status === 2000  && json.data ) {
            dispatch(setSiteEnum(json.data.list));
        }
    });
}


export let  setSiteEnum = (siteEnum) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("siteEnum",[].concat(siteEnum));
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}






export let  setLoading = (bool) => (dispatch, getState) => {
    let state = getState()[OTHER_OUTBOUND_ORDER_EDIT_REDU];
    let newState =   state.set("loading",bool);
    dispatch({type:OTHER_OUTBOUND_ORDER_EDIT_REDU, state: newState});
}





//http://10.99.2.70:9098/scm/inventory/out/getlist


//  /pub/dept/getOrgList 获取部门枚举
//  /pub/employees/list  员工查询
//  /pub/basic/business/getList  单据类型   get

//   /pub/basic/site/getAll 发货站点   post

