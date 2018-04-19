import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker, message, Popconfirm } from '../../../base/components/AntdComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TreeSelectComp from '../../../base/components/TreeSelectComp';
import ProOrderPicDetailComp from './ProOrderPicDetailComp';
import { disabledBeforeDate, disabledBeforeTime } from '../../../base/consts/Utils';

const FormItem = Form.Item;
const Option = Select.Option;
const page = { 'page': 1, 'pageSize': 10 };
let sum = 0;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class AddProducRecComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        //  this.params={deptNamePm:{"conditions":[]}}
        this.requisitionCode = "";
        this.param = {
            requisitionCode: "",
            type: 1,
            productionOrderCode: "",
            deptCode: "",
            empCode: "",
            plannedPickingDate: moment(),
            remarks: "",
            pDeptName: "",
            list: [],
        };
        this.state = { visible: false };
        this.orgCode = false;
    }
    handleSubmit = (e, back) => {
        e.preventDefault();
        this.validateFds((err, data) => {
            data.plannedPickingDate = data.plannedPickingDate?moment(data.plannedPickingDate).format('YYYY-MM-DD HH:mm:ss'):"";
            if (data.list.length > 0) {
                sum = 0;
                data.list.forEach((item) => {
                    sum += Number(item.applyNumber);
                });
                if (!sum > 0) {
                    this.setState({ visible: true });
                    return;
                }
            };
            if (!err) {
                this.props.onOk && this.props.onOk(data, back).then(json => { 
                    if (json.status === 2000) {
                        message.success('保存成功！');
                        if (!back) {
                            this.resetFds();
                            let { getProOrderCodeList, getSelectData} = this.props;
                            getProOrderCodeList({ orderCode: "", ...page });
                            getSelectData({ orgType: "5", orgCode: "", orgName: "", page: 1, pageSize: 10 });
                            
                        }
                    }
                });
            }
        });
    }
    productionOrderSelect = (value) => {
        this.props.getProOrderList({ productionOrderCode: value.orderCode }).then(list => {
            if (this.props.type == 'add') { 
                list.map(item => { 
                    item.applyNumber = 0;
                })
            }
            this.setFdv({ list })
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.producRecId != this.props.producRecId && this.props.type == 'edit') {
            this.resetFds();
        }
    }
    render() {
        let formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        let { getSelectData, pDeptName, producRecLoading, getProOrderCodeList, proRecbouncedData, getProOrderList, getAcquisitionOrgList, acquisitionOrgList, deptName, getEmpCodeList } = this.props;
        // let list = [];
        let props = this.props;
        if (this.props.type == 'add') {
            proRecbouncedData = this.param;
            props = this.props.add;
        }
        if (this.props.type == 'edit') {
            // list = ['productionOrderCode'];
            props = this.props.edit;
        }
        let { proOrderCodeList, empCodeList, proOrderList, producRecListLoading, selectDataList } = props;
        // let list1 = this.props.type == 'add' ? proOrderList || [] : proRecbouncedData.list || [];
        return (
            <div className="addProReturn_top">
                <Spin spinning={producRecLoading}>
                    <div>
                        <Row className="addProReturn_title">
                            <Col span={12}>
                                <div className="add_editInfo">{this.props.title}</div>
                                <div className="add_span">
                                    <span>
                                        {"领料单编号： "}{this.props.type == 'add' ? "自动生成" : (proRecbouncedData.requisitionCode||"")}
                                    </span>
                                    <span>订单类型： 标准领料</span>
                                </div>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', marginTop: 3 }}>
                                <Button type='primary' onClick={(e) => this.handleSubmit(e, this.props.type !== 'add')}><i className="c2mfont c2m-baocun" style={{ paddingRight: '7px', fontSize: '10px' }} />保存</Button>
                                {
                                    this.props.type === 'add' ?
                                        <Button type='primary' onClick={(e) => this.handleSubmit(e, true)} style={{ marginLeft: 20, marginRight: 20 }}>
                                            <i className="c2mfont c2m-baocunbingtuichu" style={{ paddingRight: '7px', fontSize: '12px' }} />
                                            保存并退出
                                        </Button>
                                        :        
                                        <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.props.tabRemove} okText="确认" cancelText="取消">
                                            <Button type='primary' style={{ marginLeft: 20, marginRight: 20 }}>
                                                <div className='addProReturn_backBtn'><i className='c2mfont c2m-daoru_nor' style={{ fontSize: '12px' }}/></div>
                                                <span style={{ paddingLeft: '7px' }} >返回</span>
                                            </Button>
                                        </Popconfirm>
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className="addProReturn_info">
                        <Form>
                            <div>
                                <Row>
                                    <Col><b>&nbsp;基本信息</b></Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <FormItem label="生产订单"  {...formItemLayout}>
                                            {this.getFD('productionOrderCode', {
                                                initialValue: proRecbouncedData.productionOrderCode || '',
                                                rules: [
                                                    { required: true, message: '生产订单 必填！' },
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: proOrderCodeList,
                                                        keyName: "orderCode",
                                                    },
                                                ],

                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    selectedList={proOrderCodeList}
                                                    onSelect={(value) => this.productionOrderSelect(value)}
                                                    onSearch={(val) => getProOrderCodeList({ orderCode: val, ...page })}
                                                    displayName={["orderCode"]}
                                                    keyName={"orderCode"}
                                                    format="{0}"
                                                    //disabled={list.includes('orderCode') ? true : false}
                                                    disabled={this.props.type == 'edit'?true:false}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="领料组织"  {...formItemLayout} className="lxzzTree">
                                            {this.getFD('deptCode', {
                                                initialValue: proRecbouncedData.deptCode || "",
                                                rules: [
                                                    { required: true, message: '领料组织 必填！' },
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: selectDataList,
                                                        keyName: "orgCode",
                                                    },
                                                ]

                                            })(
                                                <AutoSelectComp
                                                    style={{ width: '100%' }}
                                                    key="select"
                                                    selectedList={selectDataList}
                                                    onSearch={(val) => {
                                                        this.orgCode = false;
                                                        this.setFdv({ empCode: '' });
                                                        return getSelectData({ orgType: "5", orgCode: val, orgName: val, page: 1, pageSize: 10 })
                                                    }}
                                                    onSelect={(value) => {
                                                        this.orgCode = true;
                                                        getEmpCodeList({ deptCode: value.orgCode, ...page });
                                                    }}
                                                    displayName={["orgCode", "orgName"]}
                                                    keyName={"orgCode"}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="申请人"  {...formItemLayout}>
                                            {this.getFD('empCode', {
                                                initialValue: proRecbouncedData.empCode ? proRecbouncedData.empCode : '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        keyName: "empCode",
                                                        list: empCodeList,
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    style={{ width: '100%' }}
                                                    key="select"
                                                    selectedList={empCodeList}
                                                    onSearch={(val) => {
                                                        if(this.orgCode) return getEmpCodeList({ deptCode: this.getFdv('deptCode'), employeeCode: val, employeeName: val, ...page })
                                                    }}
                                                    displayName={["empCode", "empName"]}
                                                    keyName={"empCode"}
                                                //format="{0}"
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="计划领料时间"  {...formItemLayout}>
                                            {this.getFD('plannedPickingDate', {
                                                initialValue: proRecbouncedData.plannedPickingDate ? moment(proRecbouncedData.plannedPickingDate) : moment(undefined),
                                            })(
                                                <DatePicker style={{ width: '100%' }}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    showTime={true}
                                                    disabledDate={(date) => disabledBeforeDate(date)}
                                                    disabledTime={disabledBeforeTime}
                                                />
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="备注"  {...formItemLayout}>
                                            {this.getFD('remarks', {
                                                initialValue: proRecbouncedData.remarks || '',
                                                rules: [
                                                    { max:200, message: '备注不能超过200字符！' }
                                                ]
                                            })(
                                                <Input type='textarea' style={{ height: '88px' }} >
                                                </Input>
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    <div>
                        <Row style={{ marginTop: 17, marginBottom: 10, fontSize:'14px' }}>
                            <Col>
                                <b>明细项</b>
                            </Col>
                        </Row>
                        <Spin spinning={producRecListLoading}>
                            <FormItem wrapperCol={{ span: 24 }}>
                                {this.getFD('list', {
                                    initialValue: proRecbouncedData.list || [],
                                })(
                                    <ProOrderPicDetailComp/>
                                    )}
                            </FormItem>
                        </Spin>
                    </div>
                </Spin>
                <div>
                    {this.state.visible ?
                        <Modal title="提示" visible={this.state.visible}
                            onCancel={() => this.setState({ visible: false })}
                            footer={[
                                <Button key="submit" type="primary" size="large"
                                    onClick={() => this.setState({ visible: false })}>
                                    确认
                            </Button>,
                            ]}>
                            <p>申领数量不能全为零，请检查！</p>
                        </Modal> : null
                    }
                </div>
            </div>
        )
    }
}
export default Form.create()(AddProducRecComp);