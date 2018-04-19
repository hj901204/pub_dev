//生产退料申请单
import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate,formatNullStr } from '../../../base/consts/Utils';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TXT from '../../languages';


const T = TXT.ProductionReturn;
const Option = Select.Option;
const columns = [
    {
        title: '退料申请单编号',
        dataIndex: 'returnCode',
        key: 'returnCode',
        width:182
    },
    {
        title: '单据状态',
        dataIndex: 'billStatus',
        key: 'billStatus',
        render: (text, record, index) => window.ENUM.getEnum("returnBillStatus", text.toString()),
        width:97
    },
    {
        title: '退料状态',
        dataIndex: 'returnStatus',
        key: 'returnStatus',
        render: (text, record, index) => window.ENUM.getEnum("returnStatus", text.toString()),
        width:94
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record, index) => window.ENUM.getEnum("returnType", text.toString()),
    }, {
        title: '单据来源',
        dataIndex: 'returnSource',
        key: 'returnSource',
        render: (text, record, index) => window.ENUM.getEnum("returnSource", text.toString()),
    }, {
        title: '源单编号',
        dataIndex: 'productionOrderCode',
        key: 'productionOrderCode',
        width:184
    }, {
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
    }, {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
        width:126
    }, {
        dataIndex: 'handle',
        title: '操作',
        width:94,
        className:'ProRet_title'
    }];



class ProductionReturnComp extends Component {
    constructor(props, context) {
        super(props, context);


        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.ProductionReturnViewShow(record.returnCode)}>{record.returnCode}</a>

        columns[columns.length - 1].render = (txt, record, index) =>
            <div style={{textAlign:'center'}} className="proReturn_handle">
                {
                    record.billStatus == "0" || record.billStatus == "4" || record.billStatus == "6" ?
                    <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.editProductionReturn(record.returnCode, record.productionOrderCode, record.deptCode)}>
                        <i className="c2mfont c2m-bianji"></i>
                    </span> : <span className="line">{formatNullStr('')}</span>

                       
                }
                {
                    record.billStatus == "0" || record.billStatus == "4" || record.billStatus == "6" ?
                        <Popconfirm title={
                            <div>
                                <h5>确定删除该条订单吗？</h5>
                                <p>删除后，该条订单记录将不可恢复！</p>
                            </div>
                        }
                            onConfirm={() => this.delProductionReturn(record.returnCode)}
                        >
                             <span title="删除" className="operator-color operator" href="javascript:;">
                                <i className="c2mfont c2m-shanchu"></i>
                             </span>
                        </Popconfirm>
                        : <span className="line">{formatNullStr('')}</span>
                }
            </div>

        this.searchData = {
            left: [
                {
                    key: "returnCode",
                    val: "退料单编号",
                    type: "string"
                },
                {
                    key: "billStatus",
                    val: "单据状态",
                    type: "select",
                    data: {
                        list: window.ENUM.getEnum("returnBillStatus"),
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
                    Func: this.AddProductionReturn,
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


    ProductionReturnViewShow = (returnCode) => {
        this.props.ProductionReturnViewClick();
        this.props.ProductionReturnViewCode({ "returnCode": returnCode });

        //    this.props.ProductionReturnViewClick();
        //    //this.props.ProductionReturnViewCode(contactCode);
        //    this.props.getEditData(supplierCode,'detail');
        //    this.props.ContactsListCode(supplierCode);
    };
    AddProductionReturn = () => {
        this.props.GetCodeRule().then(json=>{
            if(json.status===2000){
                this.props.NullReturnDataSource('add');//每次新增的时候清空明细表格 清空申请人的list
                this.props.ProductionOrderList({ page: 1, pageSize: 10 }, 'add');
                this.props.GetDepartment({ "orgType": 5, "status": 1, page: 1, pageSize: 10 }, 'add');
                this.props.AddProductionReturnCont();
                this.props.resetNull('add');
            }
        })
    }

    editProductionReturn = (code, productionOrderCode, deptCode) => {
        let {ProEdit,EditProductionReturnCont,GetProductionReturnDetail,EmpList,ProductionOrderList,GetDepartment}=this.props;
        ProEdit({ "returnCode": code }).then(json=>{
            if (json.status === 2000) {
                EditProductionReturnCont();
                GetProductionReturnDetail({ "returnCode": code });
                EmpList({ "deptCode": deptCode });
                ProductionOrderList({ page: 1, pageSize: 10 }, 'edit');
                GetDepartment({ "orgType": 5, "status": 1, page: 1, pageSize: 10 }, 'edit');
            }
        })
        

    }
    delProductionReturn = (returnCode) => {
        this.props.DelProductionReturn(returnCode);
    }
    render() {
        let { onSearch, SearchVal, status, tabLoading, tablePaging, AddModul, onSelect, ...props } = this.props;
        return (
            <div>
                <SearchBarComp
                    {...props}
                    searchData={this.searchData}
                    onSearch={onSearch}
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

export default ProductionReturnComp;
