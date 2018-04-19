import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Popconfirm, Menu, Dropdown } from '../../../base/components/AntdComp';
import FormModalComp from '../../../base/components/FormModalComp';
import { formatNullStr } from "../../../base/consts/Utils";
const FormItem = Form.Item;

class ProductionStorageTopComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            sendLoading: false,
            text: "收起",
            putAway: "展开更多隐藏信息",
            infoClassName: "purchase-eidt-info-show",
            putAwayClassName: "purchase-eidt-sourceInfo purchase-eidt-sourceInfo-hide",
            count: 1,
            index: 0,
        }
    }
    generalInfo = () => {
        let { state } = this.props;
        return (
            <div>
                <p className='info-p'>
                    <span className='info-p-label'>源单据号：</span>
                    <span className='info-p-data'>{formatNullStr(state.formInfo.sourceOrderCode)}</span>
                </p>
                <p className='info-p'>
                    <span className='info-p-label'>源单据类型：</span>
                    <span className='info-p-data'>{state.formInfo.sourceOrderType ? window.ENUM.getEnum("sourceOrderType", state.formInfo.sourceOrderType) : "--"}</span>
                </p>
            </div>
        )
    }
    sourceListInfo = () => {
        let { state } = this.props;
        return (
            <div>
                <p className='info-p'>
                    <span className='info-p-label'>供应商：</span>
                    <span className='info-p-data'>{formatNullStr(state.formInfo.linkmanDetpName)}</span>
                </p>
            </div>
        )
    }
    othersInfo = () => {
        let { state } = this.props;
        return (
            <div>
                <p className='info-p'>
                    <span className='info-p-label'>创建人：</span>
                    <span className='info-p-data'>{formatNullStr(state.formInfo.createByName)}</span>
                </p>
                <p className='info-p'>
                    <span className='info-p-label'>创建时间：</span>
                    <span className='info-p-data'>{formatNullStr(state.formInfo.createDate)}</span>
                </p>
                <div className="purchase-eidt-putaway-info" onClick={this.putAwayHandle}>
                    <a style={{ width: '100%' }}>{this.state.putAway}</a>
                </div>
            </div>
        )
    }
    putAwayHandle = () => {
        this.setState({
            index: this.state.index + 1,
        })
        if (this.state.index % 2 == 0) {
            this.setState({
                putAway: "收起更多隐藏信息",
                putAwayClassName: "purchase-eidt-sourceInfo purchase-eidt-sourceInfo-show"
            })
        } else {
            this.setState({
                putAway: "展开更多隐藏信息",
                putAwayClassName: "purchase-eidt-sourceInfo purchase-eidt-sourceInfo-hide"
            })
        }
    }
    receiptHandle = () => {
        // 判断预收货信息   是否可以收货
        this.props.actions.preReceiptInfoStatus() ?
            this.props.form.validateFields((err, values) => { // 可以收货
                this.setState({ visible: false })
                if (!err) {
                    this.props.actions.receiptHandle({ remarks: values.remarks })
                }
            }) : this.setState({ visible: true })
    }
    confirmHandler = () => {
        this.setState({ visible: false })
    }
    cancelHandler = () => {
        this.setState({ visible: false })
    }
    handleClose = () => {
        this.props.actions.handleClose();
    }
    confirmCloseHandler = () => {
        this.props.actions.confirmCloseHandler();
    }
    statusHandler = (status) => {
        switch (status) {
            case 1:
            case 3:  //保存和预收货完成（蓝色）
                return <a style={{ color: '#4C80CF' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            case 2:
            case 4: //部分预收货和部分收货（橙色）
                return <a style={{ color: '#F6A623' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            case 5: // 收货完成（绿色）
                return <a style={{ color: '#417505' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            case 6: // 关闭  （红色）：D0011B
                return <a style={{ color: '#D0011B' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            default:
                return '--'
                break;
        }
    }
    infoHandle = () => {
        this.setState({
            count: this.state.count + 1,
        })
        if (this.state.count % 2 == 0) {
            let putAway = this.state.putAway;
            this.setState({
                text: "收起",
                infoClassName: "purchase-eidt-info-show",
            })
            if (putAway == "收起更多隐藏信息") {
                this.setState({
                    index: this.state.index + 1,
                    putAway: "展开更多隐藏信息",
                    putAwayClassName: "purchase-eidt-sourceInfo purchase-eidt-sourceInfo-hide"
                })
            }
        } else {
            this.setState({
                text: "展开",
                infoClassName: "purchase-eidt-info-hide",
            })
        }
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { state } = this.props;
        const layoutForm = {
            labelCol: { span: 6 },
        };
        let menu = (
            <Menu onClick={this.batchOperation}>
                <Menu.Item key='1'>
                    <Popconfirm
                        placement="topRight"
                        title={state.message}
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => this.confirmCloseHandler()}
                    >
                        <Button type='default' onClick={() => this.handleClose()} className='carryout-close-btn'>关闭</Button>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className='purchase-eidt'>
                <Form>
                    <div className='purchase-eidt-title'>
                        <div className='title-box'>
                            <p className='title-allInfo'>信息总览：{formatNullStr(state.formInfo.orderCode)}</p>
                            <p className='title-detailInfo'>
                                <span>状态：
                                    {
                                        this.statusHandler(state.formInfo.status)
                                    }
                                </span>
                                <span>收货站点：{formatNullStr(state.formInfo.deliverySiteName)}</span>
                            </p>
                        </div>
                        <div>       
                            <Button type='default' onClick={() => this.receiptHandle()} loading={state.receiveBtnLoading}>
                                <Popconfirm
                                    placement="topRight"
                                    title="没有预收货记录待收货"
                                    okText="确定"
                                    cancelText="取消"
                                    visible={this.state.visible}
                                    onConfirm={() => this.confirmHandler()}
                                    onCancel={() => this.cancelHandler()}
                                >
                                    <span><i className='c2mfont c2m-fahuo'></i>收货</span>
                                </Popconfirm>
                            </Button>
                            <Dropdown overlay={menu} >
                                <Button type='default' style={{ marginLeft: 10 }} className='more-operation-btn'><span>更多操作</span><span className='ant-select-arrow'></span></Button>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="sale-carryout-doc-no" onClick={this.infoHandle}>{this.state.text}</div>
                    <div className={this.state.infoClassName}>
                        <Row className='returnmaterial-eidt-info'>
                            <Col span={8}>
                                <div className='purchase-eidt-info-item'>
                                    <h3>基本信息</h3>
                                    {
                                        this.generalInfo()
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='purchase-eidt-info-item'>
                                    <h3>源单信息</h3>
                                    {
                                        this.sourceListInfo()
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='purchase-eidt-info-item'>
                                    <h3>其他信息</h3>
                                    {
                                        this.othersInfo()
                                    }
                                </div>
                            </Col>
                        </Row>
                        <div className={this.state.putAwayClassName}>
                            <FormItem
                                {...layoutForm}
                                label="备注"
                            >
                                {getFieldDecorator('remarks', {
                                    initialValue: '' || state.formInfo.remarks,
                                    rules: [{ max: 200, message: '备注不能超过200字符！' }]
                                })(
                                    <Input className='ant-input-textarea-second editable-remarks' type='textarea' />
                                    )}
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

}


export default Form.create()(ProductionStorageTopComp);
