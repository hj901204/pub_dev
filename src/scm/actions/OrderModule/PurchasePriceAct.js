//采购价格清单
import { ReqApi } from '../../../base/services/ReqApi'
import { PURCHASEPRICEREDU } from '../../consts/ActTypes';
import PurchasePriceUrls from '../../consts/PurchasePriceUrls';
import { message } from '../../../base/components/AntdComp'

let page = { page: 1, pageSize: 10 };

const actions = {
    //loding
    Loading: (value,type) => (dispatch, getState) => {
        let state = getState()[PURCHASEPRICEREDU].setIn([type, 'loading'], value);
        dispatch({ type: PURCHASEPRICEREDU, state });
    },
    //主列表
    PurchasePriceList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'list'));
        return ReqApi.get({
            url: PurchasePriceUrls.PURCHASEPRICE_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list, total, page, pageSize } = json.data;
                let state = getState()[PURCHASEPRICEREDU].setIn(['list', 'dataSource'], list)
                    .setIn(['list', 'paging'], { total, current: page, pageSize });
                dispatch({ type: PURCHASEPRICEREDU, state });
            }
            dispatch(actions.Loading(false,'list'));
            return json;
        });
    },
    //新增物料弹窗visible
    PurPriceDialogVisiable: (value,type,dialogType) => (dispatch, getState) => {
        let state = getState()[PURCHASEPRICEREDU].setIn([type, dialogType], value);
        dispatch({ type: PURCHASEPRICEREDU, state });
    },

    //供应商列表
    SupplierList: (pm = {},type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchasePriceUrls.SUPPLIER_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list } = json.data;
                let state = getState()[PURCHASEPRICEREDU].setIn([type, 'supplierList'], list);
                dispatch({ type: PURCHASEPRICEREDU, state });
            }
            return json;
        });
    },

    //币种列表
    CurList: (pm = {},type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchasePriceUrls.CUR_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list } = json.data;
                let curData = [];
                list.length>0&&list.map(item => {
                    let getCur = {};
                    if (item.status == 1) {
                        getCur.curCode = item.curCode;
                        getCur.curName = item.curName;
                        curData.push(getCur)
                    }
                })
                let state = getState()[PURCHASEPRICEREDU].setIn([type, 'curList'], curData);
                dispatch({ type: PURCHASEPRICEREDU, state });
            }
            return json;
        });
    },
    //主列表-币种
    PurchaseCurList: (pm = {},type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchasePriceUrls.CUR_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list } = json.data;
                list.unshift({ "curCode": "null","curName": "全部"})
                let state = getState()[PURCHASEPRICEREDU].setIn([type, 'curList'], list);
                dispatch({ type: PURCHASEPRICEREDU, state });
            }
            return json;
        });
    },
    //币种详情
    CurDetail: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchasePriceUrls.CUR_DETAIL,
            pm
        }).then((json) => {
            return json;
        });
    },
    //物料列表
    MaterialList: (pm = {},type) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchasePriceUrls.MATERIAL_LIST,
            pm: {status:1,...pm}
        }).then((json) => {
            if (json.status == 2000) {
                // let { list } = json.data;
                // let state = getState()[PURCHASEPRICEREDU].setIn([type, 'materialList'], list);
                // dispatch({ type: PURCHASEPRICEREDU, state });
            }
            return json;
        });
    },

    //主列表删除
    PurchasePriceDelete: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'list'));
        ReqApi.post({
            url: PurchasePriceUrls.PURCHASEPRICE_DELETE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                message.success("删除成功!");
                dispatch(actions.PurchasePriceList({page:1,pageSize:10}));
            }
            dispatch(actions.Loading(false,'list'));
        });
    },
    //主列表-新建
    PurchasePriceAdd: () => (dispatch, getState) => {
        let detail = {
            orderCode: "",
            startTime: "",
            endTime: "",
            supplierCode: "",
            supplierName: "",
            currencyCode: "",
            priceName: "",
            orderStatus: 0,
            includeTaxFlag: 1,
            taxRate: "17",
            remark: "",
            list: [],
            isTaxValue: ['includeTaxFlag']
        };
        let state = getState()[PURCHASEPRICEREDU].setIn(["add", 'detail'], detail);
        dispatch({ type: PURCHASEPRICEREDU, state });
        dispatch(actions.SupplierList({ page: 1, pageSize: 10 }, 'add'));
        dispatch(actions.CurList({},'add'));
    },
    //详情列表
    PurchasePriceView: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'view'));
        return ReqApi.get({
            url: PurchasePriceUrls.PURCHASEPRICE_GET,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list } = json.data;
                let state = getState()[PURCHASEPRICEREDU].setIn(['view', 'viewList'], list)
                    .setIn(['view', 'paging'], { total:list.length})
                    .setIn(['view', 'detail'], json.data);
                dispatch({ type: PURCHASEPRICEREDU, state });
            }
            dispatch(actions.Loading(false,'view'));
            return json;
        });
    },

    //详情-提交
    PurchasePriceSubmit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'view'));
        return ReqApi.post({
            url: PurchasePriceUrls.PURCHASEPRICE_SUBMIT,
            pm,
            callBack: true
        }).then((json) => {
            dispatch(actions.Loading(false,'view'));
            return json;
        });
    },
    //详情-撤回
    PurchasePriceRecall: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'view'));
        return ReqApi.post({
            url: PurchasePriceUrls.PURCHASEPRICE_RECALL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                message.success("数据撤回成功!")
            }
            dispatch(actions.Loading(false,'view'));
            return json;
        });
    },
    //详情-复制
    PurchasePriceCopy: (detail) => (dispatch, getState) => {
        let state = getState()[PURCHASEPRICEREDU].setIn(["add", 'detail'], detail);
        dispatch({ type: PURCHASEPRICEREDU, state });
        dispatch(actions.SupplierList({ supplierCode: detail.supplierCode,page:1,pageSize:10},'add'));
    },
    //物料单位列表
    MeasureList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: PurchasePriceUrls.MEASURE_LIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                // let { list } = json.data;
                // let state = getState()[PURCHASEPRICEREDU].setIn([type, 'measureList'], list);
                // dispatch({ type: PURCHASEPRICEREDU, state });
            }
            return json;
        });
    },

    //采购价格清单详情
    PurchasePriceDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'edit'));
        return ReqApi.get({
            url: PurchasePriceUrls.PURCHASEPRICE_GET,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let {data} = json;
                let { supplierCode, currencyCode } = json.data;
                data.isTaxValue = [];
                if (data.includeTaxFlag == 1) 
                data.isTaxValue.push("includeTaxFlag");
                let state = getState()[PURCHASEPRICEREDU].setIn(['edit', 'detail'], data);
                dispatch({ type: PURCHASEPRICEREDU, state });
                dispatch(actions.SupplierList({ supplierCode: supplierCode, page: 1, pageSize: 10 }, 'edit'));
                dispatch(actions.CurList({},'edit'));
            }
            dispatch(actions.Loading(false,'edit'));
            return json;
        });
    },

    //当前采购价格清单code
    PurchasePriceCode: (value) => (dispatch, getState) => {
        let state = getState()[PURCHASEPRICEREDU].setIn(['edit', 'current'], value);
        dispatch({ type: PURCHASEPRICEREDU, state });
    },

    //新增采购价格清单
    AddPurchasePrice: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true,'add'));
        return ReqApi.post({
            url: PurchasePriceUrls.PURCHASEPRICE_ADD,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                
            }
            dispatch(actions.Loading(false,'add'));
            return json;
        });
    },
    //编辑采购价格清单
    EditPurchasePrice: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true, 'edit'));
        let orderCode=getState()[PURCHASEPRICEREDU].getIn(['edit','current'])
        return ReqApi.post({
            url: PurchasePriceUrls.PURCHASEPRICE_EDIT,
            pm: {orderCode,...pm}
        }).then((json) => {
            if (json.status == 2000) {
                
            }
            dispatch(actions.Loading(false,'edit'));
            return json;
        });
    },
    //导入
    ImportViewLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[PURCHASEPRICEREDU].setIn(['import','importViewLoading'], value);
        dispatch({type:PURCHASEPRICEREDU, state});
    },
    Percent:(value)=>(dispatch,getState)=>{
        let state = getState()[PURCHASEPRICEREDU].setIn(['import','percent'], value);
        dispatch({type:PURCHASEPRICEREDU, state});
    },
    AlertVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[PURCHASEPRICEREDU].setIn(['import','alertVisible'],value);
       dispatch({type:PURCHASEPRICEREDU,state});
   },
    ProgressVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[PURCHASEPRICEREDU].setIn(['import','progressVisible'],value);
       dispatch({type:PURCHASEPRICEREDU,state});
   },
    ImportViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[PURCHASEPRICEREDU].setIn(['import','importViewVisiable'],value);
       dispatch({type:PURCHASEPRICEREDU,state});
   },
    GetUpLoadFile: (data) => (dispatch, getState) => {
        let state = getState()[PURCHASEPRICEREDU].setIn(['import','errorExcelUrl'], data.errorExcel);
        dispatch({ type: PURCHASEPRICEREDU, state });
    },
    UpLoadFile: (pm={}) => (dispatch, getState) => {
        dispatch(actions.ImportViewLoading(true));
        return ReqApi.post({
            url: PurchasePriceUrls.IMPORT_EXCEL,
            pm,
            callBack:true
        }).then((json) => {
            if(json.status===2000){
                dispatch(actions.ProgressVisible(true));
                message.success("导入成功");                
            }else if(json.status===4303){
                message.error(json.data.errorMessage); 
            }else if(json.status===4304){
                dispatch(actions.AlertVisible(true));
                dispatch(actions.GetUpLoadFile(json.data));            
            }
            dispatch(actions.ImportViewLoading(false));
            return json
            return json;
        });
    },
    //检查是否存在审核状态的单据
    PurchasePriceCheckStatus: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: PurchasePriceUrls.PURCHASEPRICE_CHECKSTATUS,
            pm,
            callBack: true
        }).then((json) => {
            return json;
        });
    },
}

export default actions;