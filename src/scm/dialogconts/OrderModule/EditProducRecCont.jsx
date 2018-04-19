import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import ProductionReceiveAct from '../../actions/OrderModule/ProductionReceiveAct';
import TabsAct from '../../actions/TabsAct';
import EditProducRecComp from '../../components/OrderModule/EditProducRecComp';

class EditProducRecCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    initData = () => { }
    handleSubmit = (data, back) => {
        const { handleSubmit, tabRemove, sourceType, ProductionReceiveList } = this.props;
        return handleSubmit(data).then(json => {
            if (json.status == 2000 && back) {
                tabRemove();
                // ProductionReceiveList({ page: 1, pageSize: 10 });
            };
            return json;
        })
    }
    render() {
        return (
            <EditProducRecComp
                {...this.props}
                onOk={this.handleSubmit}
                initData={this.initData}
                producRecLoading={this.props.edit.producRecLoading}
            />
        )
    }
}
EditProducRecCont.defaultProps = {
    title: "编辑生产领料申请单",
    type: "edit",
}
const mapStateToProps = (state) => {
    return state.ProductionReceiveRedu.toJS();
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    getProOrderList: (pm) => dispatch(ProductionReceiveAct.ProOrderList(pm, 'edit')),
    getAcquisitionOrgList: (pm) => dispatch(ProductionReceiveAct.AcquisitionOrg(pm, 'edit')),
    getProOrderCodeList: (pm) => dispatch(ProductionReceiveAct.ProOrderCodeList(pm, 'edit')),
    getEmpCodeList: (pm) => dispatch(ProductionReceiveAct.EmpCodeList(pm, 'edit')),
    getSelectData: (pm) => dispatch(ProductionReceiveAct.getSelectDataList(pm, 'edit')),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("editProducRec", "productionReceive"));
    },
    // getSelectData: (param) => { dispatch(ProductionReceiveAct.getSelectData(false, param)) },
    ProductionReceiveList: (pm) => dispatch(ProductionReceiveAct.ProductionReceiveList(pm)),
    handleSubmit: (data) => dispatch(ProductionReceiveAct.EditProducRec(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProducRecCont);