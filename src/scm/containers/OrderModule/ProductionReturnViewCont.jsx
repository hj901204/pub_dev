import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import ProductionReturnAct from '../../actions/OrderModule/ProductionReturnAct';
import ProductionReturnViewComp from '../../components/OrderModule/ProductionReturnViewComp';
import TabsAct from '../../actions/TabsAct';

class ProductionReturnViewCont extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <ProductionReturnViewComp  {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return state.ProductionReturnRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    EditProductionReturnCont: () => dispatch(TabsAct.TabAdd({
        title: "编辑生产退料单",
        key: "editProductionReturnCont"
    })),
    ProductionReturnViewCode: (orderCode) => dispatch(ProductionReturnAct.ProductionReturnViewData(orderCode)),
    ProductionOrderList: (pm, type) => dispatch(ProductionReturnAct.ProductionOrderList(pm, type)),
    GetDepartment: (pm, type) => dispatch(ProductionReturnAct.GetDepartment(pm, type)),
    GetProductionReturnDetail: (pm) => dispatch(ProductionReturnAct.GetProductionReturnDetail(pm)),
    resetNull: (value) => dispatch(ProductionReturnAct.resetNull(value)),
    ProEdit: (pm) => dispatch(ProductionReturnAct.ProEdit(pm)),
    ProRetnStatus: (status, returnCode) => dispatch(ProductionReturnAct.ProRetnStatus(status, { returnCode })),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductionReturnViewCont);