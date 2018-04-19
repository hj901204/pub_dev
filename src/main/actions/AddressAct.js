import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import AddressUrls from '../../base/consts/AddressUrls';
import {ADDRESSREDU} from '../consts/ActTypes';
import { fromJS, Record,Map} from 'immutable';

const actions = {
    TabLoading: (value) =>(dispatch,getState)=>{
        let state = getState()[ADDRESSREDU].set('tabLoading',value);
        dispatch({type:ADDRESSREDU,state});
    },
    AddressLoading: (value) =>(dispatch,getState)=> {
        let state = getState()[ADDRESSREDU].set('addressLoading', value);
        dispatch({ type: ADDRESSREDU, state })
    },
    AddAddressVisiable: (value) =>(dispatch,getState)=>{
        let state = getState()[ADDRESSREDU].set('add_address_visiable', value);
        dispatch({ type: ADDRESSREDU, state });
    },
    EditAddressVisiable: (value,id) =>(dispatch,getState)=>{
        let state = getState()[ADDRESSREDU].set('edit_address_visiable', value);
        if (id||id===null) state = state.set('addressId', id);
        dispatch({ type: ADDRESSREDU, state });
    },
    EditCompanyAddress: (value,addressCode,tenantCode) =>(dispatch,getState)=>{
        let state = getState()[ADDRESSREDU].set('edit_address_visiable', value)
            if (addressCode||addressCode===null) state = state.set('addressId',addressCode)
            .set('tenantCode',tenantCode)
        dispatch({ type: ADDRESSREDU, state });
    },
    Address: (data) =>(dispatch,getState)=>{
        data.businessValue = [];
        if(data.isMag == 1) //经营
            data.businessValue.push("isMag");
        if(data.isRep == 1) //收货
            data.businessValue.push("isRep");
        if(data.isSog == 1) //发货
            data.businessValue.push("isSog");
        if(data.isBil == 1) //开票
            data.businessValue.push("isBil");
        if (data.isOfe == 1) //办公
            data.businessValue.push("isOfe");
        data.isVisibleValue = [];
        if (data.isVisible == 1) //办公
            data.isVisibleValue.push("isVisible");
        data.isRegValue=[];
        if (data.isReg==1) //注册
            data.isRegValue.push("isReg");
        let state = getState()[ADDRESSREDU];
        let mstate = state.toJS();
        mstate.detail = data;
        dispatch({ type: ADDRESSREDU, state:fromJS(mstate)});
    },
    AddressDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.AddressLoading(true));
        return ReqApi.get({
            url: Urls.ADDRESS_DETAIL,
            pm
        }).then(json => {
            if(json.status === 2000){
                let _data = json.data.list[0];
                if (json.data.list.length) {
                    dispatch(actions.Address(_data));
                }
                
            }
            dispatch(actions.AddressLoading(false));
            return json;
        })
    },

    AddressCompanyDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.AddressLoading(true));
        return ReqApi.get({
            url: Urls.ADDRESS_DETAIL,
            pm
        }).then(json => {
            if(json.status === 2000){
                let _data = json.data.list[0];
                if (json.data.list.length) {
                    dispatch(actions.Address(_data));
                }
                
            }
            dispatch(actions.AddressLoading(false));
            return json;
        })
    },
    GetAddressList: (data) =>(dispatch,getState)=>{
        let { list, total, page, pageSize } = data;
        let state = getState()[ADDRESSREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: ADDRESSREDU, state });
    },
    AddressList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: Urls.ADDRESS_LIST,
            pm
        }).then((json) => {
            if(json.status===2000){
                dispatch(actions.GetAddressList(json.data));
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    AddAddress: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.AddressLoading(true));
        return ReqApi.post({
            url: Urls.ADDRESS_ADD,
            pm
        }).then(json => {
            dispatch(actions.AddressLoading(false));
            return json
        })
    },
    EditAddress: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.AddressLoading(true));
        let addressCode=getState()[ADDRESSREDU].get('addressId');
        pm={list:[{...pm,addressCode}]};
        return ReqApi.post({
            url: Urls.ADDRESS_EDIT,
            pm
        }).then(json => {
            dispatch(actions.AddressLoading(false));
            return json
        })
    },
    AddressDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: Urls.ADDRESS_DEL,
            pm
        }).then(json => {
            dispatch(actions.TabLoading(false));
            return json
        })
    },
    AddressDisable:(pm={})=>(dispatch,getState)=>{
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
           url:Urls.ADDRESS_ISDISABLE,
           pm
        }).then(json=>{
            dispatch(actions.TabLoading(false));
            return json
        })
    },
    SelectLoading: (value) =>(dispatch,getState)=>{
        let state = getState()[ADDRESSREDU].setIn(['select','selectLoading'],value);
        dispatch({type:ADDRESSREDU,state});
    },
    LinkageLoad: (pm ={}) => (dispatch, getState) => {
        dispatch(actions.SelectLoading(true));
        return dispatch(actions.CountryList()).then((json) => {
            dispatch(actions.ProvinceList({countryCode:pm.countryCode})).then((json) => {
                dispatch(actions.CityList({provinceCode:pm.provinceCode})).then((json) => {
                    dispatch(actions.CountyList({cityCode:pm.cityCode})).then((json) => {
                        dispatch(actions.SelectLoading(false));
                    })        
                })
            })
        })
    },
    CountryList: () => (dispatch, getState) => {
        dispatch(actions.SelectLoading(true));
        return ReqApi.get({
            url: AddressUrls.COUNTRY_SELECTED,
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCountryList(json.data));
                dispatch(actions.SelectLoading(false));
            }
            return json;
        });
    },
    GetCountryList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[ADDRESSREDU].setIn(['select','countrySource'], list)
        dispatch({type: ADDRESSREDU, state});
    },
    ProvinceList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.PROVINCE_SELECTED,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetProvinceList(json.data,pm));
            }
            return json;
        });
    },
    GetProvinceList: (data,pm) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[ADDRESSREDU]
        .setIn(['select','provinceSource'], list)
        .setIn(['detail','cityCode'], pm.countryCode);
        dispatch({type: ADDRESSREDU, state});
    },
    CityList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.CITY_SELECTED,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCityList(json.data,pm));
            }
            return json;
        });
    },
    GetCityList: (data,pm) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[ADDRESSREDU]
        .setIn(['select','citySource'], list)
        .setIn(['detail','provinceCode'], pm.provinceCode)
        dispatch({type: ADDRESSREDU, state});
    },
    CountyList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.COUNTY_SELECTED,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCountyList(json.data));
            }
            return json;
        });
    },
    GetCountyList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[ADDRESSREDU].setIn(['select','countySource'], list)
        dispatch({type: ADDRESSREDU, state});
    },
    ClearDetail: () => (dispatch, getState) => {
        
    //    detail:{
    //         addressCode:"",
    //         addressName:"",
    //         addressDetl:"",
    //         countryCode:"",
    //         provinceCode:"",
    //         cityCode:"",
    //         countyCode:"",
    //         isReg:0,
    //         isMag:0,
    //         isRep:0,
    //         isSog:0,
    //         isBil:0,
    //         isOfe:0,
    //         status:0,
    //         org:[]
    //     }
    },
    CleanOtherRegion: (cleanKeys,codeKeys) => (dispatch, getState) => {
        let state= getState()[ADDRESSREDU];
        cleanKeys.forEach(s=>{
            state = state.setIn(['select',s],[]);
        });
        codeKeys.forEach(s=>{
            state = state.setIn(["detail", s],"");
        })
        // state = state.setIn(['address','cityCode'],"");
        
        dispatch({type: ADDRESSREDU, state});
    }
}

export default actions