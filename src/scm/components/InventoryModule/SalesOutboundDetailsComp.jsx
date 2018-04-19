/**
 * Created by MW on 2017/4/24.
 * 销售出库单详情页面
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'
import SalesOutboundDetailsInfoComp from './SalesOutboundDetailsInfoComp'
import SalesOutboundDetailsTableComp from './SalesOutboundDetailsTableComp'

class SalesOutboundDetailsComp extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div className="sales-outbound-details">
                <Spin spinning={this.props.loading}>
                    <SalesOutboundDetailsInfoComp {...this.props} />
                    <SalesOutboundDetailsTableComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default SalesOutboundDetailsComp