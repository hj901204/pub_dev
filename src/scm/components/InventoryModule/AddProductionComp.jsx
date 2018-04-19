import React, { Component } from 'react'
import { Form, Input, Button, Spin, Select, Row, Col } from '../../../base/components/AntdComp';

import AutoSelectComp from '../../../base/components/AutoSelectComp';
import AddProductionTableComp from './AddProductionTableComp'
import TooltipComp from '../../../base/components/TooltipComp'
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
class AddProductionComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchItem: {},
            display:'none',
        }
    }
    sourceSelect = (value) => {
        this.setState({ searchItem: value })
        this.props.actions.materielList({ returnCode: value.returnCode })
        this.setState({display:'block'})
    }
    sourceSearch = (value) => {
        this.setState({ searchItem: {} })
        this.props.actions.onAutochange({ returnCode: value })
        this.setState({display:'none'})
    }
    takeOrderSave = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm = {
                    sourceOrderCode: values.sourceOrderCode,
                    sourceOrderType: 33,
                    remarks: values.remarks,
                }
                this.props.actions.sendSave(pm)
                this.props.actions.loading('saveLoading', true)
            }
        })
    }
    componentDidMount() {
        this.props.actions.onAutochange({ page: 1, pageSize: 10 })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {newState, sourceSelect, ...props} = this.props;
        let info = this.state.searchItem || '';
        return (
            <div className="add-purchase-box">
                <Spin spinning={newState.listLoading}>
                    <div className="add-purchase-box-content">
                        <Form>
                            <div className="add-purchase-title">
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col span={12}>
                                        <Col span={24}><h3>新建生产退料单</h3></Col>
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
                                    <Col>
                                     <span className="add-head-source"><span className="add-xing">*</span>源单据号：</span>
                                        <FormItem className="add-head-source-list">
                                            {this.getFD('sourceOrderCode', {
                                                initialValue: info.returnCode || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请从下拉列表中选择一项',
                                                        type: "autoselect",
                                                        list: newState.searchSource,
                                                        keyName: "returnCode",
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
                                                    displayName={['returnCode']}
                                                    optionLabelProp="value"
                                                    keyName={'returnCode'}
                                                    dropdownClassName="take-order-search-dropdow take-production-search-dropdow"
                                                    format={(item) => <div><div className="dropdown-title">{item.returnCode}</div></div>}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            <div style={{'display':this.state.display}}>                                
                                <Row className="distance-left">
                                    <Col span={8}>
                                        <div className="distance-span-margin">
                                            <span className="purchase-style-width">源单据类型：</span>
                                            <span>生产退料申请单</span>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="distance-span-margin">
                                            <span className="purchase-style-width">退料人：</span>
                                            <span>{formatNullStr(info.empName)}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="distance-left">
                                    <Col span={8}>
                                        <div className="distance-span-margin">
                                            <span className="purchase-style-width">收货站点：</span>
                                            <span>{'--'}</span>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="distance-span-margin">
                                            <span className="purchase-style-width">退料组织：</span>
                                            <span>{formatNullStr(info.deptName)}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="distance-left-source">
                                    <Col span={24}>
                                        <div className="distance-span-margin distance-span-margin-bottom">
                                            <span className="purchase-style-width">源单备注：</span>
                                             <TooltipComp attr={{text:info.remarks, wid:874}} className="table-tooltip" />
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
                                                <Input type="textarea" className="add-textarea" style={{color:'#777777' }} />
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
                    <AddProductionTableComp {...this.props} />
                </Spin>
            </div>

        )
    }
}

export default Form.create()(AddProductionComp)



