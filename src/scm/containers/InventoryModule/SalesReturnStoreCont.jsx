/*
    销售退货入库单
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Spin } from '../../../base/components/AntdComp';
import SalesReturnStoreEidtTopAct from '../../actions/InventoryModule/SalesReturnStoreEidtTopAct'
import SalesReturnStoreEidtTopComp from '../../components/InventoryModule/SalesReturnStoreEidtTopComp'
import SalesReturnStoreTableTabCont from './SalesReturnStoreTableTabCont'

class SalesReturnStoreCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let { state, actions } = this.props;
        return (
            <div className="purchaseEidt">
                <Spin spinning={state.pageLoading}>
                    <SalesReturnStoreEidtTopComp {...this.props} />
                    <SalesReturnStoreTableTabCont />
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.SalesReturnStoreEidtTopRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    actions: bindActionCreators(SalesReturnStoreEidtTopAct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesReturnStoreCont)

