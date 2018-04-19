/**
 * Created by MW on 2017/4/20.
 */
import React from 'react';
import {connect} from 'react-redux';
import ProductionIssueComp from '../../components/InventoryModule/ProductionIssueComp'
import ProductionIssueAct from '../../actions/InventoryModule/ProductionIssueAct'
import NewProductionIssueAct from '../../actions/InventoryModule/NewProductionIssueAct'
import TabsAct from '../../actions/TabsAct'
import ProductionIssueOutboundDetailsAct from '../../actions/InventoryModule/ProductionIssueOutboundDetailsAct'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'
import ProductionReceiveAct from '../../actions/OrderModule/ProductionReceiveAct'

let mapStateToProps = (state) => {
    return state.ProductionIssueRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getList: (search) => {
        dispatch(ProductionIssueAct.getList(search))
    },
    loading: (loading,flag) => {
        dispatch(ProductionIssueAct.loading(loading,flag))
    },
    newTab: (tab,parameter) => {
        switch (tab) {
            case 'newBuilt':
                dispatch(TabsAct.TabAdd({title:'新建生产发料单', key:'inventoryNewProductionIssue'}));
                dispatch(NewProductionIssueAct.getSelectedList({page:1,pageSize:10}));
                break;
            case 'storeDetails':
                dispatch(TabsAct.TabAdd({title:'生产发料单详情', key:'inventoryProductionIssueOutboundDetails'}));
                dispatch(ProductionIssueOutboundDetailsAct.getList(parameter));
                break;
            case 'edit':
                dispatch(ProductionIssueAct.isLock({orderCode:parameter}));
                break;
            default:
        }
    },
    sidebarVisible: (code) => {
        dispatch(TabsAct.TabAdd({title:'生产领料申请单详情', key:'productionReceiveViewCont'}));
        dispatch(ProductionReceiveAct.ProductionReceiveView({requisitionCode:code}));


    },
    confirmDelete: (orderCode) => {
        return dispatch(ProductionIssueAct.confirmDelete({orderCode:orderCode}))
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:32})),
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductionIssueComp)