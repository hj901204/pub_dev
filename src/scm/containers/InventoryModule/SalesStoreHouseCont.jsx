/**
 * Created by MW on 2017/4/20.
 */
import React from 'react';
import {connect} from 'react-redux';
import SalesStoreHouseComp from '../../components/InventoryModule/SalesStoreHouseComp'
import NewSalesStoreHouseAct from '../../actions/InventoryModule/NewSalesStoreHouseAct'
import TabsAct from '../../actions/TabsAct'
import SalesStoreHouseAct from '../../actions/InventoryModule/SalesStoreHouseAct'
import SalesOutboundDetailsAct from '../../actions/InventoryModule/SalesOutboundDetailsAct'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct'
import CustomerAct from '../../actions/RenterModule/CustomerAct'

let mapStateToProps = (state) => {
    return state.SalesStoreHouseRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getList: (search) => {
        dispatch(SalesStoreHouseAct.getList(search))
    },
    loading: (loading,flag) => {
        dispatch(SalesStoreHouseAct.loading(loading,flag))
    },
    newTab: (tab,parameter) => {
        switch (tab) {
            case 'newBuilt':
                dispatch(TabsAct.TabAdd({title:'新建销售出库单', key:'inventoryNewSalesStoreHouse'}));
                dispatch(NewSalesStoreHouseAct.getSelectedList({page:1,pageSize:10,orderStatus:2,pushdownMark:0}));
                break;
            case 'storeDetails':
                dispatch(TabsAct.TabAdd({title:'销售出库单详情', key:'inventorySalesOutboundDetails'}));
                dispatch(SalesOutboundDetailsAct.getList(parameter));
                break;
            case 'edit':
                dispatch(SalesStoreHouseAct.isLock({orderCode:parameter}));
                break;
            default: return null;
        }
    },
    sidebarVisible: (title,obj) => {
        switch (title) {
            case 'sideDetails':
                dispatch(TabsAct.TabAdd({title:'销售订单详情', key:'saleOrderDetail'}));
                dispatch(SaleOrderAct.SetSaleOrderDetail({saleOrderCode:obj}));
                break;
            case 'sideClient':
                dispatch(TabsAct.TabAdd({title:'客户详情', key:'customerViewCont'}));
                dispatch(CustomerAct.getCustomerData(obj, 'detail'));
                dispatch(CustomerAct.ContactList({bpCode:obj.customerCode,page:1,pageSize:10}));
                dispatch(CustomerAct.CustomerBaseLoading(true));
                break;
            default:
                return null;
                break;
        }

    },
    confirmDelete: (orderCode) => {
        return dispatch(SalesStoreHouseAct.confirmDelete({orderCode:orderCode}))
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:30})),
})

export default connect(mapStateToProps,mapDispatchToProps)(SalesStoreHouseComp)