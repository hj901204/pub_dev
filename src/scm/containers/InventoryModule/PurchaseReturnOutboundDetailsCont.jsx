/**
 * Created by MW on 2017/4/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import PurchaseReturnOutboundDetailsComp from '../../components/InventoryModule/PurchaseReturnOutboundDetailsComp'
import PurchaseReturnOutboundDetailsAct from '../../actions/InventoryModule/PurchaseReturnOutboundDetailsAct'

let mapStateToProps = (state) => {
    return state.PurchaseReturnOutboundDetailsRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getTable: (page) => {
        dispatch(PurchaseReturnOutboundDetailsAct.getTable(page));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnOutboundDetailsComp)