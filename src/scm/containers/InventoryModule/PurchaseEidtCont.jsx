import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Spin } from '../../../base/components/AntdComp';
import PurchaseEidtTopAct from '../../actions/InventoryModule/PurchaseEidtTopAct'
import PurchaseEidtTopComp from '../../components/InventoryModule/PurchaseEidtTopComp'
import PurchaseEidtTableTabCont from './PurchaseEidtTableTabCont'

class PurchaseEidtCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let { state, actions } = this.props;
        return (
            <div className="purchaseEidt">
                <Spin spinning={state.pageLoading}>
                    <PurchaseEidtTopComp {...this.props} />
                    <PurchaseEidtTableTabCont />
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.PurchaseEidtTopRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    actions: bindActionCreators(PurchaseEidtTopAct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseEidtCont)



