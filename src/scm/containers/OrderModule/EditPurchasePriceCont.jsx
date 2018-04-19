import React, { Component } from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import TabsAct from '../../actions/TabsAct';
import EditPurchasePriceComp from '../../components/OrderModule/EditPurchasePriceComp';
import EditPurPriceDetailTableComp from '../../components/OrderModule/EditPurPriceDetailTableComp';
import ImportViewCont from '../../dialogconts/OrderModule/ImportViewCont';

class EditPurchasePriceCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    initData = () => {
        let { PurchasePriceDetail } = this.props;
        let { current } = this.props.edit;
        if ( current ) {
            PurchasePriceDetail(current);
        }
    }

    handleSubmit = (data) => {
        let {EditPurchasePrice,tabRemove,PurchasePriceList} = this.props;
        EditPurchasePrice(data).then(json => {
            if (json.status === 2000) {
                message.success('编辑成功');
                tabRemove();
                PurchasePriceList({ page: 1, pageSize: 10 });
            }
        })
    }

    render() {
        return (
            <div>
                <EditPurchasePriceComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                    DetailTableComp={EditPurPriceDetailTableComp}
                />
                <ImportViewCont {...this.props}/>
            </div>
        );
    }
}

EditPurchasePriceCont.defaultProps = {
    type: "edit",
}
const mapStateToProps = (state) => {
    return state.PurchasePriceRedu.toJS();
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    PurchasePriceDetail: (orderCode) => dispatch(PurchasePriceAct.PurchasePriceDetail({ orderCode })),
    SupplierList: (pm) => dispatch(PurchasePriceAct.SupplierList(pm, 'edit')),
    CurList: (pm) => dispatch(PurchasePriceAct.CurList(pm, 'edit')),
    CurDetail: (curCode) => dispatch(PurchasePriceAct.CurDetail({ curCode })),
    PurPriceDialogVisiable: (type, dialogType) => dispatch(PurchasePriceAct.PurPriceDialogVisiable(true, type, dialogType)),
    EditPurchasePrice: (pm) => dispatch(PurchasePriceAct.EditPurchasePrice(pm)),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("editPurchasePrice", "purchasePrice"));
    },
    PurchasePriceList: (pm) => dispatch(PurchasePriceAct.PurchasePriceList(pm)),
    ImportViewVisiable:()=>{dispatch(PurchasePriceAct.ImportViewVisiable(true))},            
    PurchasePriceCheckStatus: (supplierCode) => dispatch(PurchasePriceAct.PurchasePriceCheckStatus({supplierCode})),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditPurchasePriceCont);
