import React, { Component } from "react";
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import {Spin } from '../../../base/components/AntdComp';
import SaleOrderDetailComp from '../../Components/SaleModule/SaleOrderDetailComp';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct';
class SaleOrderDetailCont extends Component {
    constructor(props) {
        super(props);
    }
    initData = () => {
        this.props.SaleOrderDetail(this.props.orderDetail.saleOrderCode,"detail")
    };
    render() {
        return (
            <div className="saleOrderDetail-content">
                <Spin spinning={this.props.saleOrderLoading}>
                    <SaleOrderDetailComp
                        {...this.props}
                        initData={this.initData}
                        saleOrderDetail={this.props.saleOrderDetail}
                    />
                </Spin>
            </div>
        )
    }
}
const mapStateToProps = (state) => state.SaleOrderRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    SaleOrderDetail: (saleOrderCode,flag) => dispatch(SaleOrderAct.SaleOrderDetail({ saleOrderCode ,flag})),
    SubmitSaleOrder: (saleOrderCode) => dispatch(SaleOrderAct.SubmitSaleOrder({ saleOrderCode })),
    RecallSaleOrder: (saleOrderCode) => dispatch(SaleOrderAct.RecallSaleOrder({ saleOrderCode })),
    CloseSaleOrder: (saleOrderCode) => dispatch(SaleOrderAct.CloseSaleOrder({ saleOrderCode })),
    PushSaleOrder: (saleOrderCode) => dispatch(SaleOrderAct.PushSaleOrder({ saleOrderCode })),
    SetSaleOrderEdit:(saleOrderCode) => dispatch(SaleOrderAct.SetSaleOrderEdit({saleOrderCode})),
    CheckLockingStatus:(saleOrderCode) => dispatch(SaleOrderAct.CheckLockingStatus({saleOrderCode})),
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderDetailCont);