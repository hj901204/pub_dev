import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Spin } from '../../../base/components/AntdComp';
import OtherWarehouseCarryOutAct from '../../actions/InventoryModule/OtherWarehouseCarryOutAct'
import OtherWarehouseCarryOutTopComp from '../../components/InventoryModule/OtherWarehouseCarryOutTopComp'
import OtherWarehouseCarryOutTableCont from './OtherWarehouseCarryOutTableCont'

class OtherWarehouseCarryOutCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let { state, actions } = this.props;
        return (
            <div className="otherwarehouse-carryout">
                <Spin spinning={state.pageLoading}>
                    <OtherWarehouseCarryOutTopComp {...this.props} />
                    <OtherWarehouseCarryOutTableCont />
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.OtherWarehouseCarryOutRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    actions: bindActionCreators(OtherWarehouseCarryOutAct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherWarehouseCarryOutCont)



