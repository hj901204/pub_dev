/**
 * Created by MW on 2017/3/24.
 */
import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { MEMBERDIALOGREDU } from '../consts/ActTypes';



//新增
export let show =  () => (dispatch,getState)=>{
    let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","visible"],true);
    dispatch({type:MEMBERDIALOGREDU, state});
    dispatch(loadEnum());
}



export let hide =  () => (dispatch,getState)=>{
    let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","visible"],false);
    dispatch({type:MEMBERDIALOGREDU, state});
}


export let setLoading =  (bool) => (dispatch,getState)=>{
    let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","loading"],bool);
    dispatch({type:MEMBERDIALOGREDU, state});
}





//办公地址
export let getAddressEnum =  (pm={}) => (dispatch,getState)=>{


/*    Address:(pm={})=>(dispatch, getState)=>{
        return ReqApi.get({
            url: Urls.ADDRESS_ALLLIST,
            pm
        }).then(json=>{
            dispatch(actions.get_Address(json.data.list));
            return json;
        })
    },*/


   return ReqApi.get({
        url: Urls.ADDRESS_ALLLIST,
       pm:{
           "isOfe": 1,
       },
    }).then(json => {
        if(json.status=== 2000 &&  json.data){
            let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","addressEnum"],json.data.list);
            dispatch({type:MEMBERDIALOGREDU, state});
            return true;
        }else {
            return false
        }
    });


}

//部门列表
export let getDeptListEnum =  () => (dispatch,getState)=>{
    return ReqApi.post({
        url: Urls.DEPT_LIST,
        pm:{
            "conditions": [
                {
                    "field": "status",
                    "value": 1,
                    "operation": 0
                }
            ],
            "relations": "status"
        },
    }).then(json => {
        if(json.status=== 2000 &&  json.data){
            let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","deptEnum"],[json.data]);
            dispatch({type:MEMBERDIALOGREDU, state});
        }
    })
}


//职位列表
export let getPositionListEnum =  () => (dispatch,getState)=>{
    return ReqApi.get({
        url: Urls.POSITION_JOB_LIST,
    }).then(json => {
        if(json.status=== 2000 &&  json.data){
            let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","positionEnum"],json.data.list);
            dispatch({type:MEMBERDIALOGREDU, state});
        }
    })
}

//国家枚举列表
export let getCountryListEnum =  () => (dispatch,getState)=>{
    return ReqApi.get({
        url: Urls.COUNTRY_GETSELECTED,
    }).then(json => {
        if(json.status=== 2000 &&  json.data){
            let state =  getState()[MEMBERDIALOGREDU].setIn(["addMemberDialog","countryEnum"],json.data.list);
            dispatch({type:MEMBERDIALOGREDU, state});
        }
    })
}



export let loadEnum =  (data) => (dispatch,getState)=>{
    dispatch(setLoading(true));

    Promise.all([
        dispatch(getDeptListEnum()),
        dispatch(getAddressEnum()),
        dispatch(getPositionListEnum()),
        dispatch(getCountryListEnum())

    ]).then(values => {
        dispatch(setLoading(false));
    }, reason => {
        dispatch(setLoading(false));
    });
}


export let addMember =  (data) => (dispatch,getState)=>{
    dispatch(setLoading(true));

    delete data.empCode;

    return ReqApi.post({
        url: Urls.EMPLOYEE_ADD,
        pm:data
    }).then(json=>{
        if(json.status===2000){

        }
        dispatch(setLoading(false));
        return json;
    }, reason => {
        dispatch(setLoading(false));
    });
}
