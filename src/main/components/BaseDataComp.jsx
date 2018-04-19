import React from 'react';
import { Form , Table, Layout ,Breadcrumb , Input , Select , Icon , Button , Popconfirm , Menu} from '../../base/components/AntdComp';
let { Header , Sider , Content } = Layout;
let MItem = Menu.Item;
import { base_columns , base_config } from '../consts/BaseData';
import MTable from '../../base/components/TableComp';
import { Enum } from '../../base/consts/Enum.js'
let Option = Select.Option;
class BaseDataComp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchPm:{
                "page":1,
                "pageSize":20,
            },
            searchType : 1,     //搜索条件的类型
            filterList:""       //左边列表的筛选条件
        }
    }
    componentDidMount(){
        this.props.handleRefresh(this.state.searchPm);
    }
    createColumns(type) {
        let { baseType } = this.props,columns =[];
        if(base_config[baseType].isManage != 1){
            return [...base_config[type].columns,...base_columns];
        }else{
            let manage = {
                title: "操作",
                render: (text, record)=>{
                return (<div>
                    {
                        ( window.ENUM.getEnum("baseDataType", record.type+'') === "系统预置") ? "": <div>
                            <a onClick={()=>this.props.getRecord(record[base_config[this.props.baseType].fields.code])}>编辑</a>&nbsp;
                            {
                                (record.status+"" === "1" || record.status+"" === "2" )? "" : <Popconfirm title={
                                    <div>
                                        <h5>确定要删除该数据吗？</h5>
                                    </div>
                                } onConfirm={() => this.props.handleDelete(record[base_config[this.props.baseType].fields.code])}>
                                    <a href="#">删除</a>
                                </Popconfirm>
                            }
                        </div>
                    }
                    </div>)
                },
                key: "action"
            };
            columns = [...base_columns, manage];
            return [...base_config[type].columns , ...columns];
        }
    }
    handleSearch = ()=>{
        let { baseType , form , searchPm } = this.props;
        let fields = form.getFieldsValue();
        let pm = {...searchPm};
        pm[base_config[baseType].fields.code] = fields.searchType === "1"? fields.code_name : "";
        pm[base_config[baseType].fields.name] = fields.searchType === "2"? fields.code_name : "";
        if(fields.searchType === "3"){
            pm.status = fields.status;
        }else{
            delete pm.status;
        }
        if(pm.status && pm.status == "全部"){
            delete pm.status;
        }
        this.props.handleRefresh(pm);
    }
    changeSearchType = (type)=>{
        if(type === "3"){
            this.setState({searchType : 2});
        }else{
            this.setState({searchType : 1});
        }
    }
    filterList = (val)=>{
        this.setState({filterList:val});
    }
    resetSearch = ()=>{
        this.props.form.resetFields();
        this.props.resetFlagFun(false);
    }
    render(){
        let { baseType , dataSource , selectType , handleRefresh ,tableLoading , addDialog ,resetFlag , paging} = this.props;
        let { getFieldDecorator } = this.props.form;
        let result_columns = this.createColumns(baseType);
        if(resetFlag){
            this.resetSearch();
        }
        return (<div>
            <div className="base-data-container">
                <div className="base-data-header">
                    <Form layout="vertical" className="search">
                        <Form.Item className="search-type search-item">
                            {
                                getFieldDecorator("searchType",{
                                    initialValue: "1",
                                })(
                                    <Select
                                        onChange={this.changeSearchType}
                                        style={{height:30}}
                                    >
                                        <Option value="1">编码</Option>
                                        <Option value="2">名称</Option>
                                        <Option value="3">状态</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <div className={this.state.searchType === 1 ? "search-show" : "search-hide"}>
                            <Form.Item className="search-content search-item" visible={this.state.searchType === 1}>
                                {
                                    getFieldDecorator("code_name",{
                                        initialValue: "",
                                    })(
                                        <Input.Search
                                            placeholder="输入编码/名称搜索"
                                            onSearch={this.handleSearch}
                                            style={{height:30}}
                                        />
                                    )
                                }
                            </Form.Item>
                        </div>
                        <div className={this.state.searchType === 2 ? "search-show" : "search-hide"}>
                            <Form.Item className="search-status search-item">
                                {
                                    getFieldDecorator("status",{
                                        initialValue: "全部",
                                    })(
                                        <Select
                                            style={{height:30}}
                                        >
                                            <Option key="全部">全部</Option>
                                            {
                                                Enum.dataStatus.map((option)=>{
                                                    return (<Option key={option.catCode}>{option.catName}</Option>);
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        </Form.Item>
                    </Form>
                    <div className="btns">
                        {base_config[baseType].isManage == 1?<Button className="btn" type="primary" onClick={()=>addDialog(true)}>{`新增${base_config[baseType].c_name}`}</Button>:null}
                    </div>
                </div>
                <div className="base-data-content">
                    <div className="base-data-nav" style={{background:"#fff"}}>
                        <Input
                            onPressEnter={(e)=>this.filterList(e.target.value)}
                            style={{height:20}}
                            placeholder="请输入..."
                        />
                        <Menu defaultSelectedKeys={["0"]}>
                            {
                                base_config.map((item,index)=>{
                                    if(item.c_name.indexOf(this.state.filterList) > -1){
                                        return (<MItem key={index}><a onClick={()=>selectType(index)}>{item.c_name}</a></MItem>)
                                    }
                                })
                            }
                        </Menu>
                    </div>
                    <div className="base-data-table">
                        <MTable
                            dataSource={dataSource}
                            cols={result_columns}
                            pageOnChange={handleRefresh}
                            rowKey={result_columns[0].key}
                            loading={tableLoading}
                            colsChanged={result_columns}
                            paging={paging}
                        />
                        {/*"base_config[baseType].fields.code"*/}
                    </div>
                </div>
            </div>
        </div>);
    }
}
export default Form.create()(BaseDataComp);