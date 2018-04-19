//生产领料申请单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import ProductionReceiveAct from '../../actions/OrderModule/ProductionReceiveAct';
import ProductionReceiveViewComp from '../../components/OrderModule/ProductionReceiveViewComp';
import TabsAct from '../../actions/TabsAct';

class ProductionReceiveViewCont extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <ProductionReceiveViewComp  {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return state.ProductionReceiveRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    ProRecStatus: (status, requisitionCode) => dispatch(ProductionReceiveAct.ProRecStatus(status, { requisitionCode })),
    EditModul: () => dispatch(TabsAct.TabAdd({
        title: "编辑生产领料申请单",
        key: "editProducRec"
    })),
    ViewEditCode: (requisitionCode) => dispatch(ProductionReceiveAct.ViewEditCode({ requisitionCode })),
    GetSelectData: (type) => dispatch(ProductionReceiveAct.GetSelectData(type)),
    CanPorducRecEdit: (requisitionCode) => dispatch(ProductionReceiveAct.CanPorducRecEdit({ requisitionCode }, 'porducRecList')),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductionReceiveViewCont);