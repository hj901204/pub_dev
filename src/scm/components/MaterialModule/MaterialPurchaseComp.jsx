import React,{Component} from "react";
import { Modal, message, Tabs, Button, Popconfirm,Row,Col,Input,Select,Form,Spin,InputNumber } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import update from 'react/lib/update';
import MaterialAct from '../../actions/MaterialModule/MaterialAct';
import MTable from '../../../base/components/TableComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const Option = Select.Option;



class MaterialPurchaseComp extends FormComp{
    constructor(props, context) {
        super(props, context);
        this.state={
            log:false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.props.onOk && this.props.onOk(data,()=>{
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
                span: 6 
            }
        };
        return (
            <Spin spinning={loading}>
                <div className='Tabs-body'>
                    <Form> 
                              <Row style={{ height: '70px', lineHeight: '70px',marginRight:'20px', }}>
                                <Col span={18} style={{ marginLeft:'20px', fontSize: '14px', fontWeight: 'bold' }} >采购信息</Col>
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
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 6 }}
                                    >
                                            {this.getFD('materialCode', {
                                            initialValue: materialBaseSource.materialCode?materialBaseSource.materialCode.toString():null,
                                            //rules: [{ required: true, message: 'Please input your note!' }],
                                        })(
                                            <Input placeholder="请输入物料编码"  />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    {this.state.log?
                                    <FormItem
                                        label="是否允许采购："
                                        {...formItemLayout}
                                    >
                                        {this.getFD('allowPurchase', {
                                            initialValue: materialBaseSource.materialPurchaseList?materialBaseSource.materialPurchaseList[0].allowPurchase.toString():null,
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
                                        label="是否允许采购："
                                        {...formItemLayout}
                                    >
                                        <span>{window.ENUM.getEnum("materialAgreeSelect",materialBaseSource.materialPurchaseList?materialBaseSource.materialPurchaseList[0].allowPurchase.toString():"0")}</span>
                                    </FormItem>
                                    }
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        label="采购单位："
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

export default Form.create()(MaterialPurchaseComp);

