import React, { Component, PropTypes } from "react";
//import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker, Popconfirm } from '../../../base/components/AntdComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import AddProRetTableComp from './AddProRetTableComp';
import { disabledBeforeDate, disabledBeforeTime } from '../../../base/consts/Utils';
let FormItem = Form.Item;
let Option = Select.Option;
let page = { 'page': 1, 'pageSize': 10 };
let sum = 0;
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
class AddProductionReturnComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            onReturnDate: null,
            datasource: [],
            visible:false,
        }
        this.param = {
            returnCode: "",
            productionOrderCode: "",
            deptCode: "",
            empCode: "",
            plannedReturnDate: null,
            remarks: ""
        }
    }
    productionOrderSelect = (value) => {
        this.props.ReturnDataSource({ "productionOrderCode": value.orderCode }, this.props.type).then(list => {
            this.setFdv({ list })
        });
        this.props.ProductionOrderDetail({ "orderCode": value.orderCode }, this.props.type)
            .then(json => {
                if (json.status == 2000 && json.data.productionOrg) {
                    this.props.EmpList({ "deptCode": json.data.productionOrg, ...page }, this.props.type);
                }
            })
    }
    productionOrderSearch = (val) => {
        this.props.ProductionOrderList({ "orderCode": val, ...page }, this.props.type);
    }
    deptListSelect = (value) => {
        this.props.EmpList({ "deptCode": value.orgCode, ...page }, this.props.type);
    }
    deptListSearch = (val) => {
        this.props.GetDepartment({ "orgType": 2, "status": 1, ...page }, this.props.type);
    }
    empListSelect = (value) => {
       
    }
    empListSearch = (val) => {

    }
    onReturnDateChange = (value, dateString) => {
        this.setState({ onReturnDate: dateString })
    }
    tabRemove = () => {
        this.props.tabRemove();
    }
    updateReturnDataSource = (data) => {
        this.setState({ datasource: data })
    }
    handleSubmit = (e) => {
        let { ReturnGetDetail } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (data.list.length > 0) {
                sum = 0;
                data.list.forEach((item) => {
                    sum += Number(item.returnNumber);
                });
                if (!sum > 0) {
                    this.setState({ visible: true });
                    return;
                }
            };
            if (!err) {
                data.type="1";
                data.plannedReturnDate = data.plannedReturnDate?moment(data.plannedReturnDate).format('YYYY-MM-DD HH:mm:ss'):"";

                this.props.onOk && this.props.onOk(data);
                this.props.type == 'add' ?
                    this.props.ProductionReturn_Add(data)
                        .then(json => {
                            if (json.status == 2000) {
                                this.props.NullReturnDataSource('add');
                                this.props.form.resetFields();
                                this.props.ProductionOrderList({ "orderCode": "", ...page }, this.props.type);
                                this.props.GetDepartment({ "orgType": 2, "status": 1, ...page }, this.props.type);
                            }
                        })
                    : this.props.ProductionReturn_Edit(data);

            }
        });
    }
    submitToBack = (e) => {
        e.preventDefault();
        let { getDetailList } = this.props;
        this.props.form.validateFields((err, data) => {
            if (data.list.length > 0) {
                sum = 0;
                data.list.forEach((item) => {
                    sum += Number(item.returnNumber);
                });
                if (!sum > 0) {
                    this.setState({ visible: true });
                    return;
                }
            };
            if (!err) {
                if (!data.returnCode) {
                    delete data.returnCode
                }
                data.type="1";
                data.plannedReturnDate = data.plannedReturnDate ? moment(data.plannedReturnDate).format('YYYY-MM-DD HH:mm:ss') : "";
                this.props.onOk && this.props.onOk(data);
                this.props.ProductionReturn_AddToBack(data);
            }
        });
    }
    render() {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        let props = this.props;

        let { ReturnGetDetail, AddReturnDataSource, EditReturnDataSource, returnTabLoading } = this.props;
        let list = [];
        if (this.props.type == 'add') {
            ReturnGetDetail = this.param;
            props = this.props.add;
            list = [];

        }
        if (this.props.type == 'edit') {
            props = this.props.edit;
        }
        let { productionOrderList, deptList, empList, productionOrg } = props;
        return (
            <div className="addProReturn_top" >
                <Spin spinning={returnTabLoading}>
                <div >
                    <Row className="addProReturn_title">
                        <Col span={12} >
                            <div className="add_editInfo">{this.props.type == 'add' ? "新建生产退料申请单" : "编辑生产退料申请单"}</div>
                            <div className="add_span">
                                <span>
                                    {this.props.type == 'add' ?"退料单编号： 自动生成":ReturnGetDetail.returnCode?"退料单编号： "+ReturnGetDetail.returnCode:"退料单编号： "} 
                                </span>
                                <span> 订单类型： 标准退料</span>
                            </div>
                        
                        </Col>
                        <Col span={12} style={{ textAlign: 'right', marginTop:3}}>
                            <Button type='primary' onClick={this.handleSubmit} className="saveBtn"><i className="c2mfont c2m-baocun"></i>保存</Button>

                            {this.props.type == 'add' ?
                                    <Button type='primary' onClick={this.submitToBack} className="saveAndBack" ><i className="c2mfont c2m-baocunbingtuichu"></i>保存并退出</Button> :
                                    <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.tabRemove} okText="确认" cancelText="取消">
                                        <Button type='primary' className="backBtn"><i className="c2mfont c2m-daoru_nor" ></i>返回</Button>
                                    </Popconfirm>    
                            }
                        </Col>
                    </Row>
                </div>
                <div className="addProReturn_info">
                    <Form>
                        <div >
                            <Row>
                                <Col>
                                    <b >
                                        &nbsp;基本信息
                                 </b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                {this.props.type=='edit'?
                                        <FormItem style={{display:'none'}}>
                                            {this.getFD('returnCode', {
                                                initialValue: ReturnGetDetail.returnCode || "",
                                            })(
                                                    <Input />
                                                )}
                                        </FormItem>:null
                                }
                                    <FormItem label="生产订单" {...formItemLayout}>
                                        {this.getFD('productionOrderCode', {
                                            initialValue: this.props.type == 'add' ?'':ReturnGetDetail.productionOrderCode,
                                            rules: this.props.type=='add'?[
                                                { required: true, message: '生产订单 必填！' },
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: productionOrderList,
                                                    keyName: "orderCode",
                                                },
                                            ]:[]
                                        })(
                                            <AutoSelectComp
                                                selectedList={productionOrderList}
                                                onSelect={this.productionOrderSelect}
                                                onSearch={this.productionOrderSearch}
                                                displayName={["orderCode"]}
                                                keyName={"orderCode"}
                                                //disabled={list.includes('orderCode') ? true : false}
                                                format="{0}"
                                                disabled={this.props.type=='edit'?true:false}
                                            />
                                            )}
                                    </FormItem>
                                    {
                                        this.props.type == 'add' ?
                                            <FormItem label="退料组织" {...formItemLayout}>
                                                {this.getFD('deptCode', {
                                                    initialValue: productionOrg ? productionOrg : "",
                                                    rules: [
                                                        { required: true, message: '退料组织 必填！' },
                                                        {
                                                            type: "autoselect",
                                                            message: "请从下拉列表中选择一项！",
                                                            list: deptList,
                                                            keyName: "orgCode",
                                                        },
                                                    ]
                                                })(
                                                    <AutoSelectComp
                                                        selectedList={deptList}
                                                        onSelect={this.deptListSelect}
                                                        onSearch={this.deptListSearch}
                                                        displayName={["orgCode", "orgName"]}
                                                        keyName={"orgCode"}
                                                        disabled={list.includes('orgCode') ? true : false}
                                                    />
                                                    )}
                                            </FormItem> :
                                            <FormItem label="退料组织" {...formItemLayout}>
                                                {this.getFD('deptCode', {
                                                    initialValue: productionOrg ? productionOrg : ReturnGetDetail.deptCode || "",
                                                    rules: [
                                                        { required: true, message: '退料组织 必填！' },
                                                        {
                                                            type: "autoselect",
                                                            message: "请从下拉列表中选择一项！",
                                                            list: deptList,
                                                            keyName: "orgCode",
                                                        },
                                                    ]
                                                })(
                                                    <AutoSelectComp
                                                        selectedList={deptList}
                                                        onSelect={this.deptListSelect}
                                                        onSearch={this.deptListSearch}
                                                        displayName={["orgCode", "orgName"]}
                                                        keyName={"orgCode"}
                                                        disabled={list.includes('orgCode') ? true : false}
                                                    />
                                                    )}
                                            </FormItem>
                                    } 
                                </Col>
                                <Col span={8}>
                                  

                                    <FormItem label="申请人" {...formItemLayout}>
                                        {this.getFD('empCode', {
                                            initialValue: this.props.editProductionReturnLoading ? "" : empList.length > 0? empList[0].empCode : "",
                                            rules:[
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: empList,
                                                    keyName: "empCode",
                                                },
                                            ]
                                        })(
                                            <AutoSelectComp
                                                selectedList={empList}
                                                onSelect={this.empListSelect}
                                                onSearch={this.empListSearch}
                                                displayName={["empCode", "empName"]}
                                                keyName={"empCode"}
                                                disabled={list.includes('empCode') ? true : false}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="计划退料时间" {...formItemLayout}>
                                        {this.getFD('plannedReturnDate', {
                                            initialValue: ReturnGetDetail.plannedReturnDate ? moment(ReturnGetDetail.plannedReturnDate) : moment(undefined),
                                        })(
                                            <DatePicker format="YYYY-MM-DD HH:mm:ss"
                                                style={{ width: '100%' }}
                                                onChange={this.onReturnDateChange}
                                                showTime={true}
                                                disabledDate={(date) => disabledBeforeDate(date)}
                                                disabledTime={disabledBeforeTime}
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="备注" {...formItemLayout}>
                                        {this.getFD('remarks', {
                                            initialValue: ReturnGetDetail.remarks || "",
                                            rules:[{
                                                max:200,message:"备注不能超过200字符！",
                                            }]
                                        })(
                                            <Input type='textarea' style={{ height: '88px'}} >
                                            </Input>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
                <div>
                    <Row style={{ marginTop: 17, marginBottom: 10, fontSize: '14px'}}>
                        <Col>
                            <b>明细项</b>   
                        </Col>
                    </Row>
                    <FormItem wrapperCol={{ span: 24 }}>
                        {this.getFD('list', {
                            initialValue: this.props.type == 'add' ? AddReturnDataSource : EditReturnDataSource,
                        })(
                            <AddProRetTableComp />
                            )}
                    </FormItem>
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
                            <p>申退数量不能全为零，请检查！</p>
                        </Modal>:null
                    }
                </div>
            </div>
        )
    }
}
export default Form.create()(AddProductionReturnComp);