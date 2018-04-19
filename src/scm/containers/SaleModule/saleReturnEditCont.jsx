import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from '../../../base/components/AntdComp';
import SaleReturnEditComp from '../../components/SaleModule/SaleReturnEditComp';
import SaleReturnAddTableCont from '../../containers/SaleModule/SaleReturnAddTableCont';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';


class SaleReturnEditCont extends Component {
    constructor(props) {
        super(props);
    }

    initData = () => {
        // console.log('initData:');
        // console.log(this.props.edit.saleReturnCode);
        this.props.SaleReturnDetail(this.props.edit.saleReturnCode, "edit");
    };

    
    render() {
        return (
            <div>
                <Spin spinning={this.props.saleReturnLoading}>
                    <SaleReturnEditComp  {...this.props}
                        initData={this.initData}
                        saleReturnDetailInfo={this.props.saleReturnDetailInfo.edit} />
                </Spin>
            </div>
        )
    }
}
SaleReturnEditCont.defaultProps = {
    title: "编辑销售退货单",
    typePage: 'edit',
    type: 'edit'
}

const mapStateToProps = (state) => state.SaleReturnRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    SaleOrderDetail: (saleOrderCode, type) => {
        return dispatch(SaleReturnAct.SaleOrderDetail({saleOrderCode}, type));
    },
    SaleReturnDetail: (saleReturnCode, flag) => dispatch(SaleReturnAct.SaleReturnDetail({saleReturnCode}, flag)),
  
    GetSaleReturn: (saleReturnCode, flag) => dispatch(SaleReturnAct.GetSaleReturn(saleReturnCode, flag)),

    OriginalOrderList: (saleOrderCode) => {
        return dispatch(SaleReturnAct.OriginalOrderList({saleOrderCode}));
    },
    
    MaterialList: (pm) => {
        return dispatch(SaleReturnAct.MaterialList(pm));
    },
    CustomerList: (customerCode, customerFull, customerAbt, page, pageSize) => {
        return dispatch(SaleReturnAct.CustomerList({customerCode, customerFull, customerAbt, page, pageSize}))
    },
    // bpCode 合作伙伴编码(即客户编码或供应商编码
    ContactsList: (bpCode, contactsCode, contactsName, page, pageSize ) => {
        return dispatch(SaleReturnAct.ContactsList({bpCode, contactsCode, contactsName, page, pageSize}));
    },
    // status, 状态 0：保存  1：启用  2：禁用 isSog 筛选仓储的站点
    ReceiveAdrList: (isSog, status, siteCode, siteName, page, pageSize) => {
        return dispatch(SaleReturnAct.ReceiveAdrList({isSog, status, siteCode, siteName, page, pageSize}));
    },
    SalesmanList: (deptCode, employeeCode, page, pageSize) => {
        return dispatch(SaleReturnAct.SalesmanList({deptCode, employeeCode, page, pageSize}));
    },
    SalesorgList: (orgType, orgCode, orgName, page, pageSize) => {
        return dispatch(SaleReturnAct.SalesorgList({orgType, orgCode, orgName, page, pageSize}));
    },
    // isSog是否为发货地址，1是0否
    TakeDelOfAddressList: (isSog, bpCode, addressCode, addressName, page, pageSize) => {
        return dispatch(SaleReturnAct.TakeDelOfAddressList({isSog, bpCode, addressCode, addressName, page, pageSize}))
    },
    // SaleReturnDialogVisiable: () => { 
    //     return dispatch(SaleReturnAct.SaleReturnDialogVisiable(true, 'edit')); 
    // },
     SaleReturnAddTableVisiable: (value, type) => {
        return dispatch(SaleReturnAct.SaleReturnAddTableVisiable(value, type));
    },
    Save: (data) => dispatch(SaleReturnAct.UpdateSaleReturn(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnEditCont);
