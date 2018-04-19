/**
 * Created by MW on 2017/5/3.
 */
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls} from '../../consts/InventoryUrls';
import { STORAGEADDDIALOGREDU } from '../../consts/ActTypes';
import {initialData} from '../../reducers/InventoryModule/StorageAddDialogRedu';


export let show = (args)=> (dispatch,getState)=>{
    dispatch(init(args));
    dispatch(setVisible(true));
    dispatch(getEnum());
};


export let hide = ()=> (dispatch,getState)=>{
    dispatch(init());
};


export let getEnum = ()=>(dispatch,getState)=>{
    dispatch(setLoading(true));
    Promise.all([
        dispatch(fetchEnumSiteCode())
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
    let state = getState()[STORAGEADDDIALOGREDU].setIn(["enumSiteCode"],[].concat(enumSiteCode));
    dispatch({type:STORAGEADDDIALOGREDU, state});
}



export let submit = (pm={})=> (dispatch,getState)=>{
    return  ReqApi.post({
        url: Urls.INVENTORY_FREIGHTSPACE_ADD,
        pm,
    });
};


export let init =  (args ={}) => (dispatch,getState)=>{
    let state = initialData.mergeDeep(args);
    dispatch({type:STORAGEADDDIALOGREDU, state});
}



export let setVisible =  (bool) => (dispatch,getState)=>{
    let state = getState()[STORAGEADDDIALOGREDU].setIn(["visible"],bool);
    dispatch({type:STORAGEADDDIALOGREDU, state});
}


export let setLoading =  (bool) => (dispatch,getState)=>{
    let state = getState()[STORAGEADDDIALOGREDU].setIn(["loading"],bool);
    dispatch({type:STORAGEADDDIALOGREDU, state});
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
