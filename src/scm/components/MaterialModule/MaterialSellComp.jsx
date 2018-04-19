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



class MaterialSellComp extends FormComp{
    constructor(props, context) {
        super(props, context);
        this.state={
            log:false
        }
       this.param={
            materialCode:"",
            allowSell: "",
            minOrder: ""
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            data.creationDate=data.creationDate?moment(data.creationDate).format('YYYY-MM-DD'):'';
            let newData = this.param;
            for(let [key,val] of Object.entries(data)){
                if(key in newData&&val){
                    newData = update(data, {
                        [key]: {
                            $set: val
                        }
                    });
                }
            };
            if (!err) {
                if(newData.minOrder>=0){
                        this.props.onOk && this.props.onOk(newData,()=>{
                        this.unedit()
                    }); 
                }else{
                        newData.minOrder=0;
                        this.props.onOk && this.props.onOk(newData,()=>{
                        this.unedit()
                    });
                }
                
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
       //let { supplierBaseSource,tablecontacts,ContactData,tabLoading,supplierId, ...props } = this.props;
        let {materialBaseSource,loading,...props}= this.props;
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 6 
            }
        };
        return (
            <Spin spinning={loading}>
                <div className='Tabs-body'>
                     <Form> 
                            <Row style={{ height: '70px', lineHeight: '70px',marginRight:'20px', }}>
                                    <Col span={18} style={{ marginLeft:'20px', fontSize: '14px', fontWeight: 'bold' }} >销售信息</Col>
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
                                <Col span={12}>
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
                                                    <Input placeholder="请输入物料编码"  />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col>
                                            {this.state.log?
                                            <FormItem
                                                label="是否允许销售："
                                                {...formItemLayout}
                                            >
                                                {this.getFD('allowSell', {
                                                    initialValue: materialBaseSource.materialSellList?materialBaseSource.materialSellList[0].allowSell.toString():null,
                                                    //rules: [{ required: true, message: 'Please input your note!' }],
                                                })(
                                                    <Select>
                                                        {
                                                            window.ENUM.getEnum("materialAgreeSelect").map(nature => {
                                                                return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </FormItem>
                                            :
                                            <FormItem
                                                label="是否允许销售："
                                                {...formItemLayout}
                                            >
                                                <span>{window.ENUM.getEnum("materialAgreeSelect",materialBaseSource.materialSellList[0]?materialBaseSource.materialSellList[0].allowSell.toString():"0")}</span>
                                            </FormItem>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                 <Col span={12}>
                                    {this.state.log?
                                    <FormItem
                                        label="起订量："
                                        {...formItemLayout}
                                    >
                                        {this.getFD('minOrder', {
                                            initialValue: materialBaseSource.materialSellList?materialBaseSource.materialSellList[0].minOrder.toString():"0",
                                            rules: [{ type:'gtEqZero',decimal:11, message: '请输入正整数或十一位小数!' }],
                                        })(
                                            <InputNumber min={0} max={999999999999999999999} />
                                        )}
                                        <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                    </FormItem>
                                    :
                                    <FormItem
                                        label="起订量："
                                        {...formItemLayout}
                                    >
                                    <span>{materialBaseSource.materialSellList?Math.floor(materialBaseSource.materialSellList[0].minOrder * 100) / 100:"0"} </span>
                                    <span className="ant-form-text"> {materialBaseSource.measureUnitName}</span>
                                    </FormItem>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="销售单位："
                                        {...formItemLayout}
                                    >
                                        <span>{materialBaseSource.measureUnitName}</span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                </div>
            </Spin>
        );
    }
}

export default Form.create()(MaterialSellComp);

