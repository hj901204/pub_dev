import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Spin } from '../../../base/components/AntdComp';
import ProductionStorageTopAct from '../../actions/InventoryModule/ProductionStorageTopAct';
import ProductionStorageTopComp from '../../components/InventoryModule/ProductionStorageTopComp';
import ProductionStorageTableTabCont from './ProductionStorageTableTabCont';

class ProductionStorageCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let { state, actions } = this.props;
        return (
            <div className="purchaseEidt">
                <Spin spinning={state.pageLoading}>
                    <ProductionStorageTopComp {...this.props} />
                    <ProductionStorageTableTabCont />
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.ProductionStorageTopRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    actions: bindActionCreators(ProductionStorageTopAct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductionStorageCont)



