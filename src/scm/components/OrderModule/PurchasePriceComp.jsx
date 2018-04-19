//采购价格清单
import React, { Component } from "react";
import { Button, Popconfirm, message, Select, } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TooltipComp from '../../../base/components/TooltipComp'
const Option = Select.Option;

const columns = [
    {
        title: '价格清单编号',
        dataIndex: 'orderCode',
        key: 'orderCode',
        width:'12%',
    },
    {
        title: '单据状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (text, record, index) => window.ENUM.getEnum("PurchasePriceStatus", text.toString()),
        // width:104,
        width:'10%',
    },
    {
        title: '价格清单名称',
        dataIndex: 'priceName',
        key: 'priceName',
        render:(text)=>{
            return <TooltipComp attr={{text:text, wid: 82, placement: 'bottom'}} />
        },
        width:'15%',
    }, 
    {
        title: '供应商编码',
        dataIndex: 'supplierCode',
        key: 'supplierCode',
        // width: 118,
        width:'10%',
    }, 
    {
        title: '供应商名称',
        dataIndex: 'supplierName',
        key: 'supplierName',
        render:(text)=>{
            return <TooltipComp attr={{text:text, wid: 83, placement: 'bottom'}} />
        },
        width:'11%',
    },
    {
        title: '币种',
        dataIndex: 'currencyName',
        key: 'currencyName',
        width:'6%',
    },
    {
        title: '是否含税',
        dataIndex: 'includeTaxFlag',
        key: 'includeTaxFlag',
        render: (text, record, index) => window.ENUM.getEnum("bool2", text.toString()),
        width:'7%',
    },
    {
        title: '生效日期',
        dataIndex: 'startTime',
        key: 'startTime', 
        // width:114,
        width:'12%',
    },
    {
        title: '失效日期',
        dataIndex: 'endTime',
        key: 'endTime',
        // width:111,
        width:'12%',
    },
    {
        dataIndex: 'handle',
        title: '操作',
        className:"operate-header",
        width:'10%',
    }];


class PurchasePriceComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.handleShow(record.orderCode)}>{record.orderCode}</a>

        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                {record.orderStatus == 0 || record.orderStatus == 4 || record.orderStatus == 6?
                    <span onClick={()=>this.handleEdit(record.orderCode)} className="c2mfont c2m-bianji sale-order-distribute" title="编辑"></span>
                    :null
                }
               
                {
                    record.orderStatus == 0 || record.orderStatus == 6 || record.orderStatus == 4 ?
                        <Popconfirm title={
                            <div>
                                <h5>确定删除该条订单吗？</h5>
                                <p>删除后，该条订单记录将不可恢复！</p>
                            </div>
                        } onConfirm={() => this.handleDelete(record.orderCode)} >
                            <span className="c2mfont c2m-shanchu sale-order-distribute sale-order-delete" title="删除"></span>
                        </Popconfirm>
                        : null
                }

            </div>
        
        this.searchData = {
            left: [
                {
                    key: "orderCode",
                    val: "价格清单编号",
                    type: "string",
                },
                {
                    key: "priceName",
                    val: "价格清单名称",
                    type: "string",
                },
                {
                    key: "supplierCode",
                    val: "供应商编码",
                    type: "string",
                },
                {
                    key: "supplierName",
                    val: "供应商名称",
                    type: "string",
                },
                {
                    key: "orderStatus",
                    val: "单据状态",
                    type: "select",
                    initialValue:"null",
                    data: {
                        list: window.ENUM.getEnum("PurchasePriceStatus"),
                        keyName: "catCode",
                        labelName: "catName",
                        style: { width: 200 }
                    }
                },
                {
                    key: "currencyCode",
                    val: "币种",
                    type: "select",
                    initialValue:"null",
                    data: {
                        list: props.list.curList,
                        keyName: "curCode",
                        labelName: "curName",
                        style: { width: 200 }
                    }
                },
            ],
            center: [
                {
                    title: "查询",
                    Func: null,
                    style: {},
                    type: "button"
                }
            ],
            right: [
                {
                    title: "新建",
                    Func: this.handleAdd,
                    style: {}
                }
            ]
        }
    }
    handleShow = (orderCode) => {
        this.props.OpenPurchasePriceView();
        this.props.PurchasePriceView({orderCode:orderCode});
    };
    handleAdd = () => {
        let { OpenAddPurchasePrice, PurchasePriceAdd, GetCodeRule } = this.props;
        GetCodeRule().then(json => {
            if (json.status === 2000) {
                OpenAddPurchasePrice(); 
                PurchasePriceAdd();
            }
        })
        
    }

    handleEdit = (orderCode) => {
        let { OpenEditPurchasePrice, PurchasePriceCode } = this.props;
        OpenEditPurchasePrice();
        PurchasePriceCode(orderCode);
    }

    handleDelete = (orderCode) => {
        let { PurchasePriceDelete } = this.props;
        PurchasePriceDelete({orderCode:orderCode});
    }
    componentDidMount() {
        this.props.tablePaging(1);
        this.props.PurchaseCurList();
    }
    render() {
        let { list, onSearch, tablePaging} = this.props;
        this.searchData.left[5].data.list = this.props.list.curList;
        return (
            <div>
                <SearchBarComp
                    onSearch={onSearch}
                    searchData={this.searchData}
                />
                <div>
                    <MTable
                        {...list}
                        cols={columns}
                        rowKey={"orderCode"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>

        )
    }
}

export default PurchasePriceComp;
