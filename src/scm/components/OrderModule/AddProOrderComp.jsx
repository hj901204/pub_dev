import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker, message, Popconfirm } from '../../../base/components/AntdComp';
import SelectComp from '../../../base/components/SelectComp';
import TreeSelectComp from '../../../base/components/TreeSelectComp';
import ModalComp from '../../../base/components/ModalComp';
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import ProOrderAddDialogCont from '../../dialogconts/OrderModule/ProOrderAddDialogCont';
import ProOrderEditDialogCont from '../../dialogconts/OrderModule/ProOrderEditDialogCont';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { disabledBeforeDate, disabledBeforeTime, disabledAfterDate, disabledAfterTime } from '../../../base/consts/Utils';
import SelectTableComp from '../../../base/components/SelectTableComp';
import TooltipComp from '../../../base/components/TooltipComp';

moment.locale('zh-cn');
let FormItem = Form.Item,
    Option = Select.Option,
    page = { 'page': 1, 'pageSize': 10 },
    columns = [{
        title: '销售订单号',
        dataIndex: 'orderCode',
        filterMultiple: false,
        width:'162px'
    }, {
        title: '客户名称',
        dataIndex: 'customerName',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 92, placement: 'top' }} />
    }, {
        title: '明细行号',
        dataIndex: 'lineNumber',
        width:'71px'
    }, {
        title: '产品编码',
        dataIndex: 'materialCode',

    }, {
        title: '名称',
        dataIndex: 'materialName',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'top' }} />
    }, {
        title: '订单数量',
        dataIndex: 'amount',
    }, {
        title: '单位',
        dataIndex: 'materialUnitName',
    }, {
        title: '单位编码',
        dataIndex: 'materialUnit',
    }, {
        title: '累计开工数量',
        dataIndex: 'accumWorkAmount',
        width:'93px'
    }],
    searchData = {
        left: [
            {
                key: "orderCode",
                val: "销售订单号",
                type: "string"
            },
            {
                key: "customerName",
                val: "客户名称",
                type: "string",
            },
            {
                key: "materialCode",
                val: "产品编码",
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
    
class GetModal extends ModalComp {
    handleSubmit = () => {
        this.props.submit()
    }
    getComp = () => {
        return <div>生产数量超出最大可分配生产数量，请检查！</div>
    }
}
class AddProOrderComp extends FormComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            count: false,
            startValue: "",
            endValue: "",
            spaceDisabled: false,
            startDate: null,
            endDate: null,
            storageDate: null,
            hours:"",
            minutes:"",
            seconds:"",
            startDays:"",
            endDays:"",
            endHours:"",
            endMinutes:"",
            showTime: true,
        }
        this.param = {
            orderSource: "",
            sourceCode: "",
            sourceLineNumber: "",
            orderType: "",
            priority: "",
            remarks: "",
            productCode: "",
            bomCode: "",
            bomVersion: "",
            processFlowCode: "",
            productionNumber: "",
            measureUnitName: "",
            productionOrg: "",
            plannedStartDate: "",
            plannedEndDate: "",
            presetDepot: "",
            presetPosition: "",
            presetStorageDate: moment(),
        }
    }
    // SourceCodeDilog = (type) => {
    //     this.props.SourceCodeDilog(type);
    //     this.setFdv({
    //         bomCode:"",
    //         plannedStartDate: null,
    //     });
    // }
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps[nextProps.type].productionNumber != this.props[this.props.type].productionNumber) {
    //         this.setFdv({ productionNumber: nextProps[nextProps.type].productionNumber })
    //     }
    // }

    componentDidMount() { 
        if (this.props.type == 'add') { this.props.ProductCode() };
        if (this.props.type == "edit") {
            this.onChange('startDate', this.props.getDetailList.plannedStartDate);
            this.onChange('endDate', this.props.getDetailList.plannedEndDate);
        }
    }

    componentWillReceiveProps() {
        // if (this.props.type == "edit") {
        //     this.onChange('startDate', moment(this.props.getDetailList.plannedStartDate, 'YYYY-MM-DD HH:mm:ss'));
        //     this.onChange('endDate', moment(this.props.getDetailList.plannedEndDate, 'YYYY-MM-DD HH:mm:ss'));
        // }
    }
    
    onStartChange = (value, dateString) => {
        let timer = dateString.toString();
       this.setState({
           startDays:dateString.substring(0,10).valueOf(),
           hours:timer.substring(11,13),
           minutes:timer.substring(14,16),
           seconds:timer.substring(17,19)
       })
       
        this.onChange('startValue', value);
        this.setState({ startDate: dateString })
        //选择完时间发送请求查询BOM编码
        if (this.props.type == 'add') {
            let { materialCode } = this.props.add;
            if (materialCode && dateString) {
                this.props.BomCodeSelect({ "productCode": materialCode, "plannedStartDate": dateString }, 'add').then(data => { 
                    if (data) {
                        this.setFdv({
                            bomCode: data.bomCode + "-" + data.version,
                        });
                    } else { 
                        this.setFdv({
                            bomCode: "",
                        });
                    }
                })

            }
        } else {
            if (this.props.getDetailList.productCode && dateString) {
                this.props.BomCodeSelect({ "productCode": this.props.getDetailList.productCode, "plannedStartDate": dateString }, 'edit', true).then(data => {
                    if (data) {
                        this.setFdv({
                            bomCode: data.bomCode + "-" + data.version,
                        });
                    } else {
                        this.setFdv({
                            bomCode: "",
                        });
                    }
                });
            }
        }
    }

    onEndChange = (value, dateString) => {
        this.onChange('endValue', value);
        this.setState({ endDate:dateString, endDays: dateString.substring(0, 10).valueOf(), endHours: dateString.substring(11, 13), endMinutes: dateString.substring(14, 16) })
    }
    onStorageChange = (value, dateString) => {
        this.setState({ storageDate: dateString })
    }

    handleNumberChange = (e) => {
        let { type, getDetailList } = this.props;
        if (type == "add") {
            this.setState({ dia_visible: true })
            if (parseFloat(e.target.value) > this.props[type].productionNumber) {
                this.setState({ count: true })
            }
            let proNumber = parseFloat(this.props.saleList[0].amount) - parseFloat(this.props.saleList[0].allocatedAmount);
            if (parseFloat(e.target.value) > proNumber) {
                this.setState({ count: true })
            }
        } else { 
            // if (parseFloat(e.target.value) > getDetailList.productionNumber) {
            //     this.setState({ count: true })
            // }
        }
    }

    handleSave = (e) => { 
        let val = e.target.value;
        if (val.startsWith('.')) {
            this.setFdv({
                productionNumber: "0"+val
            })
        }
    }    

    submit = () => {
        let { type, getDetailList } = this.props;
        this.setState({ count: false })
        let num = type == "add" ? this.props[type].productionNumber : getDetailList.productionNumber;
        this.setFdv({
            productionNumber: num
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { getDetailList, type } = this.props;
        if (type == 'add') getDetailList = this.param;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                data.orderSource = 1;
                if (data.orderCode!='自动生成') {
                    data.measureUnitCode = getDetailList.measureUnitCode
                } else {
                    delete data.orderCode //新增不传
                    data.measureUnitCode = this.props.add.materialUnit

                }
                if (data.bomCode.indexOf('-')) {
                    data.bomCode = data.bomCode.substr(0, data.bomCode.indexOf('-'))//bom编号
                }
                if (data.sourceCode.indexOf('-')) {
                    data.sourceCode = data.sourceCode.substr(0, data.sourceCode.indexOf('-'))//销售订单
                }
                if (data.productCode.indexOf('[')) {
                    data.productCode = data.productCode.substr(0, data.productCode.indexOf('['))//产品编码 
                }

                if (this.state.startDate) {
                    data.plannedStartDate = this.state.startDate;
                } else {
                    data.plannedStartDate = getDetailList.plannedStartDate ? moment(getDetailList.plannedStartDate).format('YYYY-MM-DD') : "";
                }
                if (this.state.endDate) {
                    data.plannedEndDate = this.state.endDate;
                } else {
                    data.plannedEndDate = getDetailList.plannedEndDate ? moment(getDetailList.plannedEndDate).format('YYYY-MM-DD') : "";
                }
                data.presetStorageDate = data.presetStorageDate?moment(data.presetStorageDate).format('YYYY-MM-DD'):'';

                // this.props.onOk && this.props.onOk(data);
                if (!this.state.endValue || this.state.startValue <= this.state.endValue) {
                    this.props.type == 'add' ?
                        this.props.Production_Add(data)
                            .then(json => {
                                if (json.status == 2000) {
                                    this.props.add.productionNumber = "";
                                    this.props.add.materialCode = "";
                                    this.props.add.measureUnitName = "";
                                    // this.props.resetForm();
                                    this.props.form.resetFields();
                                    this.props.getProOrgList({ orgType: 5, orgCode: "", orgName: "", ...page });
                                }
                            })
                        : this.props.Production_Edit(data);
                } else { 
                    message.warning('计划完工时间不能小于计划开工时间！')
                }
                


            }
        });
    }
    submitToBack = (e) => {
        e.preventDefault();
        let { getDetailList } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                data.orderSource = 1;
                if (data.orderCode != '自动生成') {
                    data.measureUnitCode = getDetailList.measureUnitCode
                } else {
                    delete data.orderCode //新增不传
                    data.measureUnitCode = this.props.add.materialUnit

                }
                if (data.bomCode.indexOf('-')) {
                    data.bomCode = data.bomCode.substr(0, data.bomCode.indexOf('-'))//bom编号
                }
                if (data.sourceCode.indexOf('-')) {
                    data.sourceCode = data.sourceCode.substr(0, data.sourceCode.indexOf('-'))//销售订单
                }
                if (data.productCode.indexOf('[')) {
                    data.productCode = data.productCode.substr(0, data.productCode.indexOf('['))//产品编码
                }

                if (this.state.startDate) {
                    data.plannedStartDate = this.state.startDate;
                } else {
                    data.plannedStartDate = getDetailList.plannedStartDate ? moment(getDetailList.plannedStartDate).format('YYYY-MM-DD') : "";
                }
                if (this.state.endDate) {
                    data.plannedEndDate = this.state.endDate;
                } else {
                    data.plannedEndDate = getDetailList.plannedEndDate ? moment(getDetailList.plannedEndDate).format('YYYY-MM-DD') : "";
                }
                data.presetStorageDate = data.presetStorageDate ? moment(data.presetStorageDate).format('YYYY-MM-DD') : '';
                //this.props.onOk && this.props.onOk(data);
                if (!this.state.endValue || this.state.startValue <= this.state.endValue) {
                    this.props.Production_AddToBack(data);
                } else {
                    message.warning('计划完工时间不能小于计划开工时间！')
                }
            }
        });
    }

    tabRemove = () => {
        this.props.tabRemove();
    }

    siteDataChange = (value) => {
        this.setFdv({
            presetPosition:""
        })
        this.props.FreightSpace({ siteCode: value, page: 1, pageSize: 10 });
        this.setState({ spaceDisabled: true })
    }

    selectSaleRow = (selectedRows) => { 
        if (selectedRows) {
            //let productionNumber = parseFloat(this.state.selectedRows[0].productionNumber) - parseFloat(this.state.selectedRows[0].allocatedAmount);
            this.props.ProductCode(selectedRows.materialCode + "[" + selectedRows.materialName + "]", selectedRows.materialCode, selectedRows.orderCode + "-" + selectedRows.lineNumber, selectedRows.productionNumber, selectedRows.materialUnitName, selectedRows.lineNumber, selectedRows.materialUnit, this.props.type);
            this.setFdv({
                productionNumber: selectedRows.productionNumber,
                sourceCode: selectedRows.orderCode + "-" + selectedRows.lineNumber,
                productCode: selectedRows.materialCode + "[" + selectedRows.materialName + "]"
            });
        } else {
            message.warning('请选择一行数据！');
        }
    }    
    

    render() {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        let { getSiteData, getProOrgList, getDetailList, updateBom, Add_orderCode, type } = this.props;
        let siteData = [], spaceData = [];
        if (getSiteData) {
            getSiteData.map(item => {
                let getSite = {};
                getSite.catCode = item.siteCode;
                getSite.catName = item.siteName;
                siteData.push(getSite)
            })
        }
        let fsData = this.props[type].getFreightSpaceData;
        if (fsData) {
            fsData.map(key => {
                let getSpace = {};
                getSpace.catCode = key.code;
                getSpace.catName = key.name;
                spaceData.push(getSpace)
            })
        }
        if (type == 'add') {
            getDetailList = this.param;
        }
        let { orderCode, productValue, materialCode, bomCode, productionNumber, measureUnitName, pDeptName, lineNumber, bomVersion, materialUnit } = this.props[type];
        let pro = getDetailList.productCode ? getDetailList.productCode + "[" + getDetailList.productName + "]" : "";
        let bom = updateBom ? bomCode : getDetailList.bomCode + "-" + getDetailList.bomVersion;
        let bomV = getDetailList.bomVersion ? getDetailList.bomVersion : "";
        return (
            <div className="Production-detail">
                <div className="addPro-title">
                    <Row>
                        <Col span={12} style={{ textIndent: 16, fontSize: '14px', color: '#4b4b4b' }}>
                            <div className="mainTitle">{type == 'add' ? "新建生产订单" : "编辑生产订单"}</div>
                            <Row className="title-row">
                                <Col span={6}>
                                    <FormItem
                                        label="订单编号"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 15 }}
                                    >
                                        {this.getFD('orderCode', {
                                            initialValue: getDetailList.orderCode || "自动生成",
                                        })(
                                            <Input readOnly style={{ borderWidth: '0px' }} />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={4} >
                                    <FormItem
                                        label="单据来源"
                                        labelCol={{ span: 14 }}
                                        wrapperCol={{ span: 10 }}
                                    >
                                        {this.getFD('orderSource', {
                                            initialValue: window.ENUM.getEnum("proOrderSource", 1),
                                        })(
                                            <Input readOnly style={{ borderWidth: '0px' }} />
                                            )}
                                    </FormItem>  
                                </Col>
                            </Row>  
                        </Col>
                        <Col span={12} style={{ textAlign: 'right', marginTop:'20px'}}>
                            <Button type='primary' onClick={this.handleSubmit}>
                                <i className="c2mfont c2m-baocun" style={{ paddingRight: '7px', fontSize: '10px' }} />
                                保存</Button>

                            {/*<Button type='primary' onClick={() => this.setState({ dia_visible: true })}>bug</Button>*/}

                            {type == 'add' ?
                                <Button type='primary' onClick={this.submitToBack} style={{ marginLeft: 20, marginRight: 20, height: '30px' }}>
                                    <i className="c2mfont c2m-baocunbingtuichu" style={{ paddingRight: '7px', fontSize: '12px' }} />
                                    保存并退出
                                    </Button> :
                                <Popconfirm placement="bottomRight" title={"即将离开编辑页面，请确认是否取消已修改的内容？"} onConfirm={this.tabRemove} okText="确认" cancelText="取消">
                                    <Button type='primary' className='backBtn' style={{ marginLeft: 20, marginRight: 20, height: '30px' }}>
                                        <i className="c2mfont c2m-daoru_nor" style={{marginRight:'6px',fontSize:'10px'}} ></i>
                                        返回</Button>
                                </Popconfirm>
                            }
                        </Col>
                    </Row>
                </div>
                {/*<div className="PurchaseView-titleshadow">
                    <Row>
                        <Col span={24}>
                            <p></p>
                        </Col>
                    </Row>
                </div>*/}
                <div>
                    <Form>
                        <div style={{ borderBottom: '1px solid #e2e2e2'}}>
                            <div className="PurchaseView-info">
                                <div className="PurchaseView-infotitle">
                                    <Col span={8}>
                                        <b><span></span> 基本信息</b>
                                    </Col>
                                </div>
                            </div>
                            <Row style={{  marginTop: 30, marginLeft: 20, marginRight: 20 }}>
                                <Col span={8}>
                                    {
                                        type == 'add' ?
                                            <FormItem
                                                label="销售订单"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                                style={{ position: 'relative' }}
                                            >
                                                {this.getFD('sourceCode', {
                                                    initialValue: orderCode == "" ? "" : orderCode,
                                                    rules: [
                                                        { required: true, message: '销售订单 必填!' }
                                                    ],
                                                })(
                                                    <SelectTableComp
                                                    columns={columns}
                                                    rowKey='index'
                                                    valueKey='orderCode'
                                                    handleSubmit={this.selectSaleRow}
                                                    getDataSource={this.props.tablePaging}
                                                    searchData={searchData}
                                                    contStyle={{ width: "924px", zIndex: '5' }}
                                                    style={{ width: '100%' }}
                                                    />
                                                    )}
                                                {/*<Button type='primary'
                                                    onClick={() => this.SourceCodeDilog(type)}
                                                    style={{ position: 'absolute', right: -80, bottom: 0, }}
                                                >选择</Button>*/}
                                            </FormItem>
                                        :
                                            <FormItem
                                                label="销售订单"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                                style={{ position: 'relative' }}
                                            >
                                                {this.getFD('sourceCode', {
                                                    initialValue: getDetailList.sourceCode ? getDetailList.sourceCode + "-" + getDetailList.sourceLineNumber : "",
                                                    rules: [
                                                        { required: true, message: '销售订单 必填!' }
                                                    ],
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem>
                                    }
                                    <FormItem
                                        label="销售订单行号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                        className="sourceLineNumber"
                                    >
                                        {this.getFD('sourceLineNumber', {
                                            initialValue: getDetailList.sourceLineNumber ? Number(getDetailList.sourceLineNumber) : Number(lineNumber),
                                        })(

                                            <Input style={{ width: 0 }} />
                                            )}
                                    </FormItem>
                                    {
                                        type == 'add' ?
                                            <FormItem
                                                label="产品编码"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                            >
                                                {this.getFD('productCode', {
                                                    initialValue: productValue ? productValue : "",
                                                    rules: [
                                                        { required: true, message: '产品编码 必填!' }
                                                    ],
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem> :
                                            <FormItem
                                                label="产品编码"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                            >
                                                {this.getFD('productCode', {
                                                    initialValue: pro,
                                                    rules: [
                                                        { required: true, message: '产品编码 必填!' }
                                                    ],
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem>
                                    }
                                    {
                                        type == "add" ?
                                            <FormItem
                                                label="BOM编号"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                            >
                                                {this.getFD('bomCode', {
                                                    initialValue: bomCode ? bomCode : "",
                                                    rules: [
                                                        { required: true, message: 'BOM编号 必填!' }
                                                    ],
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem> :
                                            <FormItem
                                                label="BOM编号"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                            >
                                                {this.getFD('bomCode', {
                                                    initialValue: getDetailList.bomCode ? bom : bomCode,
                                                    rules: [
                                                        { required: true, message: 'BOM编号 必填!' }
                                                    ],
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem>
                                    }
                                    <FormItem
                                        label="BOM版本"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                        className="bomVersion"
                                    >
                                        {this.getFD('bomVersion', {
                                            initialValue: bomVersion || updateBom ? bomVersion : bomV,
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="订单类型"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('orderType', {
                                            initialValue: "" + getDetailList.orderType || "1",
                                            rules: [
                                                { required: true, message: '订单类型 必填!' }
                                            ],
                                        })(
                                            <Select>
                                                {
                                                    window.ENUM.getEnum("ProOrderType").map(orderType => {
                                                        return <Select.Option value={orderType.catCode} key={orderType.catCode}>{orderType.catName}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                    <FormItem
                                        label="优先级"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('priority', {
                                            initialValue: "" + getDetailList.priority || "3",
                                            rules: [
                                                { required: true, message: '优先级 必填!' }
                                            ],
                                        })(
                                            <Select>
                                                {
                                                    window.ENUM.getEnum("priority").map(priority => {
                                                        return <Select.Option value={priority.catCode} key={priority.catCode}>{priority.catName}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="备注"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('remarks', {
                                            initialValue: getDetailList.remarks ? getDetailList.remarks : "",
                                            rules: [{ max: 200, message: '最多允许200个字符' }],
                                        })(
                                            <Input type='textarea' style={{ height: '90px', resize: 'none' }} >
                                            </Input>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            {/*<div className="PurchaseView-info">
                                <div className="PurchaseView-infotitle">
                                    <Col span={8}>
                                        <b><span></span> 常规信息</b>
                                    </Col>
                                    <Col span={8}>
                                        <b ><span style={{ marginLeft: 10 }}></span> 仓储信息</b>
                                    </Col>
                                </div>
                            </div>*/}
                            <Row>
                                <Col span={8} className="production-num">
                                    <div className="PurchaseView-info">
                                        <div className="PurchaseView-infotitle" style={{ marginLeft: '-4px' }}>
                                            <Col span={8}>
                                                <b><span></span> 常规信息</b>
                                            </Col>
                                        </div>
                                    </div>  
                                    {
                                        type == "add" ?
                                            <FormItem
                                                label="生产数量"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                                style={{ zIndex: '1' }}
                                            >
                                                {this.getFD('productionNumber', {
                                                    initialValue: productionNumber ? productionNumber : '0.00',
                                                    rules: [
                                                        { type: 'gtZero', label: '生产数量', decimal: 2 },
                                                    ], onChange: this.handleNumberChange
                                                })(
                                                    <Input disabled={this.getFdv("sourceCode") ? false : true} onBlur={this.handleSave} />

                                                )}
                                            </FormItem> :
                                            <FormItem
                                                label="生产数量"
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 14 }}
                                                style={{ zIndex: '1' }}
                                            >
                                                {this.getFD('productionNumber', {
                                                    initialValue: getDetailList.productionNumber || productionNumber,
                                                    rules: [
                                                        { type: 'gtZero', label: '生产数量', decimal: 2 },
                                                    ],
                                                })(
                                                    <Input onChange={this.handleNumberChange} />
                                                )}
                                            </FormItem>
                                    }
                                    <span className="production-name">{type == "add" ? measureUnitName ? measureUnitName : "" : getDetailList.measureUnitName}</span>
                                    {/*{
                                        type == "add" ?
                                            <FormItem
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 10 }}
                                                className="production-name"
                                            >
                                                {this.getFD('measureUnitCode', {
                                                    initialValue: measureUnitName ? measureUnitName : "",
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem> :
                                            <FormItem
                                                labelCol={{ span: 6 }}
                                                wrapperCol={{ span: 10}}
                                                className="production-name"
                                            >
                                                {this.getFD('measureUnitCode', {
                                                    initialValue: getDetailList.measureUnitName,
                                                })(
                                                    <Input disabled />
                                                    )}
                                            </FormItem>
                                    }*/}
                                    <FormItem
                                        label="生产组织"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('productionOrg', {
                                            initialValue: getDetailList.productionOrg || "",
                                            rules: [
                                                { required: true, message: '生产组织 必填!' },
                                                {
                                                    type: "autoselect",
                                                    message: "请从下拉列表中选择一项！",
                                                    list: pDeptName,
                                                    keyName: "orgCode",
                                                },
                                            ],
                                        })(
                                            <AutoSelectComp
                                                key="select"
                                                selectedList={pDeptName}
                                                onSearch={(val) => { getProOrgList({ orgType: 5, orgCode: val, orgName: val, ...page }) }}
                                                displayName={["orgCode", "orgName"]}
                                                keyName={"orgCode"}
                                            />
                                            )}
                                    </FormItem> 
                                </Col>
                                <Col span={8} style={{ borderLeft: '1px solid #e2e2e2' }}>
                                    <div className="PurchaseView-info">
                                        <div className="PurchaseView-infotitle">
                                            <Col span={8}>
                                                <b><span></span> 仓储信息</b>
                                            </Col>
                                        </div>
                                    </div>    
                                    <FormItem
                                        label="工艺路线"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('processFlowCode', {
                                            initialValue: getDetailList.processFlowCode || "",
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>   
                                    <FormItem
                                        label="计划开工时间"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('plannedStartDate', {
                                            initialValue: getDetailList.plannedStartDate ? moment(getDetailList.plannedStartDate, 'YYYY-MM-DD') : null,
                                            rules: [
                                                { required: true, message: '计划开工时间 必填!' }
                                            ],
                                        })(
                                            <DatePicker
                                                //showTime
                                                format="YYYY-MM-DD"
                                                allowClear={false}
                                                disabledDate={(c) => disabledAfterDate(c, this.state.endValue)}
                                                disabledTime={(c) => disabledAfterTime(c, this.state.endValue)}
                                                onChange={this.onStartChange}
                                                style={{ width: "100%" }}
                                            />
                                            )}
                                    </FormItem>
                                    <FormItem
                                        label="计划完工时间"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('plannedEndDate', {
                                            initialValue: getDetailList.plannedEndDate ? moment(getDetailList.plannedEndDate, 'YYYY-MM-DD') : null,
                                        })(
                                            <DatePicker
                                                //showTime
                                                format="YYYY-MM-DD"
                                                allowClear={false}
                                                disabledDate={(c) => disabledBeforeDate(c, this.state.startValue)}
                                                disabledTime={(c) => disabledBeforeTime(c, this.state.startValue)}
                                                onChange={this.onEndChange}
                                                style={{ width: "100%" }}
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <div className="PurchaseView-info">
                                        <div className="PurchaseView-infotitle">
                                            <Col span={8}>
                                                <b><span></span> </b>
                                            </Col>
                                        </div>
                                    </div>   
                                    <FormItem
                                        label="预设仓库"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('presetDepot', {
                                            initialValue: getDetailList.presetDepot || "",
                                            rules: [
                                                { required: true, message: '预设仓库 必填!' }
                                            ],
                                        })(
                                            <Select onSelect={this.siteDataChange} notFoundContent={""}>
                                                {
                                                    siteData.length > 0 ?
                                                        siteData.map(site => {
                                                        return <Select.Option value={site.catCode} key={site.catCode}>
                                                            {site.catCode+`[${site.catName}]`}
                                                        </Select.Option>
                                                        }) : null
                                                }
                                            </Select>
                                            )}
                                    </FormItem>    
                                    <FormItem
                                        label="预设仓位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('presetPosition', {
                                            initialValue: getDetailList.presetPosition || "",
                                        })(
                                            this.state.spaceDisabled ?
                                            <Select notFoundContent={""} >
                                                    {
                                                        spaceData.length > 0 ?
                                                            spaceData.map(spaceData => {
                                                            return <Select.Option value={spaceData.catCode} key={spaceData.catCode}>{spaceData.catCode+`[${spaceData.catName}]`}
                                                                </Select.Option>
                                                            }) : null
                                                    }
                                                </Select> :
                                            <Select disabled>
                                                {
                                                    spaceData.length > 0 ?
                                                        spaceData.map(spaceData => {
                                                            return <Select.Option value={spaceData.catCode} key={spaceData.catCode}>{spaceData.catName}</Select.Option>
                                                        }) : null
                                                }
                                                </Select>
                                            )}
                                    </FormItem>
                                    <FormItem
                                        label="预入库时间"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        {this.getFD('presetStorageDate', {
                                            initialValue: getDetailList.presetStorageDate ? moment(getDetailList.presetStorageDate, 'YYYY-MM-DD') : moment(undefined),
                                        })(
                                            <DatePicker
                                                //showTime={true}
                                                format="YYYY-MM-DD"
                                                onChange={this.onStorageChange}
                                                allowClear={false}
                                                style={{ width: "100%" }}
                                            />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            {/*<Row>
                                <Col span={7} className="production-num">
                                    
                                </Col>
                                <Col span={7}>
                                    
                                </Col>
                                <Col span={7}>
                                    
                                </Col>
                            </Row>*/}
                            {/*<Row>
                                <Col span={7}>
                                    
                                </Col>
                            </Row>*/}
                        </div>
                    </Form>
                </div>
                {/*{
                    type == 'add' ? <ProOrderAddDialogCont setProductionNumber={(obj) => { this.setFdv({ productionNumber:obj.productionNumber,sourceCode:obj.sourceCode,productCode:obj.productCode})}} /> : <ProOrderEditDialogCont />
                }*/}

                <div>
                    <GetModal title="提示" visible={this.state.count}
                        submit={this.submit}    
                        handleCancel={() => this.setState({ count: false })}
                    />
                </div>

            </div>
        )
    }
}
AddProOrderComp.defaultProps = {
    getDetailList: {
        orderSource: "",
        sourceCode: "",
        sourceLineNumber: "",
        orderType: "",
        priority: "",
        remarks: "",
        productCode: "",
        bomCode: "",
        bomVersion: "",
        processFlowCode: "",
        productionNumber: "",
        measureUnitName: "",
        productionOrg: "",
        plannedStartDate: "",
        plannedEndDate: "",
        presetDepot: "",
        presetPosition: "",
        presetStorageDate: "",
    }
}

export default Form.create()(AddProOrderComp);