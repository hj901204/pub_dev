import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import ProductionReturnAct from '../../actions/OrderModule/ProductionReturnAct';
import EditProductionReturnComp from '../../components/OrderModule/EditProductionReturnComp';
import { Spin } from '../../../base/components/AntdComp';
class EditProductionReturnCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Spin spinning={this.props.editProductionReturnLoading}><EditProductionReturnComp {...this.props} /></Spin>
        )
    }

}
EditProductionReturnCont.defaultProps = {
    title: "编辑生产退料申请单",
    type: "edit"
}

const mapStateToProps = (state) => {
    return state.ProductionReturnRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    ProductionOrderList: (pm, type) => dispatch(ProductionReturnAct.ProductionOrderList(pm, 'edit')),
    GetDepartment: (pm, type) => dispatch(ProductionReturnAct.GetDepartment(pm, 'edit')),
    ProductionOrderDetail: (pm, type) => { return dispatch(ProductionReturnAct.ProductionOrderDetail(pm, 'edit')) },
    EmpList: (pm, type) => dispatch(ProductionReturnAct.EmpList(pm, 'edit')),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("editProductionReturnCont", "productionReturn"));
    },
    ProductionReturn_Edit: (data) => dispatch(ProductionReturnAct.ProductionReturn_Edit(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductionReturnCont);