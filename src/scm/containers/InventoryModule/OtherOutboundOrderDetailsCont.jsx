/**
 * Created by MW on 2017/7/21.
 * 其他出库单详情页面container
 */

import React from 'react'
import {connect} from 'react-redux'
import OtherOutboundOrderDetailsComp from '../../components/InventoryModule/OtherOutboundOrderDetailsComp'
import OtherOutboundOrderDetailsAct from '../../actions/InventoryModule/OtherOutboundOrderDetailsAct'

let mapStateToProps = (state) => {
    return state.OtherOutboundOrderDetailsRedu.toJS();
};

let mapDispatchToProps = (dispatch) => ({
    getTable: (page) => {
        dispatch(OtherOutboundOrderDetailsAct.getTable(page));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(OtherOutboundOrderDetailsComp)
