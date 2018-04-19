import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { DatePicker, Select, Button, Input, Form, Row, Col, Spin, message } from '../../../base/components/AntdComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TabsAct from '../../actions/TabsAct';
import BomAddTableComp from './BomAddTableComp';
import { store } from '../../data/StoreConfig';
import Validate from '../../../base/consts/ValidateList';
import { disabledBeforeDate, disabledBeforeTime, disabledAfterDate, disabledAfterTime } from '../../../base/consts/Utils';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
const FormItem = Form.Item;
class BomAddComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
            spaceDisabled: false,
            startDate: null,
            endDate: null,
            hours: "",
            minutes: "",
            seconds: "",
            startDays: "",
            endDays: "",
            endHours: "",
            endMinutes: ""
        };
        this.param = {
            list: [],
        };
    }

    componentWillMount() {
        this.props.CleanBomDetail('');
        this.props.MaterialFormList('', '', 1, 10, '0,2,3,4', 1);
    };

    disabledStartDate = (startValue) => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const endValue = getFieldValue('endTime');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (current) => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const startValue = getFieldValue('startTime');
        if (startValue && current) {
            return startValue.valueOf() > current.valueOf();
        }
        return current && current.valueOf() < Date.now();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value, dateString) => {
        let timer = dateString.toString();
        this.setState({
            startDays: dateString.substring(0, 10).valueOf(),
            hours: timer.substring(11, 13),
            minutes: timer.substring(14, 16),
            seconds: timer.substring(17, 19)
        })

        this.onChange('startValue', value);
        this.setState({ startDate: dateString })
    }
    onEndChange = (value, dateString) => {
        this.onChange('endValue', value);
        this.setState({ endDate: dateString, endDays: dateString.substring(0, 10).valueOf(), endHours: dateString.substring(11, 13), endMinutes: dateString.substring(14, 16) })
    }


    handleSelectMaterial = (value) => {
        const { setFieldsValue } = this.props.form;
        this.selected = !this.selected;
        setFieldsValue({
            materialName: value.materialName,
        });
    };
    handleChangeMaterial = () => {
        const { setFieldsValue } = this.props.form;
        if (this.selected) {
            this.selected = !this.selected;
            return;
        }
        setFieldsValue({
            materialName: '',
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (data.list.length === 0) {
                message.warn('明细项不能为空');
                return;
            } else {
                let flag = false;
                Array.isArray(data.list) && data.list.map(item => {
                    if (!item.materialCode || !item.quantityPer) {
                        flag = true;
                    }
                })
                if (flag) {
                    message.warn('明细项物料编码，单位用量不能为空')
                    return;
                }
            }
            if (!err) {
                let obj = Object.assign({}, data, { startTime: data.startTime.format('YYYY-MM-DD HH:mm:ss') }, { endTime: data.endTime ? data.endTime.format('YYYY-MM-DD HH:mm:ss') : '' })
                this.props.Save(obj).then((json) => {
                    if (json.status === 2000) {
                        this.props.form.resetFields();
                        this.props.CleanMaterialSource();
                        this.props.MaterialFormList('', '', 1, 10, '0,2,3,4', 1);
                    }
                });
            }

        });
    };
    submitBack = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            // if (data.list.length === 0) {
            //     message.warn('明细项不能为空');
            //     return;
            // } else {
            //     let flag = false;
            //     Array.isArray(data.list) && data.list.map(item => {
            //         if (!item.materialCode || !item.unitPrice || !item.materialNum) {
            //             flag = true;
            //         }
            //     })
            //     if (flag) {
            //         message.warn('明细项物料编码，单位用量不能为空')
            //         return;
            //     }
            // }
            if (!err) {
                let obj = Object.assign({}, data, { startTime: data.startTime.format('YYYY-MM-DD HH:mm:ss') }, { endTime: data.endTime ? data.endTime.format('YYYY-MM-DD HH:mm:ss') : '' })
                this.props.SaveBack(obj);
            }

        });
    };
    onSearch = (value) => {
        this.props.MaterialFormList(value, value, 1, 10, '0,2,3,4', 1);
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        const { bomDetailInfo, materialSource } = this.props;
        return (
            <div className="bom-wrap">
                <div className="bom-header">
                    <span className="bom-header-title">{this.props.title}</span>
                    <Button className="default-btn save-back" onClick={this.handleSubmit}><i className="c2mfont c2m-baocun" style={{ paddingRight: 7, fontSize: 10 }}></i>保存</Button>
                    <Button className="default-btn back" onClick={this.submitBack}><i className="c2mfont c2m-baocunbingtuichu" style={{ paddingRight: 7, fontSize: 10 }}></i>保存并退出</Button>
                </div>
                <div className="bom-form-content">
                    <div className="bom-baseinfo"><span className="bom-baseinfo-title">基本信息</span></div>
                    <Form className="bom-form" onSubmit={this.handleSubmit}>

                        <Row type="flex" justify="end">
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="BOM编号:">
                                    {getFieldDecorator('bomCode', {})(
                                        <Input disabled placeholder="系统自动生成编码" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="BOM名称:">
                                    {getFieldDecorator('bomName', {
                                        rules: [
                                            { required: true, message: 'BOM名称为必填' },
                                            { message: 'BOM名称不能超过20字段', max: 20 }],
                                    })(
                                        <Input placeholder="请输入BOM名称" />
                                        )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="生效日期:">
                                    {getFieldDecorator('startTime', {
                                        initialValue: moment(bomDetailInfo.startTime),
                                        rules: [{ type: 'object', required: true, message: '生效日期为必填' }],
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={(c) => disabledAfterDate(c, this.state.endValue)}
                                            disabledTime={(c) => disabledAfterTime(c, this.state.endValue)}
                                            onChange={this.onStartChange}
                                        />
                                        )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="类型:">
                                    {getFieldDecorator('type', {
                                        initialValue: '0',
                                        rules: [{ required: true, message: '类型为必填' }],
                                    })(
                                        <Select style={{ width: 100 }} onChange={this.onChange} disabled>
                                            <Option value="0">标准BOM</Option>
                                            <Option value="1">配置BOM</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="产品编码:">
                                    {getFieldDecorator('materialCode', {
                                        initialValue: '',
                                        rules: [
                                            { type: "string", message: "产品编码为必填", required: true },
                                            Validate({
                                                type: "autoselect",
                                                message: "请从下拉列表中选择一项！",
                                                list: materialSource,
                                                keyName: "materialCode",
                                                required: true
                                            }),
                                        ]
                                    })(
                                        <AutoSelectComp
                                            selectedList={materialSource}
                                            displayName={['materialCode', 'materialName']}
                                            keyName={"materialCode"}
                                            onSearch={this.onSearch}
                                            onSelect={this.handleSelectMaterial}
                                            onChange={this.handleChangeMaterial}
                                            optionLabelProp="value"
                                        >
                                        </AutoSelectComp>
                                        )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="产品名称:">
                                    {getFieldDecorator('materialName', {})(
                                        <Input disabled />
                                    )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="版本号:">
                                    {getFieldDecorator('version', {
                                        rules: [
                                            { required: true, message: '版本号为必填' },
                                            { message: '版本号不能超过5字段', max: 5 }
                                        ],
                                    })(
                                        <Input placeholder="版本号为必填" />
                                        )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="失效日期:">
                                    {getFieldDecorator('endTime', {
                                        rules: [{ type: 'object', message: '请选择生效日期' }],
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder=""
                                            disabledDate={(c) => disabledBeforeDate(c, this.state.startValue)}
                                            disabledTime={(c) => disabledBeforeTime(c, this.state.startValue)}
                                            onChange={this.onEndChange}
                                        />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="备注:">
                                    {getFieldDecorator('remarks', {
                                        rules: [{ message: '请输入备注' }, { message: '备注不能超过200字段', max: 200 }],
                                    })(
                                        <Input type="textarea" style={{ height: 128, width: 286 }} placeholder="请输入备注" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                {/*<div className="bom-baseinfo"><span className="bom-baseinfo-title">明细信息</span></div>*/}
                <div>
                    <Row>
                        <Col span={24} className='orderItemTitle' style={{ marginBottom: '-20px' ,paddingLeft: '16px'}}>明细信息</Col>
                    </Row>
                    <FormItem wrapperCol={{ span: 24 }}>
                        {getFieldDecorator('list', {
                            initialValue: bomDetailInfo.list || [],
                            onChange: this.handleChangeList,
                        })(
                            <BomAddTableComp
                                MaterialList={this.props.MaterialList}
                                taxRate={this.state.taxRate}
                            />
                            )}
                    </FormItem>
                </div>
            </div>
        )
    }
}
export default Form.create()(BomAddComp);