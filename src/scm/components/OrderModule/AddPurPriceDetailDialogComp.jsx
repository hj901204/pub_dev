import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Row, Col } from '../../../base/components/AntdComp.js';
import FormModalComp from '../../../base/components/FormModalComp';
import SelectTableComp from '../../../base/components/SelectTableComp'; 
import TooltipComp from '../../../base/components/TooltipComp'; 
import { formatNullStr } from '../../../base/consts/Utils';
import SelectComp from '../../../base/components/SelectComp';
const FormItem = Form.Item;
const columns = [{
        title: '物料编码',
        key: 'materialCode',
        dataIndex: 'materialCode',
    }, {
        title: '物料名称',
        key: 'materialName',
        dataIndex: 'materialName',
        render: (txt, index, record) => {
            return <TooltipComp attr={{text:txt, wid: 90, placement: 'top'}}/>
        }
    }, {
        title: '规格',
        key: 'materialSpec',
        dataIndex: 'materialSpec',
        render: (txt, index, record) => {
            return <TooltipComp attr={{text:txt, wid: 90, placement: 'top'}}/>
        }
    }, {
        title: '型号',
        key: 'model',
        dataIndex: 'model',
        render: (txt, index, record) => {
            return <TooltipComp attr={{text:txt, wid: 90, placement: 'top'}}/>
        }
    }, {
        title: '单位',
        key: 'measureUnit',
        dataIndex: 'measureUnit',
        hidden: true
    },{
        title: '单位',
        key: 'measureUnitName',
        dataIndex: 'measureUnitName',
    }],
    searchData = {
        left: [
            {
                key: "materialCode",
                val: "物料编码",
                type: "string"
            },
            {
                key: "materialName",
                val: "物料名称",
                type: "string",
            },
            {
                key: "materialSpec",
                val: "规格",
                type: "string"
            },
            {
                key: "model",
                val: "型号",
                type: "string"
            }
        ],
        center: [
            {
                title: "查询",
                Func: null,
                style: {},
                type: "button"
            }
        ]
    }
