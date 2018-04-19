import React,{Component} from "react";
import { Breadcrumb,Select, Input, Button, Table, Popconfirm,message,Menu} from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import SearchBarComp from '../../../base/components/SearchBarComp';
import TooltipComp from '../../../base/components/TooltipComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
let MItem = Menu.Item;
const Search = Input.Search;
const Option = Select.Option;

const columns=[
    {
        title: '商业伙伴编码',
        dataIndex: 'bpCode',
        key: 'bpCode',
        width: 160,
    },{
        title: '商业伙伴全称',
        dataIndex: 'bpFull',
        key: 'bpFull',
        width: 350,
    },{
        title: '商业伙伴简称',
        dataIndex: 'bpAbt',
        key: 'bpAbt',
        render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 86, placement: 'top' }} />
    },{
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
        width: 100,
    },{
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
        width: 160,
    }
]

class BusinessComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
                searchBus:'bpCode',
                searchVal:'',
                page:1,
                pageSize:10
        };
        columns[0].render=(txt,record,index)=>
           <a href="#" onClick={()=>this.onDetailsShow(record.bpCode,record.langCode)}>{record.bpCode}</a>

           this.searchData={
                left:[
                {
                    key:"bpCode",
                    val:"商业伙伴编码",
                    type:"string"
                },
                {
                    key:"bpFull",
                    val:"商业伙伴全称",
                    type:"string"
                },
                {
                    key:"bpAbt",
                    val:"商业伙伴简称",
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
                // {
                //     title:"新增",
                //     Func:this.AddSupplier,
                //     style:{}
                // },
                // {
                //     title:"导入",
                //     Func:()=>{},
                //     style:{}
                // }
            ]
        }
    }
     tablePaging=(page)=>{
        const{businessTabLoading,BusinessList}=this.props;
        if(!businessTabLoading){
            if(typeof page==="number"){
                this.state.page=page;
            }else{
                this.state={...this.state,...page};
            };
            let l={};
            l[this.state.searchBus]=this.state.searchVal;
            l['page']=this.state.page;
            l['pageSize']=this.state.pageSize; 
            BusinessList(l);
        }
    }
    onSearch=(searchVal)=>{
        this.setState({searchVal:searchVal});
        const{businessTabLoading,BusinessList}=this.props;
        if(!businessTabLoading){
            let l={};
            l[this.state.searchBus]=searchVal||this.state.searchVal;
            l['page']=this.state.page;
            l['pageSize']=this.state.pageSize; 
            BusinessList(l);
        }
    }
    componentDidMount(){
        this.tablePaging(1);
    }
    shouldComponentUpdate=(nextProps,nextState)=>{
        return shouldComponentUpdate(nextProps,nextState,this.props,this.state);
    }
    onDetailsShow =(bpCode,langCode)=>{
           this.props.businessTabAdd();
           this.props.businessDetailsId(bpCode,langCode);
    }
    render(){
        let{businessTabLoading,onSearch,...props}=this.props;
        return(
           <div>
                <SearchBarComp
                    {...props}
                    onSearch={onSearch}
                    searchData={this.searchData}
                />
               <div className="business-body">
                   <MTable
                   {...props}
                   loading={businessTabLoading}
                   cols={columns}
                   rowKey={"bpCode"}
                   pageOnChange={this.tablePaging}
                   />
               </div>
           </div>
        )
    }
}

export default BusinessComp;