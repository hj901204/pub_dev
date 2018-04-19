/**
 * Created by MW on 2017/4/20.
 */
import React from 'react'
import {connect} from 'react-redux'
import NewProductionIssueComp from '../../components/InventoryModule/NewProductionIssueComp'
import NewProductionIssueAct from '../../actions/InventoryModule/NewProductionIssueAct'

let mapStateToProps = (state) => {
    return state.NewProductionIssueRedu.toJS();
}

let mapDispatchToProps = (dispatch) => ({
    getSelectedList:(value) => {
        dispatch(NewProductionIssueAct.getSelectedList({requisitionCode:value}));
    },
    onSelect: (value) => {
        dispatch(NewProductionIssueAct.onSelect({requisitionCode:value}));
    },
    saveInfo:(value) => {
        dispatch(NewProductionIssueAct.saveInfo(value));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProductionIssueComp)
