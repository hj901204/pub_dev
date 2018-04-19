import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import PurchaseReturnAct from '../../actions/OrderModule/PurchaseReturnAct';
import PurchaseReturnViewComp from '../../components/OrderModule/PurchaseReturnViewComp';

class PurchaseReturnViewCont extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <PurchaseReturnViewComp  {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return state.PurchaseReturnRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    EditPurRet: () => dispatch(TabsAct.TabAdd({
        title: "编辑采购退货单",
        key: "editPurRet"
    })),
    CanPurchaseReturnEdit: (returnCode) => dispatch(PurchaseReturnAct.CanPurchaseReturnEdit({ returnCode }, 'purchaseReturnView')),
    PurchaseReturnDetail: (returnCode) => dispatch(PurchaseReturnAct.PurchaseReturnDetail({ returnCode })),
    PurchaseReturnStatus: (status, returnCode) => dispatch(PurchaseReturnAct.PurchaseReturnStatus(status, { returnCode })),
    PurchaseReturnList: (pm) => dispatch(PurchaseReturnAct.PurchaseReturnList(pm)),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("purRetViewCont", "purchasereturn"));
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnViewCont);