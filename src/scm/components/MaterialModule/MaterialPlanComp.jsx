import React,{Component} from "react";
import { Modal, message, Tabs, Button, Popconfirm,Row,Col,Input,Select,Form,Spin,InputNumber } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import update from 'react/lib/update';
import MaterialAct from '../../actions/MaterialModule/MaterialAct';
import MTable from '../../../base/components/TableComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import Validate from '../../../base/consts/ValidateList';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const Option = Select.Option;



class MaterialPlanComp extends FormComp{
    constructor(props, context) {
        super(props, context);
        this.state={
            log:false
        }
        this.param={
            materialCode: "",
            materialProperty: 0,
            fixMakeAdvance: 0,
            fixPurchaseAdvance: 0,
            fixDispatchAdvance: 0,
            minInventory: 0,
            maxInventory: 0,
            safeInventory: 0,
            maxOrderQuantity: 0,
            minOrderQuantity: 0,
            minBatch: 0
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            let newData = this.param;
            for(let [key,val] of Object.entries(data)){
                if(key in newData&&val){
                    console.log(key);
                    newData = update(data, {
                        [key]: {
                            $set: val
                        }
                    });
                }
            };
            if (!err) {
                    this.props.onOk && this.props.onOk(newData,()=>{
                    this.unedit();
                });
                
            }
        });
    }
    edit=()=>{
        this.setState({log:true})
    }
    unedit=()=>{
        this.setState({log:false})
    }
    render() {
       let {materialBaseSource,loading,...props}= this.props;
       const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 8 
            }
        };
        return (
        <Spin spinning={loading}>
            <div className='Tabs-body'>
             <Form>
                            <Row style={{ height: '70px', lineHeight: '70px',marginRight:'20px', }}>
                                <Col span={18} style={{ marginLeft:'20px', fontSize: '14px', fontWeight: 'bold' }} >计划信息</Col>
                                <Col>
                                    {
                                        this.state.log?
                                        <span>
                                            <Button type="primary" onClick={(e)=>this.handleSubmit(e)}>保存</Button>&nbsp;&nbsp;<Button type="default" onClick={this.unedit}>取消</Button>
                                        </span>:
                                        <span>
                                            <Button type="primary" onClick={this.edit}>编辑</Button>
                                        </span>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col className='wuliaonone'>
                                    <FormItem
                                    label="物料编码"
                                    {...formItemLayout}
                                    >
                                        {this.getFD('materialCode', {
                                            initialValue: materialBaseSource.materialCode?materialBaseSource.materialCode.toString():null,
                                            //rules: [{ required: true, message: 'Please input your note!' }],
                                        })(
                                            <Input placeholder="请输入物料编码" onBlur={this.getMaterialCode}  />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                        {this.state.log?
                                        <FormItem
                                            label="物料属性："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('materialProperty', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].materialProperty.toString():null,
                                            })(
                                                <Select>
                                                    {
                                                        window.ENUM.getEnum("materialPro").map(nature => {
                                                            return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="物料属性："
                                            {...formItemLayout}
                                        >
                                            <span>{window.ENUM.getEnum("materialPro",materialBaseSource.materialPlanList[0]?materialBaseSource.materialPlanList[0].materialProperty.toString():"0")}</span>
            
                                        </FormItem>
                                    }
                                </Col>
                                 <Col span={6}>
                                    {this.state.log?
                                        <FormItem
                                            label="最小库存："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('minInventory', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].minInventory:null,
                                                rules: [{ type:'gtEqZeroNum',label:'最小库存' }],
                                            })(
                                                <InputNumber min={0} max={9999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="最小库存："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList[0]?Math.floor(materialBaseSource.materialPlanList[0].minInventory * 100) / 100:null} </span>
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                    }
                                </Col>
                                 <Col span={6}>
                                     {this.state.log?
                                        <FormItem
                                            label="最大订单量："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('maxOrderQuantity', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].maxOrderQuantity:null,
                                                rules: [{ type:'gtEqZeroNum',label:'最大订单量' }],
                                            })(
                                                <InputNumber min={0} max={999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="最大订单量："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?Math.floor(materialBaseSource.materialPlanList[0].maxOrderQuantity * 100) / 100:null} </span>
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                    }
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                    {this.state.log?
                                        <FormItem
                                            label="固定制造提前期："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('fixMakeAdvance', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].fixMakeAdvance:null,
                                            rules: [{ type:'day',label:'提前期'}],
                                            })(
                                            
                                                <InputNumber min={0} max={999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> 天</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="固定制造提前期："
                                            {...formItemLayout}   
                                        >
                                        <span>{materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].fixMakeAdvance:null} </span>
                                        <span className="ant-form-text"> 天</span>
                                        </FormItem>
                                    }
                                </Col>
                                 <Col span={6}>
                                     {this.state.log?
                                        <FormItem
                                            label="安全库存："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('safeInventory', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].safeInventory:null,
                                                rules: [{ type:'gtEqZeroNum',label:'安全库存' }],
                                            })(
                                            <InputNumber min={0} max={9999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="安全库存："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?Math.floor(materialBaseSource.materialPlanList[0].safeInventory * 100) / 100:null} </span>
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                    }
                                </Col>
                                 <Col span={6}>
                                    {this.state.log?
                                        <FormItem
                                            label="最小订单量："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('minOrderQuantity', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].minOrderQuantity:null,
                                                rules: [{ type:'gtEqZeroNum',label:'最小订单量' }],
                                            })(
                                            <InputNumber min={0} max={999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="最小订单量："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?Math.floor(materialBaseSource.materialPlanList[0].minOrderQuantity * 100) / 100:null} </span>
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                    }
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                    {this.state.log?
                                        <FormItem
                                            label="固定采购提前期："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('fixPurchaseAdvance', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].fixPurchaseAdvance:null,
                                            rules: [{ type:'day',label:'提前期'}],
                                            })(
                                                <InputNumber min={0} max={999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> 天</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="固定采购提前期："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].fixPurchaseAdvance:null} </span>
                                        <span className="ant-form-text"> 天</span>
                                        </FormItem>
                                    }
                                </Col>
                                 <Col span={6}>
                                     {this.state.log?
                                        <FormItem
                                            label="最大库存："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('maxInventory', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].maxInventory:null,
                                                rules: [{ type:'gtEqZeroNum',label:'最大库存' }],
                                            })(
                                                <InputNumber min={0} max={9999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="最大库存："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?Math.floor(materialBaseSource.materialPlanList[0].maxInventory * 100) / 100:null} </span>
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                    }
                                </Col>
                                 <Col span={6}>
                                    {this.state.log?
                                        <FormItem
                                            label="最小批量："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('minBatch', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].minBatch:null,
                                                rules: [{ type:'gtEqZeroNum',label:'最小批量' }],
                                            })(
                                                <InputNumber min={0} max={999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="最小批量："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?Math.floor(materialBaseSource.materialPlanList[0].minBatch * 100) / 100:null} </span>
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                        </FormItem>
                                    }
                                </Col>
                            </Row>
                            <Row>
                              <Col span={6}>
                                   {this.state.log?
                                        <FormItem
                                            label="固定配送提前期："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('fixDispatchAdvance', {
                                                initialValue: materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].fixDispatchAdvance:null,
                                            rules: [{ type:'day',label:'提前期'}],
                                            })(
                                                <InputNumber min={0} max={999999999} className="input-small"/>
                                            )}
                                            <span className="ant-form-text"> 天</span>
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="固定配送提前期："
                                            {...formItemLayout}
                                        >
                                        <span>{materialBaseSource.materialPlanList?materialBaseSource.materialPlanList[0].fixDispatchAdvance:null} </span>
                                        <span className="ant-form-text"> 天</span>
                                        </FormItem>
                                    }
                                </Col>
                            </Row>
                        </Form>

                     
            </div>
        </Spin>
        );
    }
    
}

export default Form.create()(MaterialPlanComp);

