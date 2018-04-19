import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls';
import { PURCHASERETURNOUTCARRYOUT } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp';
import PurchaseReturnAct from './PurchaseReturnAct'
import TabsAct from '../TabsAct'

import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}

let actions = {

    /*库存选择界面弹窗*/

    //弹窗是否可见
    InventorySelectVisiable:(value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('inventorySelectVisiable', value);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
    },
    //弹窗loading
    InventorySelectLoading:(value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('inventorySelectLoading', value);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
    },
    //弹窗上面的数据
    GetInventorySelectList: (data) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('InventorySelectData', data);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
     },
    InventorySelectList: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.InventorySelectLoading(true));
        ReqApi.get({
                url: Urls.ALLOCATE_GETORDERDETAIL,
                pm,
            }).then((json) => {
                if(json.status===2000){
                    dispatch(actions.GetInventorySelectList(json.data));  
                }
                dispatch(actions.InventorySelectLoading(false));
            })
    },
    //弹窗表格数据
    GetInventorySelectTableList: (data) => (dispatch, getState) => {
        let { list} = data;
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('InventorySelectTableData', list);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
     },
     InventorySelectTableList: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.InventorySelectLoading(true));
        ReqApi.get({
                url: Urls.ALLOCATE_GETINVENTORYLIST,
                pm,
            }).then((json) => {
                if(json.status===2000){
                    dispatch(actions.GetInventorySelectTableList(json.data));  
                }
                dispatch(actions.InventorySelectLoading(false));
            })
    },
    //弹窗的点击保存  
    InventorySelectSave: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.InventorySelectLoading(true));
        ReqApi.post({
                url: Urls.ORDERINFO_ALLOCATESAVE,
                pm,
            }).then((json) => {
                if(json.status===2000){
                    console.log("保存成功!")
                    dispatch(actions.InventorySelectVisiable(false));
                    let outCode = getState()[PURCHASERETURNOUTCARRYOUT].get('outCode');
                    dispatch(actions.carryOutOrderInfoList(pm={page:1,pageSize:10,outCode:outCode}));
                    dispatch(actions.CarryOutList(pm={orderCode:outCode}));
                }else{
                    console.log("保存失败")
                }
                dispatch(actions.InventorySelectLoading(false));
            })
    },

    /*执行界面*/

    //执行界面的loading
    ListLoading:(value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('listLoading', value);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
    },
    //订单信息loading
    OrderTableLoading:(value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('orderTableLoading', value);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
    },
    //分配信息loading
    DistributeTableLoading:(value) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('distributeTableLoading', value);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
    },
    
    //执行界面上面的数据
    GetCarryOutList: (data) => (dispatch, getState) => {
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('dataSource', data)
                .set("outCode",data.orderCode);
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
     },  
    CarryOutList: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.ListLoading(true));
        ReqApi.get({
                url: Urls.OUT_GETDETAIL,
                pm,
            }).then((json) => {
                if(json.status===2000){
                    dispatch(actions.GetCarryOutList(json.data));  
                }
                dispatch(actions.ListLoading(false));
            })
    },

    //执行界面点击发货时的调用
    ShippingSend: (pm={})=>(dispatch,getState)=>{
        ReqApi.post({
                url: Urls.SHIPPING,
                pm,
            }).then((json) => {
                if(json.status===2000){
                    dispatch(TabsAct.TabRemove('inventoryPurchaseReturnOutCarryOut','inventoryPurchaseReturnHouse'));
                    if(getStateFun(getState).get('tabs').some((tab) => {
                            return tab.key == 'inventoryPurchaseReturnHouse'
                        })){
                        dispatch(PurchaseReturnAct.getList({page:1, pageSize:10,sourceOrderType:31}));
                    }
                    dispatch(TabsAct.TabAdd({title:'采购退货出库单',key:'inventoryPurchaseReturnHouse'}));
                    message.success('发货成功！');
                }
            })
    },
    //执行界面订单信息表格数据
    GetCarryOutOrderInfoList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize} = data;
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('orderInfoData', list)
                .set("OrderPaging",{ total:total,current:page,pageSize:pageSize});
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
     },
    carryOutOrderInfoList: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.OrderTableLoading(true));
      ReqApi.get({
            url: Urls.OUT_GETORDERINFO,
            pm,
        }).then((json) => {
             if(json.status===2000){
                dispatch(actions.GetCarryOutOrderInfoList(json.data));  
            }
            dispatch(actions.OrderTableLoading(false));
        })
    },

    //执行界面订单信息表格点击分配时调用
    distributeBtn: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.InventorySelectVisiable(true));
        dispatch(actions.InventorySelectList(pm));
        dispatch(actions.InventorySelectTableList(pm));
    },

    //执行界面分配信息表格数据
    GetDistributeInfoList: (data) => (dispatch, getState) => {
        let { list,page,pageSize,total} = data;
        let state = getState()[PURCHASERETURNOUTCARRYOUT].set('distributeInfoData', list)
                    .set("distributePaging",{ total:total,current:page,pageSize:pageSize});  
        dispatch({ type: PURCHASERETURNOUTCARRYOUT, state });
     },  
    DistributeInfoList: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.DistributeTableLoading(true));
        ReqApi.get({
                url: Urls.GETALLOCATEINFO,
                pm,
            }).then((json) => {
                if(json.status===2000){
                    dispatch(actions.GetDistributeInfoList(json.data));  
                }
                dispatch(actions.DistributeTableLoading(false));
            })
    },

    //执行界面分配信息表格删除时调用
    DistributeInfoDelete: (pm={})=>(dispatch,getState)=>{
        let outCode = getState()[PURCHASERETURNOUTCARRYOUT].get('outCode')
        ReqApi.get({
                url: Urls.ALLOCATEINFO_DELETE,
                pm,
            }).then((json) => {
                if(json.status===2000){
                   message.success('删除成功！');
                }
                dispatch(actions.DistributeInfoList({page:1,pageSize:10,outCode:outCode,isPage:0,status:1}));
            })
    }, 
}
export default actions;