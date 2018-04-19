import React, { Component } from 'react'
import {Form,Input, Col,Row, InputNumber, Button,Spin, Select,Checkbox,Pagination,Popconfirm, message} from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import PurchaseListAct  from '../../actions/InventoryModule/PurchaseListAct'
import Sidebar from '../../../base/components/SidebarWrapComp';
import PurchaseSideComp from './PurchaseSideComp';
import TooltipComp from '../../../base/components/TooltipComp'
let Option = Select.Option;
let InputGroup = Input.Group;
let CheckboxGroup = Checkbox.Group;


let columns = [{
        title: '单据号',
        dataIndex: 'orderCode',
        key: 'orderCode',
        width:184,
    }, {
        title: '源单据号',
        dataIndex: 'sourceOrderCode',
        key: 'sourceOrderCode',
        width:170,
    }, {
        title: '源单据类型',
        dataIndex: 'sourceOrderType',
        key: 'sourceOrderType',
        render: (txt, record, index) => record.sourceOrderType ? window.ENUM.getEnum("sourceOrderType", record.sourceOrderType):'',
        width:124,
    },{
        title: '供应商',
        dataIndex: 'bpName',
        key: 'bpName',
    },{
        title: '源单备注',
        dataIndex: 'sourceRemark',
        key: 'sourceRemark',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 140}} />
     },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => record.status ? window.ENUM.getEnum("orderStatus", record.status):'',
        width:88,
    },{
        title: '操作',
        dataIndex: 'Oeration',
        key: 'Oeration',
        width:117,
        className:'purchaselist-oeration'
    },
   
];
let selectConditionData = [
    {
        keyCode:"orderCode",
        value:"单据号"
    },
    {
        keyCode:"sourceOrderCode",
        value:"源单据号"
    },
    {
        keyCode:"bpName",
        value:"供应商"
    },
    {
        keyCode:"status",
        value:"状态"
    },
    
];
class PurchaseListComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[0].render = (txt, record, index) =><a onClick={()=>this.props.receiptDetails(record.orderCode)} className="purchase-color-href">{record.orderCode}
        </a>
        columns[1].render = (txt, record, index) =><a onClick={()=>this.props.openSideBar(record.sourceOrderCode)} className="purchase-color-href">{record.sourceOrderCode}
        </a>
        columns[3].render = (txt, record, index) => <TooltipComp attr={{text: <span onClick={()=>this.props.openSideBarSub({supplierCode:record.bpCode,langCode:record.langCode})} className="purchase-color-href">{record.bpName}</span>, wid: 140}} />
        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
            {(record.status==5||record.status==6)?<span className="purchase-double-line">--</span>:<span className="purchase-order-implement c2mfont c2m-zhihang" title='执行' onClick={()=>this.props.GetIslock(record.orderCode)}></span>} 
             {record.status==1? <Popconfirm title="确认删除该数据吗？" onConfirm={() => this.takeOrderDelete(record.orderCode)} okText="确定" cancelText="取消">
                <span className="purchase-order-implement-delete c2mfont c2m-shanchu" title='删除'></span> 
             </Popconfirm>:<span className="purchase-double-line-delete">--</span>}
            </div>
        this.state={
              keyCode:selectConditionData[0].keyCode,
              record:{},
              statusVal:"保存",
        }
        this.option_status = [
            {
                key: 1,
                value: '保存'
            },{
                key: 2,
                value: '部分预收货'
            },{
                key: 3,
                value: '预收货完成'
            },
            {
                key: 4,
                value: '部分收货'
            },{
                key: 5,
                value: '收货完成'
            },{
                key: 6,
                value: '关闭'
            },{
                key: -1,
                value: '全部'
            }

        ] //map 状态列表
    }
 takeOrderDelete = (orderCode) => {
        this.props.takeOrderDelete(orderCode).then(json => {
            if(json.status == 2000){
                message.info('数据删除成功！');
            }
        })
    }
