import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from '../../../base/components/AntdComp';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
import SaleReturnAddComp from '../../components/SaleModule/SaleReturnAddComp';
import SaleReturnAddTableCont from '../../containers/SaleModule/SaleReturnAddTableCont';

class SaleReturnAddCont extends Component {
    constructor(props, context) {
        super(props, context);

}
    componentDidMount() {
        this.props.InitialSaleOrderList('');    // 来源订单列表
        this.props.CustomerList('', '', '', 1, 10);    // 客户列表
        this.props.ContactsList('', '', '', 1, 10);    // 联系人
        this.props.ReceiveAdrList(1, 1, '', '', 1, 10);    // 收货地址
        // this.props.SalesmanList('','',1, 10);     // 销售员
        this.props.SalesorgList(3, '', '', 1, 10);  // 销售组织
        // this.props.MaterialList('','');
        this.props.TakeDelOfAddressList(1, '', '', '', 1, 10);  //发货站点
    }
    render() {

        return (
            <div>
                <Spin spinning={this.props.saleReturnLoading}>
                    <SaleReturnAddComp {...this.props}
                                onOk={this.handleSubmit}
                                saleReturnDetailInfo={this.props.saleReturnDetailInfo.add}
                    />

                    {/*<SaleReturnAddTableCont {...this.props} 
                    saleReturnDetailInfo={this.props.saleReturnDetailInfo.add}
                    />*/}

                </Spin>
            </div>
        

        )
    }
}
SaleReturnAddCont.defaultProps = {
    title: "新增销售退货单信息",
    saleReturnDetailInfo:{},
    typePage: 'add',
    type: 'add',
}
const mapStateToProps = (state) => state.SaleReturnRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    InitialSaleOrderList: (saleOrderCode) => {
        return dispatch(SaleReturnAct.InitialSaleOrderList({saleOrderCode}))
    },
    OriginalOrderList: (saleOrderCode) => {
        return dispatch(SaleReturnAct.OriginalOrderList({saleOrderCode}));
    },
    // 获取来源销售订单详情
    SaleOrderDetail: (saleOrderCode, type) => {
        return dispatch(SaleReturnAct.SaleOrderDetail({saleOrderCode}, type));
    },
    MaterialFormList: (materialCode) => {
        return dispatch(SaleReturnAct.MaterialFormList(materialCode));
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
    SaleReturnDialogVisiable: () => { 
        return dispatch(SaleReturnAct.SaleReturnDialogVisiable(true, 'add')); 
    },
    SaleReturnDialogMaterialVisiable: () => {
        return dispatch(SaleReturnAct.SaleReturnDialogMaterialVisiable(true, 'add'));
    },  
    SaleReturnAddTableVisiable: (value, type) => {
        return dispatch(SaleReturnAct.SaleReturnAddTableVisiable(value, type));
    },
    Save: (data) => dispatch(SaleReturnAct.AddSaleReturn(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnAddCont);
