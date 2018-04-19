import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
import AddPurchaseComp from '../../components/OrderModule/AddPurchaseComp';
import TabsAct from '../../actions/TabsAct';

class AddPurchaseCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { handleSubmit, tabRemove, PurchaseList } = this.props;
        handleSubmit(data).then(json => {
            if (json.status == 2000) {
                message.success('新建成功');
                tabRemove();
                PurchaseList({ page: 1, pageSize: 10 });
            } else {

            };
        });
    }
    render() {
        return (
            <AddPurchaseComp
                {...this.props}
                onOk={this.handleSubmit}
                loading={this.props.add.purchaseLoading}
                />  
        );
    }
}
AddPurchaseCont.defaultProps = {
    type: "add",
}
const mapStateToProps = (state) => {
    return state.PurchaseRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    getShippingAddressList: (pm) => dispatch(PurchaseAct.ShippingAddressList(pm, 'add')),
    getContactsList: (pm) => dispatch(PurchaseAct.ContactsList(pm, 'add')),
    getBuyerlist: (pm) => dispatch(PurchaseAct.Buyerlist(pm, 'add')),
    getSupplierList: (pm) => dispatch(PurchaseAct.SupplierList(pm, 'add')),
    getCurList: (pm) => dispatch(PurchaseAct.CurList(pm, 'add')),
    getSiteList: (pm) => dispatch(PurchaseAct.SiteList(pm, 'add')),
    getCostCenterList: (pm) => dispatch(PurchaseAct.CostCenterList(pm, 'add')),
    getPurchaseOrgList: (pm) => dispatch(PurchaseAct.PurchaseOrgList(pm, 'add')),
    getPaymentlist: (pm) => dispatch(PurchaseAct.Paymentlist(pm, 'add')),
    getMaterialList: (pm) => dispatch(PurchaseAct.MaterialList2(pm)),
    getMeasureList: (pm) => dispatch(PurchaseAct.MeasureList(pm)),
    DeleteData: (value) => dispatch(PurchaseAct.DeleteData(value, 'add')),
    handleSubmit: (data) => dispatch(PurchaseAct.AddPurchase(data)),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("addPurchase", "purchase"));
    },
    PurchaseList: (pm) => dispatch(PurchaseAct.PurchaseList(pm)),
    showDetailLine: (type, dtype, value) => dispatch(PurchaseAct.DetailLineVisible(type, dtype, value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseCont);
