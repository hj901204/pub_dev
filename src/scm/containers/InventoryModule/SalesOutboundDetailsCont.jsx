/**
 * Created by MW on 2017/4/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import SalesOutboundDetailsComp from '../../components/InventoryModule/SalesOutboundDetailsComp'
import SalesOutboundDetailsAct from '../../actions/InventoryModule/SalesOutboundDetailsAct'

let mapStateToProps = (state) => {
    return state.SalesOutboundDetailsRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getTable: (page) => {
        dispatch(SalesOutboundDetailsAct.getTable(page));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesOutboundDetailsComp)