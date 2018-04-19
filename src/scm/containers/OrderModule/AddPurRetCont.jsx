import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import PurchaseReturnAct from '../../actions/OrderModule/PurchaseReturnAct';
import AddPurchaseReturnComp from '../../components/OrderModule/AddPurchaseReturnComp';
import TabsAct from '../../actions/TabsAct';

class AddPurRetCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { handleSubmit, tabRemove, PurchaseReturnList } = this.props;
        handleSubmit(data).then(json => {
            if (json.status == 2000) {
                message.success('新建成功');
                tabRemove();
                PurchaseReturnList({ page: 1, pageSize: 10 });
            } else {

            };
        });
    }
    render() {
        const { purchaseReLoading } = this.props.add;
        return (
            <div>
                <AddPurchaseReturnComp
                    {...this.props}
                    loading={purchaseReLoading}
                    onOk={this.handleSubmit}
                />
            </div>
        );
    }
}

AddPurRetCont.defaultProps = {
    type: "add",
}

const mapStateToProps = (state) => {
    return state.PurchaseReturnRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    GetPurOrderList: (pm) => dispatch(PurchaseReturnAct.GetPurOrderList(pm,'add')),
    getShippingAddressList: (pm) => dispatch(PurchaseReturnAct.ShippingAddressList(pm, 'add')),
    getContactsList: (pm) => dispatch(PurchaseReturnAct.ContactsList(pm, 'add')),
    getBuyerlist: (pm) => dispatch(PurchaseReturnAct.Buyerlist(pm, 'add')),
    getSupplierList: (pm) => dispatch(PurchaseReturnAct.SupplierList(pm, 'add')),
    getCurList: (pm) => dispatch(PurchaseReturnAct.CurList(pm, 'add')),
    getSiteList: (pm) => dispatch(PurchaseReturnAct.SiteList(pm, 'add')),
    getCostCenterList: (pm) => dispatch(PurchaseReturnAct.CostCenterList(pm, 'add')),
    getPurchaseOrgList: (pm) => dispatch(PurchaseReturnAct.PurchaseOrgList(pm, 'add')),
    PurchaseDetail: (orderCode) => dispatch(PurchaseReturnAct.PurchaseDetail({ orderCode }, 'add')),
    DeleteData: (value) => dispatch(PurchaseReturnAct.DeleteData(value, 'add')),
    IsBuyer: () => dispatch(PurchaseReturnAct.IsBuyer()),
    handleSubmit: (data) => dispatch(PurchaseReturnAct.AddPurchaseReturn(data)),
    PurRetDialogVisiable: () => { dispatch(PurchaseReturnAct.PurRetDialogVisiable(true, 'add')); },
    PurchaseReturnList: (pm) => dispatch(PurchaseReturnAct.PurchaseReturnList(pm)),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("addPurRet", "purchasereturn"));
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(AddPurRetCont);
