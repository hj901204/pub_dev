/**
 * Created by MW on 2017/4/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import ProductionIssueOutboundDetailsComp from '../../components/InventoryModule/ProductionIssueOutboundDetailsComp'
import ProductionIssueOutboundDetailsAct from '../../actions/InventoryModule/ProductionIssueOutboundDetailsAct'

let mapStateToProps = (state) => {
    return state.ProductionIssueOutboundDetailsRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getTable: (page) => {
        dispatch(ProductionIssueOutboundDetailsAct.getTable(page));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductionIssueOutboundDetailsComp)