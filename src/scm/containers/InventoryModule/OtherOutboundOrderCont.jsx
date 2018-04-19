/**
 * Created by MW on 2017/7/20.
 * 其它出库单container
 */

import React from 'react'
import {connect} from 'react-redux'
import OtherOutboundOrderComp from '../../components/InventoryModule/OtherOutboundOrderComp'
import OtherOutboundOrderAct from '../../actions/InventoryModule/OtherOutboundOrderAct'
import OtherOutboundOrderDetailsAct from '../../actions/InventoryModule/OtherOutboundOrderDetailsAct'
import * as OtherOutboundOrderAddAct from '../../actions/InventoryModule/OtherOutboundOrderAddAct';
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'

import TabsAct from '../../actions/TabsAct'

let mapStateToProps = (state) => {
    return state.OtherOutboundOrderRedu.toJS()
};

let mapDispatchToProps = (dispatch) => ({

    getTypeList: (billtype) => {
        dispatch(OtherOutboundOrderAct.getTypeList(billtype));
    },

    getList: (search) => {
        dispatch(OtherOutboundOrderAct.getList(search));
    },

    loading: (loading,flag) => {
        dispatch(OtherOutboundOrderAct.loading(loading,flag))
    },

    confirmDelete: (orderCode) => {
      dispatch(OtherOutboundOrderAct.confirmDelete({orderCode:orderCode}));
    },

    newTab: (tab, orderCode) => {
        switch (tab){
            case 'newBuilt':
                dispatch(OtherOutboundOrderAddAct.show());
                break;
            case 'edit':
                dispatch(OtherOutboundOrderAct.isLock('edit', {orderCode:orderCode}));
                break;
            case 'execute':
                dispatch(OtherOutboundOrderAct.isLock('execute', {orderCode:orderCode}));
                break;
            case 'details':
                dispatch(TabsAct.TabAdd({title:'其他出库单据详情', key:'inventoryOtherOutboundOrderDetails'}));
                dispatch(OtherOutboundOrderDetailsAct.getList(orderCode));
                break;
            default :
                return null;
        }
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:33})),
});

export default connect(mapStateToProps,mapDispatchToProps)(OtherOutboundOrderComp)

