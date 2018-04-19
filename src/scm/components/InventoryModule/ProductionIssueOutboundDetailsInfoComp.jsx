/**
 * Created by MW on 2017/4/24.
 */
import React, {Component} from 'react'
import { Row, Col } from '../../../base/components/AntdComp';
import { formatNullStr } from '../../../base/consts/Utils';

class ProductionIssueOutboundDetailsInfoComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInfo:'block',
            infoRemark: '收起',
            displayRemark:'none',
            RemarkContent:'显示',
        }
    }

    toggle = (e) => {
        if(e.target.id){
            this.state.displayRemark == 'none' ? this.setState({displayRemark:'block',RemarkContent:'收起'}) : this.setState({displayRemark:'none',RemarkContent:'显示'});
        } else {
            this.state.displayInfo == 'none' ? this.setState({displayInfo:'block',infoRemark:'收起'}) : this.setState({displayInfo:'none',infoRemark:'显示',displayRemark:'none',RemarkContent:'显示'});
        }

    };
    render () {
        return(
            <div>
                <div className="top">
                    <div className="header">信息总览：<span>{this.props.dataSource.orderCode}</span></div>
                    <div className="content">
                        状态：<span className="status" style={{'color':this.props.dataSource.status == 1 ? '#4C80CF':
                        (
                            (this.props.dataSource.status == 2 || this.props.dataSource.status == 3) ? '#F6A623' :
                                (
                                    (this.props.dataSource.status == 4 || this.props.dataSource.status == 5) ? '#417505' :
                                        '#D0011B'
                                )
                        )
                    }}>
                        {this.props.dataSource.status?window.ENUM.getEnum("outDetailStatus", this.props.dataSource.status) :
                            formatNullStr('')}
                            </span>
                        发货站点：{formatNullStr(this.props.dataSource.shippingSiteName)}
                    </div>
                    <div className="lay-top" onClick={(e) => this.toggle(e)}>{this.state.infoRemark}</div>
                </div>
                <div className="info" style={{'display':this.state.displayInfo}}>
                    <div className="info-first">
                        <Row className="row-first">
                            <Col className="col-left" span={8}>
                                <Row>
                                    <Col>
                                        <h3 className="public-title">基本信息</h3>
                                    </Col>
                                </Row>
                                <div className="per-col">
                                    <span className="first-per-name">源单据号：</span>
                                    <span>
                                        {formatNullStr(this.props.dataSource.sourceOrderCode )}
                                    </span>
                                </div>
                                <div className="per-col">
                                    <span className="first-per-name">源单据类型：</span>
                                    <span>
                                        {this.props.dataSource.sourceOrderType?window.ENUM.getEnum("billType", this.props.dataSource.sourceOrderType) : formatNullStr('')}
                                    </span>
                                </div>
                            </Col>
                            <Col className="col-center" span={8}>
                                <Row>
                                    <Col>
                                        <h3 className="public-title">源单信息</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="per-col">
                                            <span className="second-per-name">领料人：</span>
                                            <span>
                                                {formatNullStr(this.props.dataSource.ownerName)}
                                            </span>
                                        </div>
                                        <div className="per-col">
                                            <span className="second-per-name">领料组织：</span>
                                            <span>
                                                {formatNullStr(this.props.dataSource.ownerDetpName)}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-right" span={8}>
                                <Row>
                                    <Col className="public-title">
                                        <h3 className="public-title">其他</h3>
                                    </Col>
                                </Row>
                                <div className="per-col">
                                    <span className="third-per-name">创建人：</span>
                                    <span>
                                            {formatNullStr(this.props.dataSource.createByName)}
                                    </span>
                                </div>
                                <div className="per-col">
                                    <span className="third-per-name">创建时间：</span>
                                    <span>
                                            {formatNullStr(this.props.dataSource.createDate)}
                                    </span>
                                </div>
                                <div className="lay-aside" id="remark" onClick={(e) => this.toggle(e)}>
                                    {this.state.RemarkContent}更多隐藏信息
                                </div>
                            </Col>
                        </Row>
                        <Row className="row-second" style={{'display':this.state.displayRemark}}>
                            <Col>
                                <div className="info-remark">
                                    <span className="first-name"> 源单据备注：</span>
                                    <span className="remark-content">
                                       {formatNullStr(this.props.dataSource.sourceRemark)}
                                    </span>
                                </div>
                                <div className="info-remark per-col">
                                    <span className="first-name" span={2}>
                                        备注：
                                    </span>
                                    <span className="remark-content">
                                        {formatNullStr(this.props.dataSource.remarks)}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductionIssueOutboundDetailsInfoComp