import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/Urls';
import { BASEDATAREDU } from '../consts/ActTypes';
import { base_config } from '../consts/BaseData';

const actions = {
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@刷新页面@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    getList:(pm = {})=>(dispatch,getState)=>{
        dispatch(actions.tableLoading(true));
        let subCode = base_config[getState()[BASEDATAREDU].get("baseType")].code;
        pm = {...pm,...getState()[BASEDATAREDU].get("searchPm")}
        pm = subCode ? {...pm , subCode} : pm;
        ReqApi.post({
            url: Urls.BASEDATA[getState()[BASEDATAREDU].get("baseType")].getList,
            pm
        }).then((json) => {
            dispatch(actions.tableLoading(false));
            let _data = json.data,_list = _data.catList?_data.catList:_data.list;
            let state = getState()[BASEDATAREDU]
            .setIn(["dataSource"],_list)
            .setIn(["paging"],{page:_data.page,pageSize:_data.pageSize,total:_data.total});
            dispatch({type:BASEDATAREDU , state});
        });
    },
    selectType:(type)=>(dispatch,getState)=>{    //选择基础数据的类型
        let req = {};
        req[base_config[type].fields.code] = "";
        req[base_config[type].fields.name] = "";
        req = {...req , page:getState()[BASEDATAREDU].get("searchPm").page,pageSize:getState()[BASEDATAREDU].get("searchPm").pageSize};
        let state = getState()[BASEDATAREDU].setIn(["baseType"],type).setIn(["searchPm"],{...req});
        dispatch({type:BASEDATAREDU , state});
        dispatch(actions.getList());
    },
    refreshTable:(page = {})=>(dispatch,getState)=>{
        page = { ...getState()[BASEDATAREDU].get(["searchPm"]),...page};
        let state = getState()[BASEDATAREDU].setIn(["searchPm"],page);
        dispatch({type:BASEDATAREDU , state});
        dispatch(actions.getList(page));
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@loading和dialog@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    tableLoading:(bool)=>(dispatch,getState)=>{
        let state = getState()[BASEDATAREDU].setIn(["tableLoading"],bool);
        dispatch({type:BASEDATAREDU , state});
    },
    dialogLoading:(bool)=>(dispatch,getState)=>{
        let state = getState()[BASEDATAREDU].setIn(["dialogLoading"],bool);
        dispatch({type:BASEDATAREDU , state});
    },
    addDialog:(bool)=>(dispatch,getState)=>{
        let state = getState()[BASEDATAREDU].setIn(["add_visiable"],bool);
        state = state.setIn(["selectData","region"],[]);
        state = state.setIn(["selectData","province"],[]);
        state = state.setIn(["selectData","city"],[]);
        dispatch({type:BASEDATAREDU , state});
    },
    editDialog:(bool)=>(dispatch,getState)=>{
        let state = getState()[BASEDATAREDU].setIn(["edit_visiable"],bool);
        dispatch({type:BASEDATAREDU , state});
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@操作数据@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    addRecord:(data)=>(dispatch,getState)=>{
        dispatch(actions.dialogLoading(true));
        return ReqApi.post({
            url: Urls.BASEDATA[getState()[BASEDATAREDU].get("baseType")].add,
            pm:data
        }).then((json) => {
            dispatch(actions.dialogLoading(false));
            return json;
        });
    },
    editRecord:(data)=>(dispatch,getState)=>{
        dispatch(actions.dialogLoading(true));
        return ReqApi.post({
            url: Urls.BASEDATA[getState()[BASEDATAREDU].get("baseType")].updata,
            pm:data
        }).then((json) => {
            dispatch(actions.dialogLoading(false));
            let state = getState()[BASEDATAREDU].setIn(["record"],[{}]);
            dispatch({type:BASEDATAREDU , state});
            return json;
        });
    },
    getRecord:(code)=>(dispatch,getState)=>{
        dispatch(actions.editDialog(true));
        dispatch(actions.dialogLoading(true));
        let pm = {},btype = getState()[BASEDATAREDU].get("baseType");
        pm[base_config[btype].fields.code] = code;
        pm.subCode = base_config[btype].code;
        //GET /basic/measure/getMeasureByCode
        let _url = Urls.BASEDATA[btype].getDetail;
        if(base_config[btype].e_name == "measure"){
            _url = Urls.BASEDATA[btype].measureDetail;
        }else if(base_config[btype].e_name == "currency"){
            _url = Urls.BASEDATA[btype].currencyDetail;
        }
        ReqApi.get({
            url: _url,
            pm
        }).then((json) => {
            dispatch(actions.dialogLoading(false));
            let _list = json.data.list != undefined && json.data.list.length>0? json.data.list[0]:null;
            let state = getState()[BASEDATAREDU].setIn(["record"],_list);
            dispatch({type:BASEDATAREDU , state});
            // if(typeof base_config[btype].code === 'undefined'){
            //     json.data.regionCode ? dispatch(actions.setRegion(json.data.regionCode)) : null ;
            //     json.data.provinceCode ? dispatch(actions.setProvince(json.data.provinceCode)) : null ;
            //     json.data.cityCode ? dispatch(actions.setCity(json.data.cityCode)) : null ;
            // }
        });
    },
    deleteItem:(code)=>(dispatch,getState)=>{
        let pm = {},btype = getState()[BASEDATAREDU].get("baseType");
        pm[base_config[btype].fields.code] = code;
        pm.subCode = base_config[btype].code;
        dispatch(actions.tableLoading(true));
        return ReqApi.get({
            url: Urls.BASEDATA[getState()[BASEDATAREDU].get("baseType")].delete,
            pm
        }).then((json) => {
            return json;
        });
    },
    clearSearch:()=>(dispatch,getState)=>{
        let pageSize = getState()[BASEDATAREDU].get("searchPm").pageSize;
        let state = getState()[BASEDATAREDU].setIn(["searchPm"],{
            page:1,
            pageSize
        }).setIn(["resetFlag"],true);
        // .setIn(["resetFlag"],true)
        dispatch({type:BASEDATAREDU , state});
    },
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@获取下拉数据@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    getCountrys:()=>(dispatch,getState)=>{
        ReqApi.get({
            url: Urls.COUNTRY_SELECTED,
        }).then((json) => {
            let state = getState()[BASEDATAREDU].setIn(["selectData","country"],json.data.list);
            dispatch({type:BASEDATAREDU , state});
        });
    },
    setRegion:(code)=>(dispatch,getState)=>{
        ReqApi.get({
            url: Urls.REGION_SELECTED,
            code
        }).then((json) => {
            let state = getState()[BASEDATAREDU].setIn(["selectData","region"],json.data.list);
            dispatch({type:BASEDATAREDU , state});
        });
    },
    setProvince:(code)=>(dispatch,getState)=>{
        ReqApi.get({
            url: Urls.PROVINCE_SELECTED,
            code
        }).then((json) => {
            let state = getState()[BASEDATAREDU].setIn(["selectData","province"],json.data.list);
            dispatch({type:BASEDATAREDU , state});
        });
    },
    setCity:(code)=>(dispatch,getState)=>{
        ReqApi.get({
            url: Urls.CITY_SELECTED,
            code
        }).then((json) => {
            let state = getState()[BASEDATAREDU].setIn(["selectData","city"],json.data.list);
            dispatch({type:BASEDATAREDU , state});
        });
    },
    resetFlagFun:(bool)=>(dispatch,getState)=>{
        let state = getState()[BASEDATAREDU].setIn(["resetFlag"],bool);
        dispatch({type:BASEDATAREDU , state});
    }
}
export default actions;