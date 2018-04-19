import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import TabsAct from '../../actions/TabsAct';
import PurchaseReturnAct from '../../actions/OrderModule/PurchaseReturnAct';
import AddPurchaseReturnComp from '../../components/OrderModule/AddPurchaseReturnComp';

class EditPurchaseReturnComp extends AddPurchaseReturnComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

class EditPurRetCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    initData = () => {

    }
    handleSubmit = (data) => {
        const { handleSubmit, tabRemovePurchaseReturnList, tabRemovePurchaseReturnView, PurchaseReturnList, sourceType, PurRetCode, purchaseReturnId } = this.props;
        handleSubmit(data).then(json => {
            if (json.status == 2000) {
                message.success('编辑成功');
                if (sourceType == 'purchaseReturnList') {
                    tabRemovePurchaseReturnList();
                    PurchaseReturnList({ page: 1, pageSize: 10 });
                }
                if (sourceType == 'purchaseReturnView') {
                    tabRemovePurchaseReturnView();
                    PurRetCode(purchaseReturnId);
                    PurchaseReturnList({ page: 1, pageSize: 10 });
                }
            } else {

            };
        });
    }
    render() {
        const { purchaseReLoading } = this.props.add;
        return (
            <EditPurchaseReturnComp
                {...this.props}
                loading={purchaseReLoading}
                onOk={this.handleSubmit}
            />
        );
    }
}

EditPurRetCont.defaultProps = {
    type: "edit",
}

const mapStateToProps = (state) => {
    return state.PurchaseReturnRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    GetPurOrderList: (pm) => dispatch(PurchaseReturnAct.GetPurOrderList(pm)),
    getShippingAddressList: (pm) => dispatch(PurchaseReturnAct.ShippingAddressList(pm, 'edit')),
    getContactsList: (pm) => dispatch(PurchaseReturnAct.ContactsList(pm, 'edit')),
    getBuyerlist: (pm) => dispatch(PurchaseReturnAct.Buyerlist(pm, 'edit')),
    getSupplierList: (pm) => dispatch(PurchaseReturnAct.SupplierList(pm, 'edit')),
    getCurList: (pm) => dispatch(PurchaseReturnAct.CurList(pm, 'edit')),
    getSiteList: (pm) => dispatch(PurchaseReturnAct.SiteList(pm, 'edit')),
    getCostCenterList: (pm) => dispatch(PurchaseReturnAct.CostCenterList(pm, 'edit')),
    getPurchaseOrgList: (pm) => dispatch(PurchaseReturnAct.PurchaseOrgList(pm, 'edit')),
    PurchaseDetail: (orderCode) => dispatch(PurchaseReturnAct.PurchaseDetail({ orderCode }, 'edit')),
    DeleteData: (value) => dispatch(PurchaseReturnAct.DeleteData(value, 'edit')),
    handleSubmit: (data) => dispatch(PurchaseReturnAct.EditPurchaseReturn(data)),
    PurRetCode: (returnCode) => dispatch(PurchaseReturnAct.PurRetCode(returnCode)),
    PurchaseReturnList: (pm) => dispatch(PurchaseReturnAct.PurchaseReturnList(pm)),
    tabRemovePurchaseReturnList: () => {
        dispatch(TabsAct.TabRemove("editPurRet", "purchasereturn"));
    },
    tabRemovePurchaseReturnView: () => {
        dispatch(TabsAct.TabRemove("editPurRet", "purRetViewCont"));
    },
    PurRetDialogVisiable: () => { dispatch(PurchaseReturnAct.PurRetDialogVisiable(true, 'edit')); },
})


export default connect(mapStateToProps, mapDispatchToProps)(EditPurRetCont);

