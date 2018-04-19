import React, { Component } from 'react'
import { Form, Input, Col, Row, InputNumber, Button, Spin, Select, Checkbox, Pagination, Popconfirm, message } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import OtherWareHousePageAct from '../../actions/InventoryModule/OtherWareHousePageAct'
import Sidebar from '../../../base/components/SidebarWrapComp';
import PurchaseSideComp from './PurchaseSideComp';
let Option = Select.Option;
let InputGroup = Input.Group;
let CheckboxGroup = Checkbox.Group;


let columns = [{
    title: '单据号',
    dataIndex: 'orderCode',
    key: 'orderCode',
    width:220,
}, {
    title: '其他入库类型',
    dataIndex: 'busName',
    key: 'busName',
}, {
    title: '收货站点',
    dataIndex: 'deliverySiteName',
    key: 'deliverySiteName',
}, {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width:176,
}, {
    title: '创建人',
    dataIndex: 'createByName',
    key: 'createByName',
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (txt, record, index) => record.status ? window.ENUM.getEnum("orderStatus", record.status) : ''
}, {
    title: '操作',
    dataIndex: 'Oeration',
    key: 'Oeration',
    width:120,
    className:'purchaselist-oeration'
},

];
let selectConditionData = [
    {
        keyCode: "orderCode",
        value: "单据号"
    },
    {
        keyCode: "busCode",
        value: "其他入库类型"
    },
    {
        keyCode: "deliverySiteName",
        value: "收货站点"
    },
    {
        keyCode: "status",
        value: "单据状态"
    },

];
class PurchaseListComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[0].render = (txt, record, index) => <a className="purchase-color-href" onClick={() => this.props.receiptDetails(record.orderCode)}>{record.orderCode}
        </a>
        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                {(record.status == 1) ? <span className="purchase-order-implement c2mfont c2m-bianji" title='编辑' onClick={() => this.props.EditIslock(record.orderCode)}></span> : <span className="purchase-double-line">--</span>}
                {(record.status == 5 || record.status == 6) ? <span className="purchase-double-line">--</span> : <span className="purchase-order-implement c2mfont c2m-zhihang" title='执行' onClick={() => this.props.GetIslock(record.orderCode)}></span>}
                {record.status == 1 ? <Popconfirm title="确认删除该数据吗？" onConfirm={() => this.takeOrderDelete(record.orderCode)} okText="确定" cancelText="取消">
                    <span className="purchase-order-implement-delete c2mfont c2m-shanchu" title='删除'></span> 
                </Popconfirm>:<span className="purchase-double-line-delete">--</span>}
            </div>
        this.state = {
            keyCode: selectConditionData[0].keyCode,
            record: {},
            statusVal: "保存",
        }
        this.option_status = [
            {
                key: 1,
                value: '保存'
            }, {
                key: 2,
                value: '部分预收货'
            }, {
                key: 3,
                value: '预收货完成'
            },
            {
                key: 4,
                value: '部分收货'
            }, {
                key: 5,
                value: '收货完成'
            }, {
                key: 6,
                value: '关闭'
            }, {
                key: -1,
                value: '全部'
            }

        ]
    }
    takeOrderDelete = (orderCode) => {
        this.props.takeOrderDelete(orderCode).then(json => {
            if (json.status == 2000) {
                message.info('数据删除成功！');
            }
        })
    }
    handleSelectChange = (value) => {
        this.props.form.resetFields();
        this.setState({
            keyCode: value,
            statusVal: "保存",
        });
    }
    statusSelect = (val) => {
        if (val == "全部") {
            this.setState({ statusVal: -1 });
        } else {
            this.setState({ statusVal: val });
        }
    }
    typeSelect = (val) => {
          this.setState({ typeVal: val });
    }
    componentDidMount() {
        this.props.PurchaseList({ page: 1, pageSize: 10, sourceOrderType: 89 });
        this.props.BusCodeList({ billType:0 });
    }
    searchBar = () => {//查询按钮
        let searchVal = this.props.form.getFieldsValue();
        this.props.PurchaseList({ page: 1, pageSize: this.props.newState.paging.pageSize, sourceOrderType: 89, ...searchVal })
        this.props.takeBtnLoading()
    }
    tablePaging = (current) => {
        this.props.PurchaseList(typeof current == 'number' ? Object.assign(this.props.newState.search, { page: current }) : Object.assign(this.props.newState.search, current));
    }
    newCreate = () => {
        let {GetCodeRule, newCreate} = this.props;
        GetCodeRule().then(json => {
            if (json.status === 2000) {
                newCreate()
            }
        })
    }
    getInput = () => {
        let { getFieldDecorator } = this.props.form;
        switch (this.state.keyCode) {
            case "orderCode":
                return <Input className="select-get-input" placeholder='请输入关键字搜索' onPressEnter={()=>this.searchBar()} />;
            case "busCode":
                return <span className="option_status">
                    {
                        getFieldDecorator("busCode", {
                            //initialValue:this.props.newState.busCodeData[0].busCode?this.props.newState.busCodeData[0].busCode:'',
                            initialValue:''
                        })(
                            <Select style={{ width: 186, height: 30 }} onChange={this.typeSelect}>
                                <Option key="-1" value="" >全部</Option>
                                {
                                   this.props.newState.busCodeData.map((option, index) => {
                                        return (<Option key={option.busCode + ""} value={option.busCode + ""} >{option.busName}</Option>);
                                    })
                                }
                            </Select>
                            )
                    }
                </span>;
            case "deliverySiteName":
                return <Input className="select-get-input" placeholder='请输入关键字搜索' onPressEnter={()=>this.searchBar()} />;
            case "status":
                return <span className="option_status">
                    {
                        getFieldDecorator("status", {
                            initialValue: "1",
                        })(
                            <Select style={{ width: 186, height: 30 }} onChange={this.statusSelect}>
                                {
                                    this.option_status.map((option, index) => {
                                        return (<Option key={option.key + ""} value={option.key + ""} >{option.value}</Option>);
                                    })
                                }
                            </Select>
                            )
                    }
                </span>
            default:
                return false;
        }
    }
    render() {
        let { newState, tableLoading, tablePaging, ...props} = this.props;
        let selectConditionOptions = selectConditionData.map(conditionWay => <Option key={conditionWay.keyCode}>{conditionWay.value}</Option>)
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="purchase-list-content">
                <div className="select-input-content">
                    <Select defaultValue={selectConditionData[0].value} onChange={this.handleSelectChange} className="select-input" >
                        {selectConditionOptions}
                    </Select>
                    <Form className="selectForm">
                        <Form.Item>
                            {
                                getFieldDecorator(this.state.keyCode, {
                                    initialValue: "",
                                })(
                                    this.getInput()
                                    )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.searchBar} className="searchBar" loading={newState.btnLoading}><span className="search-icon c2mfont c2m-search1"></span><span>查询</span></Button>
                        </Form.Item>
                    </Form>
                    <Button type="primary" className="newSet" onClick={this.newCreate}><span className="newset-icon c2mfont c2m-jia"></span><span className="newset-create">新建</span></Button>
                </div>
                <MTable
                    cols={columns}
                    rowKey={"id"}
                    dataSource={newState.dataSource}
                    loading={newState.tableLoading}
                    paging={newState.paging}
                    pageOnChange={this.tablePaging}
                    {...props}
                />
                <PurchaseSideComp {...this.props} />
            </div>

        )
    }
}

export default Form.create()(PurchaseListComp)



