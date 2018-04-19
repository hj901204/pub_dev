/**
 * Created by MW on 2017/4/20.
 */
import React, {Component} from 'react'
import {Input, Select, Form, Button, Row, Col} from '../../../base/components/AntdComp'
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp'
import { formatNullStr } from '../../../base/consts/Utils';
let Option = Select.Option,
    FormItme = Form.Item;

class NewSalesStoreHouseInfoComp extends FormComp {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        }
    }

    onSelect = (value) => {
        this.props.onSelect(value.saleOrderCode);
        this.setState({display:'block'});
    };

    onSearch = (value) => {
        this.props.getSelectedList(value);
        this.setState({display:'none'});
    }


    render() {
        return (
            <div>
                <div className="top">
                    <Row className="row-first">
                        <Col span={22}>
                            <h3 className="public-name">新建销售出库单</h3>
                            <div>单据号：单据号自动生成</div>
                        </Col>
                        <Col className="save-btn" span={2}>
                            <Form.Item className="save-body">
                                <Button className="save" onClick={this.props.saveInfo} loading={this.props.saveLoading}><i className="c2mfont c2m-baocun"></i>保存</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="Info">
                    <Row className="row-second">
                        <Col>
                            <span className="head-source"><span className="xing">*</span>源单据号：</span>
                            <FormItme className="form-itme">
                                {this.getFD('sourceOrderCode',{
                                    initialValue: this.props.dataSource.saleOrderCode || '',
                                    rules: [
                                        {
                                            required:true,
                                            message: '请从下拉列表中选择一项',
                                            type:"autoselect",
                                            list: this.props.selectedList,
                                            keyName: "saleOrderCode",
                                        },
                                        {
                                            required:true,
                                            message: '请选择源单据号',
                                        }
                                    ],
                                })(
                                    <AutoSelectComp
                                        className="input"
                                        dropdownClassName="new-sales-store-search-dropdown"
                                        selectedList = { this.props.selectedList }
                                        onSelect = {this.onSelect}
                                        onSearch = {(val) => {this.onSearch(val);}}
                                        optionLabelProp="value"
                                        labelName="saleOrderCode"
                                        keyName = {"saleOrderCode"}
                                        format={(item)=><div><div className="option-code">{item.saleOrderCode}</div><div className="option-name">{item.customerName}</div></div>}
                                    />,
                                )
                                }
                            </FormItme>
                        </Col>
                    </Row>
                    <div className="info-content" style={{'display':this.state.display}}>
                        <Row className="row-third">
                            <Col className="col-left" span={8}>
                                <div className="per-col">
                                    <span className="per-title">源单据类型：</span>
                                    <span>销售订单</span>
                                </div>
                                <div className="per-col">
                                    <span className="per-title">发货站点：</span>
                                    <span>{formatNullStr(this.props.dataSource.shipAddressDetails)}</span>
                                </div>
                                <div className="per-col">
                                    <span className="per-title">交货日期：</span>
                                    <span>{this.props.dataSource.planDelivery ? this.props.dataSource.planDelivery.match(/\d{4}\-\d{2}\-\d{2}/)[0]
                                        : formatNullStr('')}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="per-col">
                                    <span className="per-title">客户：</span>
                                    <span>{formatNullStr(this.props.dataSource.customerName)}</span>
                                </div>
                                <div className="per-col">
                                    <span className="per-title">联系人：</span>
                                    <span>{formatNullStr(this.props.dataSource.contactsPerson)}</span>
                                </div>
                            </Col>
                            <Col className="col-right" span={8}>
                                <div className="per-col">
                                    <span className="per-title">电话：</span>
                                    <span>{formatNullStr(this.props.dataSource.contactsPhone)}</span>
                                </div>
                                <div className="per-col">
                                    <span className="per-title">收货地址：</span>
                                    <span>{formatNullStr(this.props.dataSource.receiveAddressDetails)}</span>
                                </div>
                            </Col>
                        </Row>
                        <div className="source-remark">
                            <span className="remark-title">源单备注：</span>
                            <span className="remark-content">{formatNullStr(this.props.dataSource.remark)}</span>
                        </div>
                    </div>
                    <Row className="row-fourth">
                        <Col className="col-remark">
                            <span className="head-source">备注：</span>
                            <FormItme className="form-itme">
                                {this.props.getFieldDecorator('remarks',{
                                        initialValue: '',
                                        rules: [
                                            { max: 200, message: '备注内容要在200字以内',}
                                        ]
                                    }
                                )(
                                    <Input className="textarea" type="textarea" rows="2"/>
                                )
                                }
                            </FormItme>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default NewSalesStoreHouseInfoComp
