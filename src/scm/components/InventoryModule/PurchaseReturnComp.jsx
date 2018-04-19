/**
 * Created by MW on 2017/4/20.
 * 采购退货出库单
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'

import PurchaseReturnTableComp from './PurchaseReturnTableComp'
import PurchaseReturnSearchComp from './PurchaseReturnSearchComp'
import PurchaseReturnSiderDetailsComp from './PurchaseReturnSiderDetailsComp'
import PurchaseReturnSiderSupplierComp from './PurchaseReturnSiderSupplierComp'

class PurchaseReturnHouseComp extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        this.props.getList({page:1,pageSize:10,sourceOrderType:31});
    }

    render() {
        return(
            <div className="sales-store-house">
                <Spin spinning={this.props.tableLoading}>
                    <PurchaseReturnSearchComp {...this.props} />
                    <PurchaseReturnTableComp {...this.props} />
                    <PurchaseReturnSiderDetailsComp {...this.props} />
                    <PurchaseReturnSiderSupplierComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default PurchaseReturnHouseComp