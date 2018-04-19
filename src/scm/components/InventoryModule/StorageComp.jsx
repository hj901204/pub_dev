/**
 * Created by MW on 2017/4/20.
 */
import React, {Component} from "react";


import {Form, Input, Button, Select, Table, Icon, message, Popconfirm} from '../../../base/components/AntdComp';
import TableComp from "../../../base/components/TableComp"
import StorageAddDialogCont from "../../dialogconts/InventoryModule/StorageAddDialogCont";
import StorageEditDialogCont from "../../dialogconts/InventoryModule/StorageEditDialogCont";
import ImportStorageDialogCont from "../../dialogconts/InventoryModule/ImportStorageDialogCont";

import * as  StorageAddDialogAct from "../../actions/InventoryModule/StorageAddDialogAct";
import * as StorageEditDialogAct from "../../actions/InventoryModule/StorageEditDialogAct";

import  ImportStorageAct from "../../actions/InventoryModule/ImportStorageAct";

const FormItem = Form.Item;
const Option = Select.Option;

const defaultIcon = {
    '查询':'c2mfont c2m-search1',
    '新建':'c2mfont c2m-jia',
    '导入':'c2mfont c2m-daoru_nor',
}


class StorageComp extends Component {
    columns = [{
        title: '所属站点',
        dataIndex: 'siteName',
        key: 'siteName',
        width:126
    }, {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
        width:240
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => this.renderTableRowStatus(text, record, index)
    }, {
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
    }, {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
    }, {
        title: '操作',
        dataIndex: '',
        key: '',
        width: 168,
        render: (text, record, index) => this.renderTableButton(text, record, index)
    }];

    constructor(prop) {
        super(prop);
        this.state = {
            switchType: "status",
            pagination: {
                ...prop.pagination
            }
        }
    }

    initFormHandleSubmit = () => {
        this.props.form.resetFields();
    }

    componentWillUnmount() {
        this.props.actions.init && this.props.actions.init();
    }

    componentDidMount() {
        this.props.actions.inventoryFreightSpaceGetList && this.props.actions.inventoryFreightSpaceGetList();
    }

    handleDelete = (e, record, index) => {

        this.props.actions.inventoryFreightSpaceDelete && this.props.actions.inventoryFreightSpaceDelete({
            code:record.code
        }).then((json)=>{

            if(json.data && json.status === 2000){
                message.success('删除成功!');
            }
            this.handleSubmit();
        });

    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        if (!this.props.loading) {
            let formVal = this.props.form.getFieldsValue();
            let parameter = {
                ...formVal
            }
            //this.props.pagination.current
            Object.assign(parameter, {
                page: 1,
                pageSize: this.props.pagination.pageSize
            });
            this.props.actions.inventoryFreightSpaceGetList && this.props.actions.inventoryFreightSpaceGetList(parameter);
        } else {

        }
        return false;
    }
    handlerIsDisable = (code,status) => {
        // "status": "int,状态;0：保存 1：启用 2：禁用

        this.props.actions.inventoryFreightSpaceIsDisable && this.props.actions.inventoryFreightSpaceIsDisable({
            code,
            status
        }).then((json)=>{

            if(json.data && json.status === 2000){
                switch (status) {
                    case 0:
                        message.success('启用成功!');
                        break;
                    case 1:
                        message.success('启用成功!');
                        break;
                    case 2:
                        message.success('禁用成功!');
                        break;
                }
            }else {
                switch (status) {
                    case 0:
                        message.error('启用失败!');
                        break;
                    case 1:
                        message.error('启用失败!');
                        break;
                    case 2:
                        message.error('禁用失败!');
                        break;
                }
            }
            this.handleSubmit();
        });
    }
    renderTableRowStatus = (text, record, index) => {
        // "status": "int,仓位状态;0：保存 1：启用 2：禁用"
        switch (record.status) {
            case 0:
                return "已保存";
            case 1:
                return "已启用";
            case 2:
                return "已禁用";
        }
    }

