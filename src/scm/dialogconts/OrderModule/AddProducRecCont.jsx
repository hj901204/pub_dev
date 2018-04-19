import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal, message } from '../../../base/components/AntdComp';
import ProductionReceiveAct from '../../actions/OrderModule/ProductionReceiveAct';
import TabsAct from '../../actions/TabsAct';
import AddProducRecComp from '../../components/OrderModule/AddProducRecComp';

class AddProducRecCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data, back) => {
        const { handleSubmit, ProductionReceiveList, tabRemove } = this.props;
        return handleSubmit(data).then(json => {
            if (json.status == 2000) {
                if (back) {
                   tabRemove(); 
                }
                // ProductionReceiveList({ page: 1, pageSize: 10 });
            };
            return json;
        });
    }
    render() {
        return (
            <AddProducRecComp
                {...this.props}
                onOk={this.handleSubmit}
                producRecLoading={this.props.add.producRecLoading}
            />
        )
    }

}
AddProducRecCont.defaultProps = {
    title: "新建生产领料申请单",
    type: "add",
    // width: 800,
}
const mapStateToProps = (state) => {
    return state.ProductionReceiveRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    getProOrderList: (pm) => dispatch(ProductionReceiveAct.ProOrderList(pm, 'add')),
    getAcquisitionOrgList: (pm) => dispatch(ProductionReceiveAct.AcquisitionOrg(pm, 'add')),
    getProOrderCodeList: (pm) => dispatch(ProductionReceiveAct.ProOrderCodeList(pm, 'add')),
    getEmpCodeList: (pm) => dispatch(ProductionReceiveAct.EmpCodeList(pm, 'add')),
    getSelectData: (pm) => dispatch(ProductionReceiveAct.getSelectDataList(pm, 'add')),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("addProducRec", "productionReceive"));
    },
    // getSelectData:(param)=>{dispatch(ProductionReceiveAct.getSelectData(false,param))},
    ProductionReceiveList: (pm) => dispatch(ProductionReceiveAct.ProductionReceiveList(pm)),
    handleSubmit: (data) => dispatch(ProductionReceiveAct.AddProducRec(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddProducRecCont); 