import React, { Component } from 'react';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Button, Popconfirm, message, Input, Icon, Table, Select, Radio, DatePicker, Form, Row, Col } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import TooltipComp from "../../../base/components/TooltipComp";
import FormModalComp from '../../../base/components/FormModalComp';
import SelectTableComp from '../../../base/components/SelectTableComp';
import SaleOrderAct from '../../actions/SaleModule/SaleOrderAct';

import moment from 'moment';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class SaleOrderEditTableDialogComp extends FormModalComp {
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
            show: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                if (!err) {
                    data.planDelivery = moment(data.planDelivery).format("YYYY-MM-DD");
                    let { taxRate } = data
                    data.materialNum = (Number(data.materialNum)).toFixed(2);
                    data.unitPrice = (Number(data.unitPrice)).toFixed(2);
                    data.taxRate = (Number(data.taxRate)).toFixed(2);
                    taxRate = taxRate / 100;
                    //金额
                    data.amount = (data.materialNum * data.unitPrice).toFixed(2);
                    //税额
                    data.tax = (data.amount * taxRate).toFixed(2);
                    //价税合计
                    data.totalAmount = (Number(data.amount) + Number(data.tax)).toFixed(2);
                    let isTax = this.props.isTax;
                    this.props.setEditTableElement(data);
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
        console.log('measureUnit--',selectedRows.measureUnit);
        if (selectedRows) {
            setFieldsValue({
                materialName: selectedRows.materialName,
                model: selectedRows.model,
                specification: selectedRows.materialSpec,
                unitOfMeasurementName: selectedRows.measureUnitName,
                unitOfMeasurement: selectedRows.measureUnit,
            });
            this.setState({ show: true })
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
        };
        let { currVal } = this.props;
        return (
            <div className="saleOrder">
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
                    <div className="saleOrder-show-hide">
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
                            <Col span={24}>
                                <FormItem {...formItemLayout1} label="规格">
                                    {getFieldDecorator('specification', {
                                        initialValue: currVal.specification || ''
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="数量">
                                {getFieldDecorator('materialNum', {
                                    initialValue: currVal.materialNum || '',
                                    rules: [{ message: "数量为必填", required: true },],
                                })(
                                    <Input placeholder="请输入数量" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12} className="col-right-pos">
                            <FormItem {...formItemLayout} label="税率">
                                {getFieldDecorator('taxRate', {
                                    initialValue: this.props.typePage == "addPageFlag" ? (Number(this.props.taxRate)).toFixed(2) : (this.props.isTax == '0' ? (17.00).toFixed(2) : (0.00).toFixed(2)),
                                })(
                                    <Input disabled={this.props.isTax != 0} />
                                    )}<span className="input-right-pos">%</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="单价">
                                {getFieldDecorator('unitPrice', {
                                    initialValue: currVal.unitPrice || '',
                                    rules: [{ message: "单价为必填", required: true },],
                                })(
                                    <Input placeholder="请输入单价" />
                                    )}
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
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="交货日期">
                                {getFieldDecorator('planDelivery', {
                                    initialValue: currVal.planDelivery ? moment(currVal.planDelivery) : null,
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
                    </Row>
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
                    <FormItem {...formItemLayout} label="行号" style={{ display: 'none' }}>
                        {getFieldDecorator('lineNum', {
                            initialValue: currVal.lineNum || '',

                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="ID" style={{ display: 'none' }}>
                        {getFieldDecorator('id', {
                            initialValue: currVal.id || '',

                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(SaleOrderEditTableDialogComp);