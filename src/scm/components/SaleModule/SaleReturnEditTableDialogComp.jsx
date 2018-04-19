import React, { Component } from 'react';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Button, Popconfirm, message, Input, Icon, Table, Select, Radio, DatePicker, Form, Row, Col } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import TooltipComp from "../../../base/components/TooltipComp";
import FormModalComp from '../../../base/components/FormModalComp';
import SelectTableComp from '../../../base/components/SelectTableComp';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
import Validate from '../../../base/consts/ValidateList';

import moment from 'moment';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class SaleReturnEditTableDialogComp extends FormModalComp {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'metarialCode',
                width: 300,
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                width: 240,
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                width: 140,
            }, {
                title: '型号',
                dataIndex: 'model',
                key: 'model',
                width: 140,
            }, {
                title: '单位',
                dataIndex: 'measureUnitName',
                key: 'measureUnitName',
                width: 140,
            }, {
                title: '单位',
                dataIndex: 'measureUnit',
                key: 'measureUnit',
                width: 140,
                hidden: true
            }
        ];
        this.searchData = {
            left: [
                {
                    key: "materialCode",
                    val: "物料编码",
                    type: "string"
                }
            ],
            center: [
                {
                    title: "查询",
                    Func: null,
                    style: {},
                    type: "button"
                }
            ]
        };
        this.state = {
            value: 1,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                if (!err) {
                    // console.log('data----', data);
                    data.planDelivery = moment(data.planDelivery).format("YYYY-MM-DD");
                    let { returnNum, unitPrice, taxRate } = data;
                    taxRate = taxRate / 100;
                    //金额
                    data.amount = (returnNum * unitPrice).toFixed(2);
                    //税额
                    data.tax = (data.amount * taxRate).toFixed(2);
                    //价税合计
                    data.totalAmount = (Number(data.amount) + Number(data.tax)).toFixed(2);
                    let isTax = this.props.isTax;
                    this.props.setEditTableElement(data);
                    // console.log('tk-----',this.props)
                    // this.props.addNewRowToTable && this.props.addNewRowToTable(data,isTax);
                    this.handleCancel(e);
                }
            });
        }
    }
    handleCancel = (e) => {
        e.preventDefault();
        let { loading, handleCancel } = this.props;
        if (!loading) {
            handleCancel(e);
        }
    }
    selectSaleRow = (selectedRows) => {
        const { setFieldsValue } = this.props.form;
        if (selectedRows) {
            setFieldsValue({
                materialName: selectedRows.materialName,
                model: selectedRows.model,
                specification: selectedRows.materialSpec,
                unitOfMeasurementName: selectedRows.measureUnitName,
            });
        } else {
            message.warning('请选择一行数据！');
        }
        this.forceUpdate();
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 },
        };
        const formItemLayout1 = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        const formItemLayout2 = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        }
        let {currVal} = this.props;
        console.log('currVal---', this.props);
        return (
             <div className="saleReturn-modal">
                <Form>
                    <Row>
                        <Col span={24}>
                            <FormItem {...formItemLayout1} label="物料编码">
                                {getFieldDecorator('materialCode', {
                                    initialValue: currVal.materialCode || '',
                                    rules: [{ message: "物料编码为必填", required: true },],
                                })(
                                    <SelectTableComp
                                        style={{}}
                                        contStyle={{}}
                                        columns={this.columns}
                                        rowKey='materialCode' //表格的索引字段
                                        valueKey='materialCode'//返回显示的字段
                                        handleSubmit={this.selectSaleRow}
                                        getDataSource={this.props.MaterialList}
                                        searchData={this.searchData}
                                    />
                                    )}
                            </FormItem>

                        </Col>
                    </Row>
                    <div className="saleOrder-show-hide" style={{display:this.state.show ? 'block' :' none'}}>
                        <Row>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="物料名称">
                                    {getFieldDecorator('materialName', {
                                        initialValue: currVal.materialName || '',
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="型号">
                                    {getFieldDecorator('model', {
                                        initialValue: currVal.model || ''
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="规格">
                                    {getFieldDecorator('specification', {
                                        initialValue: currVal.specification || ''
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem {...formItemLayout} label="单位">
                                    {getFieldDecorator('unitOfMeasurementName', {
                                        initialValue: currVal.unitOfMeasurementName || ''
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={12} className="col-right-pos">
                            <FormItem {...formItemLayout} label="退货数量">
                                {getFieldDecorator('returnNum', {
                                    initialValue: currVal.returnNum || '',
                                    rules: [
                                        { message: "退货数量为必填", required: true },
                                        Validate({
                                                    type: "gtZero",
                                                    label: "数量",
                                                    required: true
                                            }),
                                    ],
                                })(
                                    <Input placeholder="请输入退货数量" />
                                    )}
                                    <span className="input-right-pos">件</span>
                            </FormItem>
                        </Col>
                        <Col span={12} className="col-right-pos">
                            <FormItem {...formItemLayout} label="税率">
                                {getFieldDecorator('taxRate', {
                                    initialValue: currVal.taxRate || '',
                                    rules: [
                                        { message: "税率为必填", required: true},
                                        Validate({
                                                type: "gtEqZero",
                                                label: "数量",
                                                required: true
                                        }),
                                    ]

                                })(
                                    <Input placeholder="请输入税率" />
                                    )}
                                    <span className="input-right-pos">%</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} className="col-right-pos">
                            <FormItem {...formItemLayout} label="单价">
                                {getFieldDecorator('unitPrice', {
                                    initialValue: currVal.unitPrice || '',
                                    rules: [
                                        { message: "单价为必填", required: true },
                                        Validate({
                                                    type: "gtEqZero",
                                                    label: "数量",
                                                    required: true
                                        }),
                                    ],
                                })(
                                    <Input placeholder="请输入单价" />
                                    )}
                                    <span className="input-right-pos">元</span>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="赠品">
                                {getFieldDecorator('isDonation', {
                                    initialValue: currVal.isDonation || '1',
                                    onChange: this.onChange
                                })(
                                    <RadioGroup>
                                        <Radio value="0">是</Radio>
                                        <Radio value="1">否</Radio>
                                    </RadioGroup>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="交货日期">
                                {getFieldDecorator('planDelivery', {
                                    initialValue: planDelivery ? planDelivery : null,
                                    rules: [{ message: "交货日期为必填", required: true },],
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD"
                                        placeholder="请输入交货日期"

                                    />
                                    )}
                            </FormItem>
                        </Col>
                         <Col span={12}>
                            <FormItem {...formItemLayout} label="单位">
                                {getFieldDecorator('unitOfMeasurementName', {
                                    initialValue: currVal.unitOfMeasurementName || '',

                                })(
                                    <Input disabled />
                                    )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="单位" style={{ display: 'none' }}>
                                {getFieldDecorator('unitOfMeasurement', {
                                    initialValue: currVal.unitOfMeasurement || '',

                                })(
                                    <Input disabled />
                                    )}
                            </FormItem>
                        </Col> 
                    </Row> */}
                    <Row>
                        <FormItem {...formItemLayout2} label="备注">
                            {getFieldDecorator('remark', {
                                initialValue: currVal.remark || ''
                            })(
                                <Input type="textarea" style={{ height: 72, width: 562 }} placeholder="请输入备注" />
                                )}
                        </FormItem>
                    </Row>
                    <FormItem {...formItemLayout} label="金额" style={{ display: 'none' }}>
                        {getFieldDecorator('amount', {
                            initialValue: currVal.amount || '',

                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="税额" style={{ display: 'none' }}>
                        {getFieldDecorator('tax', {
                            initialValue: currVal.tax || '',

                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="税价合计" style={{ display: 'none' }}>
                        {getFieldDecorator('totalAmount', {
                            initialValue: currVal.totalAmount || '',

                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(SaleReturnEditTableDialogComp);