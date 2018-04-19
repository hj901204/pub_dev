/**
 * Created by MW on 2017/7/19.
 * 其他出库单_列表
 */

import React, {Component} from 'react'
import {Spin, message} from '../../../base/components/AntdComp'
import OtherOutboundOrderTableComp from './OtherOutboundOrderTableComp'
import OtherOutboundOrderSearchComp from './OtherOutboundOrderSearchComp'

class OtherOutboundOrderComp extends Component {
    constructor(props) {
        super(props)
    };

    componentDidMount(){
        this.props.getList({page:1,pageSize:10,sourceOrderType:15});
        this.props.getTypeList({billType:1});
    }

    render() {
        return(
            <div className="other-outbound-order">
                <Spin spinning={this.props.tableLoading}>
                    <OtherOutboundOrderSearchComp {...this.props}/>
                    <OtherOutboundOrderTableComp {...this.props}/>
                </Spin>
            </div>
        )
    }
}
export default OtherOutboundOrderComp
