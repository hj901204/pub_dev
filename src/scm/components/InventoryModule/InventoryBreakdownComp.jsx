import React,{Component} from "react";
import moment from 'moment';
import { Form, Input, Button ,Select , DatePicker  } from '../../../base/components/AntdComp';
import TableComp from "../../../base/components/TableComp"
import TooltipComp from '../../../base/components/TooltipComp'
const FormItem = Form.Item;
const Option = Select.Option;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const columns = [{
    title: '操作类型',
    dataIndex: 'operationType',
    key: 'operationType',
    width:78,
    fixed:'left',
    }, {
    title: '任务单类型',
    dataIndex: 'billType',
    key: 'billType',
    }, {
    title: '关联任务单号',
    dataIndex: 'billCode',
    key: 'billCode',
    }, {
    title: '关联行号',
    dataIndex: 'billNum',
    key: 'billNum',
    }, {
    title: '源单据号',
    dataIndex: 'sourceBillCode',
    key: 'sourceBillCode',
    }, {
    title: '仓库',
    dataIndex: 'warehouseName',
    key: 'warehouseName',
    },{
    title: '仓位',
    dataIndex: 'freightSpaceName',
    key: 'freightSpaceName',
    },{
    title: '物料编号',
    dataIndex: 'materialCode',
    key: 'materialCode',
    }, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    render:(text)=>{
        return <TooltipComp attr={{text:text, wid: 119, placement: 'bottom'}} />
    },
    }, {
    title: '批次号',
    dataIndex: 'batchCode',
    key: 'batchCode',
    },{
    title: '库存状态',
    dataIndex: 'storeStatus',
    key: 'storeStatus',
    }, {
    title: '操作前数量',
    dataIndex: 'befOperatNum',
    key: 'befOperatNum',
    },{
    title: '操作数量',
    dataIndex: 'operatNumStr',
    key: 'operatNumStr',
    },{
    title: '操作后数量',
    dataIndex: 'aftOperatNum',
    key: 'aftOperatNum',
    }, {
    title: '基本单位',
    dataIndex: 'unitName',
    key: 'unitName',
    }, {
    title: '操作人',
    dataIndex: 'createByName',
    key: 'createByName',
    },{
    title: '操作时间',
    dataIndex: 'createDate',
    key: 'createDate',
    }, {
    title: '库存交易号',
    dataIndex: 'inventoryDealCode',
    key: 'inventoryDealCode',
    },{
    title: '交易序号',
    dataIndex: 'inventoryDealNum',
    key: 'inventoryDealNum',
    }
];

