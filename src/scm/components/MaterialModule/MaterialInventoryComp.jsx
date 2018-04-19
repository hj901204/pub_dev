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

class MaterialInventoryComp extends FormComp{
    constructor(props, context) {
        super(props, context);
        this.state={
            log:false,
            isExpiration:false
        }
        this.param={
            materialCode:"",
            usingWarehouse: 0,
            usingBatch: 0,
            type: 0,
            usingExpiration: 0,
            shelfLife: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.materialBaseSource.materialCode !== this.props.materialBaseSource.materialCode){
            if(nextProps.materialBaseSource.materialInventoryList[0]){
                this.handleSelectChange(nextProps.materialBaseSource.materialInventoryList[0].usingExpiration);
            }
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
                //newData.shelfLife=0;
                if(newData.shelfLife>=0){
                        this.props.onOk && this.props.onOk(newData,()=>{
                        this.unedit()
                    });
                }else{
                    newData.shelfLife=0;
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
    handleSelectChange = (value) =>{
        this.setState({isExpiration:value=="0"?false:true})
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
                                    <Col span={18} style={{ marginLeft:'20px', fontSize: '14px', fontWeight: 'bold' }} >库存信息</Col>
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
                                                <Input placeholder="请输入物料编码"  />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        {this.state.log?
                                        <FormItem
                                                label="存货类别："
                                                {...formItemLayout}
                                            >
                                                {this.getFD('type', {
                                                    initialValue: materialBaseSource.materialInventoryList[0].type.toString(),
                                                })(
                                                    <Select>
                                                        {
                                                            window.ENUM.getEnum("materialInventoryType").map(nature => {
                                                                return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="存货类别："
                                            {...formItemLayout}
                                        >
                                            <span>{window.ENUM.getEnum("materialInventoryType",materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].type.toString():"0")}</span>
                                        </FormItem>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                     <Col span={12}>
                                        {this.state.log?
                                            <FormItem
                                                label="是否启用仓储管理："
                                                {...formItemLayout}
                                            >
                                                {this.getFD('usingWarehouse', {
                                                    initialValue: materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].usingWarehouse.toString():null,
                                                    //rules: [{ required: true, message: 'Please input your note!' }],
                                                })(
                                                    <Select>
                                                        {
                                                            window.ENUM.getEnum("materialStatusSelect").map(nature => {
                                                                return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </FormItem>
                                            :
                                            <FormItem
                                                label="是否启用仓储管理："
                                                {...formItemLayout}
                                            >
                                                <span>{window.ENUM.getEnum("materialStatusSelect",materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].usingWarehouse.toString():"0")}</span>
                                            </FormItem>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                   <Col span={12}>
                                        {this.state.log?
                                        <FormItem
                                            label="是否启用批次管理："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('usingBatch', {
                                                initialValue: materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].usingBatch.toString():null,
                                                //rules: [{ required: true, message: 'Please input your note!' }],
                                            })(
                                                <Select>
                                                    {
                                                        window.ENUM.getEnum("materialStatusSelect").map(nature => {
                                                            return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="是否启用批次管理："
                                            {...formItemLayout}
                                        >
                                            <span>{window.ENUM.getEnum("materialStatusSelect",materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].usingBatch.toString():"0")}</span>
                                        </FormItem>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        {this.state.log?
                                        <FormItem
                                            label="是否启用保质期管理："
                                            {...formItemLayout}
                                        >
                                            {this.getFD('usingExpiration', {
                                                initialValue: materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].usingExpiration.toString():null,
                                                onChange: this.handleSelectChange,
                                            })(
                                                <Select>
                                                    {
                                                        window.ENUM.getEnum("materialStatusSelect").map(nature => {
                                                            return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>
                                        :
                                        <FormItem
                                            label="是否启用保质期管理："
                                            {...formItemLayout}
                                        >
                                            <span>{window.ENUM.getEnum("materialStatusSelect",materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].usingExpiration.toString()+"":"0")}</span>
                                        </FormItem>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        {this.state.log?
                                            <FormItem
                                                label="保质期"
                                                {...formItemLayout}
                                            >
                                                {this.getFD('shelfLife', {
                                                    initialValue: materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].shelfLife.toString():"0",
                                                    rules: [{ type:'day',label:'保质期'}],
                                                })(
                                                <InputNumber className="input-small"  min={0} max={1000000}   disabled={this.state.isExpiration} />
                                                )}
                                                <span className="ant-form-text"> 天</span>
                                            </FormItem>
                                            :
                                            <FormItem
                                                label="保质期："
                                                {...formItemLayout}
                                            >
                                            <span>{materialBaseSource.materialInventoryList?materialBaseSource.materialInventoryList[0].shelfLife:"0"} </span>
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

export default Form.create()(MaterialInventoryComp);
