import React, { Component } from "react";
import { Modal, message, Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import EditPurPriceDetailDialogComp from '../../components/OrderModule/EditPurPriceDetailDialogComp';

class EditPurPriceDetailDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let { type, visible } = this.props;
        return (
            <EditPurPriceDetailDialogComp
                {...this.props}
                loading={false}
            /> 
        )

    }
}
EditPurPriceDetailDialogCont.defaultProps = {
    title: "编辑物料",
    type: 'edit',
    width: 750,
    className:'addPurPriceMaterial'
}

const mapStateToProps = (state) => ({
    visible: state.PurchasePriceRedu.getIn(['add', 'editPurPriceDetail_visible']),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(PurchasePriceAct.PurPriceDialogVisiable(false, 'add','editPurPriceDetail_visible')); },
    MaterialList: (pm, type) => dispatch(PurchasePriceAct.MaterialList(pm, 'add')),
})


export default connect(mapStateToProps,mapDispatchToProps)(EditPurPriceDetailDialogCont);
