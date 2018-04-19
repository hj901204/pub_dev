import React, { Component } from 'react';
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
//import SearchComp from '../../../base/components/SearchComp';
import SearchBarComp from '../../../base/components/SearchBarComp';

const Option = Select.Option;
const columns = [
    {
        title: '价格编码',
        dataIndex: 'orderCode',
        key: 'orderCode',
    },
    {
        title: '单据状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (text, record, index) => window.ENUM.getEnum("orderStatusType", text.toString()),
    },
    {
        title: '价格单名称',
        dataIndex: 'priceName',
        key: 'priceName',
    },{
        title: '是否含税',
        dataIndex: 'isTax',
        key: 'isTax',
    },{
        title: '生效日期',
        dataIndex: 'startTime',
        key: 'startTime ',
    }, {
        title: '失效日期',
        dataIndex: 'endTime',
        key: 'endTime',
    }, {
        title: '币种',
        dataIndex: 'currencyName',
        key: 'currencyName',
    }, {
        title: '更新人',
        dataIndex: 'updateBy',
        key: 'updateBy',
    }, {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
    },{    
        dataIndex: 'handle',
        title: '操作',
        
    }];

class SalePriceListComp extends Component {
     constructor(props, context) {
        super(props, context);
         this.searchData={
                left:[
                {
                    key:"orderCode",
                    val:"价格编码",
                    type:"string"
                },
                {
                    key:"priceName",
                    val:"价格单名称",
                    type:"string"
                },
                {
                    key:"orderStatus",
                    val:"单据状态",
                    type:"select",
                    data:{
                        list: window.ENUM.getEnum("orderStatusType"),
                        keyName:"catCode",
                        labelName:"catName",
                        style:{width:200}
                    }
                },
                {
                    key:"startTime",
                    val:"生效日期",
                    type:"string"
                }
            ],
            center:[
                {
                    title:"查询",
                    Func:null,
                    style:{},
                    type:"button"
                }
            ],
            right:[
                {
                    title:"新建",
                    Func:this.AddSalePrice,
                    style:{}
                },
                // {
                //     title:"导入",
                //     Func:()=>{},
                //     style:{}
                // }
            ]
          }
          columns[0].render=(txt,record,index)=>
            <a href="#" onClick={()=>this.MaterialViewShow(record.orderCode)}>{record.orderCode}</a>
            columns[columns.length - 1].render = (txt, record, index) =>
                <div>
                    <a href="#" onClick={()=>this.editMaterial(record.orderCode)} >编辑 </a>
                    <Popconfirm title={
                        <div>
                            <h5>你是否确定删除这项内容</h5>
                            <p>删除后，该物料信息将被删除。</p>
                        </div>
                    }
                    onConfirm={()=>this.delMaterial(record.orderCode)}
                    >
                    <a href="#">删除</a>
                        {/*{record.documentStatus==0?<a href="#">删除</a>:null}*/}
                    </Popconfirm>
                </div>
     }
     delMaterial=(orderCode)=>{
      this.props.delMaterial(orderCode)
        .then(json=>{
            if(json.status==2000){
                console.log('删除销售价格清单成功！');
                this.props.tablePaging();
            }
        })
    }
    AddSalePrice=()=>{
          this.props.GetCodeRule().then(json=>{
            if(json.status===2000){
                 this.props.AddModul();    
            }
        })
        
    }
    editMaterial=(orderCode)=>{
        this.props.EditModul();
        this.props.getEditData(orderCode);
    }
    MaterialViewShow =(orderCode)=>{
        this.props.MaterialViewClick();
        this.props.getEditData(orderCode);
       
    }; 
     
  
    render() {
        let {onSearch,SearchVal,tablePaging, tabLoading,...props} = this.props;
        return (
            <div className="material">
            
                <SearchBarComp
                    onSearch={onSearch}
                    searchData={this.searchData}
                />
               <div className="material-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"orderCode"}
                        pageOnChange={tablePaging}
                    />
               </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.tablePaging(1);
    }
}

export default SalePriceListComp;    