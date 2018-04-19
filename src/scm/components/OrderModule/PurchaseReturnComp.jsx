//采购退货单
import React, { Component } from "react";
import { Button, Popconfirm, message, Select, DatePicker } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate, formatNullStr } from '../../../base/consts/Utils';
import SearchComp from '../../../base/components/SearchComp';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TXT from '../../languages';
import OperationsComp from '../../../base/components/OperationsComp';
const { RangePicker } = DatePicker;

const T = TXT.PuchaseReturn;
const Option = Select.Option;
const columns = [
    {
        title: '退货单号',
        dataIndex: 'returnCode',
        key: 'returnCode',
        width: 172,
    },
    {
        title: '单据状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 86,
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
        render: (text, record, index) => text == 1 ? '采购订单' : ''
    },{
        title: '来源单据号',
        dataIndex: 'sourceOrderCode',
        key: 'sourceOrderCode',
    },
    {
        title: '订单日期',
        dataIndex: 'orderDate',
        key: 'orderDate',
    }, {
        title: '预计发货日期',
        dataIndex: 'pldDate',
        key: 'pldDate',
    }, {
        title: '发货站点',
        dataIndex: 'siteName',
        key: 'siteName',
    }, {
        title: '供应商',
        dataIndex: 'supplierName',
        key: 'supplierName',
        width: 154,
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
        width: 126,
    }, {
        dataIndex: 'handle',
        title: '操作',
        width: 90,
    }];



class PuchaseReturnComp extends Component {
    constructor(props, context) {
        super(props, context);


        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.PuchaseReturnViewShow(record.returnCode)}>{record.returnCode}</a>

        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    fun: () => this.editPuchaseReturn(record.returnCode),
                    show: record.orderStatus == 0 || record.orderStatus == 4,
                },
                {
                    title: "删除",
                    titleText: ['确定删除该条订单吗？', '删除后，该条订单记录将不可恢复！'],
                    fun: () => this.delPurchaseReturn(record.returnCode),
                    show: record.orderStatus == 0 || record.orderStatus == 4,
                },
            ];
            return <OperationsComp operations={opts} />;
        };
        this.searchData = {
            left: [
                {
                    key: "orderCode",
                    val: "退货单号",
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
                    val: "预计发货日期",
                    type: "date"
                },
                {
                    key: "siteName",
                    val: "发货站点",
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
                    Func: this.AddPuchaseReturn,
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



    PuchaseReturnViewShow = (returnCode) => {
        this.props.PurRetViewClick();
        this.props.PurRetCode(returnCode);
    };
    AddPuchaseReturn = () => {
        let { AddPurRet, GetSelectData, DeleteData, tabs, GetCodeRule } = this.props;
        GetCodeRule().then(json=>{
            if(json.status===2000){
                AddPurRet();
                tabs = tabs.map(item=>item.key);
                if(!tabs.includes('addPurRet')){
                    GetSelectData();
                    DeleteData('supplierCode', 'add');
                }
            }
        })
    }

    editPuchaseReturn = (returnCode) => {
        let { EditPurRet, PurchaseReturnDetail, CanPurchaseReturnEdit } = this.props;
        CanPurchaseReturnEdit(returnCode).then(json => {
            if (json.status === 2000) {
                EditPurRet();
                PurchaseReturnDetail(returnCode);
            } else {
                // message.info('该单据已锁住，不能编辑!');
            }
        })
    }

    delPurchaseReturn = (returnCode) => {
        this.props.PurchaseReturnDelete({ "returnCode": returnCode });
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
                        rowKey={"returnCode"}
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

export default PuchaseReturnComp;
