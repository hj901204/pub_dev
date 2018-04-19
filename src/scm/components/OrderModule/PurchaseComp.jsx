//采购订单
import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import SearchComp from '../../../base/components/SearchComp';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TXT from '../../languages';
import OperationsComp from '../../../base/components/OperationsComp';

const T = TXT.Purchase;
const Option = Select.Option;
const columns = [
    {
        title: '订单编号',
        dataIndex: 'orderCode',
        key: 'orderCode',
        width: 108,
    },
    {
        title: '单据状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 68,
        render: (text, record, index) => window.ENUM.getEnum("purchaseOrderStatus", text.toString()),
    },
    {
        title: '下推状态',
        dataIndex: 'pushdownMark',
        key: 'pushdownMark',
        render: (text, record, index) => window.ENUM.getEnum("isPushDownStatus", text.toString()),
    },
    {
        title: '来源单据类型',
        dataIndex: 'sourceOrderType',
        key: 'sourceOrderType',
        render: (text, record, index) => window.ENUM.getEnum("purchaseSourceOrderType", text.toString()),
    }, 
    {
        title: '来源单据号',
        dataIndex: 'sourceOrderCode',
        key: 'sourceOrderCode',
    }, 
    {
        title: '订单日期',
        dataIndex: 'orderDate',
        key: 'orderDate',
    }, {
        title: '计划收货日期',
        dataIndex: 'pldDate',
        key: 'pldDate',
    }, {
        title: '收货站点',
        dataIndex: 'siteName',
        key: 'siteName',
    }, {
        title: '供应商',
        dataIndex: 'supplierName',
        key: 'supplierName',
    }, {
        title: '采购组织',
        dataIndex: 'purchaseOrgName',
        key: 'purchaseOrgName',
    }, {
        title: '采购员',
        dataIndex: 'buyerName',
        key: 'buyerName',
    }, {
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
    }, {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
    }, {
        dataIndex: 'handle',
        title: '操作',
        width: 80,
    }];


class PurchaseComp extends Component {
    constructor(props, context) {
        super(props, context);


        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.PurchaseViewShow(record.orderCode)}>{record.orderCode}</a>

        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    fun: () => this.editPurchase(record.orderCode),
                    show: record.orderStatus == 0 || record.orderStatus == 4,
                },
                {
                    title: "删除",
                    titleText: ['确定删除该条订单吗？', '删除后，该条订单记录将不可恢复！'],
                    fun: () => this.delPurchase(record.orderCode, record.sourceOrderType),
                    show: (record.orderStatus == 0 && record.sourceOrderType != 1) || record.orderStatus == 4,
                },
            ];
            return <OperationsComp operations={opts} />;
        };

        this.searchData = {
            left: [
                {
                    key: "orderCode",
                    val: "订单编号",
                    type: "string"
                },
                {
                    key: "orderStatus",
                    val: "单据状态",
                    type: "select",
                    data: {
                        list: window.ENUM.getEnum("purchaseOrderStatus"),
                        keyName: "catCode",
                        labelName: "catName",
                        style: { width: 200 }
                    }
                },
                {
                    key: "orderDate",
                    val: "订单日期",
                    type: "date"
                },
                {
                    key: "pldDate",
                    val: "计划收货日期",
                    initValue:['2011-01-02'],
                    type: "date"
                },
                {
                    key: "siteName",
                    val: "收货站点",
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
            ],
            right: [
                {
                    title: "新建",
                    Func: this.AddPurchase,
                    style: {}
                },
                {
                    title: "导入",
                    Func: () => { },
                    style: {}
                }
            ]
        }
    }


    PurchaseViewShow = (orderCode) => {
        this.props.PurchaseViewClick();
        this.props.PurchaseCode(orderCode);
    };
    AddPurchase = () => {
        let { AddModul, GetSelectData, DeleteData, tabs, GetCodeRule} = this.props;
        GetCodeRule().then(json=>{
            if(json.status===2000){
                AddModul();
                tabs = tabs.map(item=>item.key);
                if(!tabs.includes('addPurchase')){
                    GetSelectData();
                    DeleteData('supplierCode', 'add');
                }
            }
        })
    }

    editPurchase = (orderCode) => {
        let { CanPurchaseEdit, EditModul, PurchaseDetail } = this.props;
        CanPurchaseEdit(orderCode, 'purchaseList').then(json => {
            if (json.status === 2000) {
                EditModul();
                PurchaseDetail(orderCode);
            } else {
                // message.info('该单据已锁住，不能编辑!');
            }
        })
    }

    delPurchase = (orderCode, sourceOrderType) => {
        if (sourceOrderType == 2) {
            this.props.CanPurchaseEdit(orderCode, '').then(json => {
                if (json.status === 2000) {
                    this.props.PurchaseDelete(orderCode);
                } else {
                    message.info('保存状态且锁定状态为锁定的MRP需求不可删除!');
                }
            })
        } else {
            this.props.PurchaseDelete(orderCode);
        }
    }



    render() {
        let { onSearch, SearchVal, searchType, tabLoading, tablePaging, AddModul, onSelect, ...props } = this.props;
        return (
            <div>
                <SearchBarComp
                    {...props}
                    onSearch={onSearch}
                    searchData={this.searchData}
                />
                <div className="supplier-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"orderCode"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>

        )
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
}

export default PurchaseComp;
