import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
import PurchaseViewComp from '../../components/OrderModule/PurchaseViewComp';

class PurchaseViewCont extends Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <PurchaseViewComp  {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return state.PurchaseRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    EditModul: () => dispatch(TabsAct.TabAdd({
        title: "编辑采购订单",
        key: "editPurchase"
    })),
    CanPurchaseEdit: (orderCode) => dispatch(PurchaseAct.CanPurchaseEdit({ orderCode }, 'purchaseView')),
    PurchaseDetail: (orderCode) => dispatch(PurchaseAct.PurchaseDetail({ orderCode })),
    PurchaseStatus: (status, orderCode) => dispatch(PurchaseAct.PurchaseStatus(status, { orderCode })),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("purchaseViewCont", "purchase"));
    },
    PurchaseList: (pm) => dispatch(PurchaseAct.PurchaseList(pm)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseViewCont);