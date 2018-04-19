import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spin } from '../../../base/components/AntdComp';
import SaleOrderEditComp from '../../components/SaleModule/SaleOrderEditComp';
import SaleOrderAddTableCont from '../../containers/SaleModule/SaleOrderAddTableCont';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct'

class SaleOrderEditCont extends Component {
    constructor(props) {
        super(props);

    }
    initData = () => {
        this.props.SaleOrderDetail(this.props.orderEdit, "edit")
    };
    render() {
        return (
            <div>
                <Spin spinning={this.props.saleOrderLoading}>
                    <SaleOrderEditComp {...this.props}
                        initData={this.initData}
                        saleOrderInfo={this.props.orderEditDetail} />
                </Spin>
            </div>
        )
    }
}
SaleOrderEditCont.defaultProps = {
    title: "编辑销售订单",
    typePage: 'edit'
}
const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    SaleOrderDetail: (saleOrderCode, type) => dispatch(SaleOrderAct.SaleOrderDetail(saleOrderCode, type)),
    OrgList: (pm, type) => dispatch(SaleOrderAct.OrgList(pm , type)),
    ContactsList: (pm , type) => dispatch(SaleOrderAct.ContactsList(pm, type  )),
    CustomersList: (pm, type) => dispatch(SaleOrderAct.CustomersList(pm, type)),
    CurrencyList: (pm, type) => dispatch(SaleOrderAct.CurrencyList(pm, type )),
    CategoryList: (pm, type) => dispatch(SaleOrderAct.CategoryList(pm, type)),
    InvaddressList: (pm, type) => dispatch(SaleOrderAct.InvaddressList(pm, type)),
    SiteList: (pm, type) => dispatch(SaleOrderAct.SiteList(pm, type)),
    ReceiveAddressList: (pm, type)   => dispatch(SaleOrderAct.ReceiveAddressList(pm, type)),
    EmployeeList: (pm, type) => dispatch(SaleOrderAct.EmployeeList(pm, type)),//销售员
    // onChange:(data) => dispatch(SaleOrderAct.onChange({data})),
    Save: (data) => dispatch(SaleOrderAct.UpdateSaleOrder(data)),
    MaterialList: (pm) => dispatch(SaleOrderAct.MaterialList(pm)),
    GetEmployeeList: (pm, type) => dispatch(SaleOrderAct.GetEmployeeList(pm, type)),//销售员
    SaleOrderAddTableVisiable: (value,type) => dispatch(SaleOrderAct.SaleOrderAddTableVisiable(value,type)),
    changeMXValEdit: (amount, tax, totalAmount) => dispatch(SaleOrderAct.changeMXValEdit(amount, tax, totalAmount)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderEditCont);