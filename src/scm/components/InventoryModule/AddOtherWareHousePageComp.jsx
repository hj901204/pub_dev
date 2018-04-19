import React, { Component } from 'react'
import { Form, Input, Button, Select, Spin, Popconfirm,Row,Col } from '../../../base/components/AntdComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import FormComp from '../../../base/components/FormComp'
let FormItem = Form.Item;
let Option = Select.Option;
import AddOtherWareHousePageDialogAct from "../../actions/InventoryModule/AddOtherWareHousePageDialogAct";
import { store } from "../../data/StoreConfig";
class AddOtherWareHousePageComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchItem: {}
        }
    }
    sourceSearch = (value) => {
        this.props.actions.onAutochange({ siteCode: value, siteName: value })
    }
    takeOrderSave = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.actions.sendSave(values)
            }
        })
    }
    handleSelectSiteName = (val) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            deliveryOrShipSiteCode: val.siteCode,
        });
    }
    handleBusNameChange = (val) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            busCode: val,
        });
    }
    componentDidMount() { }
    render() {
        let { getFieldDecorator } = this.props.form;
        let formInfo = this.props.formInfo || {};
        let { sourceSelect, ...props } = this.props;
        let info = this.state.searchItem || '';
        return (
            <div className="add-other-box">
                {/* <Spin spinning={this.props.listLoading}>*/}
                <Form>
                    <div className="add-purchase-title">
                        <div>
                            <span className="add-purchase-name">{this.props.addOredit ? '新建' : '编辑'}其他入库单</span>
                             <div className="add-purchase-doc-no">
                            <FormItem label="单据号">
                                {getFieldDecorator('orderCode', {
                                    initialValue: formInfo.orderCode || "自动生成单据号"
                                })(
                                    <Input disabled style={{background:'#fff',border:'none',padding:'0px',height:'16px',color:'#999999'}} />
                                    )}
                            </FormItem>
                        </div>
                        </div>
                       
                        <div className="add-purchase-title-button">
                            <Button type="primary" onClick={this.takeOrderSave} className="add-purchase-title-button-save" loading={this.props.saveLoading}><span className="add-save-icon c2mfont c2m-baocun"></span>保存</Button>
                            <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.props.actions.returnButton} okText="确认" cancelText="取消">
                                <Button type='primary' className="add-purchase-title-button-return"><span className="add-return-icon c2mfont c2m-daoru_nor"></span>返回</Button>
                            </Popconfirm>
                        </div>
                    </div>
                    <div className="add-other-info">
                        <div className="add-purchase-info-up">
                            <div className="add-purchase-info-item">
                                <h3>基本信息</h3>
                                <Row className="add-purchase-antd-margin">
                               <Col span={24}> <FormItem label="收货站点">
                                    {this.getFD('deliveryOrShipSiteName', {
                                        initialValue: formInfo.deliverySiteCode || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请从下拉列表中选择一项',
                                                type: "autoselect",
                                                list: this.props.searchSource,
                                                keyName: "siteCode",
                                            }, {
                                                required: true,
                                                message: '请从下拉列表中选择一项',
                                            }
                                        ],
                                    })(
                                        <AutoSelectComp
                                            selectedList={this.props.searchSource}
                                            onSearch={this.sourceSearch}
                                            onSelect={this.handleSelectSiteName}
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
                                <FormItem label="收货站点编码" style={{ display: `none` }}>
                                    {getFieldDecorator('deliveryOrShipSiteCode', {
                                        initialValue: formInfo.deliverySiteCode || ''
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                                <Col span={24}><FormItem label="其他入库类型">
                                    {getFieldDecorator('busName', {
                                        initialValue: formInfo.busName || (this.props.orderTypes[0] == undefined ? '' : this.props.orderTypes[0].busName),
                                    })(
                                        <Select onChange={this.handleBusNameChange}>
                                            {
                                                this.props.orderTypes.map((item, index) => {
                                                    return <Option value={item.busCode} key={item.busCode}>{item.busName}</Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                                </Col>
                                <FormItem label="其他入库类型编码" style={{ display: `none` }}>
                                    {getFieldDecorator('busCode', {
                                        initialValue: formInfo.busCode || (this.props.orderTypes[0] == undefined ? '' : this.props.orderTypes[0].busCode)
                                    })(
                                        <Input disabled />
                                        )}
                                </FormItem>
                                </Row>
                            </div>
                            <div className="add-purchase-info-item add-purchase-record-item">
                                <Row>
                                <Col span={24}><FormItem label="备注">
                                    {getFieldDecorator('remarks', {
                                        initialValue: formInfo.remarks || '',
                                        rules: [{ max: 200, message: '备注不能超过200字符！' }]
                                    })(
                                        <Input type="textarea" className="ant-input-textarea" />
                                        )}
                                </FormItem>
                                </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Form>
                {/*<div className="add-purchase-order-info">
                    <h3>明细项</h3>
                </div>*/}
                {/*</Spin>*/}
            </div>

        )
    }
}

export default Form.create()(AddOtherWareHousePageComp)



