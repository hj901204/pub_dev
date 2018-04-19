import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { DatePicker, Select, Button, Input, Form, Row, Col, Spin, message, Modal, Popconfirm  } from '../../../base/components/AntdComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TabsAct from '../../actions/TabsAct';
import BomAddTableComp from './BomAddTableComp';
import { store } from '../../data/StoreConfig';
import Validate from '../../../base/consts/ValidateList';
import { disabledBeforeDate, disabledBeforeTime, disabledAfterDate, disabledAfterTime  } from '../../../base/consts/Utils';
const Option = Select.Option;
const FormItem = Form.Item;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class BomSubUpgradeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
            spaceDisabled: false,
            startDate: null,
            endDate: null,
            hours:"",
            minutes:"",
            seconds:"",
            startDays:"",
            endDays:"",
            endHours:"",
            endMinutes:""
        };
        this.param = {
            list: [],
        };
    }

 /*   componentWillMount() {
        this.props.MaterialFormList('','',1,10,'0,2,3,4',1);
    };*/

    disabledStartDate = (startValue) => {
        const { getFieldValue,setFieldsValue } = this.props.form;
        const endValue = getFieldValue('endTime');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (current) => {
        const { getFieldValue,setFieldsValue } = this.props.form;
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
            startDays:dateString.substring(0,10).valueOf(),
            hours:timer.substring(11,13),
            minutes:timer.substring(14,16),
            seconds:timer.substring(17,19)
        })

        this.onChange('startValue', value);
        this.setState({ startDate: dateString })
    }
    onEndChange = (value, dateString) => {
        this.onChange('endValue', value);
        this.setState({ endDate: dateString,endDays:dateString.substring(0,10).valueOf(),endHours:dateString.substring(11,13),endMinutes:dateString.substring(14,16) })
    }
    handleSelectMaterial = (value) => {
        const {setFieldsValue} = this.props.form;
        this.selected = !this.selected;
        setFieldsValue({
            materialName: value.materialName,
        });
    };
    handleChangeMaterial = () => {
        const {setFieldsValue} = this.props.form;
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
                    if (!item.materialCode || !item.materialSpec || !item.measureUnitName) {
                        flag = true;
                    }
                })
                if (flag) {
                    message.warn('明细项物料编码，单位用量不能为空')
                    return;
                }
            }
            if (!err) {
                let obj = Object.assign({}, data, { startTime: data.startTime.format('YYYY-MM-DD HH:mm:ss') }, {endTime: data.endTime ? data.endTime.format('YYYY-MM-DD HH:mm:ss') : ''}, { list: this.props.bomDetailInfo.list||[] },{version:data.targetVersion})
               /* let checkDate=Object.assign({},{ startTime: data.startTime.format('YYYY-MM-DD HH:mm:ss') }, {endTime: data.endTime ? data.endTime.format('YYYY-MM-DD HH:mm:ss') : ''},{materialCode:data.materialCode})*/
                this.props.CheckDate(obj,'upgrade')
             /*   this.props.Save(obj);*/
            }
        });
    };
    back = () => {
        store.dispatch(TabsAct.TabAdd({ title: "BOM主页", key: "bomList" }));
    };
    onSearch = (value) => {
        this.props.MaterialFormList(value,value,1,10,'0,2,3,4',1);
    };

    handleOk = () => {
        this.props.form.validateFields((err, data) => {
             let obj = Object.assign({}, data, { startTime: data.startTime.format('YYYY-MM-DD HH:mm:ss') }, {endTime: data.endTime ? data.endTime.format('YYYY-MM-DD HH:mm:ss') : ''}, { list: this.props.bomDetailInfo.list||[] },{version:data.targetVersion})
             this.props.Save(obj);

        });
        this.props.ModalVisiable(false)
    };
    handleCancel = () => {
        this.props.ModalVisiable(false)
    };
    render() {

        const {getFieldDecorator,getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        const {bomDetailInfo, materialSource} = this.props;
        return (
            <div className="bom-wrap">
                <div className="bom-header">
                    <span className="bom-header-title">{this.props.title}</span>
                    <Button className="default-btn save" onClick={this.handleSubmit}><i className="c2mfont c2m-baocun" style={{ paddingRight: 7, fontSize: 10 }}></i>保存</Button>
                    <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.back} okText="确认" cancelText="取消">
                        <Button className="default-btn back"><i className="c2mfont c2m-daoru_nor" ></i>返回</Button>
                    </Popconfirm>
                </div>
                <div className="bom-form-content">
                    <div className="bom-baseinfo"><span className="bom-baseinfo-title">基本信息</span></div>
                    <Form className="bom-form" onSubmit={this.handleSubmit}>

                        <Row type="flex" justify="end">
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="BOM编号:">
                                    {getFieldDecorator('bomCode', {
                                        initialValue: bomDetailInfo.bomCode ? bomDetailInfo.bomCode : '',
                                    })(
                                        <Input disabled placeholder="系统自动生成编码" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="BOM名称:">
                                    {getFieldDecorator('bomName', {
                                        initialValue: bomDetailInfo.bomName ? bomDetailInfo.bomName : '',
                                        rules: [{ required: true,message:"BOM名称为必填"}],
                                    })(
                                        <Input disabled placeholder="请输入BOM名称" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="生效日期:">
                                    {getFieldDecorator('startTime', {
                                        initialValue: bomDetailInfo.endTime ? moment(bomDetailInfo.startTime):null,
                                        rules: [{ required: true, message: '生效日期为必填' }],
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={(c) => disabledBeforeDate(c, getFieldValue('startTime'))}
                                            disabledTime={(c) => disabledBeforeTime(c, getFieldValue('startTime'))}
                                            onChange={this.onStartChange}
                                        />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="类型:">
                                    {getFieldDecorator('type', {
                                        initialValue: bomDetailInfo.type+'',
                                        rules: [{required: true, message: '类型为必填'}],
                                    })(
                                        <Select disabled style={{ width: 100 }} onChange={this.onChange}>
                                            <Option value="0">标准BOM</Option>
                                            <Option value="1">配置BOM</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="产品编码:">
                                    {getFieldDecorator('materialCode', {
                                        initialValue: bomDetailInfo.materialCode ? bomDetailInfo.materialCode : '',
                                        rules: [
                                            { type: "string", message: "产品编码为必填", required: true },
                                        ]
                                    })(
                                        <AutoSelectComp
                                            disabled={true}
                                            selectedList={materialSource}
                                            displayName={['materialCode', 'materialName']}
                                            keyName={"materialCode"}
                                            onSelect={this.handleSelectMaterial}
                                            onChange={this.handleChangeMaterial}
                                            onSearch={this.onSearch}
                                            optionLabelProp="value"
                                        >
                                        </AutoSelectComp>
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="产品名称:">
                                    {getFieldDecorator('materialName', {
                                        initialValue: bomDetailInfo.materialName ? bomDetailInfo.materialName : '',
                                    })(
                                        <Input disabled/>
                                    )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="当前版本号:">
                                    {getFieldDecorator('version', {
                                        initialValue: bomDetailInfo.version ? bomDetailInfo.version : '',
                                        rules: [{ required: true, message: '版本号为必填' },
                                            { message: '版本号不能超过5字段' ,max:5}],
                                    })(
                                        <Input disabled placeholder="请输入版本号" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="目标版本号:">
                                    {getFieldDecorator('targetVersion', {
                                        rules: [{ required: true, message: '版本号为必填' },
                                            { message: '版本号不能超过5字段' ,max:5}],
                                    })(
                                        <Input placeholder="请输入版本号" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="失效日期:">
                                    {getFieldDecorator('endTime', {
                                        initialValue: bomDetailInfo.endTime ? moment(bomDetailInfo.endTime):null,
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={(c) => disabledBeforeDate(c, getFieldValue('startTime'))}
                                            disabledTime={(c) => disabledBeforeTime(c, getFieldValue('startTime'))}
                                            onChange={this.onEndChange}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="备注:">
                                    {getFieldDecorator('remarks', {
                                        initialValue: bomDetailInfo.remarks ? bomDetailInfo.remarks : '',
                                        rules: [{ message: '请输入备注' },{ message: '备注不能超过200字段' ,max:200}],
                                    })(
                                        <Input type="textarea" style={{ height: 128, width: 286 }} placeholder="请输入备注" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
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
                <div>
                    <Modal title="时间校验"
                           visible={this.props.showModal}
                           style={{width:520}}
                           onOk={this.handleOk}
                           onCancel={this.handleCancel}
                    >
                        <p>升级版本的生效日期与之前启用的版本的失效时间有真空期，是否要进行升级？</p>
                    </Modal>
                </div>
            </div>
        )
    }
}
BomSubUpgradeComp.defaultProps = {
    bomDetailInfo: {
        type:0
    }
}
export default Form.create()(BomSubUpgradeComp);