import React, { Component } from "react";
import SalesReturnListComp from '../../components/InventoryModule/SalesReturnListComp';
import { connect } from 'react-redux'
import SalesReturnListAct from '../../actions/InventoryModule/SalesReturnListAct';
import TabsAct from '../../actions/TabsAct'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'
import CustomerAct from '../../actions/RenterModule/CustomerAct'
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
class SalesReturnListCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let {newState} = this.props;
        return (
            <div>
                <SalesReturnListComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        newState: state.SalesReturnListRedu.toJS(),
    }
};
const mapDispatchToProps = (dispatch) => ({
    //    openSideBar:(value,pmCode)=>{
    //        if(pmCode){
    //           dispatch(SalesReturnListAct.openSideBar(value,pmCode))
    //        }else{
    //           dispatch(SalesReturnListAct.openSideBar(value))
    //        }

    //     },
    //   openSideBarSub:(value,pmCode)=>{
    //       if(pmCode){
    //         dispatch(SalesReturnListAct.openSideBarSub(value,pmCode))
    //       }else{
    //         dispatch(SalesReturnListAct.openSideBarSub(value))
    //       }
    //     },
    openSideBarSub: (pmCode) => {
        dispatch(TabsAct.TabAdd({ title: '客户详情', key: 'customerViewCont' }));
        dispatch(CustomerAct.getCustomerData(pmCode, 'detail'));
        dispatch(CustomerAct.ContactList({ bpCode: pmCode.customerCode, page: 1, pageSize: 10 }));
        dispatch(CustomerAct.CustomerBaseLoading(true));
    },
    openSideBar: (pmCode) => {
        dispatch(SaleReturnAct.GetSaleReturn(pmCode, 'detail'));
        dispatch(TabsAct.TabAdd({ title: "销售退货单详情", key: "saleReturnDetail" }));
    },
    newCreate: () => {
        dispatch(TabsAct.TabAdd({ title: '新建销售退货入库单', key: 'inventoryAddReturnSalesListCont' }));
    },
    receiptDetails: (pm) => {
        dispatch(TabsAct.TabAdd({ title: '销售退货入库单详情', key: 'inventorySalesReturnDetailsCont' }));
        dispatch(SalesReturnListAct.details(pm))
    },
    takeOrderDelete: (pm) => {
        return dispatch(SalesReturnListAct.takeOrderDelete({ orderCode: pm }))
    },
    PurchaseList: (pm) => {
        dispatch(SalesReturnListAct.PurchaseList(pm))
    },
    GetIslock: (val) => dispatch(SalesReturnListAct.GetIslock({ orderCode: val })),
    takeBtnLoading: () => {
        dispatch(SalesReturnListAct.btnLoading(true))
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({ businessIndex: 25 })),
})
export default connect(mapStateToProps, mapDispatchToProps)(SalesReturnListCont)


