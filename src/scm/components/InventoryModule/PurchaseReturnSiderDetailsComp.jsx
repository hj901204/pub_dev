/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'
import Sidebar from '../../../base/components/SidebarWrapComp'
import MTable from '../../../base/components/TableComp'

let columns = [
    {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode'
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName'
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec'
    }, {
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel'
    }, {
        title: '计划数量',
        dataIndex: 'orderNumber',
        key: 'orderNumber'
    }, {
        title: '基本单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName'
    }
];

class PurchaseReturnSiderSupplierComp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Sidebar className="purchase-sideber" maskClosable={true} side_visible={this.props.sideDetails} onClose={() => this.props.sidebarVisible('sideDetails',false)}>
                    <Spin spinning={this.props.detailsLoading}>
                        <div className="sider-details">
                            <div className="title">
                                <span>采购退货单详情界面</span>
                                <span className="close" onClick={() => this.props.sidebarVisible('sideDetails',false)}>X</span>
                            </div>
                            <div className="content">
                                <div className="first-floor">
                                    <h3 className="public-title"><span className="line"></span>常规信息</h3>
                                    <div className="per-row">
                                        <span className="head">单据号：</span>
                                        <span>{this.props.purchaseDetails.returnCode}</span>
                                    </div>
                                    <div className="per-row">
                                        <span className="head">单据类型：</span>
                                        <span>采购退货单</span>
                                    </div>
                                </div>
                                <div className="second-floor">
                                    <h3 className="public-title"><span className="line"></span>供应商信息</h3>
                                    <div className="content">
                                        <div className="left">
                                            <div className="per-row">
                                                <span className="head">供应商：</span>
                                                <span className="remark">{this.props.purchaseDetails.supplierName}</span>
                                            </div>
                                            <div className="per-row">
                                                <span className="head">收货地址：</span>
                                                <span className="remark">{this.props.purchaseDetails.receivingAddressName}</span>
                                            </div>
                                            <div className="per-row">
                                                <span className="head">备注：</span>
                                                <span className="remark">{this.props.purchaseDetails.remarks}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="per-row">
                                                <span className="head">联系人：</span>
                                                <span className="remark">{this.props.purchaseDetails.contactsName}</span>
                                            </div>
                                            <div className="per-row">
                                                <span className="head">电话：</span>
                                                <span className="remark">{this.props.purchaseDetails.contactsTel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="third-floor">
                                    <h3 className="public-title"><span className="line"></span>订单信息</h3>
                                    <div>
                                        <MTable rowKey={"id"} cols={columns} dataSource={this.props.purchaseDetails.list}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Spin>
                </Sidebar>
            </div>
        )
    }
}

export default PurchaseReturnSiderSupplierComp