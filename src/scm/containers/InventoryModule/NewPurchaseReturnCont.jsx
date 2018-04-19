/**
 * Created by MW on 2017/4/20.
 */
import React from 'react'
import {connect} from 'react-redux'
import NewPurchaseReturnComp from '../../components/InventoryModule/NewPurchaseReturnComp'
import NewPurchaseReturnAct from '../../actions/InventoryModule/NewPurchaseReturnAct'

let mapStateToProps = (state) => {
    return state.NewPurchaseReturnRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getSelectedList:(value) => {
        dispatch(NewPurchaseReturnAct.getSelectedList({page:1,pageSize:10,orderCode:value,pushdownMark:0,orderStatus:2}));
    },
    onSelect: (value) => {
        dispatch(NewPurchaseReturnAct.onSelect({returnCode:value}));
    },
    saveInfo:(value) => {
        dispatch(NewPurchaseReturnAct.saveInfo(value));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPurchaseReturnComp)