const selectData = [
    {
        value:"operationType",
        name:"操作类型",
    },
    {
        value:"billCode",
        name:"关联任务单号",
    },
    {
        value:"sourceBillCode",
        name:"源单据号",
    },
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
    }
];
class InventoryBreakdownComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            startValue: null,
            endValue: null,
            endOpen: false,
            searchLoading:false,
            value:selectData[0].value,
        }
        columns[0].render= (text) =>{
           return window.ENUM.getEnum("operationType").map(operationType => {
                if(operationType.catCode==text){
                        return <span key={operationType.catCode}>{operationType.catName}</span>
                }
            }) 
        }
        columns[1].render= (text) =>{
           return window.ENUM.getEnum("billType").map(billType => {
                if(billType.catCode==text){
                        return <span key={billType.catCode}>{billType.catName}</span>
                }
            }) 
        }
        columns[10].render= (text) =>{
           return window.ENUM.getEnum("materialStatus").map(materialStatus => {
                if(materialStatus.catCode==text){
                        return <span key={materialStatus.catCode}>{materialStatus.catName}</span>
                }
            }) 
        }
    }
    componentDidMount(){
        this.tablePaging(1);
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
        return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
        return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
        [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
        this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    tablePaging = (page) => {
        const { listLoading, InventoryList } = this.props;
        this.props.form.validateFields((err, data) => {
           if(data.updateDateStart&&data.updateDateEnd){
                data.updateDateStart = data["updateDateStart"].format("YYYY-MM-DD HH:mm:ss")
                data.updateDateEnd = data["updateDateEnd"].format("YYYY-MM-DD HH:mm:ss")
                }else if(data.updateDateStart){
                    data.updateDateStart = data["updateDateStart"].format("YYYY-MM-DD HH:mm:ss")
                    data.updateDateEnd = ""
                }else{
                    data.updateDateStart = ""
                    data.updateDateEnd = ""
                }
            data.pageSize = this.props.paging.pageSize||10;
            if(data.operationType){
                if(data.operationType=="全部"){
                    data.operationType=-1
                }
            }
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
                    if(data.updateDateStart&&data.updateDateEnd){
                    data.updateDateStart = data["updateDateStart"].format("YYYY-MM-DD HH:mm:ss")
                    data.updateDateEnd = data["updateDateEnd"].format("YYYY-MM-DD HH:mm:ss")
                    }else if(data.updateDateStart){
                        data.updateDateStart = data["updateDateStart"].format("YYYY-MM-DD HH:mm:ss")
                        data.updateDateEnd = ""
                    }else{
                        data.updateDateStart = ''
                        data.updateDateEnd = ""
                    }
                data.page = 1;
                data.pageSize = this.props.paging.pageSize||10;
                if(data.operationType){
                    if(data.operationType=="全部"){
                        data.operationType=-1
                    }
                }
                this.props.InventoryList(data)
                setTimeout(() => {
                    this.setState({
                        searchLoading:false,
                        //value:selectData[0].value,
                    })
                   //this.props.form.resetFields();
                },1000)
            }
        });     
    }
    handleSelectChange = (value) => {
        this.setState({
            value:value
        });
    }
    getInput = () => {
        let {getFieldDecorator} = this.props.form;
        let option = window.ENUM.getEnum("operationType").map(operationType => {
                return <Option key={operationType.catCode } value={operationType.catCode}>{operationType.catName}</Option>
            })
        if(this.state.value=="operationType"){
            return <FormItem>
                        {getFieldDecorator(this.state.value, {
                            initialValue:"全部"
                        })(
                            <Select>
                                {option}
                            </Select>
                        )}
                    </FormItem>
        }else{
            return <FormItem>
                        {getFieldDecorator(this.state.value, {
                            initialValue:""
                        })(
                            <Input placeholder="请输入关键字搜索"/>
                        )}
                    </FormItem>
        }
            
    }
    render(){
        let {getFieldDecorator} = this.props.form;
        let Options = selectData.map(select => <Option key={select.value }>{select.name}</Option>);
        let now = new Date();
        now.setDate(now.getDate()-7);
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return (
            <div className="inventory-breakdown-box">
                <Form onSubmit={this.handleSubmit} className="inventory-breakdown-search">
                    <FormItem label="操作时间从:">
                    {getFieldDecorator('updateDateStart', {
                        initialValue:moment(now)
                    })(
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            placeholder="Start"
                            format = "YYYY-MM-DD HH:mm:ss"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                            allowClear={false}
                        />
                    )}
                    </FormItem>
                    <FormItem label="至:">
                    {getFieldDecorator('updateDateEnd', {
                       // initialValue:moment()
                    })(
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            placeholder="End"
                            format = "YYYY-MM-DD HH:mm:ss"
                            onChange={this.onEndChange}
                            open={this.state.endOpen}
                            onOpenChange={this.handleEndOpenChange}
                            allowClear={false}
                        />
                    )}
                    </FormItem>
                    <Select onChange={this.handleSelectChange} value={this.state.value} style={{ width: 170 }}>
                        {Options}
                    </Select>
                    {this.getInput()}
                    <FormItem>
                    <Button type="primary" htmlType="submit" loading={this.state.searchLoading}>查询</Button>
                    </FormItem>
                </Form>
                <TableComp
                    {...this.props}
                    cols={columns}
                    loading={this.props.listLoading}
                    rowKey={"idStr"}
                    dataSource={this.props.dataSource}
                    pageOnChange={this.tablePaging}
                    paging={this.props.paging}
                    scroll={{ x: 1980 }}
                />
            </div>
        )
    }
}
export default Form.create()(InventoryBreakdownComp)