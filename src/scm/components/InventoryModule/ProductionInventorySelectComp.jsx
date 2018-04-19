import React,{Component} from "react";
import { Form, Input, Button ,Select,message} from '../../../base/components/AntdComp';
import TableComp from "../../../base/components/TableComp";
import FormModalComp from '../../../base/components/FormModalComp';
const FormItem = Form.Item;
const Option = Select.Option;

const columns = [{
    title: '仓库名称',
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
    }, {
    title: '库存数量',
    dataIndex: 'amount',
    key: 'amount',
    },{
    title: '分配数量',
    dataIndex: 'materialAmount',
    key: 'materialAmount',
}];
class PurchaseInventorySelectComp extends FormModalComp{
    constructor(props,context){
        super(props,context);
        this.state={
            value:"freightSpaceName",
            searchLoading:false,
            disabled:true
        }
        columns[columns.length - 1].render=(text,record,index)=>{
            let {InventorySelectTableData,InventorySelectData} = this.props;
            return <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                        {this.props.form.getFieldDecorator(record.idStr, {
                            initialValue:0,
                            rules: [
                                {validator: (rule,val,callback)=>{
                                    if(val<=Number(record.amount)&&val<=(Number(InventorySelectData.planAmount)-Number(InventorySelectData.allocatedAmount))){
                                        callback();
                                    }else{
                                        callback("数量分配不对，请重新输入");
                                    }
                                }}
                            ],
                        })(
                            <Input placeholder="0" className="inventory-select-number" type="number"/>
                        )}
                        </FormItem>
                    </Form>
        }
    }
    handleSubmit = (e) => {
        let {InventorySelectTableData,InventorySelectData} = this.props;
        e.preventDefault();
        if(!this.props.loading){
            this.validateFds((err, data) => {
                let listData = [];
                let Data = {};
                let amount = 0;
                //let materialAmount = [];
                InventorySelectTableData.map(list=>{
                    amount = list.amount;
                    Data = {
                        outCode:InventorySelectData.outCode,
                        lineNum:InventorySelectData.lineNum,
                        warehouseCode:list.warehouseCode,
                        freightSpaceCode:list.freightSpaceCode,
                        batchCode:list.batchCode,
                        materialAmount:0
                    }
                    for(let i in data){
                        if(i==list.idStr){
                            Data={...Data,materialAmount:data[i]}
                        }else{
                             Data={...Data}
                        }
                    }
                    listData.push(Data)
                })
                data={list:listData}
                
                // data.list.map(list=>{
                //     materialAmount.push(list.materialAmount)
                // })
                // let checkmaterialAmount=(materialAmount)=>{
                //     return materialAmount>amount&&materialAmount>(InventorySelectData.planAmount-InventorySelectData.allocatedAmount)
                // }
                // if(materialAmount.some(checkmaterialAmount)){
                //     message.error("数量分配不对，请重新输入");
                // }else 
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    searchSubmit=(e)=>{
        let {InventorySelectData} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.setState({
                    searchLoading:true,
                })
                setTimeout(() => {
                    this.setState({
                        searchLoading:false,
                    })
                    if(data.freightSpaceName||data.freightSpaceName==""){
                       data = {
                           freightSpaceName:data.freightSpaceName,
                           outCode:InventorySelectData.outCode,
                           lineNum:InventorySelectData.lineNum,
                        }
                    }else if(data.batchCode||data.batchCode==""){
                        data = {
                            batchCode:data.batchCode,
                            outCode:InventorySelectData.outCode,
                            lineNum:InventorySelectData.lineNum,
                        }
                    }
                    this.props.InventorySelectTableList(data)
                    this.props.form.resetFields();
                },1000)
            }
        })  
    }
    handleChange=(value)=>{
        this.setState({
            value:value
        })
    }
    getComp = () => {
        let {getFieldDecorator} = this.props.form;
        let {InventorySelectData,title,...props} = this.props;
            return (
                <div className="inventory-select-dialog">
                    <div className="inventory-select-dialog-title" key="">
                        <div className="inventory-select-dialog-title-left">
                            <p className="inventory-select-dialog-title-left-up">
                                <span>物料编码：{InventorySelectData.materialCode}</span>
                                <span>物料名称：{InventorySelectData.materialName}</span>
                            </p>
                            <p className="inventory-select-dialog-title-left-down">
                                <span>规格：{InventorySelectData.materialSpec}</span>
                                <span>型号：{InventorySelectData.materialModel}</span>
                                <span>单位：{InventorySelectData.materialUnitName}</span>
                            </p>
                        </div>
                        <div className="inventory-select-dialog-title-right">
                            <p>计划数量：<span className="receipt-number">{InventorySelectData.planAmount}</span></p>
                            <p>已分配数量：<span className="distribute-number">{InventorySelectData.allocatedAmount}</span></p>
                        </div>
                    </div>
                    <Form onSubmit={this.searchSubmit}>
                        <FormItem>
                            <Select value="仓位" onChange={this.handleChange}>
                                <Option value="freightSpaceName">仓位</Option>
                                <Option value="batchCode">批次号</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator(this.state.value, {
                            initialValue:""
                        })(
                            <Input placeholder="请输入关键字搜索" />
                        )}
                        </FormItem>
                        <FormItem>
                        <Button type="primary" htmlType="submit" loading={this.state.searchLoading}>查询</Button>
                        </FormItem>
                    </Form>
                <TableComp
                    {...props}
                    dataSource={this.props.InventorySelectTableData}
                    cols={columns}
                    rowKey={"id"}
                    pagination={false}
                    loading={false}
                />
                </div>
            )
        
        
    }
}

PurchaseInventorySelectComp.defaultProps={
    title: '库存选择',
    okText: '确定',
    width: 740,
    maskClosable: true,  
}
export default Form.create()(PurchaseInventorySelectComp);
