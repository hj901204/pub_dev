/**
 * Created by MW on 2017/5/3.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls} from '../../consts/InventoryUrls';
import { STORAGEEDITDIALOGREDU } from '../../consts/ActTypes';
import {initialData} from '../../reducers/InventoryModule/StorageEditDialogRedu';


export let show = (code)=> (dispatch,getState)=>{
    dispatch(inventoryGetDetail({
        code
    })).then((json)=>{
        //siteName  siteCode
        if(json.status === 2000 && json.data){
            dispatch(getEnum(json.data));
        }
    });
    dispatch(setVisible(true));

};


export let inventoryGetDetail = (pm={})=> (dispatch,getState)=>{
    dispatch(setLoading(true));
    return  ReqApi.post({
        url: Urls.INVENTORY_FREIGHTSPACE_GETDETAIL,
        pm,
    }).then((json)=>{
        if(json.status === 2000 && json.data){
            dispatch(setDataSource(json.data));
        }
        dispatch(setLoading(false));
        return json;
    });
};

export let hide = (args)=> (dispatch,getState)=>{
    dispatch(init(args));
};



export let getEnum = (obj={})=>(dispatch,getState)=>{
    dispatch(setLoading(true));
    let siteCode = obj.siteCode || "";
    Promise.all([
        dispatch(fetchEnumSiteCode(siteCode))
    ]).then(values => {
        dispatch(setLoading(false));
    }, reason => {
        dispatch(setLoading(false));
    });
}


//获取站点
///basic/site/getList  //PUB_BASIC_SITE_GETLIST
export let fetchEnumSiteCode=  (val="") => (dispatch,getState)=>{
    let pm = {
        siteName: val,
        siteCode: val,
        page: 1,
        status: 1,
        pageSize: 10,
        isSog:1
    };
    return  ReqApi.post({
        url: Urls.PUB_BASIC_SITE_GETLIST,
        pm,
    }).then((json)=>{
        if(json.status === 2000 && json.data){
            dispatch(setSiteCode(json.data.list));
        }
    });
}


export let setSiteCode=  (enumSiteCode=[]) => (dispatch,getState)=>{
    let state = getState()[STORAGEEDITDIALOGREDU].setIn(["enumSiteCode"],[].concat(enumSiteCode));
    dispatch({type:STORAGEEDITDIALOGREDU, state});
}




export let submit = (pm={})=> (dispatch,getState)=>{
    return  ReqApi.post({
        url: Urls.INVENTORY_FREIGHTSPACE_UPDATE,
        pm,
    });
};

export let init =  (args ={}) => (dispatch,getState)=>{
    let state = initialData.mergeDeep(args);
    dispatch({type:STORAGEEDITDIALOGREDU, state});
}

export let setVisible =  (bool) => (dispatch,getState)=>{
    let state = getState()[STORAGEEDITDIALOGREDU].setIn(["visible"],bool);
    dispatch({type:STORAGEEDITDIALOGREDU, state});
}

export let setDataSource=  (dataSource) => (dispatch,getState)=>{
    let state = getState()[STORAGEEDITDIALOGREDU].setIn(["dataSource"],dataSource);
    dispatch({type:STORAGEEDITDIALOGREDU, state});
}


export let setLoading =  (bool) => (dispatch,getState)=>{
    let state = getState()[STORAGEEDITDIALOGREDU].setIn(["loading"],bool);
    dispatch({type:STORAGEEDITDIALOGREDU, state});
}




/*
 export let getGoodsDetail = (goodsCode)=> (dispatch,getState)=>{
 dispatch(setSpinning(true));
 return ReqApi.get({
 pm:{
 goodsCode
 },
 url: ShopUrls.GOODS_GET_GOODS
 }).then((json)=>{
 if(json.status === 2000 && json.data){
 formatGoodsDetailImageFileList(json.data,"goodsImage");
 formatGoodsDetailImageFileList(json.data,"imageList");
 dispatch(setDataSource(json.data));

 }
 dispatch(setSpinning(false));

 return json;
 });
 };*/
