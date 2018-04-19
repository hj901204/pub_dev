/**
 * Created by MW on 2017/7/21.
 * 其他出库单详情页面
 */

import React, {Component} from 'react'
import OtherOutboundOrderDetailsTableComp from './OtherOutboundOrderDetailsTableComp'
import { formatNullStr } from '../../../base/consts/Utils';
import { Spin, Row, Col } from '../../../base/components/AntdComp'

class OtherOutboundOrderDetailsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInfo:'block',
            infoRemark: '收起',
        }
    }

    toggle = () => {
        this.state.displayInfo == 'none' ? this.setState({displayInfo:'block',infoRemark:'收起'}) : this.setState({displayInfo:'none',infoRemark:'显示'});
    };

    render() {
        return (
            /*样式在other-outbound-order文件里面*/
            <div className="other-outbound-order-details">
                <Spin spinning={this.props.loading}>
                    <div>
                        <div className="top">
                            <div className="header">信息总览：<span>{this.props.orderInfoData.orderCode}</span></div>
                            <div className="content">
                                状态：<span className="status" style={{'color':this.props.orderInfoData.status == 1 ? '#4C80CF':
                                (
                                    (this.props.orderInfoData.status == 2 || this.props.orderInfoData.status == 3) ? '#F6A623' :
                                        (
                                            (this.props.orderInfoData.status == 4 || this.props.orderInfoData.status == 5) ? '#417505' :
                                                '#D0011B'
                                        )
                                )
                            }}>
                                {this.props.orderInfoData.status?window.ENUM.getEnum("outDetailStatus", this.props.orderInfoData.status) :
                                    formatNullStr('')}
                                    </span>
                                发货站点：{formatNullStr(this.props.orderInfoData.shippingSiteName)}
                            </div>
                            <div className="lay-top" onClick={(e) => this.toggle(e)}>{this.state.infoRemark}</div>
                        </div>
                        <div className="info" style={{'display':this.state.displayInfo}}>
                            <div className="info-first">
                                <Row className="row-first">
                                    <Col className="col-left" span={8}>
                                        <div className="per-col">
                                            <span className="first-per-name">单据类型：</span>
                                            <span>
                                            {formatNullStr(this.props.orderInfoData.busName)}
                                        </span>
                                        </div>
                                        <div className="per-col">
                                            <span className="first-per-name">交货日期：</span>
                                            <span>
                                            {this.props.orderInfoData.deliveryDate ? this.props.orderInfoData.deliveryDate.match(/\d{4}\-\d{2}\-\d{2}/)[0]
                                                : formatNullStr('')}
                                        </span>
                                        </div>
                                        <div className="per-col">
                                            <span className="first-per-name">创建时间：</span>
                                            <span>
                                            {formatNullStr(this.props.orderInfoData.createDate)}
                                        </span>
                                        </div>
                                    </Col>
                                    <Col className="col-center" span={8}>
                                        <Row>
                                            <Col>
                                                <div className="per-col">
                                                    <span className="second-per-name">收货人：</span>
                                                    <span>
                                                    {formatNullStr(this.props.orderInfoData.bpFull)}
                                                </span>
                                                </div>
                                                <div className="per-col">
                                                    <span className="second-per-name">收货部门：</span>
                                                    <span>
                                                    {formatNullStr(this.props.orderInfoData.ownerDetpName)}
                                                </span>
                                                </div>
                                                <div className="per-col">
                                                    <span className="second-per-name">创建人：</span>
                                                    <span>
                                                    {formatNullStr(this.props.orderInfoData.createByName)}
                                                </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-right" span={8}>
                                        <div className="per-col-remarks">
                                            <span className="third-per-name">备注：</span>
                                            <span>
                                            {formatNullStr(this.props.orderInfoData.remarks )}
                                        </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <OtherOutboundOrderDetailsTableComp {...this.props} />
                </Spin>
            </div>

        )
    }

}

export default OtherOutboundOrderDetailsComp
