import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, message} from '../../../base/components/AntdComp';
import FormModalComp from '../../../base/components/FormModalComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import SelectComp from '../../../base/components/SelectComp';
import SelectTableComp from '../../../base/components/SelectTableComp';
import TooltipComp from '../../../base/components/TooltipComp';

const FormItem = Form.Item,
    page = { 'page': 1, 'pageSize': 10 },
    columns = [{
        title: '物料编码',
        dataIndex: 'materialCode',
        width:90,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 92, placement: 'top' }} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'top' }} />
    }, {
        title: '型号',
        dataIndex: 'model',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'top' }} />
    }, {
        title: '单位',
        dataIndex: 'measureUnit',
        width: 60,
    }],
    searchData = {
        left: [
            {
                key: "materialCode",
                val: "物料编码",
                type: "string"
            },
            {
                key: "materialName",
                val: "物料名称",
                type: "string",
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

class TextItemComp extends Component {
    render() {
        let { value, list, keyName, labelName } = this.props;
        if (list && keyName && labelName) {
            if (Array.isArray(list) && list.length > 0) {
                list.forEach(item => {
                    if (item[keyName] === value) {
                        value = item[labelName];
                    }
                })
            }
        }
        return <div>{value}</div>
    }
}

class AddPurDetailLineComp extends FormModalComp {
    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFds((err, formData) => {
            if (!err) {
                this.props.onOk && this.props.onOk(formData);
            }
        });
    }
    materialSelect = (data) => {
        if (data) {
            let { materialName, materialSpec, model, measureUnit } = data;
            this.setFdv({
                materialName,
                materialSpec,
                materialModel: model,
                measureUnitCode: measureUnit,
                valuationUnit: measureUnit,
            });
        } else {
            message.warning('请选择一行数据！');
        }
    }
    getUnitName(value) {
        let { measureList } = this.props;
        let keyName = 'meaCode', labelName = 'meaName';
        if (measureList && keyName && labelName) {
            if (Array.isArray(measureList) && measureList.length > 0) {
                measureList.forEach(item => {
                    if (item[keyName] === value) {
                        value = item[labelName];
                    }
                })
            }
        }
        return value;
    };
    getComp = () => {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const formItemLayout2 = {
            labelCol: { span: 6 },
            wrapperCol: { span: 17 },
        };
        let { detail, tax, getMaterialList, materialList, measureList, disableds } = this.props;
        if (detail && detail.materialCode) {
            materialList = [detail];
        };
        columns[columns.length - 1].render = (text, record, index) => this.getUnitName(text);
        return (
            <div>
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem label="物料编码" {...formItemLayout}>
                                {this.getFD('materialCode', {
                                    initialValue: detail.materialCode,
                                    rules: [
                                        { required: true, message: '物料编码 必填！' }
                                    ],
                                })(
                                    <SelectTableComp
                                        columns={columns}
                                        rowKey='materialCode'
                                        valueKey='materialCode'
                                        handleSubmit={this.materialSelect}
                                        getDataSource={getMaterialList}
                                        searchData={searchData}
                                        contStyle={{ width: "640px" }}
                                        style={{ width: '200px' }}
                                        btnProps={{
                                            disabled: disableds.includes('materialCode'),
                                        }}
                                        tableProps={{

                                        }}
                                    />
                                    )}
                            </FormItem>
                        </Col>    
                    </Row>
                    <div className="material-info">
                        <Row >
                            <Col span={12}>
                                <FormItem label="物料名称" {...formItemLayout2}>
                                    {this.getFD('materialName', {
                                        initialValue: detail.materialName,
                                    })(<TextItemComp />)}
                                </FormItem>
                                <FormItem label="规格" {...formItemLayout2}>
                                    {this.getFD('materialSpec', {
                                        initialValue: detail.materialSpec,
                                    })(<TextItemComp />)}
                                </FormItem>
                                <FormItem label="型号" {...formItemLayout2}>
                                    {this.getFD('materialModel', {
                                        initialValue: detail.materialModel,
                                    })(<TextItemComp />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="计价数量" {...formItemLayout2}>
                                    {this.getFD('valuationNumber', {
                                        initialValue: detail.valuationNumber,
                                    })(<TextItemComp />)}
                                </FormItem>
                                <FormItem label="计价单位" {...formItemLayout2}>
                                    {this.getFD('valuationUnit', {
                                        initialValue: detail.valuationUnit,
                                    })(<TextItemComp
                                        list={measureList}
                                        keyName="meaCode"
                                        labelName="meaName"
                                    />)}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={12}>
                            <FormItem label="订单数量" {...formItemLayout} >
                                {this.getFD('orderNumber', {
                                    initialValue: String(detail.orderNumber),
                                    rules: [
                                        { required: true, message: "订单数量 必填！" },
                                        { type: 'gtZero', label: '订单数量' }
                                    ],
                                    onChange: (e) => this.setFdv({ valuationNumber: e.target.value }),
                                })(
                                    <Input disabled={disableds.includes('orderNumber')}/>
                                    )}
                            </FormItem>
                            <FormItem label="单价" {...formItemLayout} >
                                {this.getFD('unitPrice', {
                                    initialValue: String(detail.unitPrice),
                                    rules: [
                                        { required: true, message: "单价 必填！" },
                                        { type: 'gtEqZero', label: '单价' }
                                    ],
                                })(
                                    <Input disabled={disableds.includes('unitPrice')}/>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <div className="tax">    
                                <FormItem label="税率" {...formItemLayout} >
                                    {this.getFD('tax', {
                                        initialValue: String(detail.tax || tax),
                                        rules: [
                                            { type: 'gtEqZero', label: '税率' }
                                        ],
                                    })(
                                        <Input disabled={disableds.includes('tax')}/>
                                        )}
                                </FormItem>
                                <div className="tax-info"><span>(默认17%)</span></div>
                            </div>
                             <FormItem label="单位" {...formItemLayout} >
                                {this.getFD('measureUnitCode', {
                                    initialValue: detail.measureUnitCode,
                                    onChange: (value) => this.setFdv({ valuationUnit: value }),
                                })(
                                    <SelectComp
                                        list={measureList}
                                        keyName="meaCode"
                                        labelName="meaName"
                                        disabled={disableds.includes('measureUnitCode')}
                                    />
                                    )}
                            </FormItem> 
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                {this.getFD('remarks', {
                                    initialValue: detail.remarks,
                                    rules: [
                                        { max: 200, message: "备注不能超过200字符！" }
                                    ],
                                })(
                                    <Input type="textarea" style={{ height: 72}}/>
                                    )}
                            </FormItem>
                            <div className="remarks"><span>最多200字符</span></div>
                        </Col>   
                    </Row>
                </Form>
            </div>
        )
    }
}
AddPurDetailLineComp.defaultProps = {
    loading:false,
}

export default Form.create()(AddPurDetailLineComp);


