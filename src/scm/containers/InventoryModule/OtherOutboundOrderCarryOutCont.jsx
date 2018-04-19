/**
 * Created by MW on 2017/7/21.
 * 其它出库单执行container
 */
import React from 'react'
import {connect} from 'react-redux'
import OtherOutboundOrderCarryOutComp from '../../components/InventoryModule/OtherOutboundOrderCarryOutComp'
import OtherOutboundOrderCarryOutAct from '../../actions/InventoryModule/OtherOutboundOrderCarryOutAct'

let mapStateToProps = (state) => {
    return state.OtherOutboundOrderCarryOutRedu.toJS();
};

let mapDispatchToProps = (dispatch) => ({

    popup :(orderCode, lineNum) => {
        dispatch(OtherOutboundOrderCarryOutAct.popup(orderCode, lineNum));
    },

    getDetail: (flag) => {
        dispatch(OtherOutboundOrderCarryOutAct.getDetail(flag));
    },

    getOrderInfo: (search) => {
        dispatch(OtherOutboundOrderCarryOutAct.getOrderInfo(search));
    },

    getAllocateInfo: (search) => {
        dispatch(OtherOutboundOrderCarryOutAct.getAllocateInfo(search));
    },

    confirmDelete: (id) => {
        dispatch(OtherOutboundOrderCarryOutAct.confirmDelete({id:id}));
    },

    shipping: (content) => {
        dispatch(OtherOutboundOrderCarryOutAct.shipping(content));
    },

    close: (orderCode) => {
        dispatch(OtherOutboundOrderCarryOutAct.close({orderCode:orderCode}));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(OtherOutboundOrderCarryOutComp)