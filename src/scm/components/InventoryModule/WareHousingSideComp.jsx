import React, { Component } from 'react'
import Sidebar from '../../../base/components/SidebarWrapComp';
/*import MTable from '../../../base/components/TableComp';*/
import { Spin } from '../../../base/components/AntdComp'
class WareHousingSideComp extends Component {
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
                <Sidebar className="purchase-sideber" maskClosable={true} side_visible={newState.side_visible} onClose={this.closeSideBar} >
                    <Spin spinning={this.props.newState.openSideBarLoading}>
                        <div className="purchase-order-detail">
                            <h3>生产订单详情界面 </h3>
                            <span className="purchase-choose-x" onClick={this.closeSideBar}>X</span>
                        </div>
                        <div className="bold-line-ground"></div>
                        <div className="production-side">
                            <div className="production-side-left">
                            <p className="production-side-list"><span className="sidbar-base-order-name">订单编号：</span><span>{info.orderCode}</span></p>
                            <p className="production-side-list">订单类型：<span>{info.orderType? window.ENUM.getEnum("newProductionType", info.orderType): ''}</span></p>
                            <p className="production-side-list"><span>单据来源：</span><span>{info.orderSource ? window.ENUM.getEnum("newProductionSorType", info.orderSource) : ''}</span></p>
                            <p className="production-side-list">产品编码：<span>{info.productCode}</span></p>
                            <p className="production-side-list">产品名称：<span>{info.productName}</span></p>
                            <p className="production-side-list">生产数量：<span>{info.productionNumber}</span></p>
                            <p className="production-side-list">预设仓库：<span>{info.presetDepotName}</span></p>
                            </div>
                            <div className="production-side-right">
                                 <p className="production-side-list"><span className="production-time production-time-title">计划开始时间</span><span className="production-time">{info.plannedStartDate}</span></p>
                                 <div className="start-img"></div>
                                 <p className="production-side-list"><span className="production-time production-time-title">计划结束时间</span><span className="production-time">{info.plannedEndDate}</span></p>
                            </div>
                        </div>
                    </Spin>
                </Sidebar>
            </div>

        )
    }
}

export default WareHousingSideComp



