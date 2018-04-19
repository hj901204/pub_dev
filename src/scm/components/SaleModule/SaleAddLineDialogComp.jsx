import React, { Component } from "react";
import { Form, Input, Spin, Select, Button, Modal, Col, Row, message } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Urls } from '../../../base/consts/Urls';
import MTable from '../../../base/components/TableComp';
import SearchComp from '../../../base/components/SearchComp';
import FormModalComp from '../../../base/components/FormModalComp';
import SelectTableComp from '../../../base/components/SelectTableComp';
import FormComp from '../../../base/components/FormComp';

let Search = Input.Search;
const FormItem = Form.Item;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
let columns=[
    {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
    },
    {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
    }, {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
    },{
        title: '单位',
        dataIndex: 'measureUnit',
        key: 'measureUnit',
    }],
    searchData={
                left:[
                {
                    key:"materialCode",
                    val:"物料编码",
                    type:"string"
                },
                {
                    key:"materialName",
                    val:"物料名称",
                    type:"string"
                },
                {
                    key:"materialSpec",
                    val:"规格",
                    type:"string"
                },
                {
                    key:"model",
                    val:"型号",
                    type:"string"
                },
                {
                    key:"materialUnit",
                    val:"单位",
                    type:"string"
                }
            ],
            center:[
                {
                    title:"查询",
                    Func:null,
                    style:{},
                    type:"button"
                }
            ]
          }
class SaleAddLineDialogComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            address: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
            this.validateFds((err, data) => {
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                    
                }
            });
    }
    handleCancel = (e) => {
        e.preventDefault();
            this.props.handleCancel && this.props.handleCancel(e);
    }

    selectedRows = (selectedRows) => {
        if(selectedRows){
                this.setFdv({
                    materialCode: selectedRows.materialCode,
                    materialName: selectedRows.materialName,
                    model: selectedRows.model,
                    materialSpec: selectedRows.materialSpec,
                    measureUnit:selectedRows.measureUnit,
                });
            }else{

            }
      
    }
    
    getComp=()=>{
       let {priceList } = this.props;
        return(
            <Form>
                <Row>
                    <Col span={10}>
                        <FormItem label="物料编码" 
                            labelCol={{ span: 12}}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('materialCode', {
                                    initialValue:priceList.materialCode || '',
                                })(
                                    <SelectTableComp
                                        style={{}}
                                        contStyle={{}}
                                        columns={columns}
                                        searchData={searchData}
                                        rowKey='materialCode' //表格的索引字段
                                        valueKey='materialCode'//返回显示的字段
                                        handleSubmit={this.selectedRows}
                                        getDataSource={this.props.MaterialList} //promise
                                    />
                                )}
                        </FormItem>
                    </Col>

                    <Col span={10}>
                        <FormItem label="行号" 
                            labelCol={{ span: 12}}
                            wrapperCol={{ span: 12}}
                            style={{display:'none'}}
                            >
                            
                                {this.getFD('lineNumber', {
                                    initialValue:priceList.lineNumber || '' ,
                                })(
                                     <Input  />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <FormItem label="物料名称" 
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('materialName', {
                                    initialValue:priceList.materialName || '',
                                })(
                                    <Input  disabled/>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem label="单位" 
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('measureUnit', {
                                    initialValue:priceList.measureUnit || "",
                                })(
                                    <Input  disabled/>
                                )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <FormItem label="规格" 
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('materialSpec', {
                                    initialValue:priceList.materialSpec || "",
                                })(
                                    <Input  disabled/>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                       <FormItem label="型号" 
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('model', {
                                    initialValue:priceList.model || "",
                                })(
                                    <Input  disabled/>
                                )}
                        </FormItem>
                    </Col>
                </Row>

                 <Row>
                    <Col span={10}>
                         <FormItem label="批量价格含税" 
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('totalAmount', {
                                    initialValue:priceList.totalAmount || "",
                                })(
                                    <Input  />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span={10}>
                        <DemoBox value={100}>
                            <FormItem label="数量" 
                                labelCol={{ span: 12 }}
                                wrapperCol={{ span: 12}}>
                                    {this.getFD('materialQty', {
                                        initialValue:priceList.materialQty || "",
                                    })(
                                        <Input  />
                                    )}
                            </FormItem>
                            <FormItem label="批量价格" 
                                labelCol={{ span: 12 }}
                                wrapperCol={{ span: 12}}>
                                    {this.getFD('batchPrice', {
                                        initialValue:priceList.batchPrice || "",
                                    })(
                                        <Input  />
                                    )}
                            </FormItem>
                            <FormItem label="税率" 
                                labelCol={{ span: 12 }}
                                wrapperCol={{ span: 12}}>
                                    {this.getFD('taxRate', {
                                        initialValue:priceList.taxRate || 0,
                                    })(
                                        <Input  />
                                    )}
                            </FormItem>
                        </DemoBox>
                    </Col>
                    <Col span={10}>
                        <FormItem label="备注" 
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 12}}>
                                {this.getFD('remark', {
                                    initialValue:priceList.remark || "",
                                })(
                                    <Input  type='textarea' style={{ height: '150px' }}  />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>
        )
    }
   render() {
        const { addTitle, sourceCodeDilog ,sourceEditDilog} = this.props;
        return (
            <div>
                <Modal title={addTitle} width={1000} height={600}
                    visible={sourceCodeDilog||sourceEditDilog}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                >
                    {this.getComp()}
                </Modal>
            </div>

        );

    }
}

export default Form.create()(SaleAddLineDialogComp);
