import React, { Component } from "react";
import { Modal, message, Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import AddPurPriceDetailDialogComp from '../../components/OrderModule/AddPurPriceDetailDialogComp';

class AddPurPriceDetailForEditCont extends Component {
    constructor(props, context) {
        super(props, context);
        
    }

    render() {
        let { type, visible } = this.props;
        return (
            <AddPurPriceDetailDialogComp
                {...this.props}
                loading={false}
            />
        )

    }
}
AddPurPriceDetailForEditCont.defaultProps = {
    title: "添加物料",
    type: 'add',
    width: 750,
    className:'addPurPriceMaterial'
}

const mapStateToProps = (state) => ({
    visible: state.PurchasePriceRedu.getIn(['edit', 'addPurPriceDetail_visible']),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(PurchasePriceAct.PurPriceDialogVisiable(false, 'edit','addPurPriceDetail_visible')); },
    MaterialList: (pm, type) => dispatch(PurchasePriceAct.MaterialList(pm, 'edit')),
})


export  default connect(mapStateToProps,mapDispatchToProps)(AddPurPriceDetailForEditCont);
