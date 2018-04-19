/**
 * Created by MW on 2017/4/20.
 */
import React from 'react'
import {connect} from 'react-redux'
import NewSalesStoreHouseComp from '../../components/InventoryModule/NewSalesStoreHouseComp'
import NewSalesStoreHouseAct from '../../actions/InventoryModule/NewSalesStoreHouseAct'

let mapStateToProps = (state) => {
    return state.NewSalesStoreHouseRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getSelectedList:(value) => {
        dispatch(NewSalesStoreHouseAct.getSelectedList({page:1,pageSize:10,saleOrderCode:value,orderStatus:2,pushdownMark:0}));
    },
    onSelect: (value) => {
        dispatch(NewSalesStoreHouseAct.onSelect({saleOrderCode:value}));
    },
    saveInfo:(value) => {
        dispatch(NewSalesStoreHouseAct.saveInfo(value));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewSalesStoreHouseComp)
