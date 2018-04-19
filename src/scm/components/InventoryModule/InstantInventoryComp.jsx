import React,{Component} from "react";
import { Form, Input, Button , Select , Popover} from '../../../base/components/AntdComp';
import TableComp from "../../../base/components/TableComp"
const FormItem = Form.Item;
const Option = Select.Option;

const columns = [{
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width:147,
    }, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    }, {
    title: '仓库',
    dataIndex: 'warehouseName',
    key: 'warehouseName',
    }, {
    title: '仓位',
    dataIndex: 'freightSpaceName',
    key: 'freightSpaceName',
    }, {
    title: '批次号',
    dataIndex: 'batchCode',
    key: 'batchCode',
    width:119,
    }, {
    title: '库存状态',
    dataIndex: 'status',
    key: 'status',
    width:129,
    },{
    title: '库存数量',
    dataIndex: 'amount',
    key: 'amount',
    },{
    title: '基本单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
}];

const selectData = [
    {
        value:"materialCode",
        name:"物料编码",
    },
    {
        value:"materialName",
        name:"物料名称",
    },
    {
        value:"warehouseName",
        name:"仓库",
    },
    {
        value:"freightSpaceName",
        name:"仓位",
    },
    {
        value:"batchCode",
        name:"批次号",
    }
];

class InstantInventoryComp extends Component{
    constructor(props,context){
        super(props,context);
        columns[0].render= (text,record) =>{
            if(record.status!=-1){
                return <a href="#" onClick={()=>props.SidebarBtn(record.materialCode,record.status,record.id)}>{text}</a>
            }else{
                return <span>{text}</span>
            }
        }
        columns[5].render= (text,record,index) =>{
           return window.ENUM.getEnum("inventoryStatus").map(inventoryStatus => {
                if(inventoryStatus.catCode==text){
                        return <span key={index}>{inventoryStatus.catName}</span>
                }
            })
            
        }
        this.state={
            searchLoading:false,
            value:selectData[0].value,
        }
       // this.searchPm = {page: 1,pageSize: 10,};
 
    }
    componentDidMount(){
        this.tablePaging(1);
    }
    handleSelectChange = (value) => {
        this.setState({
            value:value
        });
    }
    tablePaging = (page) => {
        const { listLoading, InventoryList } = this.props;
        this.props.form.validateFields((err, data) => {
            data.pageSize = this.props.paging.pageSize;
            if (!listLoading){
                if (typeof page === "number") {
                    data.page = page;
                } else {
                    data = { ...this.data, ...page ,};
                };
                InventoryList(data);
            }
        })
    }
   handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            searchLoading:true
        })
        this.props.form.validateFields((err, data) => {
            if (!err) {
                data.page = 1;
                data.pageSize = this.props.paging.pageSize||10;
                this.props.InventoryList(data)
                setTimeout(() => {
                    this.setState({
                        searchLoading:false,
                        //value:selectData[0].value,
                    })
                    //this.props.form.resetFields();

                },1000)
            }
        })   
    }
    render(){
        let {getFieldDecorator} = this.props.form;
        let Options = selectData.map(select => <Option key={select.value }>{select.name}</Option>);
        return (
            <div className="instant-inventory-box">
                <Form onSubmit={this.handleSubmit} className="instant-inventory-search">
                    <FormItem>
                        <Select onChange={this.handleSelectChange} value={this.state.value} style={{ width: 170 }}>
                            {Options}
                        </Select>
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator(this.state.value, {
                        initialValue:""
                    })(
                        <Input placeholder="请输入关键字搜索"/>
                    )}
                    </FormItem>
                    <FormItem>
                    <Button type="primary" htmlType="submit" loading={this.state.searchLoading}>查询</Button>
                    </FormItem>
                </Form>
                <TableComp
                    {...this.props}
                    cols={columns}
                    dataSource={this.props.dataSource}
                    rowKey={"id"}
                    loading={this.props.listLoading}
                    pageOnChange={this.tablePaging}
                />
            </div>
        )
    }
}
export default Form.create()(InstantInventoryComp)