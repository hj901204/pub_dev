import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import SearchBarComp from '../../../base/components/SearchBarComp';
import OperationsComp from '../../../base/components/OperationsComp';
import TXT from '../../languages';

const T = TXT.SUPPLIER;
const Option = Select.Option;
const columns = [
    {
        title: '供应商编码',
        dataIndex: 'supplierCode',
        key: 'supplierCode',
        width:'132px',
    },
    {
        title: 'langCode',
        dataIndex: 'langCode',
        key: 'langCode',
        hidden: true,
    },
    {
        title: 'deptCode',
        dataIndex: 'deptCode',
        key: 'deptCode',
        hidden: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => window.ENUM.getEnum("supplierStauts", text.toString()),
        width: 86,
    },
    {
        title: '供应商全称',
        dataIndex: 'supplierFull',
        key: 'supplierFull',
    }, {
        title: '供应商简称',
        dataIndex: 'supplierAbt',
        key: 'supplierAbt',
    }, {
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
        width: 94,
    }, {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
        width: 140,
    }, {
        dataIndex: 'handle',
        title: '操作',
        width: 76,
    }];



class SupplierComp extends Component {
    constructor(props, context) {
        super(props, context);


        columns[0].render = (txt, record, index) =>
            <a href="#" onClick={() => this.SupplierViewShow(record.supplierCode, record.langCode)}>{record.supplierCode}</a>

        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    titleText: [],
                    icon: '',
                    fun: () => this.editSupplier(record.supplierCode, record.langCode, record.deptCode),
                    show: true,
                },
                {
                    title: "删除",
                    titleText: ['确定删除该条订单吗？', '删除后，该条订单记录将不可恢复！'],
                    icon: '',
                    show: record.orderStatus == 0,
                    fun: () => this.delSupplier(record.supplierCode, record.langCode),
                },
            ];
            return <OperationsComp operations={opts} />;
        };
                
            // <div>
            //     <a href="#" onClick={() => this.editSupplier(record.supplierCode, record.langCode, record.deptCode)} >编辑 </a>
            //     {
            //         record.status == 0 ? <Popconfirm title={
            //             <div>
            //                 <h5>{T.DELSUPPLIER}</h5>
            //                 <p>{T.DELSUPPLIER_OK}</p>
            //             </div>
            //         }
            //             onConfirm={() => this.delSupplier(record.supplierCode, record.langCode)}
            //         >
            //             <a href="#">删除</a>
            //         </Popconfirm> : null
            //     }

            // </div>
            this.searchData={
                left:[
                {
                    key:"supplierCode",
                    val:"供应商编码",
                    type:"string"
                },
                {
                    key:"supplierFull",
                    val:"供应商全称",
                    type:"string"
                },
                {
                    key:"supplierAbt",
                    val:"供应商简称",
                    type:"string"
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
            right:[
                {
                    title:"新建",
                    Func:this.AddSupplier,
                    style:{}
                },
                {
                    title:"导入",
                    Func: this.props.importViewVisiable,
                    style:{}
                }
            ]
        }
    }


    SupplierViewShow = (supplierCode, langCode) => {
        this.props.getEditData({supplierCode, langCode}, 'detail');
        this.props.SupplierViewClick();
        this.props.SupplierBaseLoading();
        //this.props.ContactList({bpCode:supplierCode,page:1,pageSize:10})
    };
    AddSupplier = () => {
        //结算方式 C014，付款条件 C013，行业 C015，经营类型 C019，公司性质 C018，公司规模 C016, 发票类型 C021
        let subCode=["C014","C013","C015","C019","C018","C016","C021"]
        this.props.AddModul();
        this.props.supplierLoading(true);
        this.props.getUserInfo().then(data => {
            if (data.deptCode) {
                this.props.getDept({ "orgCode": data.deptCode, "orgType": 2, "status": 1, "page": 1, "pageSize": 10 });
                if(data.deptCode){
                    this.props.getEmployeesList({ "deptCode": data.deptCode, "page": 1, "pageSize": 10 });
                } 
            }
            subCode.map((item)=>{
                this.props.getSubjectList({"subCode":item,"status":1,"page":1,"pageSize":10});
            });
            this.props.getBusinessPartnerData({
                "page": "1",
                "pageSize": "10"
            });
            this.props.getCurrencyList({
                "page": "1",
                "pageSize": "10"
            });
        })
    }

    editSupplier = (supplierCode, langCode, deptCode) => {
        this.props.EditModul();
        this.props.getEditData({ "supplierCode": supplierCode, "langCode": langCode }, 'edit', 'supplier').then(data => {
            //结算方式 C014，付款条件 C013，行业 C015，经营类型 C019，公司性质 C018，公司规模 C016, 发票类型 C021
            let param = [{ "subCode": "C014", "catCode": data.settlementCode },
                { "subCode": "C013", "catCode": data.paymentCode },
                { "subCode": "C015", "catCode": data.scmBp.tradeTypeCode },
                { "subCode": "C019", "catCode": data.scmBp.businessTypeCode },
                { "subCode": "C018", "catCode": data.scmBp.companyTypeCode },
                { "subCode": "C016", "catCode": data.scmBp.companyScaleCode },
                { "subCode": "C021", "catCode": data.invoiceTypeCode }
            ]
            param.map((item) => {
                this.props.getSubjectList({ ...item, "status": 1, "page": 1, "pageSize": 10 });
            });
            this.props.getDept({ "orgCode": data.deptCode,"orgType": 2, "status": 1, "page": 1, "pageSize": 10 });
            if(data.deptCode){
                this.props.getEmployeesList({ "deptCode": data.deptCode, "employeeCode": data.empCode, "page": 1, "pageSize": 10 });
            }
            
            this.props.getBusinessPartnerData({
                "bpCode": data.receiveOrgCode,
                "page": "1",
                "pageSize": "10"
            });
            this.props.getCurrencyList({
                "curCode": data.currencyCode,
                "page": "1",
                "pageSize": "10"
            })
        });
    }

    delSupplier = (supplierCode, langCode) => {
        this.props.delSupplier({ "supplierCode": supplierCode, "langCode": langCode })
            .then(json => {
                if (json.status == 2000) {
                    this.props.tablePaging();
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
                        rowKey={"supplierCode"}
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

export default SupplierComp;