// openSideBar = (record) => {
//     this.props.openSideBar(true,{orderCode:record.sourceOrderCode});   
// }
// openSideBarSub = (record) => {
//     this.props.openSideBarSub(true,record);   
// }
handleSelectChange = (value) => {
     this.props.form.resetFields();
        this.setState({
            keyCode:value,
            statusVal:"保存",
        });
}
statusSelect=(val)=>{
    if(val=="全部"){
        this.setState({statusVal:-1});
    }else{
        this.setState({statusVal:val});
    }
}
componentDidMount() {
        this.props.PurchaseList({page:1,pageSize:10,sourceOrderType:11});
}
searchBar=()=>{//查询按钮
     let  searchVal = this.props.form.getFieldsValue();
     this.props.PurchaseList({page:1, pageSize:this.props.newState.paging.pageSize,sourceOrderType:11,...searchVal})
     this.props.takeBtnLoading()
}
 tablePaging = (current) => {
        this.props.PurchaseList(typeof current == 'number'?Object.assign(this.props.newState.search,{page:current}):Object.assign(this.props.newState.search,current));
}
newCreate = () => {
    let {GetCodeRule, newCreate} = this.props;
    GetCodeRule().then(json => {
        if (json.status === 2000) {
            newCreate()
        }
    })
}
 getInput=()=>{
     let { getFieldDecorator } = this.props.form;
         switch (this.state.keyCode) {
            case "orderCode":
                return <Input className="select-get-input" placeholder='请输入关键字搜索' onPressEnter={()=>this.searchBar()} />;
            case "sourceOrderCode":
                return <Input className="select-get-input" placeholder='请输入关键字搜索' onPressEnter={()=>this.searchBar()} />;
            case "bpName":
                return <Input className="select-get-input" placeholder='请输入关键字搜索' onPressEnter={()=>this.searchBar()} />;
            case "status":
                return <span className="option_status">
                         {
                            getFieldDecorator("status",{
                                initialValue:"1",
                            })(
                               <Select style={{width:186,height:30}} onChange={this.statusSelect}>
                                { 
                                    this.option_status.map((option,index)=>{
                                    return (<Option key={option.key+""} value={option.key+""} >{option.value}</Option>);
                                    })
                                }
                               </Select> 
                            )
                        }  
                       </span> 
            default:    
                return false;
        }
    }
    render(){ 
        let { newState,tableLoading,tablePaging, ...props} = this.props;
        let selectConditionOptions = selectConditionData.map(conditionWay => <Option key={conditionWay.keyCode }>{conditionWay.value}</Option>)
        let { getFieldDecorator } = this.props.form;
        return (
                 <div className="purchase-list-content">
                     <div className="select-input-content">
                            <Select defaultValue={selectConditionData[0].value} onChange={this.handleSelectChange} className="select-input" >
                            {selectConditionOptions}
                            </Select>
                            <Form  className="selectForm"> 
                                <Form.Item>
                                     {
                                        getFieldDecorator(this.state.keyCode,{
                                            initialValue:"",
                                        })(
                                            this.getInput()   
                                        )
                                    }    
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={this.searchBar} className="searchBar" loading={newState.btnLoading}><span className="search-icon c2mfont c2m-search1"></span><span>查询</span></Button>      
                                </Form.Item>                                  
                            </Form>
                            <Button type="primary" className="newSet" onClick={this.newCreate}><span className="newset-icon c2mfont c2m-jia"></span><span className="newset-create">新建</span></Button> 
                     </div>
                     <MTable 
                        cols={columns}
                        rowKey = {"id"}
                        dataSource={newState.dataSource} 
                        loading={newState.tableLoading}
                        paging = {newState.paging}
                        pageOnChange={this.tablePaging}
                        {...props} 
                     />  
                    <PurchaseSideComp {...this.props}/>
                 </div>  
                        
                )
    }
}

export default Form.create()(PurchaseListComp)



