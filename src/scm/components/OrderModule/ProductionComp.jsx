//生产订单
import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import SearchComp from '../../../base/components/SearchComp';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TXT from '../../languages';
import TooltipComp from '../../../base/components/TooltipComp'
import OperationsComp from '../../../base/components/OperationsComp'

const T = TXT.Production;
const Option = Select.Option;
const columns = [
    {
        title: '生产订单编号',
        dataIndex: 'orderCode',
        key: 'orderCode',
        width:'15%'
    },
    {
        title: '单据状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (text, record, index) => window.ENUM.getEnum("ProOrderStatus", text.toString()),
        width: '9%'
    },
    {
        title: '单据来源',
        dataIndex: 'orderSource',
        key: 'orderSource',
        hidden: true,
        render: (text, record, index) => window.ENUM.getEnum("proOrderSource", text.toString()),
    }, {
        title: '是否固定',
        dataIndex: 'isFixed',
        key: 'isFixed',
        hidden: true,
        render: (text, record, index) => text ? "是" : "否",
    }, {
        title: '产品编码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: '16%'
    }, {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 86, placement: 'top' }} />,
        width: '15%'
    }, {
        title: '规格',
        dataIndex: 'productSpec',
        key: 'productSpec',
        width: '12%'
    }, {
        title: '数量',
        dataIndex: 'productionNumber',
        key: 'productionNumber',
        width: '9%'
    }, {
        title: '单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
        width: '9%'
    }, {
        title: '计划开工时间',
        dataIndex: 'plannedStartDate',
        key: 'plannedStartDate',
        width: '9%'
    }, {
        dataIndex: 'handle',
        title: '操作',
        className: 'columns-center',
        width:'5%'
    }];



class ProductionComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.ProductionViewShow(record.orderCode)}>{record.orderCode}</a>

        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    titleText: [],
                    icon: '',
                    fun: () => this.editProduction(record.orderCode),
                    show: record.orderStatus == "0" || record.orderStatus == "4",
                },
                {
                    title: "删除",
                    titleText: ['确定删除该条订单吗？', '删除后，该条订单记录将不可恢复！'],
                    icon: '',
                    show: record.orderStatus == "0",
                    fun: () => this.delProduction(record.orderCode),
                },
            ];
            return <OperationsComp operations={opts} />;
        };

        this.searchData = {
            left: [
                {
                    key: "orderCode",
                    val: "生产订单编号",
                    type: "string"
                },
                {
                    key: "productCode",
                    val: "产品编码",
                    type: "string"
                },
                {
                    key: "createByName",
                    val: "创建人",
                    type: "string"
                },
                {
                    key: "orderStatus",
                    val: "单据状态",
                    type: "select",
                    data: {
                        list: window.ENUM.getEnum("ProOrderStatus"),
                        keyName: "catCode",
                        labelName: "catName",
                        style: { width: 200 }
                    }
                },
                {
                    key: "productName",
                    val: "产品名称",
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
                    Func: this.AddProduction,
                    style: {}
                },
                {
                    title: "导出",
                    Func: this.AddPurchase,
                    style: {}
                }
            ]
        }
    }


    ProductionViewShow = (orderCode) => {
        this.props.ProductionViewClick();
        this.props.ProductionDetail({ "orderCode": orderCode });
    };
    AddProduction = () => {
        this.props.GetCodeRule().then(json=>{
            if(json.status===2000){
                this.props.AddProductionCont();
                this.props.getSiteAll({ "isSog": 1,"status":1 });
                this.props.getDepartment({ "orgType": "5", "orgCode": "", "orgName": "", "page": 1, "pageSize": 10 }, 'add');
            }
        })
    }

    editProduction = (code) => {
        this.props.EditProductionCont();
        this.props.EditProOrderDetail({ "orderCode": code });
        this.props.getSiteAll({ "isSog": 1, "status": 1 });
        this.props.getDepartment({ "orgType": "5", "orgCode": "", "orgName": "", "page": 1, "pageSize": 10 }, 'edit');
    }

    delProduction = (code) => {
        this.props.ProductionDelete({ "orderCode": code });
    }

    render() {
        let { onSearch, SearchVal, tabLoading, tablePaging, onSelect, ...props } = this.props;
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

export default ProductionComp;
