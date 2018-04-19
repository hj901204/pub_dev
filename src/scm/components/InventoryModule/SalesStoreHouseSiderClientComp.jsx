/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from 'react'
/*import {Spin} from '../../../base/components/AntdComp'*/
import Sidebar from '../../../base/components/SidebarWrapComp'

class SalesStoreHouseSiderClientComp extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Sidebar className="purchase-sideber" maskClosable={true} side_visible={this.props.sideClient} onClose={() => this.props.sidebarVisible('sideClient',false)}>
                    <div className="sider-client">
                        <div className="title">
                            <span>客户详情页面</span>
                            <span className="close" onClick={() => this.props.sidebarVisible('sideClient',false)}>X</span>
                        </div>
                        <div className="content">
                            <div className="per-row">
                                <span className="head">客户编码：</span>
                                <span>{this.props.clientData.bpCode}</span>
                            </div>
                            <div className="per-row">
                                <span className="head">客户名称：</span>
                                <span>{this.props.clientData.bpFull}</span>
                            </div>
                            <div className="per-row">
                                <span className="head">联系人：</span>
                                <span>{this.props.clientData.ownerName}</span>
                            </div>
                            <div className="per-row">
                                <span className="head">联系电话：</span>
                                <span>{this.props.clientData.ownerTel}</span>
                            </div>
                            {/*<div className="per-row">*/}
                                {/*<span className="head">地址：</span>*/}
                                {/*<span>{this.props.clientData.deliveryAddressDetl}</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Sidebar>
            </div>
        )
    }
}

export default SalesStoreHouseSiderClientComp