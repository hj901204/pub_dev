/**
 * Created by MW on 2017/4/24.
 * 生产发料单详情页面
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'
import ProductionIssueOutboundDetailsInfoComp from './ProductionIssueOutboundDetailsInfoComp'
import ProductionIssueOutboundDetailsTableComp from './ProductionIssueOutboundDetailsTableComp'

class ProductionIssueOutboundDetailsComp extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div className="product-issue-outbound-details">
                <Spin spinning={this.props.loading}>
                    <ProductionIssueOutboundDetailsInfoComp {...this.props} />
                    <ProductionIssueOutboundDetailsTableComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default ProductionIssueOutboundDetailsComp