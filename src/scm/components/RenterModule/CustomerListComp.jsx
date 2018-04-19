import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate,formatNullStr } from '../../../base/consts/Utils';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TXT from '../../languages';
import TooltipComp from "../../../base/components/TooltipComp";
const T = TXT.SUPPLIER;
const Option = Select.Option;


const columns = [
{
    title: '客户编码',
    dataIndex: 'customerCode',
    key: 'customerCode',
    width:118,
},
{
    title: 'langCode',
    dataIndex: 'langCode',
    key: 'langCode',
    hidden:true,
},
{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width:68,
    render: (text, record, index) => window.ENUM.getEnum("supplierStauts", text.toString()),
},
{
    title: '客户名称',
    dataIndex: 'customerFull',
    key: 'customerFull',
},
{
    title: '客户简称',
    dataIndex: 'customerAbt',
    key: 'customerAbt',
    render: (text, record, index) =>  <TooltipComp attr={{ text: text, wid: 80, placement: 'left' }} />,
},
{
    title: '描述',
    dataIndex: 'customerDesc',
    key: 'customerDesc',
    render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 130, placement: 'left' }} />,
},
{
    title: '更新人',
    dataIndex: 'updateByName',
    key: 'updateByName',
    width:72
}, {
    title: '更新时间',
    dataIndex: 'updateDate',
    key: 'updateDate',
    width:140
}, {    
    dataIndex: 'handle',
    title: '操作',
    className:'handle',
    width:94
}];

class SupplierComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[0].render=(txt,record,index)=>
           <a href="#" onClick={()=>this.CustomerViewShow(record.customerCode,record.langCode)}>{record.customerCode}</a>
        columns[columns.length - 1].render = (txt, record, index) =>
            <div style={{textAlign:'center'}} className="proReturn_handle">
                <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.editCustomer(record.customerCode,record.langCode)}>
                    <i className="c2mfont c2m-bianji"></i>
                </span>
                
                {
                    record.status=='0'?
                    <Popconfirm title={
                        <div>
                            <h5>{T.DELSUPPLIER}</h5>
                            <p>{T.DELSUPPLIER_OK}</p>
                        </div>
                    }
                    onConfirm={()=>this.delCustomer(record.customerCode,record.langCode)}
                    >
                       <span title="删除" className="operator-color operator" href="javascript:;">
                            <i className="c2mfont c2m-shanchu"></i>
                        </span>
                    </Popconfirm>:<span className="line">{formatNullStr('')}</span>
                }
            </div>
            this.searchData={
                left:[
                {
                    key:"customerCode",
                    val:"客户编码",
                    type:"string"
                },
                {
                    key:"customerFull",
                    val:"客户全称",
                    type:"string"
                },
                {
                    key:"customerAbt",
                    val:"客户简称",
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
                    Func:this.AddCustomer,
                    style:{}
                },
                {
                    title:"导入",
                    Func:this.importViewVisiable,
                    style:{}
                }
            ]
        }
    }

    AddCustomer=()=>{
        this.props.customerLoading(true);
        this.props.AddModul();
        this.props.getDept({"orgType":3,"status":1});
        this.props.getBusinessPartnerData({
            "page": "1",
            "pageSize": "10"
        });
        this.props.getCurrencyList({
            "page": "1",
            "pageSize": "10"
        });
        this.props.defaultUser().then(json => {
            //结算方式 C014，付款条件 C013，行业 C015，经营类型 C019，公司性质 C018，公司规模 C016, 发票类型 C021
            let subCode = ["C014", "C013", "C015", "C019", "C018", "C016", "C021"];
            subCode.map((item) => {
                this.props.getSubjectList({ "subCode": item, "status": 1, "page": 1, "pageSize": 10 });
            });
            this.props.getDept({ "orgCode": json.data.deptCode,"orgType": 3, "status": 1, "page": 1, "pageSize": 10 });
            if(json.data.deptCode){
                this.props.getEmployeesList({ "deptCode": json.data.deptCode, "page": 1, "pageSize": 10 });
            }
            
        });//新增默认用户 给负责人加默认值

    }

    editCustomer=(code,langCode)=>{
        this.props.EditModul();
        this.props.customerLoading(true);
        this.props.getEditData(code, langCode, 'edit', "customer").then(data => {
            //结算方式 C014，付款条件 C013，行业 C015，经营类型 C019，公司性质 C018，公司规模 C016, 发票类型 C021
            let param = [{ "subCode": "C014", "catCode": data.settlementCode },
                { "subCode": "C013", "catCode": data.paymentOrgCode },
                { "subCode": "C015", "catCode": data.scmBp.tradeTypeCode },
                { "subCode": "C019", "catCode": data.scmBp.businessTypeCode },
                { "subCode": "C018", "catCode": data.scmBp.companyTypeCode },
                { "subCode": "C016", "catCode": data.scmBp.companyScaleCode },
                { "subCode": "C021", "catCode": data.invoiceTypeCode }
            ]
            this.props.getDept({ "orgCode": data.deptCode, "orgType": 3, "status": 1, "page": 1, "pageSize": 10 });
            if(data.deptCode){
                this.props.getEmployeesList({ "deptCode": data.deptCode, "employeeCode": data.empCode, "page": 1, "pageSize": 10 });
            }
            
            this.props.getBusinessPartnerData({
                "bpCode":data.paymentOrgCode,
                "page": "1",
                "pageSize": "10"
            });
            this.props.getCurrencyList({
                "page": "1",
                "pageSize": "10"
            })
            param.map((item) => {
                this.props.getSubjectList({ ...item, "status": 1, "page": 1, "pageSize": 10 });
            });
        });
    }

    CustomerViewShow =(customerCode,langCode)=>{
        this.props.CustomerViewClick();
        this.props.customerBaseLoading(true);
        this.props.getEditData(customerCode,langCode,'detail');
        this.props.ContactList({bpCode:customerCode,page:1,pageSize:10})
    };   

    delCustomer=(customerCode,langCode)=>{
        this.props.delCustomer({customerCode,langCode})
        .then(json=>{
            if(json.status==2000){
                this.props.tablePaging();
            }
        });
    }

    importViewVisiable=()=>{
        this.props.importViewVisiable();
    }

    render() {
        let { onSearch, SearchVal, status, tabLoading, tablePaging,AddModul, onSelect, ...props } = this.props;
        return (
            <div>
                <SearchBarComp
                    {...props}
                    onSearch={onSearch}
                    searchData={this.searchData}
                />
                <div className="customer-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"customerCode"}
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