    renderTableButton = (text, record, index) => {
        return (
            <span>
                <a onClick={(e) => this.handleEdit(e, record, index)} title="编辑">
                    <i className="c2mfont c2m-bianji"></i>
                </a>
                    <span className="ant-divider" style={{width:0}}/>
                        <Popconfirm title="确定删除吗?" onConfirm={(e) => this.handleDelete(e, record, index)} okText="确定" cancelText="取消">
                          {record.status == 0 ?(<a href="#" title="删除"><i className="c2mfont c2m-shanchu"></i></a>):''}
                        </Popconfirm>
                {record.status == 0 ?<span className="ant-divider" style={{width:0}}/>:''}
                {
                    this.renderStatusByDisable(record)
                }
            </span>)
    }
    renderStatusByDisable = (record) => {
        switch (record.status) {
            case 0:
                return (
                    <Popconfirm title="确定启用吗?" onConfirm={() => this.handlerIsDisable(record.code,1)} okText="确定" cancelText="取消">
                        <a href="#" title="启用">
                            <i className="c2mfont c2m-qiyong"></i>
                        </a>
                    </Popconfirm>
                );
            case 1:
                return (
                    <Popconfirm title="确定禁用吗?" onConfirm={() => this.handlerIsDisable(record.code,2)} okText="确定" cancelText="取消">
                        <a href="#" title="禁用">
                            <i className="c2mfont c2m-jinyong"></i>
                        </a>
                    </Popconfirm>
                );
            case 2:
                return (
                    <Popconfirm title="确定启用吗?" onConfirm={() => this.handlerIsDisable(record.code,1)} okText="确定" cancelText="取消">
                        <a href="#" title="启用">
                            <i className="c2mfont c2m-qiyong"></i>
                        </a>
                    </Popconfirm>
                );
        }
    }
    addSubmitCallback = () => {
        this.handleSubmit();
    }
    editSubmitCallback = () => {
        this.handleSubmit();
    }
    renderDialogAdd = () => {
        return <StorageAddDialogCont submitCallback={this.addSubmitCallback}/>;
    }
    renderDialogEdit = () => {
        return <StorageEditDialogCont submitCallback={this.editSubmitCallback}/>;
    }

    handleAdd = (e, record, index) => {
        this.props.dispatch(StorageAddDialogAct.show());
    }

    handleEdit = (e, record, index) => {
        this.props.dispatch(StorageEditDialogAct.show(record.code));
    }
    handleOnChange = (page, pageSize) => {
        if (!this.props.loading) {
            let formVal = this.props.form.getFieldsValue();
            let parameter = {
                ...formVal
            };
            if (typeof page === "number") {
                parameter.page = page;
                parameter.pageSize = pageSize;
            } else {
                Object.assign(parameter, page);
            }
            ;
            this.props.actions.inventoryFreightSpaceGetList(parameter);
        }
    }

    getFormItem = () => {
        let {getFieldDecorator} = this.props.form;
        switch (this.state.switchType) {
            case "status":
                return (
                    <FormItem>
                        {getFieldDecorator('status', {
                            initialValue: "-1"
                        })(
                            <Select placeholder="保存状态" style={{width: 150}}>
                                <Option value="-1">全部</Option>
                                <Option value="0">保存状态</Option>
                                <Option value="1">启用状态</Option>
                                <Option value="2">禁用状态</Option>
                            </Select>
                        )}
                    </FormItem>
                );
            case "name":
                return (
                    <FormItem>
                        {getFieldDecorator('name', {
                            initialValue: ""
                        })(
                            <Input placeholder="请输入名称"/>
                        )}
                    </FormItem>
                );
            case "code":
                return (
                    <FormItem>
                        {getFieldDecorator('code', {
                            initialValue: ""
                        })(
                            <Input placeholder="请输入编码"/>
                        )}
                    </FormItem>
                );
        }

    }

    handOnChangeSwitchType = (switchType) => {
        this.setState({
            switchType
        });
    }

    handleImport = ()=>{
        this.props.dispatch(ImportStorageAct.ImportViewVisiable(true));
    }
    render() {
        /* let pagination = {
         current: tableData.paging.page,
         pageSize: tableData.paging.pageSize,
         total: tableData.paging.total
         }*/
        return (
            <div className="storage-tab">
                <div className="storage-search-bar">
                    <div className="search-bar">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <FormItem label="操作类型">
                                <Select placeholder="请选择操作类型" defaultValue={this.state.switchType} style={{width: 150}}
                                        onChange={this.handOnChangeSwitchType}>
                                    <Option value="status">状态</Option>
                                    <Option value="name">名称</Option>
                                    <Option value="code">编码</Option>
                                </Select>
                            </FormItem>
                            {
                                this.getFormItem()
                            }
                            <FormItem>
                                <Button  type="primary" htmlType="submit"><i className="storage c2mfont c2m-search1"/>查询</Button>
                            </FormItem>
                        </Form>
                    </div>

                    <div className="option-bar">
                        <Button type="primary" style={{"marginRight":10}} onClick={this.handleImport} ><i className="storage c2mfont c2m-daoru_nor" />导入</Button>
                        <Button type="primary" onClick={this.handleAdd}><i className="storage c2mfont c2m-jia" />新建</Button>
                    </div>
                </div>
                <div className="search-main">
                    <TableComp
                        {...this.props}
                        cols={this.columns}
                        dataSource={this.props.dataSource}
                        rowKey={"id"}
                        paging={this.props.pagination}
                        pageOnChange={this.handleOnChange}
                    />
                </div>
                {
                    this.renderDialogAdd()
                }
                {
                    this.renderDialogEdit()
                }
                <ImportStorageDialogCont/>
            </div>
        );
    }
}

StorageComp.defaultProps = {
    actions: {},
    dataSource: [],
    loading: false,
    /* pagination:{
     showTotal: (total) => function () {
     return "总共 {0} 条记录".format([total]);
     },
     showSizeChanger: true,
     pageSizeOptions: ['10', '15', '20', '50'],
     pageSize:10,
     current:1,
     total:0
     }*/
}

export default Form.create()(StorageComp);

