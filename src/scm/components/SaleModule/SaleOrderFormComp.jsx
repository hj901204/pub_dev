import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker, Select, Button, Input, Form, Row, Col, Spin, Icon, message } from '../../../base/components/AntdComp';
import AutoSelectComp from "../../../base/components/AutoSelectComp"
import SelectComp from "../../../base/components/SelectComp"
import SaleOrderAddTableComp from "./SaleOrderAddTableComp";
import Validate from '../../../base/consts/ValidateList';
import SaleOrderAct from "../../actions/SaleModule/SaleOrderAct";
import { store } from "../../data/StoreConfig";
import { formatNullStr } from '../../../base/consts/Utils';
const Option = Select.Option;
const FormItem = Form.Item;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class SaleOrderFormComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
            show: true,
            tip: '收起',
            tipMore: '展开更多隐藏信息',
            showMore: true,
            disabled: true, //销售员下拉禁
            ship_address_disabled: false, //发货地址下拉禁
            consignee_disabled: true, //收货员下拉禁
            delivery_address_disabled: true, //收货地址下拉禁
            invoice_address_disabled: true, //发票地址下拉禁
            taxRate: 17.00,
            symbol: '￥',
            planDelivery: '',//日期
            isTax: '0',//是否含税
            amount: "0.00",
            tax: "0.00",
            totalAmount: "0.00"
        }
        this.param = {
            saleDetails: [],
        };
    }

    componentDidMount = () => {
        this.props.CustomersList({ customerCode: '', customerFull: '', customerAbt: '', page: 1, pageSize: 10 }, 'add');//客户列表
        this.props.OrgList({ orgType: 3, orgCode: '', orgName: '', page: 1, pageSize: 10 }, 'add');//销售组织
        this.props.CurrencyList({ curName: '', curCode: '', page: 1, pageSize: 10 }, 'add');//币种搜索
        this.props.CategoryList({ subCode: 'C013', catCode: '', catName: '', page: 1, pageSize: 10 }, 'add');//收款条件
        this.props.SiteList({ isSog: 1, siteCode: '', siteName: '', page: 1, pageSize: 10 }, 'add');//发货站点
    }
    //日期
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };
    startChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
        this.setState({
            planDelivery: value
        });
        //let saleDetails = this.props.form.getFieldValue('saleDetails');
        // saleDetails.map(item => {
        //     item.planDelivery = value.format('YYYY-MM-DD');
        // })
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };
    /*客户搜索*/
    onSearchCustomer = (value) => {
        this.props.CustomersList({ customerCode: value, customerFull: value, customerAbt: value, page: 1, pageSize: 10 }, 'add');
    };
    onSelectCustomer = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            customerCode: value.customerCode,
            invoiceTitle: value.customerFull,
            currency: value.currencyCode,
            currencyName: value.currencyName,
            contactsPerson: value.defaultContacts.contactsName,
            /*   contactsPersonCode: value.defaultContacts.contactsCode,*/
            contactsPhone: value.defaultContacts.phone,
            receiveAddressCode: value.defaultReceiveGoodsAddress.addressCode,
            receiveAddressDetails: value.defaultReceiveGoodsAddress.addressDetl,
            /*     receiveAddressName: value.defaultReceiveGoodsAddress.addressName,*/
            invoiceAddressCode: value.defaultBillingAddress.addressCode,
            invoiceAddressDetails: value.defaultBillingAddress.addressDetl,
            /*     invoiceAddressName: value.defaultBillingAddress.addressName,*/
        });
        this.props.ContactsList({ bpCode: value.customerCode, contactsCode: value.defaultContacts.contactsCode, contactsName: '', page: 1, pageSize: 10 }, 'add');
        this.props.ReceiveAddressList({ bpCode: value.customerCode, addressCode: value.defaultReceiveGoodsAddress.addressCode, addressName: '', page: 1, pageSize: 10, isRep: 1 }, 'add');
        this.props.InvaddressList({ isBil: 1, bpCode: value.customerCode, addressCode: value.defaultBillingAddress.addressCode, addressName: '', page: 1, pageSize: 10 }, 'add');//发票地址
    };
    handleChangeCustomer = (value) => {
        if (value == '') {
            this.props.ContactsList({ bpCode: '', contactsCode: '', contactsName: '', page: 1, pageSize: 10 }, 'add');
            this.props.ReceiveAddressList({ bpCode: '', addressCode: '', addressName: '', page: 1, pageSize: 10, isRep: 1 }, 'add');
            this.props.InvaddressList({ isBil: 1, bpCode: '', addressCode: '', addressName: '', page: 1, pageSize: 10 }, 'add');//发票地址
            const { setFieldsValue } = this.props.form;
            setFieldsValue({
                customerCode: '',
                invoiceTitle: '',
                currency: '',
                currencyName: '',
                contactsPerson: '',
                /*    contactsPersonCode: '',*/
                contactsPhone: '',
                receiveAddressCode: '',
                receiveAddressDetails: '',
                /*     receiveAddressName: value.defaultReceiveGoodsAddress.addressName,*/
                invoiceAddressCode: '',
                invoiceAddressDetails: '',
                /*     invoiceAddressName: value.defaultBillingAddress.addressName,*/
            });
        }
        if (this.state.consignee_disabled) {
            this.setState({
                consignee_disabled: false,
                invoice_address_disabled: false,
                delivery_address_disabled: false
            })
        }

    };
    /*收货人搜索*/
    onSearchReceiver = (value) => {
        const { getFieldValue } = this.props.form;
        let code = getFieldValue('customerCode')
        this.props.ContactsList({ bpCode: code, contactsCode: value, contactsName: value, page: 1, pageSize: 10 }, 'add');
    };
    handleSelectReceiver = (value, option) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            contactsPhone: option.props.value,
        });
    };

    //选择收货人
    onSelectContact = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            contactsPhone: value.phone,
            /*   contactsPerson: value.contactsName,*/
        });
    };
    //改变收货人
    handleChangeContact = (value) => {
        if (value == '') {
            const { setFieldsValue } = this.props.form;
            setFieldsValue({
                contactsPhone: ''
            });
        }

    };
    /*收货地址搜索*/
    onSearchShipAddress = (value) => {
        const { getFieldValue } = this.props.form;
        let code = getFieldValue('customerCode')
        this.props.ReceiveAddressList({ bpCode: code, addressCode: value, addressName: value, page: 1, pageSize: 10, isRep: 1 }, 'add');
    };
    handleSelectShipAddress = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            receiveAddressDetails: value.addressDetl,
            receiveAddressCode: value.addressCode,
        });
    };
    handleChangeShipAddress = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value == '') {
            setFieldsValue({
                receiveAddressDetails: '',
            });
        }

    }
    /*销售组织搜索*/
    onSearchSaleOrg = (value) => {
        this.props.OrgList({ orgType: 3, orgCode: value, orgName: value, page: 1, pageSize: 10 }, 'add');
    };
    handleChangeSaleOrg = (value) => {
        if (value == '') {
            this.props.GetEmployeeList('', 'add')
            /*  this.props.EmployeeList({deptCode:'', employeeCode:'',employeeName:'',page:1,pageSize:10}, 'add')*/
            const { setFieldsValue } = this.props.form;
            setFieldsValue({
                salesmanCode: '',
                salesmanPhone: ''
            })
        }
        if (this.state.disabled) {
            this.setState({
                disabled: false
            })
        }
    };
    handleSelectSaleOrg = (value) => {
        this.props.EmployeeList({ deptCode: value.orgCode, employeeCode: '', employeeName: '', page: 1, pageSize: 10 }, 'add')
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            salesmanCode: '',
            salesmanPhone: '',
            saleOrgCode: value.orgCode
        });
    }
    /*销售员搜索*/
    onSearchSaleMan = (value) => {
        const { getFieldValue } = this.props.form;
        let code = getFieldValue('saleOrgCode')
        this.props.EmployeeList({ deptCode: code, employeeCode: value, employeeName: '', page: 1, pageSize: 10 }, 'add')
    };
    handleSelectSaleMan = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            salesmanPhone: value.phone,
            salesmanCode: value.empCode,
        });
    };
    handleChangeSaleMan = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value == '') {
            setFieldsValue({
                salesmanPhone: '',

            });
        }
        if (this.state.ship_address_disabled) {
            this.setState({
                ship_address_disabled: false
            })
        }
        /*   setFieldsValue({
               shipAddressDetails: '',
               shipAddressName: '',
           });*/
    };
    /*发货地址搜索*/
    onSearchSite = (value) => {
        this.props.SiteList({ isSog: 1, siteCode: value, siteName: value, page: 1, pageSize: 10 }, 'add')
    };
    handleSelectSite = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            shipAddressDetails: value.addressDetl,
            shipAddressCode: value.siteCode,
        });
    };
    handleChangeSite = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value == '') {
            setFieldsValue({
                shipAddressDetails: '',
            });
        }

    };
    /*收款条件搜索*/
    onSearchCollection = (value) => {
        this.props.CategoryList({ subCode: 'C013', catCode: value, catName: value, page: 1, pageSize: 10 }, 'add');
    };
    handleSelectCollection = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            collectionTermsCode: value.catCode,
        });
    };
    /*币种搜索*/
    onSearchCurrency = (value) => {
        this.props.CurrencyList({ curName: value, curCode: value, page: 1, pageSize: 10 }, 'add');
    };
    handleSelectCurrency = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            currency: value.curCode,
        });
    };
    handleChangeCurrency = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value == '') {
            setFieldsValue({
                currency: '',
            });
        }
    };
    /*发票地址搜索*/
    onSearchInvoice = (value) => {
        const { getFieldValue } = this.props.form;
        let code = getFieldValue('customerCode')
        this.props.InvaddressList({ isBil: 1, bpCode: code, addressCode: value, addressName: value, page: 1, pageSize: 10 }, 'add');//发票地址
    };
    handleSelectInvoice = (value) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            invoiceAddressDetails: value.addressDetl,
            invoiceAddressCode: value.addressCode
        });
    };
    handleChangeInvoice = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value == '') {
            setFieldsValue({
                invoiceAddressDetails: '',
            });
        }

    };
    onTaxChange = (value) => {
        const { setFieldsValue } = this.props.form;
        if (value == 1) {
            setFieldsValue({
                taxRate: 0.00,
            });
        } else {
            setFieldsValue({
                taxRate: 17.00,
            });
        }
    };
    toggle = () => {
        this.setState({
            tip: this.state.show ? '展开' : '收起',
            show: this.state.show ? false : true
        })
    };
    toggleMore = () => {
        this.setState({
            tipMore: this.state.showMore ? '收起更多隐藏信息' : '展开更多隐藏信息',
            showMore: this.state.showMore ? false : true
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (data.saleDetails.length === 0) {
                message.warn('明细项不能为空');
                return;
            } else {
                let flag = false;
                Array.isArray(data.saleDetails) && data.saleDetails.map(item => {
                    if (!item.materialCode || !item.unitPrice || !item.materialNum) {
                        flag = true;
                    }
                })
                if (flag) {
                    message.warn('明细项物料编码，数量，单价不能为空')
                    return;
                }
            }
            if (!err) {
                let obj = Object.assign({}, data, { orderDate: data.orderDate ? data.orderDate.format('YYYY-MM-DD') : '' }, { planDelivery: data.planDelivery.format('YYYY-MM-DD') }, { saleDetails: data.saleDetails.reverse() }, {amount:this.state.amount}, {tax:this.state.tax}, {totalAmount:this.state.totalAmount})
                this.props.Save(obj);
            }
        });
    };
    //日期联动
    // onStartChange = (field, val) => {
    //     let saleDetails = this.props.form.getFieldValue('saleDetails');
    //     saleDetails.map(item => {
    //         item.planDelivery = val.format('YYYY-MM-DD');
    //     })
    // }
    //是否含税
    handleChangeTax = (val) => {
        let taxRate = 0.00, amount = 0, tax = 0, totalAmount = 0;
        let saleDetails = this.props.form.getFieldValue('saleDetails');
        if (val == '0') {
            this.setState({
                isTax: '0'
            });
            taxRate = 17.00;
            saleDetails.map(item => {
                item.taxRate = taxRate;
                item.amount = ((item.materialNum * item.unitPrice)).toFixed(2);//金额
                item.tax = ((item.amount * item.taxRate) / 100).toFixed(2);//税额
                item.totalAmount = (Number(item.amount) + Number(item.tax)).toFixed(2);
                if (item.isDonation == "0") {
                    amount = Number(amount).toFixed(2);
                    tax = Number(tax).toFixed(2);
                    totalAmount = Number(totalAmount).toFixed(2);
                } else {
                    amount = Number(Number(amount) + Number(item.amount)).toFixed(2);
                    tax = Number(Number(tax) + Number(item.tax)).toFixed(2);
                    totalAmount = Number(Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                }
                return item
            });
        } else if (val == '1') {
            this.setState({
                isTax: '1'
            });
            taxRate = 0.00;
            saleDetails.map(item => {
                item.taxRate = taxRate;
                item.amount = ((item.materialNum * item.unitPrice)).toFixed(2);//金额
                item.tax = ((item.amount * item.taxRate) / 100).toFixed(2);//税额
                item.totalAmount = (Number(item.amount) + Number(item.tax)).toFixed(2);
                if (item.isDonation == "0") {
                    amount = (Number(amount)).toFixed(2);
                    tax = (Number(tax)).toFixed(2);
                    totalAmount = (Number(totalAmount)).toFixed(2);
                } else {
                    amount = Number(Number(amount) + Number(item.amount)).toFixed(2);
                    tax = Number(Number(tax) + Number(item.tax)).toFixed(2);
                    totalAmount = Number(Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                }
                return item
            });
        }
        this.setState({ taxRate });
        this.props.changeMXVal(amount, tax, totalAmount)
        // this.setState({ amount });
        // this.setState({ tax });
        // this.setState({ totalAmount });
        this.props.form.setFieldsValue({ saleDetails });
        // this.props.form.setFieldsValue({ amount });
        // this.props.form.setFieldsValue({ tax });
        // this.props.form.setFieldsValue({ totalAmount });
    }
    //明细项更新
    handleChangeList = (saleDetails) => {
        let taxRate = 0, amount = 0, tax = 0, totalAmount = 0;
        saleDetails.forEach(item => {
            if (item.isDonation == "0") {
                amount = (Number(amount)).toFixed(2);
                tax = (Number(tax)).toFixed(2);
                totalAmount = (Number(totalAmount)).toFixed(2);
            } else {
                if (this.props.form.getFieldValue('isTax') == 1) {
                    amount = (Number(amount) + Number(item.amount)).toFixed(2);
                    tax = 0;
                    totalAmount = (Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                } else {
                    amount = (Number(amount) + Number(item.amount)).toFixed(2);
                    tax = (Number(tax) + Number(item.tax)).toFixed(2);
                    totalAmount = (Number(totalAmount) + Number(item.totalAmount)).toFixed(2);
                }
            }
        });

        this.setState({ saleDetails });
        this.props.changeMXVal(amount, tax, totalAmount)
        // this.setState({ amount });
        // this.setState({ tax });
        // this.setState({ totalAmount });
        this.props.form.setFieldsValue({ saleDetails });
        // this.props.form.setFieldsValue({ amount });
        // this.props.form.setFieldsValue({ tax });
        // this.props.form.setFieldsValue({ totalAmount });  
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { customerSource, orgSource, contactsSource, currencySource, categorySource, invaddressSource, siteSource, receiveAddressSource, employeeSource } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        const { startValue, endValue, endOpen } = this.state;
        const { saleOrderInfo, orderTotal } = this.props;
        return (
            <div className="saleOrder-wrap">
                <div className="saleOrder-header">
                    <div className="saleOrder-head-border">
                        <span className="saleOrder-header-title">{this.props.title}</span>
                        <Button className="default-btn save" onClick={this.handleSubmit}><i className="c2mfont c2m-baocun" style={{ paddingRight: 7, fontSize: 10 }}></i>保存</Button>
                        <a className="show-or-hide" href="#" onClick={this.toggle}>{this.state.tip}</a>
                    </div>
                </div>

                <Form className="saleOrder-form" onSubmit={this.handleSubmit}>
                    <div className="saleOrder-body-border" style={{ display: this.state.show ? `block` : `none` }}>
                        <div className="saleOrder-body-top">
                            <Row type="flex" justify="end">
                                <Col className="saleOrder-body-top-borderR" span={8}>
                                    <div className="saleOrder-baseInfo">
                                        <span className="saleOrder-form-baseInfo"><strong>基本信息</strong></span>
                                    </div>
                                    <FormItem FormItem {...formItemLayout} label="客户名称:">
                                        {getFieldDecorator('customerCode', {
                                            initialValue: '',
                                            rules: [
                                                { type: "string", message: "客户名称为必填", required: true },
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: customerSource,
                                                    keyName: "customerCode",
                                                    required: true
                                                }),
                                            ]
                                        })(
                                            <AutoSelectComp
                                                selectedList={customerSource}
                                                onSearch={this.onSearchCustomer}
                                                displayName={["customerCode", "customerFull"]}
                                                keyName={"customerCode"}
                                                onChange={this.handleChangeCustomer}
                                                onSelect={this.onSelectCustomer}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*         <FormItem FormItem {...formItemLayout} label="客户编号:">
                                {getFieldDecorator('customerCode', {
                                    initialValue: '',
                                })(
                                    <Input disabled />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="订单日期:">
                                        {getFieldDecorator('orderDate', {
                                            initialValue: moment(),
                                            rules: [
                                                { message: "订单日期为必填", required: true },
                                            ],

                                        })(
                                            <DatePicker
                                                disabledDate={this.disabledStartDate}
                                                showTime
                                                format="YYYY-MM-DD"
                                                onChange={this.startChange}
                                                onOpenChange={this.handleStartOpenChange}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="收货人:">
                                        {getFieldDecorator('contactsPerson', {
                                            initialValue: '',
                                            rules: [
                                                { type: "string", message: "收货人为必填" },
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={contactsSource}
                                                disabled={this.state.consignee_disabled}
                                                onSearch={this.onSearchReceiver}
                                                displayName={["contactsCode", "contactsName", "phone"]}
                                                keyName={"contactsName"}
                                                onSelect={this.onSelectContact}
                                                onChange={this.handleChangeContact}
                                                optionLabelProp="value"
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*  <FormItem FormItem {...formItemLayout} label="收货人名称:" style={{ display: `none` }}>
                                {getFieldDecorator('contactsPerson', {
                                    initialValue: '',
                                })(
                                    <Input />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="联系电话:">
                                        {getFieldDecorator('contactsPhone', {
                                            initialValue: saleOrderInfo.contactsPhone,
                                            rules: [
                                                Validate({
                                                    type: "phone",
                                                    message: "不是有效的手机号码！",
                                                }),
                                            ],
                                            //phone
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="收货地址:">
                                        {getFieldDecorator('receiveAddressCode', {
                                            initialValue: saleOrderInfo.receiveAddressName,
                                            rules: [
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: receiveAddressSource,
                                                    keyName: "addressCode",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={receiveAddressSource}
                                                displayName={["addressCode", "addressName"]}
                                                keyName={"addressCode"}
                                                disabled={this.state.delivery_address_disabled}
                                                onSearch={this.onSearchShipAddress}
                                                onSelect={this.handleSelectShipAddress}
                                                onChange={this.handleChangeShipAddress}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*   <FormItem FormItem {...formItemLayout} label="收货地址编号:">
                                {getFieldDecorator('receiveAddressCode', {
                                    initialValue: saleOrderInfo.receiveAddressCode,
                                })(
                                    <Input disabled />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="详细地址">
                                        {getFieldDecorator('receiveAddressDetails', {
                                            initialValue: saleOrderInfo.receiveAddressDetails,
                                            rules: [
                                                { type: "string", message: "详细地址为必填", required: true },
                                            ],

                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                </Col>

                                <Col className="saleOrder-body-top-borderR" span={8}>
                                    <div className="saleOrder-baseInfo">
                                        <span className="saleOrder-form-baseInfo"><strong>发货信息</strong></span>
                                    </div>
                                    <FormItem FormItem {...formItemLayout} label="销售组织:">
                                        {getFieldDecorator('saleOrgCode', {
                                            initialValue: '',
                                            rules: [
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: orgSource,
                                                    keyName: "orgCode",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={orgSource}
                                                displayName={["orgCode", "orgName"]}
                                                keyName={"orgCode"}
                                                onSearch={this.onSearchSaleOrg}
                                                onChange={this.handleChangeSaleOrg}
                                                onSelect={this.handleSelectSaleOrg}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/* <FormItem FormItem {...formItemLayout} label="销售组织编号:">
                                {getFieldDecorator('saleOrgCode', {
                                    initialValue: '',
                                })(
                                    <Input disabled />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="预计交货日期:">
                                        {getFieldDecorator('planDelivery', {
                                            rules: [
                                                { message: "预计交货日期为必填", required: true },
                                            ],
                                        })(
                                            <DatePicker
                                                disabledDate={this.disabledEndDate}
                                                showTime
                                                format="YYYY-MM-DD"
                                                onChange={this.onEndChange}
                                                open={endOpen}
                                                onOpenChange={this.handleEndOpenChange}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="销售员:">
                                        {getFieldDecorator('salesmanCode', {
                                            initialValue: '',
                                            rules: [
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: employeeSource,
                                                    keyName: "empCode",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={employeeSource}
                                                displayName={["empCode", "empName"]}
                                                keyName={"empCode"}
                                                disabled={this.state.disabled}
                                                onSearch={this.onSearchSaleMan}
                                                onSelect={this.handleSelectSaleMan}
                                                onChange={this.handleChangeSaleMan}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*   <FormItem FormItem {...formItemLayout} label="销售员编号:">
                                {getFieldDecorator('salesmanCode', {
                                    initialValue: saleOrderInfo.salesmanCode,
                                })(
                                    <Input disabled />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="联系电话:">
                                        {getFieldDecorator('salesmanPhone', {
                                            initialValue: saleOrderInfo.salesmanPhone,
                                            rules: [
                                                Validate({
                                                    type: "phone",
                                                    message: "不是有效的手机号码！",
                                                }),
                                            ],
                                            //phone
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="发货站点:">
                                        {getFieldDecorator('shipAddressCode', {
                                            initialValue: '',
                                            rules: [
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: siteSource,
                                                    keyName: "siteCode",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={siteSource}
                                                displayName={["siteCode", "siteName"]}
                                                keyName={"siteCode"}
                                                disabled={this.state.ship_address_disabled}
                                                onSearch={this.onSearchSite}
                                                onSelect={this.handleSelectSite}
                                                onChange={this.handleChangeSite}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*   <FormItem FormItem {...formItemLayout} label="发货地址编号:">
                                {getFieldDecorator('shipAddressCode', {})(
                                    <Input disabled />
                                )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="详细地址">
                                        {getFieldDecorator('shipAddressDetails', {
                                            initialValue: saleOrderInfo.shipAddressDetails,
                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <div className="saleOrder-baseInfo saleOrder-tit">
                                        <span className="saleOrder-form-baseInfo"><strong>财务信息</strong></span>
                                    </div>
                                    <FormItem FormItem {...formItemLayout} label="发票抬头:">
                                        {getFieldDecorator('invoiceTitle', {
                                            initialValue: saleOrderInfo.invoiceTitle,
                                            rules: [{ type: "string", message: '发票抬头为必填', required: true, },
                                            { message: '发票抬头不能超过50字段', max: 50 }]
                                        }
                                        )(
                                            <Input />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="收款条件:">
                                        {getFieldDecorator('collectionTermsCode', {
                                            initialValue: '',
                                            rules: [
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: categorySource,
                                                    keyName: "catCode",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={categorySource}
                                                displayName={["catCode", "catName"]}
                                                keyName={"catCode"}
                                                onSearch={this.onSearchCollection}
                                                optionFilterProp="children"
                                                onSelect={this.handleSelectCollection}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*  <FormItem FormItem {...formItemLayout} label="收款条件编号:">
                                {getFieldDecorator('collectionTermsCode', {
                                    initialValue: saleOrderInfo.collectionTermsCode,
                                })(
                                    <Input disabled />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="币种:">
                                        {getFieldDecorator('currencyName', {
                                            initialValue: 'RMB',
                                            rules: [
                                                { message: "币种为必填", required: true },
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: currencySource,
                                                    keyName: "curName",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={currencySource}
                                                displayName={["curCode", "curName"]}
                                                keyName={"curName"}
                                                onSearch={this.onSearchCurrency}
                                                optionFilterProp="children"
                                                onSelect={this.handleSelectCurrency}
                                                onChange={this.handleChangeCurrency}
                                                optionLabelProp="value"
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="币种编号:" style={{ display: `none` }}>
                                        {getFieldDecorator('currency', {
                                            initialValue: saleOrderInfo.currency,
                                        })(
                                            <Input />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="发票地址:">
                                        {getFieldDecorator('invoiceAddressCode', {
                                            initialValue: '',
                                            rules: [
                                                Validate({
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: invaddressSource,
                                                    keyName: "addressCode",
                                                }),
                                            ],
                                        })(
                                            <AutoSelectComp
                                                selectedList={invaddressSource}
                                                displayName={["addressCode", "addressName"]}
                                                keyName={"addressCode"}
                                                onSearch={this.onSearchInvoice}
                                                onSelect={this.handleSelectInvoice}
                                                onChange={this.handleChangeInvoice}
                                            >
                                            </AutoSelectComp>
                                            )}
                                    </FormItem>
                                    {/*  <FormItem FormItem {...formItemLayout} label="发票地址编号:">
                                {getFieldDecorator('invoiceAddressCode', {
                                    initialValue: saleOrderInfo.invoiceAddressCode,
                                })(
                                    <Input disabled />
                                    )
                                }
                            </FormItem>*/}
                                    <FormItem FormItem {...formItemLayout} label="详细地址">
                                        {getFieldDecorator('invoiceAddressDetails', {
                                            initialValue: '',
                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="是否含税">
                                        {getFieldDecorator('isTax', {
                                            initialValue: '0',
                                            onChange: this.handleChangeTax
                                        })(
                                            <Select style={{ width: 100 }} onChange={this.handleChangeTax}>
                                                <Option value="0">是</Option>
                                                <Option value="1">否</Option>
                                            </Select>
                                            )}<span>（默认17%）</span>
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="税率:" style={{ display: `none` }}>
                                        {getFieldDecorator('taxRate', {
                                            initialValue: 17,
                                        })(
                                            <Input />
                                            )
                                        }
                                    </FormItem>
                                    <a className="show-and-hide" href="#" onClick={this.toggleMore}>{this.state.tipMore}</a>
                                </Col>
                            </Row>
                        </div>
                        {/*<div className="other-info-block">
                            <a className="show-or-hide" href="#" onClick={this.toggle}>{this.state.tip}<Icon
                                type={this.state.show ? "up" : "down"} /></a>
                        </div>*/}
                        <div className="saleOrder-body-down" style={{ display: this.state.showMore ? `none` : `block` }}>
                            <div className="other-info-form">
                                <div className="saleOrder-baseInfo">
                                    <span className="saleOrder-form-baseInfo"><strong>其他信息</strong></span>
                                </div>
                                <Row type="flex" justify="end">
                                    {/*<Col span={8}>
                                    <FormItem FormItem {...formItemLayout} label="金额">
                                        {getFieldDecorator('amount', {
                                            initialValue: 0,
                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="税额">
                                        {getFieldDecorator('tax', {
                                            initialValue: 0,
                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                    <FormItem FormItem {...formItemLayout} label="税价合计">
                                        {getFieldDecorator('totalAmount', {
                                            initialValue: 0,
                                        })(
                                            <Input disabled />
                                            )}
                                    </FormItem>
                                </Col>*/}
                                    <Col span={8}>
                                        <FormItem FormItem {...formItemLayout} label="来源订单号">
                                            {getFieldDecorator('sourceCode', {
                                                initialValue: saleOrderInfo.sourceCode,
                                                rules: [{ message: '来源订单号不能超过20字段', max: 20 }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem FormItem {...formItemLayout} label="单据类型">
                                            {getFieldDecorator('businessType', {
                                                initialValue: "0",
                                            })(
                                                <Select disabled>
                                                    <option value="0">销售订单</option>
                                                    <option value="1">电商销售</option>
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={16}>
                                        <FormItem FormItem {...formItemLayout} label="备注">
                                            {getFieldDecorator('remark', {
                                                initialValue: saleOrderInfo.remark,
                                                rules: [
                                                    { max: 200, message: '最多允许200字' },
                                                ],
                                            })(
                                                <Input type="textarea" style={{ height: 130, width: 200 }} placeholder="请输入备注" />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="saleOrder-mxInfo">
                            <span className="saleOrder-form-baseInfo"><strong>明细信息</strong></span>
                            <span className="saleOrder-mxInfo-r">
                                <span className="saleOrder-mxInfo-l">合计</span>
                                <span className="saleOrder-mxInfo-l">金额：</span><strong className="saleOrder-mxInfo-orange">￥{Number(orderTotal.amount).toFixed(2)}</strong>
                                <span className="saleOrder-mxInfo-l">税额：</span><strong className="saleOrder-mxInfo-orange">￥{Number(orderTotal.tax).toFixed(2)}</strong>
                                <span className="saleOrder-mxInfo-l">价税合计：</span><strong className="saleOrder-mxInfo-orange">￥{Number(orderTotal.totalAmount).toFixed(2)}</strong>
                            </span>
                        </div>
                        <FormItem wrapperCol={{ span: 24 }}>
                            {getFieldDecorator('saleDetails', {
                                initialValue: saleOrderInfo.saleDetails || [],
                                onChange: this.handleChangeList,
                            })(
                                <SaleOrderAddTableComp
                                    businessType={saleOrderInfo.businessType}
                                    typePage={this.props.typePage}
                                    MaterialList={this.props.MaterialList}
                                    taxRate={this.state.taxRate}
                                    planDelivery={this.state.planDelivery}
                                    isTax={this.state.isTax}
                                    SaleOrderAddTableVisiable={this.props.SaleOrderAddTableVisiable}
                                    indexTableVal={this.props.indexTableVal}
                                />
                                )}
                        </FormItem>
                    </div>
                </Form>

            </div>
        )
    }
}
SaleOrderFormComp.propTypes = {
    saleOrderData: React.PropTypes.object,
}
SaleOrderFormComp.defaultProps = {
    saleOrderInfo: {
        customerFull: '',
        customerCode: '',
        orderDate: '',
        receiveAddressName: '',
        receiveAddressDetails: '',
        /*     contactsPersonCode: '',*/
        contactsPerson: '',
        contactsPhone: '',
        saleOrg: '',
        planDelivery: '',
        shipAddressName: '',
        shipAddressDetails: '',
        salesman: '',
        salesmanPhone: '',
        invoiceTitle: '',
        collectionTermsName: '',
        invoiceAddressName: '',
        invoiceAddressDetails: '',
        currency: '',
        isTax: '',
        taxRate: '',
        amount: '',
        tax: '',
        totalAmount: '',
        businessType: '',
        sourceCode: '',
        remark: '',
        currencyName: '',
    }
}
export default Form.create()(SaleOrderFormComp);