import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { DatePicker, Select, Button, Input, Form, Row, Col, Spin,message,Popconfirm } from '../../../base/components/AntdComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TabsAct from '../../actions/TabsAct';
import BomAddTableComp from './BomAddTableComp';
import { store } from '../../data/StoreConfig';
const Option = Select.Option;
const FormItem = Form.Item;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class BomComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
        this.param = {
            list: [],
        };
    }

    componentWillMount() {
        this.props.MaterialFormList('','',1,10,'0,2,3,4',1);
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (current) => {
        const startValue = this.state.startValue;
        if(startValue && current){
            return startValue.valueOf() > current.valueOf();
        }
        return current && current.valueOf() < Date.now();
    };
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };
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
            if (data.list.length ==0) {
                message.error('明细信息不能为空');
                return;
            }
            if (!err) {
                let obj = Object.assign({}, data, { startTime: data.startTime.format('YYYY-MM-DD HH:mm:ss') }, {endTime: data.endTime ? data.endTime.format('YYYY-MM-DD HH:mm:ss') : ''}, { list: this.props.bomDetailInfo.list||[] })
                this.props.Save(obj);
            }
        });
    };
    back = () => {
        store.dispatch(TabsAct.TabAdd({ title: "BOM主页", key: "bomList" }));
    };
    onSearch = (value) => {
        this.props.MaterialFormList(value,value,1,10,'0,2,3,4',1);
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        const {bomDetailInfo, materialSource} = this.props;
        return (
            <div className="bom-wrap">
                <div className="bom-header">
                    <span className="bom-header-title">{this.props.title}</span>
                    <Button className="default-btn save" onClick={this.handleSubmit}>保存</Button>
                    <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.back} okText="确认" cancelText="取消">
                        <Button className="default-btn back">返回</Button>
                    </Popconfirm>
                </div>
                <div className="bom-form-content">
                    <div className="bom-baseInfo">
                        <span className="bom-baseInfo-icon"></span>
                        <span className="bom-form-baseInfo"><strong>基本信息</strong></span>
                    </div>
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
                                        <Input placeholder="请输入BOM名称" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="生效日期:">
                                    {getFieldDecorator('startTime', {
                                        initialValue: bomDetailInfo.startTime ? moment(bomDetailInfo.startTime):null,
                                        rules: [{ required: true, message: '生效日期为必填' }],
                                    })(
                                        <DatePicker
                                            disabledDate={this.disabledStartDate}
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange={this.onStartChange}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="类型:">
                                    {getFieldDecorator('type', {
                                        initialValue: bomDetailInfo.type+'',
                                        rules: [{required: true, message: '类型为必填'}],
                                    })(
                                        <Select style={{ width: 100 }} onChange={this.onChange}>
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
                                        rules: [{ required: true, message: '编号为必填' }],
                                    })(
                                        <AutoSelectComp
                                            selectedList={materialSource}
                                            displayName={['materialCode', 'materialName']}
                                            keyName={"materialCode"}
                                            onSelect={this.handleSelectMaterial}
                                            onChange={this.handleChangeMaterial}
                                            onSearch={this.onSearch}
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
                                <FormItem FormItem {...formItemLayout} label="版本号:">
                                    {getFieldDecorator('version', {
                                        initialValue: bomDetailInfo.version ? bomDetailInfo.version : '',
                                        rules: [{ required: true, message: '版本号为必填' }],
                                    })(
                                        <Input placeholder="请输入版本号" />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="失效日期:">
                                    {getFieldDecorator('endTime', {
                                        initialValue: bomDetailInfo.endTime ? moment(bomDetailInfo.endTime):null,
                                        rules: [{ type: 'object', message: '请选择生效日期' }],
                                    })(
                                        <DatePicker
                                            disabledDate={this.disabledEndDate}
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange={this.onEndChange}
                                            open={this.state.endOpen}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="备注:">
                                    {getFieldDecorator('remarks', {
                                        initialValue: bomDetailInfo.remarks ? bomDetailInfo.remarks : '',
                                        rules: [{ message: '请输入备注' }],
                                    })(
                                        <Input type="textarea" style={{ height: 128, width: 286 }} placeholder="请输入备注" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="bom-delInfo">
                    <span className="bom-baseInfo-icon"></span>
                    <span className="bom-form-baseInfo"><strong>明细信息</strong></span>
                </div>
                <div>
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
BomComp.defaultProps = {
    bomDetailInfo: {
        type:0
    }
}
export default Form.create()(BomComp);