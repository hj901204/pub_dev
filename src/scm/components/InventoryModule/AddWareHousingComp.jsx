import React, { Component } from 'react'
import { Form, Input, Button, Select, Spin, Row, Col } from '../../../base/components/AntdComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import AddWareHousingTableComp from './AddWareHousingTableComp'
import FormComp from '../../../base/components/FormComp'
import { formatNullStr } from '../../../base/consts/Utils';
let FormItem = Form.Item;
let formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
};
let formItemLayoutSource = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
let formItemLayoutRemarks = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
};

class AddWareHousingComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            siteCode: {},
            presetDepot: {},
            display: 'none',
        }
    }
    setValue = (value) => {
        this.props.form.setFieldsValue({ sourceOrderCode: value.orderCode })
        this.props.form.setFieldsValue({ productionOrgName: formatNullStr(value.productionOrgName) })
        this.props.form.setFieldsValue({ presetDepotName: value.presetDepot })
        this.props.form.setFieldsValue({ remarks: value.remarks })
    }
    deleteValue = (value) => {
        this.props.form.setFieldsValue({ productionOrgName: '' })
        this.props.form.setFieldsValue({ presetDepotName: '' })
        this.props.form.setFieldsValue({ remarks: '' })
    }
    sourceSelect = (value) => {
        this.setState({ presetDepot: value })
        this.setValue(value)
        this.props.actions.siteList({ siteCode: value.presetDepot })
        this.props.actions.materielList({ orderCode: value.orderCode })
        this.setState({ display: 'block' })
    }
    sourceSearch = (value) => {
        this.deleteValue(value)
        this.props.actions.onAutochange({ orderCode: value })
        this.setState({ display: 'none' })
    }
    takeOrderSave = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm = {
                    sourceOrderCode: values.sourceOrderCode,
                    sourceOrderType: 13,
                    remarks: values.remarks,
                    deliverySiteCode: this.state.siteCode.siteCode || this.state.presetDepot.presetDepot,
                    deliverySiteName: this.state.siteCode.siteName || this.state.presetDepot.presetDepotName,
                }
                this.props.actions.sendSave(pm)
                this.props.actions.loading('saveLoading', true)
            }
        })
    }
    componentDidMount() {
        this.props.actions.onAutochange({ page: 1, pageSize: 10 })
        this.props.actions.siteList({ page: 1, pageSize: 10 })
    }
    siteSelect = (value) => {
        this.setState({ siteCode: value })
    }
    siteSearch = (value) => {
        this.props.actions.siteList({ siteCode: value, siteName: value })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {newState, sourceSelect, ...props} = this.props;
        return (
            <div className="add-purchase-box">
                <Spin spinning={newState.listLoading}>
                    <div className="add-purchase-box-content">
                        <Form>
                            <div className="add-purchase-title">
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col span={12}>
                                        <Col span={24}><h3>新建生产入库单</h3></Col>
                                        <Col span={24}>
                                            <div className="distance-span-size">
                                                <span>单据号：</span>
                                                <span>自动生成单据号</span>
                                            </div>
                                        </Col>
                                    </Col>
                                    <Col span={1}><Button type="primary" onClick={this.takeOrderSave} loading={newState.saveLoading} className="add-save-button" ><span className="add-save-icon c2mfont c2m-baocun"></span>保存</Button></Col>
                                </Row>
                            </div>
                            <div className="add-purchase-info">
                                <Row className="add-purchase-info-source">
                                    <Col span={8}>
                                    <span className="add-head-source"><span className="add-xing">*</span>源单据号：</span>
                                        <FormItem className="add-head-source-list">
                                            {this.getFD('sourceOrderCode', {
                                                initialValue: '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                        type: "autoselect",
                                                        list: newState.searchSource,
                                                        keyName: "orderCode",
                                                    }, {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    style={{ width: '200px' }}
                                                    selectedList={newState.searchSource}
                                                    onSelect={this.sourceSelect}
                                                    onSearch={this.sourceSearch}
                                                    displayName={['orderCode', 'supplierName']}
                                                    optionLabelProp="value"
                                                    keyName={'orderCode'}
                                                    dropdownClassName="take-order-search-dropdow take-production-search-dropdow"
                                                    format={(item) => <div><div className="dropdown-title">{item.orderCode}</div><div className="dropdown-content">{item.supplierName}</div></div>}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                     <span className="add-head-source"><span className="add-xing">*</span>源单据号：</span>
                                        <FormItem className="add-head-source-list">
                                            {this.getFD('presetDepotName', {
                                                initialValue: '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                        type: "autoselect",
                                                        list: newState.siteSource,
                                                        keyName: "siteCode",
                                                    }, {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    style={{ width: '200px' }}
                                                    selectedList={newState.siteSource}
                                                    onSelect={this.siteSelect}
                                                    onSearch={this.siteSearch}
                                                    displayName={['siteCode', 'siteName']}
                                                    optionLabelProp="displayName"
                                                    getOptionProps={(item) => {
                                                        return {
                                                            displayName: item.siteName
                                                        }
                                                    }}
                                                    keyName={'siteCode'}
                                                    dropdownClassName="take-order-search-dropdow"
                                                    format={(item) => <div><div className="dropdown-title">{item.siteCode}</div><div className="dropdown-content">{item.siteName}</div></div>}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <div style={{ 'display': this.state.display }}>
                                    <Row className="distance-left">
                                        <Col span={6}>
                                            <div className="distance-span-margin">
                                                <span className="purchase-style-width">源单据类型：</span>
                                                <span>生产订单</span>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className="distance-span-margin production-orgName">
                                                <FormItem label="生产组织" {...formItemLayout}>
                                                    {getFieldDecorator('productionOrgName', {
                                                        initialValue: ''
                                                    })(
                                                        <Input disabled style={{ border: 'none', background: '#fff', height: '18px', color: '#4a4a4a',paddingLeft:"0px" }} />
                                                        )}
                                                </FormItem>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <Row  className="distance-left-remarks">
                                    <Col className="distance-left-remarks-col">
                                      <span className="add-head-source">备注：</span>
                                        <FormItem className="add-head-source-list">
                                            {getFieldDecorator('remarks', {
                                                initialValue: '',
                                                rules: [{ max: 200, message: '备注不能超过200字符！' }]
                                            })(
                                                <Input type="textarea" className="add-textarea" style={{color: '#777777' }} />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    <div className="add-purchase-order-info">
                        <h3>订单信息</h3>
                    </div>
                    <AddWareHousingTableComp {...this.props} />
                </Spin>
            </div>
        )
    }
}

export default Form.create()(AddWareHousingComp)



