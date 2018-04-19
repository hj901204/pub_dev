import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spin } from '../../../base/components/AntdComp';
import SaleOrderFormComp from '../../components/SaleModule/SaleOrderFormComp';
import SaleOrderAddTableCont from '../../containers/SaleModule/SaleOrderAddTableCont';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct'
class SaleOrderAddCont extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Spin spinning={this.props.saleOrderLoading}>
                    <SaleOrderFormComp {...this.props}
                        saleOrderInfo={this.props.orderAddDetail}
                    />
                </Spin>
            </div>
        )
    }
}
SaleOrderAddCont.defaultProps = {
    title: "新建销售订单",
    typePage: "addPageFlag",
}
const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    Save: (data) => dispatch(SaleOrderAct.AddSaleOrder(data)),
    MaterialList: (pm) => dispatch(SaleOrderAct.MaterialList(pm)),
    OrgList: (pm, type) => dispatch(SaleOrderAct.OrgList(pm, type)),
    ContactsList: (pm, type) => dispatch(SaleOrderAct.ContactsList(pm, type)),
    CustomersList: (pm, type) => dispatch(SaleOrderAct.CustomersList(pm, type)),
    CurrencyList: (pm, type) => dispatch(SaleOrderAct.CurrencyList(pm, type)),
    CategoryList: (pm, type) => dispatch(SaleOrderAct.CategoryList(pm, type)),
    InvaddressList: (pm, type) => dispatch(SaleOrderAct.InvaddressList(pm, type)),
    SiteList: (pm, type) => dispatch(SaleOrderAct.SiteList(pm, type)),
    ReceiveAddressList: (pm, type) => dispatch(SaleOrderAct.ReceiveAddressList(pm, type)),
    EmployeeList: (pm, type) => dispatch(SaleOrderAct.EmployeeList(pm, type)),//销售员
    GetEmployeeList: (pm, type) => dispatch(SaleOrderAct.GetEmployeeList(pm, type)),//销售员
    SaleOrderAddTableVisiable: (value,type) => dispatch(SaleOrderAct.SaleOrderAddTableVisiable(value,type)),
    changeMXVal: (amount, tax, totalAmount) => dispatch(SaleOrderAct.changeMXVal(amount, tax, totalAmount)),
    
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderAddCont);
