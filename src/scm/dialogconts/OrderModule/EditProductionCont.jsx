import React, { Component } from "react";
import { connect } from 'react-redux';
import ProductionAct from '../../actions/OrderModule/ProductionAct';
import TabsAct from '../../actions/TabsAct';
import EditProOrderComp from '../../components/OrderModule/EditProOrderComp';
import { Spin } from '../../../base/components/AntdComp';
class EditProductionCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Spin spinning={this.props.editProOrdLoading}><EditProOrderComp {...this.props} /> </Spin>
        )
    }

}
EditProductionCont.defaultProps = {
    title: "编辑生产订单",
    width: 800,
    type: "edit",
}
const mapStateToProps = (state) => {
    return state.ProductionRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    SourceCodeDilog: (type) => dispatch(ProductionAct.SourceCodeDilog(type, true)),
    BomCodeSelect: (pm, type, updateBom) => {return dispatch(ProductionAct.BomCodeSelect(pm, type, updateBom))},
    FreightSpace: (code) => { dispatch(ProductionAct.FreightSpace(code, 'edit')) },
    getProOrgList: (pm) => dispatch(ProductionAct.getDepartment(pm, 'edit')),
    Production_Edit: (data) => dispatch(ProductionAct.Production_Edit(data)),
    tabRemove: () => dispatch(TabsAct.TabRemove("editProductionCont", "production")),
    //handleCancel: () => { dispatch(ProductionAct.SourceCancel(false)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductionCont);