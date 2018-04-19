//生产订单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import ProductionAct from '../../actions/OrderModule/ProductionAct';
import ProductionViewComp from '../../components/OrderModule/ProductionViewComp';

class ProductionViewCont extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <ProductionViewComp  {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return state.ProductionRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    EditProductionCont: () => dispatch(TabsAct.TabAdd({
        title: "编辑生产订单",
        key: "editProductionCont"
    })),
    resetRecord: (value) => dispatch(ProductionAct.resetRecord(value)),
    getSiteAll: (isSog) => { dispatch(ProductionAct.getSiteAll(isSog)) },
    getDepartment: (param, type) => { dispatch(ProductionAct.getDepartment(param, type)) },
    EditProOrderDetail: (orderCode) => dispatch(ProductionAct.EditProOrderDetail(orderCode)),
    ProductionStatus: (status, orderCode) => { return dispatch(ProductionAct.ProductionStatus(status, { orderCode }))},

})
export default connect(mapStateToProps, mapDispatchToProps)(ProductionViewCont);