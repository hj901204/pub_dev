import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker  } from '../../../base/components/AntdComp';
import ModalComp from '../../../base/components/ModalComp';
import FormModalComp from '../../../base/components/FormModalComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TreeSelectComp from '../../../base/components/TreeSelectComp';
import SalePriceTableComp from './SalePriceTableComp';
import { disabledBeforeDate, disabledBeforeTime } from '../../../base/consts/Utils';
const FormItem = Form.Item;
const Option = Select.Option;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class SalePriceAddComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.param = {
            orderCode:"",
            priceName:"",
            startTime:null,
            endTime:null,
            currencyName:"",
            isTax:0,
            remark:"",
            list:[],
        };
    }
    
    showModal = () => {
            this.setState({
            visible: !this.state.visible,
            });
        }
     handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if(this.props.title=='新建销售价格'){
                    data.receiveOrgCode="";
                   
                }
            
            
            let newData = this.param;
            for(let [key,val] of Object.entries(data)){
                if(key in newData&&val){
                    newData = update(newData, {
                        [key]: {
                            $set: val
                        }
                    });
                }
            };
            if (!err) {
                newData.endTime=data.endTime?moment(data.endTime).format('YYYY-MM-DD'):'';
                newData.startTime=data.startTime?moment(data.startTime).format('YYYY-MM-DD'):'';

                newData.list=this.props.salePriceAddDataSource
                console.log(this.props.salePriceAddDataSource );
                this.props.onOk && this.props.onOk(newData);
            }
            
        });
    }
    showComponentMsg=(componentMsg)=>{
        this.props.showComponentMsg(!componentMsg);
    }
    //自动搜索单位
    currencySelectSearch=(val,type)=>{
        this.props.getCurrencyList({"meaName":val,"dimensionality":type,"page":1,"pageSize":10});
    }
    getMaterialCode=(e)=>{
            let val = e.target.value;
            this.setState({
                materialCode:val,
            });
        }
    render() {
        let {materialBaseSource,supplierLoading,curList,salePriceAddDataSource} = this.props;

        const { getFieldDecorator } = this.props.form;
        return (
               <div>
                   <Spin spinning={supplierLoading}> 
                    <div>
                        <Row style={{height:'70px', lineHeight:'70px',borderBottom:'1px solid #000000'}}>
                            <Col span={2} style={{textAlign:'center',fontSize:'14px',fontWeight:'bold'}} >{this.props.title}</Col>
                            <Col span={19}></Col>
                             <Col span={3}>
                                <Button type='primary' onClick={(e)=>this.handleSubmit(e)}  >保存</Button>&nbsp;&nbsp;
                              
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: '100%', marginTop:'30px' }}>
                         <Form>
                            <Row>
                                <Col span={1} style={{borderRight: '3px solid orange',height: '18px', marginRight: '10px'}} ></Col>
                                <Col span={22} style={{fontSize:'12px',fontWeight:'bold'}} >基本信息</Col>
                            </Row>
                            <Row>
                                <FormItem
                                    label="价格编码"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}
                                    style={{display:'none'}}
                                >
                                    {this.getFD('orderCode', {
                                        initialValue: materialBaseSource.orderCode?materialBaseSource.orderCode.toString():null,
                                        //rules: [{ required: true, message: '请输入价格名称' }],
                                    })(
                                            <Input />
                                        )}
                                </FormItem>
                                <Col span={8}>
                                    <FormItem
                                        label="价格名称"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                      {this.getFD('priceName', {
                                            initialValue: materialBaseSource.priceName?materialBaseSource.priceName.toString():null,
                                            rules: [{ required: true, message: '请输入价格名称' }],
                                        })(
                                             <Input />
                                            )}
                                    </FormItem>
                                </Col>
                                 <Col span={8}>
                                     <FormItem
                                        label="币种"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    > 
                                        {this.getFD('currencyName', {
                                            initialValue: materialBaseSource.currencyName ? materialBaseSource.currencyName + "" : "0",
                                            //rules: [{ required: true, message: '物料类型必填!' }],
                                        })(
                                            <Select >
                                                {
                                                    window.ENUM.getEnum("currencyType").map(currencyType => {
                                                        return <Select.Option value={currencyType.catCode.toString()} key={currencyType.catCode}>{currencyType.catName}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <FormItem
                                            label="价格生效日期"
                                            labelCol={{ span: 12 }}
                                            wrapperCol={{ span: 12 }}
                                        >
                                        {this.getFD('startTime', {
                                                initialValue: materialBaseSource.startTime?moment(materialBaseSource.startTime, 'YYYY-MM-DD'):moment(undefined),
                                                rules: [{ required: true, message: '请输入价格生效日期' }],
                                            })(
                                                <DatePicker format="YYYY-MM-DD"
                                                    style={{ width: '100%' }}
                                                    //onChange={this.onReturnDateChange}
                                                    //showTime={true}
                                                    disabledDate={(date) => disabledBeforeDate(date)}
                                                    disabledTime={disabledBeforeTime}
                                                />
                                                )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="含税"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                      {this.getFD('isTax', {
                                            initialValue: materialBaseSource.isTax?materialBaseSource.isTax.toString():'0',
                                            //rules: [{ required: true, message: '请输入非含税价格' }],
                                        })(
                                             <span><Input type="checkbox" />是 默认17%</span> 
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                  <FormItem
                                        label="价格失效日期"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                      {this.getFD('endTime', {
                                            initialValue: materialBaseSource.endTime?moment(materialBaseSource.endTime, 'YYYY-MM-DD'):null,
                                            rules: [{ required: true, message: '请输入价格失效日期' }],
                                        })(
                                            <DatePicker format="YYYY-MM-DD"
                                                    style={{ width: '100%' }}
                                                    //onChange={this.onReturnDateChange}
                                                    //showTime={true}
                                                    disabledDate={(date) => disabledBeforeDate(date)}
                                                    disabledTime={disabledBeforeTime}
                                                />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="备注"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        {this.getFD('remark', {
                                            rules: [{ message: '请输入描述' }, { message: '描述不能超过200字段', max: 200 }],
                                            initialValue: materialBaseSource.remark || null,
                                            onChange: this.handleSelectChange,
                                        })(
                                            <Input type='textarea' style={{ height: '50px' }} >
                                            </Input>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={1} style={{borderRight: '3px solid orange',height: '18px', marginRight: '10px'}} ></Col>
                                <Col span={22} style={{fontSize:'12px',fontWeight:'bold'}} >明细信息</Col>
                            </Row>
                            <div>
                                <FormItem >
                                    {this.getFD('list', {
                                        initialValue: salePriceAddDataSource?salePriceAddDataSource:[],
                                    })(
                                        <SalePriceTableComp
                                           {...this.props}
                                        />
                                        )}
                                </FormItem>
                            </div>
                        </Form>
                    </div>
                    
                    </Spin>
               </div>
        )
    }
}

export default Form.create()(SalePriceAddComp);