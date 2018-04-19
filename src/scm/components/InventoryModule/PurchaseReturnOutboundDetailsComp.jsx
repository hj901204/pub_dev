/**
 * Created by MW on 2017/4/24.
 * 采购退货单详情页面
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'
import PurchaseReturnOutboundDetailsInfoComp from './PurchaseReturnOutboundDetailsInfoComp'
import PurchaseReturnOutboundDetailsTableComp from './PurchaseReturnOutboundDetailsTableComp'

class PurchaseReturnOutboundDetailsComp extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div className="purchase-return-outbound-details">
                <Spin spinning={this.props.loading}>
                    <PurchaseReturnOutboundDetailsInfoComp {...this.props} />
                    <PurchaseReturnOutboundDetailsTableComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default PurchaseReturnOutboundDetailsComp