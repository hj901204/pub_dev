/**
 * Created by MW on 2017/4/20.
 * 销售出库单
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'

import SalesStoreHouseTableComp from './SalesStoreHouseTableComp'
import SalesStoreHouseSearchComp from './SalesStoreHouseSearchComp'
import SalesStoreHouseSiderDetailsComp from './SalesStoreHouseSiderDetailsComp'
import SalesStoreHouseSiderClientComp from './SalesStoreHouseSiderClientComp'

class SalesStoreHouseComp extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        this.props.getList({page:1,pageSize:10,sourceOrderType:12});
    }

    render() {
        return(
            <div className="sales-store-house">
                <Spin spinning={this.props.tableLoading}>
                    <SalesStoreHouseSearchComp {...this.props} />
                    <SalesStoreHouseTableComp {...this.props} />
                    <SalesStoreHouseSiderDetailsComp {...this.props} />
                    <SalesStoreHouseSiderClientComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default SalesStoreHouseComp