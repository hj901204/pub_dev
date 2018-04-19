import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Form, Input, Spin, Button, message, Row, Col,Select, DatePicker, Checkbox, Modal } from '../../../base/components/AntdComp';
// import SelectComp from '../../../base/components/SelectComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp'; 

import AddPurPriceDetailDialogCont from '../../dialogconts/OrderModule/AddPurPriceDetailDialogCont';
import AddPurPriceDetailForEditCont from '../../dialogconts/OrderModule/AddPurPriceDetailForEditCont';
import { disabledBeforeDate, disabledAfterDate } from '../../../base/consts/Utils';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const page = { 'page': 1, 'pageSize': 10 };


class AddPurchasePriceComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showform: true,
            showdetail: false,
            tax: 17,
            symbol: '￥',
            visible: false
        };
    }
    componentWillMount() {
        // this.props.CurList();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'edit') {
            if (nextProps.edit.current != this.props.edit.current) {
                this.resetFds();
            }
            if (nextProps.edit.detail != this.props.edit.detail) {
                this.setState({
                    symbol: nextProps.edit.detail.currencySymbol,
                    tax: nextProps.edit.detail.includeTaxFlag?17:0
                })
            }
        }
        if (nextProps.type == 'add') {
            if (nextProps.add.detail != this.props.add.detail) {
                this.resetFds();
            }
            if (nextProps.add.curList != this.props.add.curList && nextProps.add.detail.currencyCode=="") {
                let curList = nextProps.add.curList;
                curList = curList.filter(item => item.curName == 'RMB');
                curList.length>0&&this.setFdv({currencyCode:curList[0].curCode})
            }
        }
    }
    //保存
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                data.startTime = moment(data.startTime).format('YYYY-MM-DD');
                data.endTime = moment(data.endTime).format('YYYY-MM-DD');
                if (data.includeTaxFlag.length > 0) {
                    data.includeTaxFlag = 1;
                } else {
                    data.includeTaxFlag = 0;
                }
                data.taxRate = 17;
                data.orderStatus = this.props[this.props.type].detail.orderStatus;
                if (data.list.length === 0) {
                    message.warn('明细项不能为空');
                    return
                }
                if (!err) {
                    this.props.PurchasePriceCheckStatus(data.supplierCode).then(json => {
                        if (json.status === 2000) {
                            this.props.onOk && this.props.onOk(data);
                        } else if (json.status === 6000) {
                            this.setState({visible:true})
                        } else {
                            message.error(json.message[0].msg);
                        }
                    })
                    
                }
            });
        }
    }
    //弹窗确认
    submitOk = () => {
        this.setState({ visible: false });
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                data.startTime = moment(data.startTime).format('YYYY-MM-DD');
                data.endTime = moment(data.endTime).format('YYYY-MM-DD');
                if (data.includeTaxFlag.length > 0) {
                    data.includeTaxFlag = 1;
                } else {
                    data.includeTaxFlag = 0;
                }
                data.taxRate = 17;
                data.orderStatus = this.props[this.props.type].detail.orderStatus;
                this.props.onOk && this.props.onOk(data);
            })
        }   
    }
    //供应商下拉
    supplierSelect = (value) => {
        this.setFdv({
            supplierName: value.supplierFull
        });
    }
    //供应商搜索
    supplierSearch = (val) => {
        this.setFdv({
            supplierName: ''
        });
        return this.props.SupplierList({ supplierCode: val, supplierFull: val, ...page });
    }

    //币种选择
    curSelect = (val) => {
        this.props.CurDetail(val).then(json => {
            if (json.status === 2000) {
                this.setState({ symbol: json.data.list[0].symbol }, () => {
                    let list = this.getFdv('list');
                    list.length > 0 && list.map(item => {
                        item.currencySymbol = this.state.symbol;
                        return item;
                    })
                    this.setFdv({list})
                })
            }
        })
    }
    
    //是否含锐
    handleChangeTax = (val) => {
        let list = this.getFdv("list");
        let tax = 0, totalAmount=0, batchPrice=0;
        if (val.length>0) {
            tax = 17;
        };
        list.map(item => {
            item.taxRate = tax;
            item.totalAmount = (item.batchPrice * (1+tax/ 100)).toFixed(2);
            // item.batchPrice = (item.totalAmount / (1+tax/ 100)).toFixed(2);
            return item
        });
        this.setState({ tax });
        this.setFdv({ list })
    }
    //添加物料弹框
    handleSubmitDialog = (data) => {
        let list = this.getFdv('list');
        list.splice(0, 0, data);
        this.setFdv({
            list
        })
    }
    
    render() {
        let formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 13 },
        };
        let isTaxOptions = [
            { label: '是  默认17%', value: 'includeTaxFlag' },
        ];
        //cont中传过来的act方法
        let { SupplierList, MeasureList } = this.props;
        //redux数据
        let { loading, detail, supplierList, curList, addPurPriceDetail_visible, editPurPriceDetail_visible } = this.props[this.props.type];
        //数据处理
        // let curData = [];
        // curList.length>0&&curList.map(item => {
        //     let getCur = {};
        //     if (item.status == 1) {
        //         getCur.curCode = item.curCode;
        //         getCur.curName = item.curName;
        //         curData.push(getCur)
        //     }
        // })
        let DetailTableComp = this.props.DetailTableComp;
        return (
            <div className='addPurchasePrice-cont'>
                <Spin spinning={loading}>
                    {this.props.type == 'add' ?
                        <div className='addPurchasePrice-title'>
                            <Row style={{ height: '80px', lineHeight: '80px', border: '1px solid #e2e2e2' }}>
                                <Col span={3} style={{ paddingLeft: '20px', fontSize: '14px', fontWeight: 'bold' }} >新建采购价格清单</Col>
                                <Col span={19}></Col>
                                <Col span={2} style={{textAlign:'right',paddingRight:'20px'}}>
                                    <Button type='primary' onClick={this.handleSubmit} className="saveBtn"><i className="c2mfont c2m-baocun"></i>保存</Button>
                                </Col>
                            </Row>
                            <a className='form-showOrhide' onClick={() => { this.setState({ showform: !this.state.showform }) } }>
                                {this.state.showform?'收起':'展开'}
                            </a>
                        </div>
                        :
                        <div className='addPurchasePrice-title'>
                            <Row style={{ height: '80px', border: '1px solid #e2e2e2' }}>
                                <Col span={22} style={{padding:'18px 0 0 20px'}}>
                                    <p style={{fontSize:'14px',color:'#000',fontWeight:'blod'}}>信息总览：{detail.orderCode}</p>
                                    <p style={{fontSize:'12px',color:'#999'}}>
                                        <span>单据状态：{window.ENUM.getEnum("PurchasePriceStatus", (detail.orderStatus || 0) + '')}</span>
                                        <span style={{padding:'0 20px'}}>价格清单名称：{detail.priceName}</span>
                                        <span>供应商：{detail.supplierName}</span>
                                    </p>
                                </Col>
                                <Col span={2} style={{lineHeight:'80px',textAlign:'right',paddingRight:'20px'}}>
                                    <Button type='primary' onClick={this.handleSubmit} className="saveBtn"><i className="c2mfont c2m-baocun"></i>保存</Button>
                                </Col>
                            </Row>
                            <a className='form-showOrhide' onClick={() => { this.setState({ showform: !this.state.showform }) } }>
                                {this.state.showform?'收起':'展开'}
                            </a>
                        </div>}
                    <Form>
                    <div style={{ display: this.state.showform ? `block` : `none` }}>    
                        <div className='addPurchasePrice-form' >
                            <Row>
                                <Col span={8} className='priceItemTitle'>价格条件</Col>
                                <Col span={8} className='priceItemTitle'>供应商信息</Col>
                                <Col span={8} className='priceItemTitle'>其他信息</Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <FormItem label="价格清单名称" {...formItemLayout}>
                                        {this.getFD('priceName', {
                                            initialValue: detail.priceName || '',
                                            rules: [
                                                {type: 'numOrCnEn' },
                                                { max: 50, message: '价格清单名称不能超过50字符！'},
                                                { required: true, message: '价格清单名称 必填！' }
                                            ],
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                    <FormItem label="生效日期" {...formItemLayout}>
                                        {this.getFD('startTime', {
                                            initialValue: detail.startTime ? moment(detail.startTime, 'YYYY-MM-DD') : null,
                                            rules: [{ type: 'object', required: true, message: '生效日期 必填！' }],
                                        })(
                                            <DatePicker style={{ width: '100%' }}                                            
                                                disabledDate={(c) => disabledBeforeDate(c, moment())} 
                                                onChange={(date, dateString) => { 
                                                let endTime = this.getFdv('endTime');
                                                    if (endTime && date && date.valueOf() > endTime.valueOf()) {
                                                        this.setFdv({endTime:null})
                                                    }
                                                }}
                                            />
                                            )}
                                    </FormItem>
                                     <FormItem label="失效日期" {...formItemLayout}>
                                        {this.getFD('endTime', {
                                            initialValue: detail.endTime ? moment(detail.endTime, 'YYYY-MM-DD') : null,
                                            rules: [{ type: 'object', required: true, message: '失效日期 必填！' }],
                                        })(
                                            <DatePicker style={{ width: '100%' }}                                            
                                                disabledDate={(c) => {
                                                let compareDate = this.getFdv('startTime')&&this.getFdv('startTime').format('YYYY-MM-DD');
                                                let d= moment(compareDate,'YYYY-MM-DD').add(1, 'day');
                                                return disabledBeforeDate(c,d,true)
                                                } }
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="供应商编码" {...formItemLayout}>
                                        {this.getFD('supplierCode', {
                                            initialValue: detail.supplierCode || '',
                                            rules: [
                                                // {
                                                //     type: "autoselect",
                                                //     message: "请从下拉列表中选择一项！",
                                                //     list: supplierList,
                                                //     keyName: "supplierCode",
                                                // },
                                                { required: true, message: '供应商 必填！' }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                // width={210}
                                                selectedList={supplierList}
                                                onSelect={this.supplierSelect}
                                                onSearch={this.supplierSearch}
                                                displayName={["supplierCode", "supplierFull"]}
                                                keyName={"supplierCode"}
                                                optionLabelProp={`value`}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="供应商名称" {...formItemLayout}>
                                        {this.getFD('supplierName', {
                                            initialValue: detail.supplierName||'',
                                        })(
                                            <Input disabled/>
                                        )}
                                    </FormItem>
                                </Col>
                                 <Col span={8}>
                                    <FormItem label="币种" {...formItemLayout}>
                                        {this.getFD('currencyCode', {
                                            initialValue: detail.currencyCode || '',
                                            rules: [                               
                                                { required: true, message: '币种 必填！' }
                                            ],
                                        })(
                                                <Select notFoundContent={""} onSelect={this.curSelect}>
                                                {
                                                    Array.isArray(curList) ?
                                                        curList.map(item => {
                                                            return <Select.Option value={item.curCode} key={item.curCode}>{item.curName}</Select.Option>
                                                        }) : null
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                    <FormItem label="是否含税" {...formItemLayout}>
                                        {this.getFD('includeTaxFlag', {
                                            initialValue: detail.isTaxValue,
                                            onChange:this.handleChangeTax    
                                        })(
                                            <CheckboxGroup options={isTaxOptions} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <a className='detail-showOrhide' onClick={() => { this.setState({ showdetail: !this.state.showdetail }) } }>
                                {this.state.showdetail?'隐藏更多信息':'显示更多信息'}
                            </a>
                        </div>
                        <div style={{display:this.state.showdetail?`block`:`none`}} className='addPurchasePrice-remark'>
                            <Row>
                                <Col span={24}>
                                    <FormItem label="备注" labelCol={{ span: 1 }} wrapperCol={{ span: 21 }}>
                                        {this.getFD('remark', {
                                            initialValue: detail.remark || '',
                                            rules:[{max:200, message:'备注不能超过200字符！'}]
                                        })(
                                            <Input type='textarea' style={{ height: '50px' }} >
                                            </Input>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                        </div>
                        <div style={{ marginTop:'20px'}}>
                            <Row>
                                <Col span={2} className='priceItemTitle'>明细信息</Col>
                                <Col span={22} style={{ textAlign: 'right' }}>  
                                    <a href='#' onClick={() => this.props.PurPriceDialogVisiable(this.props.type, 'addPurPriceDetail_visible')}><i className='c2mfont c2m-tianjia' style={{ paddingRight: '5px' }} />添加物料</a>
                                    <a href='#' onClick={()=>this.props.ImportViewVisiable()}><i className='c2mfont c2m-daoru_nor' style={{ paddingRight: '2px',marginLeft:'20px'}}/>导入</a>
                                </Col>
                            </Row>
                            <FormItem wrapperCol={{ span: 24 }}>
                               {this.getFD('list', {
                                    initialValue: detail.list || [],
                                })(
                                    <DetailTableComp
                                        PurPriceDialogVisiable={this.props.PurPriceDialogVisiable}
                                        symbol={this.state.symbol}
                                        taxRate={this.state.tax}
                                        type={this.props.type}
                                        editPurPriceDetail_visible={editPurPriceDetail_visible}
                                    />
                                    )}
                            </FormItem>
                        </div>
                    </Form>
                </Spin>
                {
                    addPurPriceDetail_visible&&this.props.type=='add'?
                        <AddPurPriceDetailDialogCont
                            symbol={this.state.symbol}
                            taxRate={this.state.tax}
                            list={this.getFdv('list')}
                            handleSubmit={this.handleSubmitDialog}
                        /> : null
                }
                
                {
                    addPurPriceDetail_visible&&this.props.type=='edit'?
                        <AddPurPriceDetailForEditCont
                            symbol={this.state.symbol}
                            taxRate={this.state.tax}
                            list={this.getFdv('list')}
                            handleSubmit={this.handleSubmitDialog}
                        />: null
                }
                {this.state.visible?<Modal
                    title=""
                    visible={this.state.visible}
                    onOk={this.submitOk}
                    onCancel={() => { this.setState({visible:false}) } }
                >
                当前供应商存在已生效的价格清单，当前价格清单提交审批后会替代原价格清单
                </Modal>:null}
            </div>
        )
    }

}
export default Form.create()(AddPurchasePriceComp);

