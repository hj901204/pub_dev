/*
    生产退料单
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Spin } from '../../../base/components/AntdComp';

import ReturnMaterialTopAct from '../../actions/InventoryModule/ReturnMaterialTopAct'
import ReturnMaterialTopComp from '../../components/InventoryModule/ReturnMaterialTopComp'
import ReturnMaterialTableTabCont from './ReturnMaterialTableTabCont'

class ReturnMaterialCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let { state, actions } = this.props;
        return (
            <div className="purchaseEidt">
                <Spin spinning={state.pageLoading}>
                    <ReturnMaterialTopComp {...this.props} />
                    <ReturnMaterialTableTabCont />
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.ReturnMaterialTopRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    actions: bindActionCreators(ReturnMaterialTopAct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReturnMaterialCont)