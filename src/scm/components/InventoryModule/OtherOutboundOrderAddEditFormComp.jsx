/**
 * Created by MW on 2017/7/24.
 */

import React, {Component} from 'react'
import {
    Spin,
    Form,
    Popconfirm,
    Button,
    Input,
    Select,
    Col,
    Row,
    DatePicker,
    message
} from '../../../base/components/AntdComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import FormComp from '../../../base/components/FormComp'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

class OtherOutboundOrderAddEditFormComp extends FormComp {
    constructor(props) {
        super(props);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let bool = this.validateDetails(this.props.dataSource);
            if ((!err) && bool) {

                values.deliveryDate = (values.deliveryDate && values.deliveryDate.format("YYYY-MM-DD HH:mm:ss")) || '';


                values.details = [].concat(this.props.dataSource, this.props.delDataSource);


                values.planAmount = values.planAmount + "";


                values.status = parseInt(values.status, 10);

                this.props.onSubmit && this.props.onSubmit(values);

            }
        });
    }

    validateDetails = (dataSource) => {

        if(dataSource.length > 0){
            for (var i = 0; i < dataSource.length; i++) {
                let row = dataSource[i];
                if (row.materialCode.length <= 0) {
                 /*   message.error(`验证错误${i + 1}行,物料编码必填。`);*/
                    message.error("明细项物料编码、计划数量不能为空.");
                    return false;
                }

                if (row.planAmount.length <= 0) {
                    message.error(`验证错误${i + 1}行,计划数量必填。`);
                    return false;
                }
                if (!(/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(row.planAmount))) {
                    message.error(`验证错误${i + 1}行,计划数量必须输入整数。`);
                    return false;
                }
                if (!(row.planAmount > 0)) {
                    message.error("明细项物料编码、计划数量不能为空.");
                 /*   message.error(`验证错误${i + 1}行,输入值不能小于 0。`);*/
                    return false;
                }
                if (!(row.planAmount <= 99999999)) {
                    message.error(`验证错误${i + 1}行,输入值不能大于 99999999。`);
                    return false;
                }

            }
        }else {
            message.error(`明细项不能为空.。`);
            return false;
        }

        return true;
    }


    handlerDeliveryManCodeSelect = (value, option) => {
        let values = this.props.form.getFieldValue(["deliveryDeptCode"]);
        let deliveryManCodeValues = this.props.form.getFieldValue(["deliveryManCode"]);

        if (values) {
            this.props.form.setFields({
                deliveryManCode: {
                    value: deliveryManCodeValues || "",
                    errors: null
                }
            });

        } else {

            this.props.actions && this.props.actions.setEmployeesEnum([]);

            this.props.form.setFields({
                deliveryManCode: {
                    errors: [new Error('请先选择收货部门！')],
                }
            });
        }
    }

    handleDeliveryDeptCodeOnSelect = (value, option) => {
        if (this.props.actions) {
            this.props.actions.setLoading(true);
            this.props.actions.fetchEmployeesEnum({deptCode: value}).then(() => {

                this.props.actions.setLoading(false);


                this.props.form.setFields({
                    deliveryManCode: {
                        value: "",
                        errors: null
                    }
                });


            });
        }
    }

    sourceSearch = (value) => {
        let pm = {
            siteName: value,
            siteCode: value,
            page: 1,
            pageSize: 10
        }
        this.props.actions.fetchSiteEnum(pm);
    }

    disabledDate = (current) => {
        let {createDate} = this.props.baseDataSource;
        if (createDate) {
            let createTime = moment(createDate, dateFormat);
            return current && current.valueOf() < createTime.valueOf() + 60 * 60 * 24 * 1000;
        } else {
            return current && current.valueOf() < Date.now();
        }
    }


    disabledDateTime=()=> {
        function range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        }

        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }



    render() {
        let getFieldDecorator = this.__form.getFieldDecorator;
        let baseDataSource = this.props.baseDataSource;

        return (
            <Form onSubmit={this.handleSubmit}>

                <div className="other-out-container">
                    <div className="out-tool-bar">
                        <div className="out-tool-top-warp">
                            <h1 className="out-tool-title">{this.props.title}</h1>
                            {
                                getFieldDecorator('orderCode', {
                                        initialValue: baseDataSource.orderCode || null
                                    }
                                )(<Input type="hidden"/>)
                            }
                            <div className="out-tool-title-strong">{`单据号：${(baseDataSource.orderCode || "自动生成单据号")}`}</div>
                        </div>
                        <div className="toolbar-btn">
                            <Button className="toolbar-btn-serve" type="primary" htmlType="submit"><i className="c2mfont c2m-baocun"></i>保存</Button>
                            <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.props.onBackClick} okText="确认" cancelText="取消">
                                <Button className="toolbar-btn-back" type='primary'><i className="c2mfont c2m-daoru_nor"></i>返回</Button>
                            </Popconfirm>
                        </div>
                    </div>
                 {/*   <Row className="toolbar-case-form">
                        <Col span={8} className="gutter-row">
                            <div className="ant-row ant-form-item toolbar-case-item">
                                <div className="ant-col-5 ant-form-item-label">
                                    <label className="" title="单据号">单据号</label>
                                </div>
                                <div className="ant-col-19 ant-form-item-control-wrapper">
                                    <div className="ant-form-item-control ">
                                        <input className="ant-input ant-input-lg" type="text" disabled
                                               value={baseDataSource.orderCode || "自动生成"}/>
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col span={8} className="gutter-row">

                        </Col>
                        <Col span={8} className="gutter-row">
                            <div className="out-base-action">
                                 <span className="out-base-action-btn"> 点击隐藏信息</span>
                            </div>
                        </Col>
                    </Row>*/}


                </div>
                <div className="other-out-information other-out-box-border">
                    <div className="information-container">
                        <div className="information-warp">
                            <h1 className="information-title">
                                基本信息
                            </h1>
                        </div>
                        <div className="information-form">
                            <Row>

                                <Col span={16}>
                                    <Col className="gutter-row" span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="单据类型"
                                            hasFeedback
                                        >
                                            {
                                                getFieldDecorator('busCode', {
                                                        rules: [{
                                                            required: true,
                                                            message: '请选择单据类型!',
                                                        }],
                                                        initialValue: baseDataSource.busCode ? (baseDataSource.busCode + "") : "",
                                                    }
                                                )(
                                                    <Select
                                                        placeholder="请选择"
                                                        style={{display: "block"}}
                                                    >
                                                        {
                                                            this.props.businessEnum.map((item, index) => {
                                                                return (<Option key={index}
                                                                                value={item.busCode + ""}>{item.busName}</Option>);
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </FormItem>
                                    </Col>

                                    <Col className="gutter-row" span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="收货部门"
                                            hasFeedback
                                        >
                                            {
                                                getFieldDecorator('deliveryDeptCode', {
                                                        initialValue: baseDataSource.ownerDetpCode ? (baseDataSource.ownerDetpCode + "") : "",
                                                    }
                                                )(
                                                    <Select
                                                        placeholder="请选择"
                                                        style={{display: "block"}}
                                                        onSelect={this.handleDeliveryDeptCodeOnSelect}
                                                    >
                                                        {
                                                            this.props.deptEnum.map((item, index) => {
                                                                return (<Option key={index}
                                                                                value={item.orgCode + ""}>{item.orgName}</Option>);
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }

                                        </FormItem>
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="交货日期"
                                            hasFeedback
                                        >
                                            {

                                                getFieldDecorator('deliveryDate', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请选择交货日期!',
                                                        }
                                                    ],
                                                    initialValue: baseDataSource.deliveryDate ? moment(baseDataSource.deliveryDate, dateFormat) : undefined,
                                                })(
                                                    <DatePicker
                                                        disabledDate={this.disabledDate}
                                                        disabledTime={this.disabledDateTime}
                                                        showToday={false}
                                                        style={{display: "block"}} format={dateFormat}/>
                                                )
                                            }


                                        </FormItem>
                                    </Col>

                                    <Col className="gutter-row" span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="收货人"
                                            hasFeedback
                                        >
                                            {
                                                getFieldDecorator('deliveryManCode', {
                                                        initialValue: baseDataSource.bpCode ? (baseDataSource.bpCode + "") : "",
                                                    }
                                                )(
                                                    <Select
                                                        onFocus={this.handlerDeliveryManCodeSelect}
                                                        placeholder="请选择"
                                                        style={{display: "block"}}
                                                    >
                                                        {
                                                            this.props.employeesEnum.map((item, index) => {
                                                                return (<Option key={index}
                                                                                value={item.empCode + ""}>{item.empName}</Option>);
                                                            })

                                                        }
                                                    </Select>
                                                )
                                            }

                                        </FormItem>
                                    </Col>

                                    <Col className="gutter-row" span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="发货站点"
                                            hasFeedback
                                        >
                                            {this.getFD('deliveryOrShipSiteCode', {
                                                initialValue: baseDataSource.shippingSiteCode || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                        type: "autoselect",
                                                        list: this.props.siteEnum,
                                                        keyName: "siteCode",
                                                    }, {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    selectedList={this.props.siteEnum}
                                                    onSearch={this.sourceSearch}
                                                    displayName={['siteCode', 'siteName']}
                                                    optionLabelProp="displayName"
                                                    keyName={'siteCode'}
                                                    getOptionProps={(item) => {
                                                        return {
                                                            displayName: item.siteName
                                                        }
                                                    }}
                                                    dropdownClassName="take-order-search-dropdow"
                                                    format={(item) => <div>
                                                        <div className="dropdown-title">{item.siteCode}</div>
                                                        <div className="dropdown-content">{item.siteName}</div>
                                                    </div>}
                                                />
                                            )}
                                        </FormItem>
                                    </Col>


                                    <Col className="gutter-row" span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="状态"
                                        >
                                            {
                                                getFieldDecorator("status", {
                                                    initialValue: baseDataSource.status ? (baseDataSource.status + "") : "1",
                                                })(
                                                    <Select
                                                        placeholder="请选择"
                                                        style={{display: "block"}}
                                                        disabled
                                                    >
                                                        {
                                                            window.ENUM.getEnum("outDetailStatus", null).map((item, index) => {
                                                                return (<Option key={index}
                                                                                value={item.catCode + ""}>{item.catName}</Option>);
                                                            })
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Col>


                                <Col className="gutter-row" span={8}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="备注"
                                        hasFeedback
                                    >
                                        {
                                            getFieldDecorator('remarks', {
                                                initialValue: baseDataSource.remarks || "",
                                                rules: [{
                                                    max: 200,
                                                    message: '最多可以输入 200 个字符!',
                                                }],
                                            })(
                                                <Input type="textarea" rows={7}/>
                                            )
                                        }

                                    </FormItem>
                                </Col>

                            </Row>


                        </div>

                      {/*  <div className="other-out-information-line"></div>*/}
                    </div>
                </div>

            </Form>
        )
    }
}


OtherOutboundOrderAddEditFormComp.defaultProps = {
    onBackClick: () => {
    },
    onSubmit: () => {
    },
    title: "",
    baseDataSource: {},
    dataSource: [],
    deptEnum: [],//部门枚举
    employeesEnum: [],//员工枚举
    businessEnum: [],//单据类型枚举
    siteEnum: [],//发货站点枚举
}
export default OtherOutboundOrderAddEditFormComp;



