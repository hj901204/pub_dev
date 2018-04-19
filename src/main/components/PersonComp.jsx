import React, { Component } from 'react';
import  { Row ,Col } from '../../base/components/AntdComp'

class PersonPageComp extends Component {


    render() {
        return (
            <div className="person">
                <div className="banner"></div>
                <div className="main">
                    <div className="leftmain">
                        <div className="leftmaintop">
                            <Row>
                                <Col span={12}>
                                    <span className="spanone">我的待办</span>
                                    <span className="spantwo">(共4条)</span>
                                </Col>
                                <Col span={13}>更多>></Col>
                            </Row>
                            <Row>
                                <Col span={5}><span className="spanfive">1. 请假申请</span></Col>
                                <Col span={6}>
                                    <span className="spansix">曹操</span>
                                    <span className="spansix">2016/12/30</span>
                                    <span className="spansix">07 : 30</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}><span className="spanfive">1. 请假申请</span></Col>
                                <Col span={6}>
                                    <span className="spansix">曹操</span>
                                    <span className="spansix">2016/12/30</span>
                                    <span className="spansix">07 : 30</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}><span className="spanfive">1. 请假申请</span></Col>
                                <Col span={6}>
                                    <span className="spansix">曹操</span>
                                    <span className="spansix">2016/12/30</span>
                                    <span className="spansix">07 : 30</span>
                                </Col>
                            </Row>

                        </div>
                        <div className="leftmainbottom">
                            <Row>
                                <Col span={22}>
                                    <span className="spanone">待处理订单</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={7}></Col>
                                <Col span={8}>
                                    <span className="">待处理采购订单</span><span className="spantwo">100</span>
                                </Col>
                                <Col span={17}></Col>
                                <Col span={8}>
                                    <span>待处理销售订单</span><span className="spantwo">100</span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="rightmain">
                        <Row>
                            <Col span={12}>
                                <span className="spanone">未读提醒</span>
                                <span className="spantwo">(共4条)</span>
                            </Col>
                            <Col span={13}>历史>></Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={1}>
                                <div className="dian"></div>
                                <span className="spansix">张飞</span>
                                <span className="spansix">提醒您麻烦请尽快处理我的申请</span>
                            </Col>
                            <Col span={2}>申请调休</Col>
                            <Col span={3}>
                                <span className="spansix">2016/12/30</span>
                                <span className="spansix">07 : 30</span>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        );
    }
}

export default PersonPageComp;