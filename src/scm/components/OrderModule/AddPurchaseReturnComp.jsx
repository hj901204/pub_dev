import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, message, Row, Col, Select, DatePicker } from '../../../base/components/AntdComp';
import SelectComp from '../../../base/components/SelectComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import PurchaseReturnDetailComp from './PurchaseReturnDetailComp';
import { disabledBeforeDate, disabledAfterDate } from '../../../base/consts/Utils';

const FormItem = Form.Item;
const Option = Select.Option;
const page = { 'page': 1, 'pageSize': 10 };

class AddPurchaseReturnComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled: false,
            show:true,
            symbol: '￥',
            tax: 17,
            orderCode: "",
            supplierList: [],
            shippingAddressList: [],
            contactsList: [],
            buyerlist: [],
            siteList: [],
            purchaseOrgList: [],
            curList: [],
            costCenterList: [],
        };
        this.purchaseDisabled = false;
        this.supplierCode = '';
        this.orgCode = '';
        this.param = {
            purchaseCode: "",
            supplierCode: "",
            orderDate: moment(),
            receivingAddressCode: "",
            detailAddress: "",
            contactsCode: "",
            contactsTel: "",
            purchaseOrgCode: "",
            etdDate: "",
            siteCode: "",
            siteAddressDetl: "",
            buyerCode: "",
            curCode: "",
            costCenterCode: "",
            isTax: 1,
            tax: "",
            money: "",
            taxMoney: "",
            taxMoneyTotal: "",
            remarks: "",
            list: []
        };

    }
    //采购单号下拉
    purchaseSelect = (value) => {
        this.props.PurchaseDetail(value.orderCode).then(json => {
            if (json.status == 2000) {
                if (json.data) {
                    let data = json.data;
                    this.setFdv({
                        supplierCode: data.supplierCode, contactsCode: data.contactsCode,
                        contactsTel: data.contactsTel, purchaseOrgCode: data.purchaseOrgCode,
                        siteCode: data.siteCode, siteAddressDetl: data.siteAddressDetl,
                        buyerCode: data.buyerCode, curCode: data.curCode,
                        costCenterCode: data.costCenterCode, isTax: data.isTax.toString(),
                        receivingAddressCode: '', detailAddress: ''
                    });
                    if(data.contactsCode){
                        this.setState({contactsList:[{contactsCode:data.contactsCode,contactsName:data.contactsName,phone: data.contactsTel}]});
                    }else{
                        this.setState({contactsList:[]});
                    }
                    if(data.costCenterCode){
                        this.setState({costCenterList:[{orgCode:data.costCenterCode,orgName:data.costCenterName}]});
                    }else{
                        this.setState({costCenterList:[]});
                        this.props.getCostCenterList({ ...page });
                    }
                    if(data.curCode){
                        this.setState({curList:[{curCode:data.curCode,curName:data.curName}]});
                    }else{
                        this.setState({curList:[]});
                    }
                    if(data.siteCode){
                        this.setState({siteList:[{siteCode:data.siteCode,siteName:data.siteName}]});
                    }else{
                        this.setState({siteList:[]});
                        this.props.getSiteList({ ...page });
                    }
                    this.setState({
                        shippingAddressList: [],
                        supplierList:[{supplierCode:data.supplierCode,supplierFull:data.supplierName}],
                        purchaseOrgList:[{orgCode:data.purchaseOrgCode,orgName:data.purchaseOrgName}],
                        buyerlist:[{empCode:data.buyerCode,empName:data.buyerName}],
                    });
                    this.supplierCode = data.supplierCode;
                    this.props.getShippingAddressList({ bpCode: this.supplierCode, ...page });
                    this.props.getContactsList({ bpCode: this.supplierCode, ...page });
                }
            }
        });
        this.setState({ disabled: true, orderCode: value.orderCode });
        this.setFdv({ list: [] });
    }
    purchaseSearch = (val) => {
        this.setFdv({ list: [] });
        this.setFdv({
            supplierCode: '', contactsCode: '',
            contactsTel: '', purchaseOrgCode: '',
            siteCode: '', siteAddressDetl: '',
            buyerCode: '', curCode: '',
            costCenterCode: '', isTax: '1',
            receivingAddressCode: '', detailAddress: '',
            money: '', taxMoney: '', taxMoneyTotal: '',
        });
        this.setState({ 
            orderCode: "",
            disabled: false ,
            supplierList: [],
            purchaseOrgList: [],
            siteList: [],
            buyerlist: [],
            costCenterList: [],
            contactsList: [],
            curList: [],
            shippingAddressList: [],
        });
        this.props.DeleteData('supplierCode');
        this.props.getSiteList({ ...page });
        this.props.getCostCenterList({ ...page });
        return this.props.GetPurOrderList({ orderCode: val, ...page });
    }
    //供应商下拉
    supplierSelect = (value) => {
        let defaultAddress = value.defaultReceiveGoodsAddress, defaultContacts = value.defaultContacts;
         this.setFdv({
            detailAddress: defaultAddress.addressDetl, 
            receivingAddressCode: defaultAddress.addressCode,
            contactsCode: defaultContacts.contactsCode, 
            contactsTel: defaultContacts.phone
        });
        if (this.props.type == 'add') {
            if(this.props.defaultBuyer.buyerCode){
                let { buyerCode, purchaseOrgCode, buyerName, purchaseOrgName, buyerTel } = this.props.defaultBuyer;
                this.setFdv({
                    buyerCode,
                    purchaseOrgCode
                });
                
                this.setState({
                    purchaseOrgList: [{ orgCode: purchaseOrgCode, orgName: purchaseOrgName }],
                    buyerlist: [{ empCode: buyerCode, empName: buyerName, phone: buyerTel }]
                })
            }
            this.props.add.curList.map((item) => {
                if (item.curName == 'RMB') {
                    this.setFdv({
                        curCode: item.curCode,
                    });
                }
            })
        }
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
        this.props.getShippingAddressList({ bpCode: this.supplierCode,...page });
        this.props.getContactsList({ bpCode: this.supplierCode,...page });
    }

    supplierSearch = (val) => {
        this.setFdv({
            receivingAddressCode: '', contactsCode: '',
            detailAddress: '', contactsTel: ''
        });
        this.setState({ shippingAddressList: [], contactsList:[]});
        this.props.DeleteData('supplierCode');
        return this.props.getSupplierList({ supplierCode: val, supplierFull: val, ...page });
    }
    // 收货地址搜索
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
    receiveAdrList = (value) => {
        this.setFdv({ buyerCode: '' });
        this.props.DeleteData('purchaseOrgCode');
        this.setState({ buyerlist: [] });
        this.orgCode = value.orgCode;
        this.props.getBuyerlist({ deptCode: this.orgCode, ...page });
    }
    purchaseOrgSearch = (val) => {
        this.setFdv({
            buyerCode: '',
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
         if (this.state.buyerlist.length > 0) {
            this.setState({ buyerlist: [] });
            if (!val) {
                return;
            }
        }
        return this.props.getBuyerlist({deptCode:this.orgCode||this.props[this.props.type].orgCode,employeeCode:val,employeeName:val,...page})
    }
    //收货站点搜索
    siteSearch = (val) => {
        console.log(1);
        console.log(this.state.siteList);
        this.setFdv({ siteAddressDetl: ''});
         if (this.state.siteList.length > 0) {
            this.setState({ siteList: [] });
            if (!val) {
                return;
            }
        }
        return this.props.getSiteList({ siteCode: val, siteName: val, ...page });
    }
    //成本中心搜索
    costCenterSearch = (val) => {
         if (this.state.costCenterList.length > 0) {
            this.setState({ costCenterList: [] });
            if (!val) {
                return;
            }
        }
        return this.props.getCostCenterList({ orgCode: val, orgName: val, ...page })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.type == 'edit') {
            if (nextProps.purchaseReturnId != this.props.purchaseReturnId) {
                this.resetFds();
            }
            if (!nextProps.purchaseReturnDetail.purchaseCode) {
                this.setState({ orderCode: "" })
            } else if (nextProps.purchaseReturnDetail.purchaseCode != this.state.orderCode) {
                this.setState({ orderCode: nextProps.purchaseReturnDetail.purchaseCode })
            }
        }
    }
    //是否含锐
    handleChangeTax = (val) => {
        let list = this.getFdv("list");
        let tax = 0, money = 0, taxMoney = 0, taxMoneyTotal = 0;
        if (val == '1') {
            tax = 17;
        };
        list.map(item => {
            item.tax = tax;
            // item.money = (item.orderNumber * item.unitPrice / (tax / 100 + 1)).toFixed(2);//金额
            item.taxMoney = (item.orderNumber * item.unitPrice * tax / 100).toFixed(2);//税额
            // money = money + Number(item.money);
            taxMoney = taxMoney + Number(item.taxMoney);
            taxMoneyTotal = taxMoneyTotal + Number(item.taxMoneyTotal);
            item.money = (item.taxMoneyTotal - item.taxMoney).toFixed(2);
            money = money + Number(item.money);
            return item
        });
        this.setState({ tax });
        this.setFdv({ list })
        this.setFdv({ money: money.toFixed(2) });
        this.setFdv({ taxMoney: taxMoney.toFixed(2) });
        this.setFdv({ taxMoneyTotal:taxMoneyTotal.toFixed(2) });
    }
    //明细项更新
    handleChangeList = (list) => {
        // console.log('list',typeof list,list);
        let tax = 0, money = 0, taxMoney = 0, taxMoneyTotal = 0;
        if (Array.isArray(list)) {
            list.forEach(item => {
                money = money + Number(item.money);
                taxMoney = taxMoney + Number(item.taxMoney);
                taxMoneyTotal = taxMoneyTotal + Number(item.taxMoneyTotal);
            });
            this.setFdv({ money: money.toFixed(2) });
            this.setFdv({ taxMoney: taxMoney.toFixed(2) });
            this.setFdv({ taxMoneyTotal:taxMoneyTotal.toFixed(2) });
        }
        this.setFdv({ list });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                data.orderDate = moment(data.orderDate).format('YYYY-MM-DD');
                data.etdDate = moment(data.etdDate).format('YYYY-MM-DD');
                data.isTax = Number(data.isTax); 
                data.returnStatus = this.props.purchaseReturnDetail.returnStatus || 0;
                data.list.length>0&&data.list.forEach(item => {
                    delete item.selfLine;
                })
                if (data.purchaseCode) {
                    data.sourceOrderType = 1;
                } else {
                    data.sourceOrderType = 0;
                }
                if (data.list.length === 0) {
                    message.warn('明细项不能为空')
                }else{
                    let flag = false;
                    Array.isArray(data.list)&&data.list.map(item=>{
                        if(!item.materialCode||!item.unitPrice||!item.orderNumber||!item.measureUnitCode){
                            flag = true;
                        }
                    })
                    if(flag){
                        message.warn('明细项物料编码，数量，单位，单价不能为空')
                        return;
                    }
                }
                // console.log(data);
                if (!err && data.list.length !== 0) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }

    render() {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };

        let { type, GetPurOrderList, getSiteList, getContactsList, getPurchaseOrgList, getSupplierList, getShippingAddressList,
            getBuyerlist, getCostCenterList, purchaseReturnDetail, defaultBuyer, PurRetDialogVisiable } = this.props;
        let props = this.props;
        if (type == 'add') {
            purchaseReturnDetail = this.param;
            props = this.props.add;
        }
        if (type == 'edit') {
            props = this.props.edit;
            let {money, taxMoney, taxMoneyTotal} = purchaseReturnDetail;
            purchaseReturnDetail.money = money?Number(money).toFixed(2):'';
            purchaseReturnDetail.taxMoney = taxMoney||taxMoney===0?Number(taxMoney).toFixed(2):'';
            purchaseReturnDetail.taxMoneyTotal = taxMoneyTotal?Number(taxMoneyTotal).toFixed(2):'';
        }
        let { purchaseReLoading, purchaseList, supplierList, purchaseOrgList, curList, siteList, shippingAddressList,
            contactsList, buyerlist, costCenterList, orgCode, purchaseDetail } = props;
        return (
            <div style={{marginTop:12}}>
                <Spin spinning={purchaseReLoading}>
                    <div style={{position:'relative'}}>
                        {this.props.type == 'add' ?
                            <div >
                                <Row style={{ height: '60px', lineHeight: '60px', border: '1px solid #e2e2e2' }}>
                                    <Col span={12} style={{ paddingLeft: '16px', fontSize: '14px', color:'#4a4a4a' }} >新建采购退货单</Col>
                                    <Col span={12} style={{textAlign:'right',paddingRight:20}}>
                                        <Button type='primary' onClick={this.handleSubmit} style={{width:72,height:30,background:'#4c80cf'}} >
                                            <i className="c2mfont c2m-baocun" style={{fontSize:10,marginRight:6}}></i>保存
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            :
                            <div>
                                <Row style={{ height: '60px', lineHeight: '60px', border: '1px solid #e2e2e2' }}>
                                    <Col span={2} style={{ paddingLeft: '16px', fontSize: '14px', color:'#4a4a4a' }} >编辑采购退货单</Col>
                                    <Col span={20}></Col>
                                    <Col span={2} style={{textAlign:'right',paddingRight:20}}>
                                        <Button type='primary' onClick={this.handleSubmit} style={{width:72,height:30,background:'#4c80cf'}} >
                                            <i className="c2mfont c2m-baocun" style={{fontSize:10,marginRight:6}}></i>保存
                                        </Button>
                                    </Col>
                                </Row>
                            </div>}
                        <div style={{width:100,height:20,textAlign:'center',position:'absolute',bottom:'-10px',left:'50%',background:'#fff'}}>
                            <a  href="#" 
                                style={{width:'100%',height:"100%",lineHeight:'18px',color:"#999999",display:'inline-block',border:'1px solid #e2e2e2',borderRadius:"10px",textDecoration:'none'}}
                                onClick={() => {this.setState({ show: !this.state.show })
                            }}>
                                {this.state.show ? '收起' : '展开'}
                            </a>
                        </div>
                    </div>
                    <Form>
                        <div>
                            <div className="addPurchaseReturn_col" style={{display: this.state.show ? `block` : `none`}}>
                                <Row style={{fontSize:14,fontWeight:'bold'}}>
                                    <Col span={8} style={{padding:'24px 0 16px 16px',borderRight:'1px solid #e2e2e2'}}>基本信息</Col>
                                    <Col span={8} style={{padding:'24px 0 16px 16px',borderRight:'1px solid #e2e2e2'}}>发货信息</Col>
                                    <Col span={8} style={{padding:'24px 0 16px 16px'}}>其它信息</Col>
                                </Row>
                                <Row>
                                    <Col span={8} style={{borderRight:'1px solid #e2e2e2'}}>
                                        <FormItem label="退货单" {...formItemLayout}>
                                            {this.getFD('purchaseCode', {
                                                initialValue: purchaseReturnDetail.purchaseCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: purchaseList,
                                                        keyName: "orderCode",
                                                    },
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={purchaseList}
                                                    onSelect={this.purchaseSelect}
                                                    onSearch={this.purchaseSearch}
                                                    displayName={["orderCode"]}
                                                    keyName={"orderCode"}
                                                    disabled={type == 'add' ? false : true}
                                                    format="{0}"
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="供应商名称" {...formItemLayout}>
                                            {this.getFD('supplierCode', {
                                                initialValue: purchaseReturnDetail.supplierCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.supplierList.length>0?this.state.supplierList:supplierList,
                                                        keyName: "supplierCode",
                                                    },
                                                    { required: true, message: '供应商 必填！' }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.supplierList.length>0?this.state.supplierList:supplierList}
                                                    onSelect={this.supplierSelect}
                                                    onSearch={this.supplierSearch}
                                                    displayName={["supplierCode", "supplierFull"]}
                                                    keyName={"supplierCode"}
                                                    disabled={type == 'add' ? this.state.disabled : (purchaseReturnDetail.purchaseCode ? true : false)}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="退货日期" {...formItemLayout}>
                                            {this.getFD('orderDate', {
                                                initialValue: purchaseReturnDetail.orderDate ? moment(purchaseReturnDetail.orderDate, 'YYYY-MM-DD') : null,
                                                rules: [{ type: 'object', required: true, message: '退货日期 必填！' }],
                                            })(
                                                <DatePicker style={{ width: '100%' }}
                                                    onChange={(date, dateString) => { 
                                                        let pldDate = this.getFdv('etdDate');
                                                        if (pldDate && date.valueOf() > pldDate.valueOf()) {
                                                            this.setFdv({etdDate:null})
                                                        }
                                                    }}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="联系人" {...formItemLayout}>
                                            {this.getFD('contactsCode', {
                                                initialValue: purchaseReturnDetail.contactsCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.contactsList.length>0?this.state.contactsList:contactsList,
                                                        keyName: "contactsCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.contactsList.length>0?this.state.contactsList:contactsList}
                                                    onSelect={(value) => { this.setFdv({ contactsTel: value.phone }) }}
                                                    onSearch={this.contactsSearch}
                                                    displayName={["contactsCode", "contactsName"]}
                                                    keyName={"contactsCode"}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="联系电话" {...formItemLayout}>
                                            {this.getFD('contactsTel', {
                                                initialValue: purchaseReturnDetail.contactsTel || '',

                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem label="收货站点" {...formItemLayout}>
                                            {this.getFD('receivingAddressCode', {
                                                initialValue: purchaseReturnDetail.receivingAddressCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
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
                                                    onSelect={(value) => { this.setFdv({ detailAddress: value.addressDetl }); }}
                                                    onSearch={this.shippingAddressSearch}
                                                    displayName={["addressCode", "addressName"]}
                                                    keyName={"addressCode"}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="详细地址" {...formItemLayout}>
                                            {this.getFD('detailAddress', {
                                                initialValue: purchaseReturnDetail.detailAddress || '',

                                            })(
                                                <Input disabled />
                                                )}
                                        </FormItem>
                                        
                                    </Col>
                                    <Col span={8} style={{borderRight:'1px solid #e2e2e2'}}>
                                        <FormItem label="预计发货日期" {...formItemLayout}>
                                            {this.getFD('etdDate', {
                                                initialValue: purchaseReturnDetail.etdDate ? moment(purchaseReturnDetail.etdDate, 'YYYY-MM-DD') : null,
                                                rules: [{ type: 'object', required: true, message: '预计发货日期 必填！' }],
                                            })(
                                                <DatePicker style={{ width: '100%' }}
                                                    disabledDate={(c) => {
                                                        let compareDate=this.getFdv('orderDate').valueOf()>=Date.now()?this.getFdv('orderDate'):moment()
                                                        return disabledBeforeDate(c, compareDate);
                                                    } }
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="采购组织" {...formItemLayout}>
                                            {this.getFD('purchaseOrgCode', {
                                                initialValue: purchaseReturnDetail.purchaseOrgCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.purchaseOrgList.length>0?this.state.purchaseOrgList:purchaseOrgList,
                                                        keyName: "orgCode",
                                                    },
                                                    { required: true, message: '采购组织 必填！' }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.purchaseOrgList.length>0?this.state.purchaseOrgList:purchaseOrgList}
                                                    onSelect={this.purchaseOrgSelect}
                                                    onSearch={this.purchaseOrgSearch}
                                                    displayName={["orgCode", "orgName"]}
                                                    keyName={"orgCode"}
                                                    disabled={type == 'add' ? this.state.disabled : (purchaseReturnDetail.purchaseCode ? true : false)}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="采购员" {...formItemLayout}>
                                            {this.getFD('buyerCode', {
                                                initialValue: purchaseReturnDetail.buyerCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.buyerlist.length>0?this.state.buyerlist:buyerlist,
                                                        keyName: "empCode",
                                                    },
                                                    { required: true, message: '采购员 必填！' }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.buyerlist.length>0?this.state.buyerlist:buyerlist}
                                                    onSearch={this.buyerSearch}
                                                    displayName={["empCode", "empName"]}
                                                    keyName={"empCode"}
                                                    disabled={type == 'add' ? this.state.disabled : (purchaseReturnDetail.purchaseCode ? true : false)}
                                                />
                                                )}
                                        </FormItem>
                                        

                                        <FormItem label="发货站点" {...formItemLayout}>
                                            {this.getFD('siteCode', {
                                                initialValue: purchaseReturnDetail.siteCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.siteList.length>0?this.state.siteList:siteList,
                                                        keyName: "siteCode",
                                                    },
                                                    { required: (this.getFdv('purchaseCode') && purchaseDetail.sourceOrderType == 1) ? false : true, message: '发货站点 必填！' }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.siteList.length>0?this.state.siteList:siteList}
                                                    onSelect={(value) => this.setFdv({ siteAddressDetl: value.addressDetl })}
                                                    onSearch={this.siteSearch}
                                                    displayName={["siteCode", "siteName"]}
                                                    keyName={"siteCode"}
                                                    disabled={type == 'add' ? this.state.disabled : (purchaseReturnDetail.purchaseCode ? true : false)}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="发货地址" {...formItemLayout}>
                                            {this.getFD('siteAddressDetl', {
                                                initialValue: purchaseReturnDetail.siteAddressDetl || '',
                                                rules: [{ required: true, message: '发货地址 必填！' }],
                                            })(
                                                <Input disabled />
                                                )}
                                        </FormItem>
                                        <div style={{height:100}}></div>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="币种" {...formItemLayout}>
                                            {this.getFD('curCode', {
                                                initialValue: purchaseReturnDetail.curCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.curList.length>0?this.state.curList:curList,
                                                        keyName: "curCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.curList.length>0?this.state.curList:curList}
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
                                                initialValue: purchaseReturnDetail.costCenterCode || '',
                                                rules: [
                                                    {
                                                        type: "autoselect",
                                                        message: "请从下拉列表中选择一项！",
                                                        list: this.state.costCenterList.length>0?this.state.costCenterList:costCenterList,
                                                        keyName: "orgCode",
                                                    }
                                                ],
                                            })(
                                                <AutoSelectComp
                                                    key="select"
                                                    // width={210}
                                                    selectedList={this.state.costCenterList.length>0?this.state.costCenterList:costCenterList}
                                                    onSearch={this.costCenterSearch}
                                                    displayName={["orgCode", "orgName"]}
                                                    keyName={"orgCode"}
                                                    disabled={type == 'add' ? this.state.disabled : (purchaseReturnDetail.purchaseCode ? true : false)}
                                                />
                                                )}
                                        </FormItem>
                                        <FormItem label="单价含税" {...formItemLayout}>
                                            {this.getFD('isTax', {
                                                initialValue: purchaseReturnDetail.isTax != undefined ? purchaseReturnDetail.isTax.toString() : null,
                                                onChange: this.handleChangeTax
                                            })(
                                                <SelectComp
                                                    list={window.ENUM.getEnum("bool2")}
                                                    keyName="catCode"
                                                    labelName="catName"
                                                    style={{ width: 60 }}
                                                    disabled={type == 'add' ? this.state.disabled : (purchaseReturnDetail.purchaseCode ? true : false)}
                                                >
                                                    <span>（默认17%）</span>
                                                </SelectComp>
                                                )}
                                        </FormItem>
                                        <FormItem label="备注" {...formItemLayout}>
                                            {this.getFD('remarks', {
                                                initialValue: purchaseReturnDetail.remarks || '',
                                                rules:[{max:200, message:'备注不能超过200字符！'}]
                                            })(
                                                <Input type='textarea' style={{ height: '80px' }} ></Input>
                                                )}
                                        </FormItem>
                                        <FormItem label="金额" {...formItemLayout} style={{display:'none'}}>
                                            {this.getFD('money', {
                                                initialValue: purchaseReturnDetail.money || '',

                                            })(
                                                <Input prefix={this.state.symbol} disabled />
                                                )}
                                        </FormItem>
                                        <FormItem label="税额" {...formItemLayout} style={{display:'none'}}>
                                            {this.getFD('taxMoney', {
                                                initialValue: purchaseReturnDetail.taxMoney || '',

                                            })(
                                                <Input prefix={this.state.symbol} disabled />
                                                )}
                                        </FormItem>
                                        <FormItem label="税价合计" {...formItemLayout} style={{display:'none'}}>
                                            {this.getFD('taxMoneyTotal', {
                                                initialValue: purchaseReturnDetail.taxMoneyTotal || '',

                                            })(
                                                <Input prefix={this.state.symbol} disabled />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                                    
                            <div style={{position:'relative'}}>
                                <div style={{position:'absolute',top:'18px',left:'0'}}>明细信息</div>
                                <FormItem wrapperCol={{ span: 24 }}>
                                    {this.getFD('list', {
                                        initialValue: purchaseReturnDetail.list || [],
                                        onChange: this.handleChangeList,
                                    })(
                                        <PurchaseReturnDetailComp
                                            tax={this.state.tax}
                                            orderCode={this.state.orderCode}
                                            getMaterialList={this.props.getMaterialList}
                                            getMeasureList={this.props.getMeasureList}
                                            PurRetDialogVisiable={PurRetDialogVisiable}
                                            type={this.props.type}
                                        />
                                        )}
                                </FormItem>
                            </div>
                        </div>
                    </Form>

                </Spin>
            </div>
        )
    }

}
export default Form.create()(AddPurchaseReturnComp);