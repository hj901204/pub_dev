import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, message, Row, Col, Icon,Select, DatePicker } from '../../../base/components/AntdComp';
import SelectComp from '../../../base/components/SelectComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import RadioComp from '../../../base/components/RadioComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import PurchaseDetailComp from './PurchaseDetailComp';
import { disabledBeforeDate, disabledAfterDate } from '../../../base/consts/Utils';
const FormItem = Form.Item;
const Option = Select.Option;
const page = { 'page': 1, 'pageSize': 10 };

class AddPurchaseComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            componentMsg: "none",
            tax: 17,
            symbol: '￥',
            shippingAddressList: [],
            contactsList: [],
            purchaseOrgList: [],
            buyerlist: [],
            show: true,
            showMore: false,
        };
        this.supplierCode = '',
            this.orgCode = '';
        this.param = {
            supplierCode: "",
            orderDate: moment(),
            shippingAddressCode: "",
            detailAddress: "",
            contactsCode: "",
            contactsTel: "",
            purchaseOrgCode: "",
            pldDate: "",
            siteCode: "",
            siteAddressDetl: "",
            buyerCode: "",
            buyerTel: "",
            curCode: "",
            payCode: "",
            costCenterCode: "",
            isTax: 1,
            tax: "",
            money: "",
            taxMoney: "",
            taxMoneyTotal: "",
            remarks: "",
            sourceOrderType: 0,
            sourceOrderCode: "",
            list: [],
        };
    }
    showComponentMsg = () => {
        this.setState({ componentMsg: "block" });
    }
    //供应商下拉
    supplierSelect = (value) => {
        let defaultAddress = value.defaultSendGoodsAddress, defaultContacts = value.defaultContacts;
        this.setFdv({
            detailAddress: defaultAddress.addressDetl, 
            shippingAddressCode: defaultAddress.addressCode,
            contactsCode: defaultContacts.contactsCode, 
            contactsTel: defaultContacts.phone
        });
        if (defaultAddress.addressCode) {
            this.setState({ 
                shippingAddressList: [{ 
                    addressCode: defaultAddress.addressCode, 
                    addressName: defaultAddress.addressName,
                    addressDetl: defaultAddress.addressDetl,
                 }] 
            })
        }else{
            this.setState({shippingAddressList: []});
        }
        if (defaultContacts.contactsCode) {
            this.setState({ 
                contactsList: [{ 
                    contactsCode: defaultContacts.contactsCode, 
                    contactsName: defaultContacts.contactsName,
                    phone: defaultContacts.phone,
                }] 
            })
        }else{
            this.setState({contactsList:[]});
        }
        this.props.DeleteData('supplierCode');
        this.supplierCode = value.supplierCode;
        this.props.getShippingAddressList({ bpCode: this.supplierCode, ...page });  
        this.props.getContactsList({ bpCode: this.supplierCode, ...page });
    }
    supplierSearch = (val) => {
        this.setFdv({
            shippingAddressCode: '', contactsCode: '',
            detailAddress: '', contactsTel: ''
        });
        this.setState({ shippingAddressList: [], contactsList:[]});
        this.props.DeleteData('supplierCode');
        return this.props.getSupplierList({ supplierCode: val, supplierFull: val, ...page });
    }
    // 发货地址搜索
    shippingAddressSearch = (val) => {
        this.setFdv({detailAddress: ''});
        if (this.state.shippingAddressList.length > 0) {
            this.setState({ shippingAddressList: [] });
            if (!val) {
                return;
            }
        }
        return this.props.getShippingAddressList({ bpCode: this.supplierCode||this.props.supplierCode, addressCode: val, addressName: val, ...page})
    }
    // 联系人搜索
    contactsSearch = (val) => {
        this.setFdv({contactsTel: ''});
        if (this.state.contactsList.length > 0) {
            this.setState({ contactsList: [] });
            if (!val) {
                return;
            }
        }
        return this.props.getContactsList({ bpCode: this.supplierCode||this.props.supplierCode, contactsCode: val, contactsName: val, ...page})
    }
    //采购组织下拉
    purchaseOrgSelect = (value) => {
        this.setFdv({ buyerCode: '', buyerTel: '' });
        this.props.DeleteData('purchaseOrgCode');
        this.setState({ buyerlist: [] });
        this.orgCode = value.orgCode;
        this.props.getBuyerlist({ deptCode: this.orgCode, ...page });
    }
    purchaseOrgSearch = (val) => {
        this.setFdv({
            buyerCode: '', buyerTel: '',
        });
        this.props.DeleteData('purchaseOrgCode');
        this.setState({ buyerlist: [] });
        if (this.state.purchaseOrgList.length > 0) {
            this.setState({ purchaseOrgList: [] });
            if (!val) {
                return;
            }
        }
        return this.props.getPurchaseOrgList({ orgCode: val, orgName: val, ...page });
    }
    // 采购员搜索
    buyerSearch = (val) => {
        this.setFdv({ buyerTel: ''});
         if (this.state.buyerlist.length > 0) {
            this.setState({ buyerlist: [] });
            if (!val) {
                return;
            }
        }
        
        return this.props.getBuyerlist({deptCode:this.orgCode||this.props[this.props.type].orgCode,employeeCode:val,employeeName:val,...page})
    }
     // 站点搜索
    siteSearch = (val) => {
        this.setFdv({ siteAddressDetl: ''});
        return this.props.getSiteList({ siteCode: val, siteName: val, ...page })
    }
    
    //是否含锐
    handleChangeTax = (e) => {
        let list = this.getFdv("list"),
            val=e.target.value;
        let tax = 0, money = 0, taxMoney = 0, taxMoneyTotal = 0;
        if (val == '1') {
            tax = 17;
        };
        list.map(item => {
            item.tax = tax;
            item.taxMoney = (item.valuationNumber * item.unitPrice * tax / 100).toFixed(2);//税额
            item.money = (item.taxMoneyTotal - item.taxMoney).toFixed(2);
            return item
        });
        this.setState({ tax });
        this.setFdv({ list });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.purchaserId != this.props.purchaserId && this.props.type == 'edit') {
            this.resetFds();
        }
        if (nextProps.defaultBuyer != this.props.defaultBuyer && this.props.type == 'add' && nextProps.defaultBuyer.buyerCode != undefined) {
            let { buyerCode, purchaseOrgCode, buyerName, purchaseOrgName, buyerTel } = nextProps.defaultBuyer;
            this.setState({
                purchaseOrgList: [{ orgCode: purchaseOrgCode, orgName: purchaseOrgName }],
                buyerlist: [{ empCode: buyerCode, empName: buyerName, phone: buyerTel }]
            })
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                data.orderDate = moment(data.orderDate).format('YYYY-MM-DD');
                data.pldDate = moment(data.pldDate).format('YYYY-MM-DD');
                data.isTax = Number(data.isTax);
                data.sourceOrderType = Number(data.sourceOrderType);
                data.orderStatus = this.props.purchaseDetail.orderStatus || 0;
                if (data.list.length === 0) {
                    message.warn('明细项不能为空')
                }else{
                    let flag = false;
                    Array.isArray(data.list)&&data.list.map(item=>{
                        if(!item.materialCode||!item.unitPrice||!item.valuationNumber){
                            flag = true;
                        }
                    })
                    if(flag){
                        message.warn('明细项物料编码，订单数量，单价不能为空')
                        return;
                    }
                }
                if (!err && data.list.length !== 0) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    render() {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 13 },
        };

        let { getSiteList, getContactsList, getPurchaseOrgList, getSupplierList, getShippingAddressList, getCurList,
            getBuyerlist, getCostCenterList, getPaymentlist, defaultBuyer, purchaseDetail, Record, measurelist } = this.props;
        let list = [];
        let props = this.props;
        if (this.props.type == 'add') {
            if (defaultBuyer.buyerCode) {
                this.param.buyerCode = defaultBuyer.buyerCode;
                this.param.purchaseOrgCode = defaultBuyer.purchaseOrgCode;
                this.param.buyerTel = defaultBuyer.buyerTel;
            }
            this.props.add.curList.map((item) => {
                if (item.curName == 'RMB') {
                    this.param.curCode = item.curCode;
                }
            })
            purchaseDetail = this.param;
            list = [];
            props = this.props.add;
        }
        if (this.props.type == 'edit') {
            props = this.props.edit;
            let {money, taxMoney, taxMoneyTotal} = purchaseDetail;
            purchaseDetail.money = money?Number(money).toFixed(2):'';
            purchaseDetail.taxMoney = taxMoney||taxMoney===0?Number(taxMoney).toFixed(2):'';
            purchaseDetail.taxMoneyTotal = taxMoneyTotal?Number(taxMoneyTotal).toFixed(2):'';
            switch (purchaseDetail.sourceOrderType) {
                case 0: list = [];
                    break;
                case 1: list = ['supplierCode', 'orderDate', 'purchaseOrgCode', 'siteCode', 'isTax', 'buyerCode'];
                    break;
                case 2: list = ['isTax', 'pldDate'];
                    break;
                default: list = [];
                    break;
            }
        }
        let { purchaseLoading, supplierList, purchaseOrgList, curList, siteList, shippingAddressList,
            contactsList, buyerlist, costCenterList, paymentList, orgCode } = props;
        
        let { show, showMore } = this.state;
        return (
            <div className='purOrder-wrap'>
                <Spin spinning={purchaseLoading}>
                    <div className='purOrder-head'>
                        <span className="title">新建采购订单</span>
                        <Button type='primary' onClick={this.handleSubmit} >
                            <i className="c2mfont c2m-baocun" style={{paddingRight:7,fontSize:'12px'}}></i>
                            保存
                        </Button>
                        <a className="show-more-info" href="#" onClick={() => {
                            this.setState({ show: !show })
                        }}>{show ? '收起' : '展开'}</a>
                    </div> 
                    <Form>
                        <div className="purOrder-base-info" style={{ display: show ? `block` : `none` }}>
                            <Row>
                                <Col span={8}>
                                    <div className="info-title">
                                        <span><strong>基本信息</strong></span>
                                    </div>    
                                    <FormItem label="供应商名称" {...formItemLayout}>
                                        {this.getFD('supplierCode', {
                                            initialValue: purchaseDetail.supplierCode || '',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: supplierList,
                                                    keyName: "supplierCode",
                                                },
                                                { required: true, message: '供应商 必填！' }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={supplierList}
                                                onSelect={this.supplierSelect}
                                                onSearch={this.supplierSearch}
                                                displayName={["supplierCode", "supplierFull"]}
                                                keyName={"supplierCode"}
                                                disabled={list.includes('supplierCode') ? true : false}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="订单日期" {...formItemLayout}>
                                        {this.getFD('orderDate', {
                                            initialValue: purchaseDetail.orderDate ? moment(purchaseDetail.orderDate, 'YYYY-MM-DD') : null,
                                            rules: [{ type: 'object', required: true, message: '订单日期 必填！' }],
                                        })(
                                            <DatePicker style={{ width: '100%' }}
                                            disabled={list.includes('orderDate') ? true : false}
                                            onChange={(date, dateString) => { 
                                                let pldDate = this.getFdv('pldDate');
                                                if (pldDate && date.valueOf() > pldDate.valueOf()) {
                                                    this.setFdv({pldDate:null})
                                                }
                                            }}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="联系人" {...formItemLayout}>
                                        {this.getFD('contactsCode', {
                                            initialValue: purchaseDetail.contactsCode || '',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: this.state.contactsList.length > 0 ? this.state.contactsList : contactsList,
                                                    keyName: "contactsCode",
                                                }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={this.state.contactsList.length > 0 ? this.state.contactsList : contactsList}
                                                onSelect={(value) => { this.setFdv({ contactsTel: value.phone }) }}
                                                onSearch={this.contactsSearch}
                                                displayName={["contactsCode", "contactsName"]}
                                                keyName={"contactsCode"}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="联系电话" {...formItemLayout}>
                                        {this.getFD('contactsTel', {
                                            initialValue: purchaseDetail.contactsTel || '',

                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                     <FormItem label="发货地址" {...formItemLayout}>
                                        {this.getFD('shippingAddressCode', {
                                            initialValue: purchaseDetail.shippingAddressCode||'',
                                            rules: [
                                                {   type:"autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: this.state.shippingAddressList.length>0?this.state.shippingAddressList:shippingAddressList,
                                                    keyName: "addressCode",
                                                }
                                            ],
                                        })(
                                        <AutoSelectComp
                                            key="select"
                                            // width={210}
                                            selectedList={this.state.shippingAddressList.length>0?this.state.shippingAddressList:shippingAddressList}
                                            onSelect={(value) => { this.setFdv({ detailAddress: value.addressDetl}); } }
                                            onSearch={this.shippingAddressSearch}
                                            displayName={["addressCode","addressName"]}
                                            keyName={"addressCode"}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label="详细地址" {...formItemLayout}>
                                        {this.getFD('detailAddress', {
                                            initialValue: purchaseDetail.detailAddress || '',

                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <div className="info-title">
                                        <span><strong>收货信息</strong></span>
                                    </div>
                                    <FormItem label="计划收货日期" {...formItemLayout}>
                                        {this.getFD('pldDate', {
                                            initialValue: purchaseDetail.pldDate ? moment(purchaseDetail.pldDate, 'YYYY-MM-DD') : null,
                                            rules: [{ type: 'object', required: true, message: '计划收货日期 必填！' }],

                                        })(
                                            <DatePicker style={{ width: '100%' }}
                                                disabled={list.includes('pldDate') ? true : false}
                                                disabledDate={(c) => {
                                                    let compareDate = this.getFdv('orderDate').valueOf() >= Date.now() ? this.getFdv('orderDate') : moment()
                                                    return disabledBeforeDate(c, compareDate);
                                                }}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="采购组织" {...formItemLayout}>
                                        {this.getFD('purchaseOrgCode', {
                                            initialValue: purchaseDetail.purchaseOrgCode||'',
                                            rules: [
                                                {   type:"autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: this.state.purchaseOrgList.length>0?this.state.purchaseOrgList:purchaseOrgList,
                                                    keyName: "orgCode",
                                                },
                                                {required:true,message: '采购组织 必填！'}
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={this.state.purchaseOrgList.length>0?this.state.purchaseOrgList:purchaseOrgList}
                                                onSelect={this.purchaseOrgSelect}
                                                onSearch={this.purchaseOrgSearch}
                                                displayName={["orgCode","orgName"]}
                                                keyName={"orgCode"}
                                                disabled={purchaseDetail.purchaseOrgCode&&list.includes('purchaseOrgCode')?true:false}
                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="采购员" {...formItemLayout}>
                                        {this.getFD('buyerCode', {
                                            initialValue: purchaseDetail.buyerCode || '',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: this.state.buyerlist.length > 0 ? this.state.buyerlist : buyerlist,
                                                    keyName: "empCode",
                                                },
                                                { required: true, message: '采购员 必填！' }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={this.state.buyerlist.length > 0 ? this.state.buyerlist : buyerlist}
                                                onSelect={(value) => { this.setFdv({ buyerTel: value.phone }) }}
                                                onSearch={this.buyerSearch}
                                                displayName={["empCode", "empName"]}
                                                keyName={"empCode"}
                                                disabled={purchaseDetail.buyerCode && list.includes('buyerCode') ? true : false}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="联系电话" {...formItemLayout}>
                                        {this.getFD('buyerTel', {
                                            initialValue: purchaseDetail.buyerTel || '',
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                    <FormItem label="收货站点" {...formItemLayout}>
                                        {this.getFD('siteCode', {
                                            initialValue: purchaseDetail.siteCode || '',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: siteList,
                                                    keyName: "siteCode",
                                                },
                                                { required: this.props.type == 'add' ? true : (purchaseDetail.sourceOrderType == 1 ? false : true), message: '收货站点 必填!' }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={siteList}
                                                onSelect={(value) => this.setFdv({ siteAddressDetl: value.addressDetl })}
                                                onSearch={this.siteSearch}
                                                displayName={["siteCode", "siteName"]}
                                                keyName={"siteCode"}
                                                disabled={list.includes('siteCode') ? true : false}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="详细地址" {...formItemLayout}>
                                        {this.getFD('siteAddressDetl', {
                                            initialValue: purchaseDetail.siteAddressDetl || '',
                                            rules: [{ required: true, message: '收货地址 必填！' }],
                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <div className="info-title">
                                        <span><strong>财务信息</strong></span>
                                    </div>
                                    <FormItem label="来源订单号" {...formItemLayout}>
                                        {this.getFD('sourceOrderCode', {
                                            initialValue: purchaseDetail.sourceOrderCode || '',

                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                    <FormItem label="单据类型" {...formItemLayout}>
                                        {this.getFD('sourceOrderType', {
                                            initialValue: purchaseDetail.sourceOrderType != undefined ? purchaseDetail.sourceOrderType.toString() : null,
                                            rules: [{ required: true, message: '来源单据类型 必填！' }],
                                        })(
                                            <SelectComp
                                                list={window.ENUM.getEnum("purchaseSourceOrderType")}
                                                keyName="catCode"
                                                labelName="catName"
                                                style={{ width: '100%' }}
                                                disabled
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                                <a className="show-more-info" href="#" onClick={() => this.setState({ showMore: !showMore })}>{this.state.showMore ? '收起更多隐藏信息' :'展开更多隐藏信息'}</a>
                            </Row>
                        </div>
                        <div className="purOrder-other-info" style={{ display: showMore ? `block` : `none` }}>
                            <div className="info-title">
                                <span><strong>其他信息</strong></span>
                            </div>
                            <Row>
                                <Col span={8}>    
                                    <FormItem label="币种" {...formItemLayout}>
                                        {this.getFD('curCode', {
                                            initialValue: purchaseDetail.curCode || 'CH78',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: curList,
                                                    keyName: "curCode",
                                                }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={curList}
                                                onSelect={(value) => { this.setState({ symbol: value.symbol }) }}
                                                onSearch={(val) => getCurList({ curCode: val, curName: val, ...page })}
                                                displayName={["curCode", "curName"]}
                                                keyName={"curCode"}
                                                disabled
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="成本中心" {...formItemLayout}>
                                        {this.getFD('costCenterCode', {
                                            initialValue: purchaseDetail.costCenterCode || '',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: costCenterList,
                                                    keyName: "orgCode",
                                                }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={costCenterList}
                                                onSearch={(val) => getCostCenterList({ orgCode: val, orgName: val, ...page })}
                                                displayName={["orgCode", "orgName"]}
                                                keyName={"orgCode"}
                                            />
                                            )}
                                    </FormItem> 
                                </Col>
                                <Col span={8}>
                                    <FormItem label="付款条件" {...formItemLayout}>
                                        {this.getFD('payCode', {
                                            initialValue: purchaseDetail.payCode || '',
                                            rules: [
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: paymentList,
                                                    keyName: "catCode",
                                                }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                // width={210}
                                                selectedList={paymentList}
                                                onSearch={(val) => getPaymentlist({ subCode: 'C013', status: 1, catCode: val, catName: val, ...page })}
                                                displayName={["catCode", "catName"]}
                                                keyName={"catCode"}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem label="是否含税" {...formItemLayout}>
                                        {this.getFD('isTax', {
                                            initialValue: purchaseDetail.isTax != undefined ? purchaseDetail.isTax.toString() : null,
                                            onChange: this.handleChangeTax
                                        })(
                                        <RadioComp
                                            options={[{ label: '是', value: '1' },{label:'否',value:'0'}]}
                                            disabled={list.includes('isTax') ? true : false}
                                        >
                                            <span>（默认17%）</span>
                                        </RadioComp>
                                        )}
                                    </FormItem>
                                </Col>  
                                <Col span={8}>
                                    <FormItem label="备注" {...formItemLayout}>
                                        {this.getFD('remarks', {
                                            initialValue: purchaseDetail.remarks || '',
                                            rules: [{ max: 200, message: '备注不能超过200字符！' }]
                                        })(
                                            <Input type='textarea' style={{ height: '72px' }} >
                                            </Input>
                                            )}
                                    </FormItem>
                                </Col>  

                            </Row>
                        </div>
                        <div className="purOrder-detail-info">
                            <FormItem wrapperCol={{ span: 24 }}>
                                {this.getFD('list', {
                                    initialValue: purchaseDetail.list || [],
                                })(
                                    <PurchaseDetailComp
                                        {...this.props}
                                        getMaterialList={this.props.getMaterialList}
                                        getMeasureList={this.props.getMeasureList}
                                        tax={this.state.tax}
                                        sourceOrderType={purchaseDetail.sourceOrderType}
                                        curSymbol={purchaseDetail.curSymbol}
                                    />
                                    )}
                            </FormItem>
                        </div>
                    </Form>
                </Spin>
            </div>
        )
    }

}
export default Form.create()(AddPurchaseComp);

