import React, { Component } from 'react';
import {connect} from 'react-redux';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
import SaleReturnDetailComp from '../../components/SaleModule/SaleReturnDetailComp';

class SaleReturnDetailCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    initData = () => {
        this.props.SaleReturnDetail(this.props.detail.saleReturnCode,  "detail")
    };

    render() {
        const {tabLoading, ...props} = this.props;
        return (
            <div>
                <div className="saleReturnDetail-content">
                    <SaleReturnDetailComp
                        {...this.props}
                        initData={this.initData}
                        loading={tabLoading}
                        saleReturnDetailInfo={this.props.saleReturnDetailInfo.detail}
                    />
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => state.SaleReturnRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    SaleReturnDetail: (saleReturnCode, flag) => dispatch(SaleReturnAct.SaleReturnDetail({saleReturnCode}, flag)),
    GetSaleReturn: (saleReturnCode, flag) => dispatch(SaleReturnAct.GetSaleReturn(saleReturnCode, flag)),
    UpdateSaleReturn:(saleReturnCode, status)=> dispatch(SaleReturnAct.UpdateSaleReturn({saleReturnCode, status})),
    SubmitSaleReturn: (saleReturnCode) => dispatch(SaleReturnAct.SubmitSaleReturn({saleReturnCode})),
    RecallSaleReturn: (saleReturnCode) => dispatch(SaleReturnAct.RecallSaleReturn({saleReturnCode})),
    CloseSaleReturn: (saleReturnCode) => dispatch(SaleReturnAct.CloseSaleReturn({saleReturnCode})),
    PushSaleReturn: (saleReturnCode) => dispatch(SaleReturnAct.PushSaleReturn({saleReturnCode})),
    CheckLockingStatus: (saleReturnCode) => dispatch(SaleReturnAct.CheckLockingStatus({saleReturnCode})),

})
export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnDetailCont);
