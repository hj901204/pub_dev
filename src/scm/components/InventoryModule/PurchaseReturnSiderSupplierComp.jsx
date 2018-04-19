/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from 'react'
import Sidebar from '../../../base/components/SidebarWrapComp'

class PurchaseReturnSiderClientComp extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Sidebar className="purchase-sideber" maskClosable={true} side_visible={this.props.sideSupplier} onClose={() => this.props.sidebarVisible('sideSupplier',false)}>
                    <div className="sider-client">
                        <div className="title">
                            <span>供应商详情页面</span>
                            <span className="close" onClick={() => this.props.sidebarVisible('sideSupplier',false)}>X</span>
                        </div>
                        <div className="content">
                            <div className="per-row">
                                <span className="head">供应商编号：</span>
                                <span>{this.props.supplierData.bpCode}</span>
                            </div>
                            <div className="per-row">
                                <span className="head">供应商名称：</span>
                                <span>{this.props.supplierData.bpFull}</span>
                            </div>
                            <div className="per-row">
                                <span className="head">联系人：</span>
                                <span>{this.props.supplierData.ownerName}</span>
                            </div>
                            <div className="per-row">
                                <span className="head">联系电话：</span>
                                <span>{this.props.supplierData.ownerTel}</span>
                            </div>
                            {/*<div className="per-row">*/}
                                {/*<span className="head">地址：</span>*/}
                                {/*<span>{this.props.supplierData.deliveryAddressDetl}</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Sidebar>
            </div>
        )
    }
}

export default PurchaseReturnSiderClientComp