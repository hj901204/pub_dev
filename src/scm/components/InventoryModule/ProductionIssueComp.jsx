/**
 * Created by MW on 2017/4/20.
 * 生产领料单
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'

import ProductionIssueTableComp from './ProductionIssueTableComp'
import ProductionIssueSearchComp from './ProductionIssueSearchComp'
import ProductionIssueSiderDetailsComp from './ProductionIssueSiderDetailsComp'

class ProductionIssueComp extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        this.props.getList({page:1,pageSize:10,sourceOrderType:14});
    }

    render() {
        return(
            <div className="sales-store-house">
                <Spin spinning={this.props.tableLoading}>
                    <ProductionIssueSearchComp {...this.props} />
                    <ProductionIssueTableComp {...this.props} />
                    <ProductionIssueSiderDetailsComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default ProductionIssueComp