class TextItemComp extends Component {
    render() {
        let { value, style } = this.props;
        return <div style={{...style}}>{value}</div>
    }
}
class AddPurPriceDetailDialogComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.data = props.list;
        this.state = {
            batchPriceDisabled: false,   
            totalAmountDisabled: false,
            taxDisabled: props.taxRate?false:true,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                if (this.props.type == 'edit') {
                    data.lineNumber = this.props.material.lineNumber;
                } else {
                    data.lineNumber=''
                }
                data.currencySymbol = this.props.symbol;
                data.batchPrice = Number(data.batchPrice).toFixed(2);
                data.totalAmount = Number(data.totalAmount).toFixed(2);
                data.materialQty = Number(data.materialQty).toFixed(2);
                this.props.handleSubmit(data);
                this.props.handleCancel();
             }
        })
    }
    //物料选择
    materialSelect = (data) => {
        if (data) {
            this.setFdv({
                materialCode: data.materialCode,
                materialName: data.materialName,
                materialSpec: data.materialSpec,
                materialModel: data.model,
                materialUnitCode: data.measureUnit,
                materialUnitName: data.measureUnitName
            })
        }
    }
    //批量价格变化
    handleChangeBatchPrice = (e) => {
        this.setFdv({batchPrice:e.target.value})
        this.props.form.validateFields(["batchPrice"], (err, data) => { 
            let taxRate = this.getFdv('taxRate');
            if (!err&&e.target.value!=='') {
                let totalAmount = Number(e.target.value) * (1+Number(taxRate)/100);
                this.setFdv({
                    totalAmount: totalAmount.toFixed(2)
                });
                this.setState({
                    totalAmountDisabled: true
                }) 
            } else {
                this.setState({
                    totalAmountDisabled: false
                })
                this.setFdv({
                    totalAmount: ''
                });
            }
        })
        
    }
    //批量价格失焦小数位自动补0
    onbatchPriceBlur = (e) => {
        this.props.form.validateFields(["batchPrice"], (err, data) => { 
            if (!err && e.target.value !== '') {
                if (/\./.test(e.target.value)) {
                    if (/\.\d{1}$/.test(e.target.value)) {
                        this.setFdv({ batchPrice: `${e.target.value}0` })
                    } else if (/\.$/.test(e.target.value)) {
                        this.setFdv({ batchPrice: `${e.target.value}00` })
                    }
                } else {
                    this.setFdv({ batchPrice: `${e.target.value}.00` })
                }
            }
        })    
    }
    //税率变化
    handleChangeTax = (e) => {
        let batchPrice = this.getFdv('batchPrice');
        let totalAmount = this.getFdv('totalAmount');
        if (batchPrice) {
            totalAmount = Number(batchPrice) * (1 + Number(e.target.value) / 100);
            this.setFdv({ totalAmount: totalAmount.toFixed(2) });
            return;
        }
        if (totalAmount) {
            batchPrice = Number(batchPrice) / (1 + Number(e.target.value) / 100);
            this.setFdv({ batchPrice: batchPrice.toFixed(2)});
            return;
        }
    }
    //税率失焦小数位自动补0
    onTaxBlur = (e) => {
        this.props.form.validateFields(["taxRate"], (err, data) => { 
            if (!err && e.target.value !== '') {
                if (/\./.test(e.target.value)) {
                    if (/\.\d{1}$/.test(e.target.value)) {
                        this.setFdv({ taxRate: `${e.target.value}0` })
                    } else if (/\.$/.test(e.target.value)) {
                        this.setFdv({ taxRate: `${e.target.value}00` })
                    }
                } else {
                    this.setFdv({ taxRate: `${e.target.value}.00` })
                }
            }
        })    
    }
    //数量失焦小数位自动补0
    onMaterialQtyBlur = (e) => {
        this.props.form.validateFields(["materialQty"], (err, data) => { 
            if (!err && e.target.value !== '') {
                if (/\./.test(e.target.value)) {
                    if (/\.\d{1}$/.test(e.target.value)) {
                        this.setFdv({ materialQty: `${e.target.value}0` })
                    } else if (/\.$/.test(e.target.value)) {
                        this.setFdv({ materialQty: `${e.target.value}00` })
                    }
                } else {
                    this.setFdv({ materialQty: `${e.target.value}.00` })
                }
            }
        })    
    }
    //批量价格（含税）变化
    handleChangeTotalAmount = (e) => {
        this.setFdv({totalAmount:e.target.value})
        this.props.form.validateFields(["totalAmount"], (err, data) => { 
            let taxRate = this.getFdv('taxRate');
            if (!err && e.target.value !== '') {
                let batchPrice = Number(e.target.value) / (1+Number(taxRate)/100);
                this.setFdv({
                    batchPrice: batchPrice.toFixed(2)
                });
                this.setState({
                    batchPriceDisabled: true
                }) 
            } else {
                this.setState({
                    batchPriceDisabled: false
                })
                this.setFdv({
                    batchPrice: ''
                });
            }
        })
    }
    getComp = () => {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 },
        };
        const {  type, symbol, taxRate, material } = this.props;
        if (type == 'add') {
            material.taxRate = Number(taxRate).toFixed(2);
        }
        let excepts = this.props.list.map(item => item.materialCode);
        return (
            <Form className='purPrice-material-dialog'>
                <Row>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label='物料编码' style={{marginBottom:'10px'}}>
                            {this.getFD('materialCode', {
                                initialValue: material.materialCode,
                                rules: [
                                    { required: true, message: '物料编码 必填！' },
                                ],
                            })(
                                <SelectTableComp
                                    columns={columns}
                                    rowKey='materialCode'
                                    valueKey='materialCode'
                                    handleSubmit={this.materialSelect}
                                    getDataSource={this.props.MaterialList}
                                    searchData={searchData}
                                    contStyle={{ width: "625px",zIndex:5}}
                                    style={{ width: '100%' }}
                                    excepts={excepts}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='型号' className='materailform-item-text'>
                            {this.getFD('materialModel', {
                                initialValue: formatNullStr(material.materialModel),
                            })(
                                <TextItemComp style={{width:'220px',textOverflow:'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap'}}/>
                                )}
                        </FormItem>
                        <div style={{position:'relative'}}>
                            <FormItem {...formItemLayout} label='数量'>
                                {this.getFD('materialQty', {
                                    initialValue: material.materialQty,
                                    rules: [
                                        { type: 'gtZero', label: '数量', decimal: 2,required: true}
                                    ],
                                })(
                                    <Input onBlur={this.onMaterialQtyBlur}/>
                                    )}
                            </FormItem>
                            <FormItem {...formItemLayout} label='' className='material-unitName'>
                                {this.getFD('materialUnitName', {
                                    initialValue: material.materialUnitName,
                                    
                                })(
                                    <TextItemComp style={{width:'52px'}}/>
                                )}
                            </FormItem>
                        </div>
                        <FormItem {...formItemLayout} label='单位编码' style={{display:'none'}}>
                            {this.getFD('materialUnitCode', {
                                initialValue: material.materialUnitCode,
                                
                            })(
                                <Input disabled/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='批量价格'>
                            {this.getFD('batchPrice', {
                                initialValue: material.batchPrice,
                                rules: [
                                    { type: 'gtZero', label: '批量价格', decimal: 2, required: true}
                                ],
                                onChange: this.handleChangeBatchPrice
                            })(
                                <Input prefix={symbol} disabled={this.state.batchPriceDisabled} onBlur={this.onbatchPriceBlur}/>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label='物料名称' className='materailform-item-text'>
                            {this.getFD('materialName', {
                                initialValue: formatNullStr(material.materialName),
                            })(
                                <TextItemComp style={{width:'220px',textOverflow:'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap'}}/>
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='规格' className='materailform-item-text'>
                            {this.getFD('materialSpec', {
                                initialValue: formatNullStr(material.materialSpec),
                            })(
                                <TextItemComp style={{width:'220px',textOverflow:'ellipsis',overflow: 'hidden',whiteSpace: 'nowrap'}}/>
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='税率'>
                            {this.getFD('taxRate', {
                                initialValue: material.taxRate,
                                rules: [
                                    this.state.taxDisabled ?  { required:true,message:'税率 必填' } :
                                    { type: 'gtZero', label: '税率', decimal: 2, required: true }    
                                ],
                                onChange: this.handleChangeTax
                            })(
                                <Input suffix={`%`} disabled={this.state.taxDisabled} onBlur={this.onTaxBlur}/>
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='批量价格(含税)'>
                            {this.getFD('totalAmount', {
                                initialValue: material.totalAmount,
                                rules: [
                                    { type: 'gtZero', label: '批量价格(含税)', decimal: 2, required: true}
                                ],
                                onChange: this.handleChangeTotalAmount
                            })(
                                <Input prefix={symbol} disabled/>
                                )}
                        </FormItem>
                    </Col>
                </Row>
               
            </Form> 
        )
    }
}
AddPurPriceDetailDialogComp.defaultProps = {
    material: {
        materialCode: "",
        materialName: "",
        materialSpec: "",
        materialModel: "",
        materialUnitCode: "",
        materialQty: "",
        batchPrice: "",
        taxRate: "",
        totalAmount: "",
        materialUnitName:""
    }
}
AddPurPriceDetailDialogComp.propTypes = {
    material: PropTypes.object,
}

export default Form.create()(AddPurPriceDetailDialogComp);


