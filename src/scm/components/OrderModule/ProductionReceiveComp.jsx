//生产领料申请单
import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TXT from '../../languages';
import OperationsComp from '../../../base/components/OperationsComp';

const T = TXT.ProductionReceive;
const Option = Select.Option;
const columns = [
    {
        title: '领料申请单编号',
        dataIndex: 'requisitionCode',
        key: 'requisitionCode',
    },
    {
        title: '单据状态',
        dataIndex: 'billStatus',
        key: 'billStatus',
        render: (text, record, index) => window.ENUM.getEnum("billStatus", text.toString()),
    },
    {
        title: '领料状态',
        dataIndex: 'pickingStatus',
        key: 'pickingStatus',
        render: (text, record, index) => window.ENUM.getEnum("pickingStatus", text.toString()),
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record, index) => window.ENUM.getEnum("type", text.toString()),
    }, {
        title: '单据来源',
        dataIndex: 'pickingSource',
        key: 'pickingSource',
        render: (text, record, index) => window.ENUM.getEnum("pickingSource", text.toString()),
    }, {
        title: '源单编号',
        dataIndex: 'productionOrderCode',
        key: 'productionOrderCode',
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
    }];



class ProductionReceiveComp extends Component {
    constructor(props, context) {
        super(props, context);


        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.ProductionReceiveViewShow(record.requisitionCode)}>{record.requisitionCode}</a>

        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    fun: () => this.editProducRec(record.requisitionCode),
                    show: record.billStatus == "0" || record.billStatus == "4" || record.billStatus == "6",
                },
                {
                    title: "删除",
                    titleText: ['确定删除该条订单吗？','删除后，该条订单记录将不可恢复！'],
                    fun: () => this.delPorducRec(record.requisitionCode),
                    show: record.billStatus == "0" || record.billStatus == "4" || record.billStatus == "6",
                },
            ];
            return <OperationsComp operations={opts} />;
        };

        this.searchData = {
            left: [
                {
                    key: "requisitionCode",
                    val: "领料申请单编号",
                    type: "string"
                },
                {
                    key: "billStatus",
                    val: "单据状态",
                    type: "select",
                    data: {
                        list: window.ENUM.getEnum("billStatus"),
                        keyName: "catCode",
                        labelName: "catName",
                        style: { width: 200 }
                    }
                },
                {
                    key: "productionOrderCode",
                    val: "源单编号",
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
                    Func: this.AddProducRec,
                    style: {}
                },
                {
                    title: "导出",
                    Func: null,
                    style: {}
                }

            ]
        }
    }


    ProductionReceiveViewShow = (requisitionCode) => {
        this.props.ProductionReceiveViewClick();
        this.props.ProductionReceiveView({ "requisitionCode": requisitionCode });
        //    this.props.ProductionReceiveViewClick();
        //    //this.props.ProductionReceiveViewCode(contactCode);
        //    this.props.getEditData(supplierCode,'detail');
        //    this.props.ContactsListCode(supplierCode);
    };
    AddProducRec = () => {
        let { AddModul, GetSelectData, ChangeType, GetCodeRule } = this.props;
        let page = { page: 1, pageSize: 10 };
        GetCodeRule().then(json=>{
            if(json.status===2000){
                ChangeType('add');
                AddModul();
                GetSelectData('add');
            }
        })
        
    }
    delPorducRec = (requisitionCode) => {
        this.props.DelPorducRec(requisitionCode);
    }
    editProducRec = (code) => {
        let { CanPorducRecEdit, EditModul, GetSelectData, ChangeType } = this.props;
        CanPorducRecEdit(code).then(json => {
            if (json.status === 2000) {
                ChangeType('edit');
                EditModul();
                GetSelectData('edit');
            }
        })
    }

    render() {
        let { onSearch, SearchVal, status, tabLoading, tablePaging, AddModul, onSelect, ...props } = this.props;
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
                        rowKey={"requisitionCode"}
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

export default ProductionReceiveComp;
