import React, { Component } from 'react'
import Sidebar from '../../../base/components/SidebarWrapComp';
import MTable from '../../../base/components/TableComp';
import { Spin } from '../../../base/components/AntdComp'
let columns = [{
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
}, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
}, {
    title: '规格',
    dataIndex: 'materialSpec',
    key: 'materialSpec',
}, {
    title: '型号',
    dataIndex: 'materialModel',
    key: 'materialModel',
}, {
    title: '计划数',
    dataIndex: 'returnNumber',
    key: 'returnNumber',
}, {
    title: '基本单位',
    dataIndex: 'measureUnitName',
    key: 'measureUnitName',
}

];
class ProductionSideComp extends Component {
    constructor(props, context) {
        super(props, context)
    }
    closeSideBar = () => {
        this.props.openSideBar(false);
    }
    closeSideBarSub = () => {
        this.props.openSideBarSub(false);
    }
    render() {
        let { newState, ...props} = this.props;
        let info = newState.openSideBarList || '';
        return (
            <div className="purchase-sidebar-content">
                <Sidebar className="purchase-sideber" maskClosable={true} side_visible={newState.side_visible} onClose={this.closeSideBar}>
                    <Spin spinning={this.props.newState.openSideBarLoading}>
                        <div className="purchase-order-detail">
                            <h3>生产退料申请单详情界面 </h3>
                            <span className="purchase-choose-x" onClick={this.closeSideBar}>X</span>
                        </div>
                        <div className="bold-line-ground"></div>
                        <div className="sidebar-content">
                            <div className="sidbar-base-info">
                                <h3>常规信息</h3>
                                <div className="sidbar-base-item">
                                    <p><span className="sidbar-base-order-name">单据号：</span><span>{info.returnCode}</span></p>
                                    <p><span>单据类型：</span><span>{this.props.newState.openSideBarLoading == true ? '' : '生产退料申请单'}</span></p>
                                </div>
                            </div>
                            <div className="sidebar-normal-info">
                                <h3>退料信息</h3>
                                <div className="sidebar-production-item">
                                    <div className="production-side-return-left">
                                        <p><span className="production-side-distance">退料人：</span><span>{info.empName}</span></p>
                                        <p>退料组织：<span>{info.deptName}</span></p>
                                    </div>
                                    <div className="production-side-return-right">
                                        <p className="details-remark">备注：<span className="production-remark">{info.remarks}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="purchase-order-base-info">
                            <h3>订单信息</h3>
                        </div>
                        <MTable
                            cols={columns}
                            rowKey={"id"}
                            dataSource={newState.dataSourceSide}
                            loading={newState.tableLoading}
                            {...props}
                        />
                    </Spin>
                </Sidebar>
            </div>
        )
    }
}


export default ProductionSideComp



