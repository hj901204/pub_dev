import React, { Component } from "react";
import { Modal, message, Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import PurchaseReturnAct from '../../actions/OrderModule/PurchaseReturnAct';
import PurRetDialogComp from '../../components/OrderModule/PurRetDialogComp';

class PurRetDialogCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let { type } = this.props;
        let { purRet_visiable } = this.props[type];
        return (
            purRet_visiable ?
                <PurRetDialogComp
                    {...this.props}
                /> : null
        )

    }
}

PurRetDialogCont.defaultProps = {
    title: "采购明细选择",
}

const mapStateToProps = (state) => {
    return state.PurchaseReturnRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    handleCancel: (type) => { dispatch(PurchaseReturnAct.PurRetDialogVisiable(false, type)); },
    PurchaseDetailList: (data, type) => { dispatch(PurchaseReturnAct.PurchaseDetailList(data, type)); }
})


export default connect(mapStateToProps, mapDispatchToProps)(PurRetDialogCont);
