//采购价格清单
import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import AddPurchasePriceComp from '../../components/OrderModule/AddPurchasePriceComp'; 
import AddPurPriceDetailTableComp from '../../components/OrderModule/AddPurPriceDetailTableComp';
import ImportViewCont from '../../dialogconts/OrderModule/ImportViewCont';

class AddPurchasePriceCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { AddPurchasePrice, tabRemove, PurchasePriceList } = this.props;
        AddPurchasePrice(data).then(json => {
            if (json.status == 2000) {
                message.success('新增成功');
                tabRemove();
                PurchasePriceList({ page: 1, pageSize: 10 });
            };
        });
    }
    render() {
        return (
            <div>
                <AddPurchasePriceComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    DetailTableComp={AddPurPriceDetailTableComp}
                />
                <ImportViewCont {...this.props}/>
            </div>    
        );
    }
}
AddPurchasePriceCont.defaultProps = {
    type: "add",
}
const mapStateToProps = (state) => state.PurchasePriceRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (data) => dispatch(PurchasePriceAct.AddPurchasePrice(data)),
    tabRemove: () => {
        dispatch(TabsAct.TabRemove("addPurchasePrice", "purchasePrice"));
    },
    PurchasePriceList: (pm) => dispatch(PurchasePriceAct.PurchasePriceList(pm)),
    PurPriceDialogVisiable: (type,dialogType) => dispatch(PurchasePriceAct.PurPriceDialogVisiable(true,type,dialogType)),
    SupplierList: (pm) => dispatch(PurchasePriceAct.SupplierList(pm, 'add')),
    CurList: (pm) => dispatch(PurchasePriceAct.CurList(pm, 'add')),
    CurDetail: (curCode) => dispatch(PurchasePriceAct.CurDetail({ curCode })),
    AddPurchasePrice: (pm) => dispatch(PurchasePriceAct.AddPurchasePrice(pm)),
    ImportViewVisiable:()=>{dispatch(PurchasePriceAct.ImportViewVisiable(true))},        
    PurchasePriceCheckStatus: (supplierCode) => dispatch(PurchasePriceAct.PurchasePriceCheckStatus({supplierCode})),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddPurchasePriceCont);