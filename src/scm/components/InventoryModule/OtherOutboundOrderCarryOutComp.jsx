/**
 * Created by MW on 2017/7/20.
 * 其它出库单执行
 */
import React, {Component} from 'react'
import {Menu, Dropdown, Button, Popconfirm, Input, Spin,Form, Row, Col, Icon,Tabs} from '../../../base/components/AntdComp'
import OtherOutboundOrderCarryOutOrderInfoComp from './OtherOutboundOrderCarryOutOrderInfoComp'
import OtherOutboundOrderCarryOutDistributionInfoComp from './OtherOutboundOrderCarryOutDistributionInfoComp'
import OtherOutboundOrderCarryOutAllotDigCont from '../../dialogconts/InventoryModule/OtherOutboundOrderCarryOutAllotDigCont'
import { formatNullStr } from '../../../base/consts/Utils';

let TabPane = Tabs.TabPane,
    FormItem = Form.Item;

class OtherOutboundOrderCarryOut extends Component {
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

    tabChange = (key) => {
        if(key == '1') {
            this.props.getOrderInfo({page:1,pageSize:10,outCode:this.props.orderCode});
        } else if(key == '2'){
            this.props.getAllocateInfo({page:1,pageSize:10,outCode:this.props.orderCode,isFlag: 0,status: 0});
        }
    };

    shipping = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.shipping(Object.assign({orderCode:this.props.orderCode},values));
            }
        })
    };

    render() {

        return (
            /*样式在other-outbound-order文件*/
            <div className="other-outbound-order-carry-out">
                <Spin spinning={this.props.loading}>
                    <Form>
                        <div>
                            <div className="top">
                                <Row className="row-first">
                                    <Col span={21}>
                                        <h3 className="public-name">信息总览：{formatNullStr(this.props.orderInfoData.orderCode)}</h3>
                                        <div>
                                            状态：{this.props.orderInfoData.sourceOrderType?window.ENUM.getEnum("outDetailStatus", this.props.orderInfoData.status) : formatNullStr('')}
                                            <span className="send-goods">发货站点：{formatNullStr(this.props.orderInfoData.shippingSiteName)}</span>
                                        </div>
                                    </Col>
                                    <Col className="save-btn" span={3}>
                                        <FormItem className="save-body">
                                            <Button className="save"
                                                    loading={this.props.sendLoading}
                                                    onClick={this.shipping}>
                                                <i className="c2mfont c2m-fahuo"></i>
                                                发货
                                            </Button>
                                        </FormItem>
                                        <Dropdown overlay={
                                            <Menu>
                                                <Menu.Item key="1">
                                                    <Popconfirm title={this.props.status ? "有物料已分配待出货，是否仍要关闭？" : "是否确认关闭？"}
                                                                onConfirm={() => this.props.close(this.props.orderCode)}
                                                    >
                                                        <Button className="close">关闭</Button>
                                                    </Popconfirm>
                                                </Menu.Item>
                                            </Menu>
                                        }>
                                            <Button className="more">
                                                更多操作<Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
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
                                            {this.props.orderInfoData.deliveryDate ? this.props.orderInfoData.deliveryDate.match(/\d{4}\-\d{2}\-\d{2}/)[0] : formatNullStr('')}
                                        </span>
                                            </div>
                                            <div className="per-col">
                                                <span className="first-per-name">创建时间：</span>
                                                <span>
                                            {formatNullStr(this.props.orderInfoData.createDate )}
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
                                                    {formatNullStr(this.props.orderInfoData.ownerDetpName )}
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
                                                <FormItem className="remarks-content">
                                                    {this.props.form.getFieldDecorator('remarks',{
                                                        initialValue: this.props.orderInfoData.remarks,
                                                            rules: [
                                                                { max: 200, message: '备注内容要在200字以内',}
                                                            ]
                                                        }
                                                    )(
                                                        <Input type="textarea" rows={4} className="textarea"/>
                                                    )}
                                                </FormItem>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="table">
                            <Tabs defaultActiveKey="1" animated={false} onChange={this.tabChange}>
                                <TabPane className="tab" tab="订单信息" key="1">
                                    <OtherOutboundOrderCarryOutOrderInfoComp {...this.props}/>
                                </TabPane>
                                <TabPane className="tab" tab="分配信息" key="2">
                                    <OtherOutboundOrderCarryOutDistributionInfoComp {...this.props}/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Form>
                    <OtherOutboundOrderCarryOutAllotDigCont {...this.props} />
                </Spin>
            </div>
        )
    }
}

let OtherOutboundOrderCarryOutComp = Form.create()(OtherOutboundOrderCarryOut);

export default OtherOutboundOrderCarryOutComp