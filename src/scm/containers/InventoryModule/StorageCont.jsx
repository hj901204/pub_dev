/**
 * Created by MW on 2017/5/15.
 */
/**
 * Created by MW on 2017/4/20.
 */
import React from 'react'
import {connect} from 'react-redux'
import StorageComp from '../../components/InventoryModule/StorageComp';
import {bindActionCreators} from 'redux'
import * as StorageAct from "../../actions/InventoryModule/StorageAct";

let mapStateToProps = (state) => {
    return state.StorageRedu.toJS();
}

let mapDispatchToProps = (dispatch) => (
    {
        dispatch,
        actions:bindActionCreators(StorageAct,dispatch)
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(StorageComp)
