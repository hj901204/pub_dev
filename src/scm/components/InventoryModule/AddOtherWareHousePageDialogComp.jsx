import React, { Component, PropTypes } from "react";
import FormModalComp from '../../../base/components/FormModalComp';
import { Form, Input, Col, Row, InputNumber, Button, Spin, Select, Checkbox, Pagination, Popconfirm, message } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
let Option = Select.Option;
let InputGroup = Input.Group;
let CheckboxGroup = Checkbox.Group;
let FormItem = Form.Item;

let columns = [{
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    filterMultiple: false
}, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
}, {
    title: '规格',
    dataIndex: 'materialSpec',
    key: 'materialSpec',
}, {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
}, {
    title: '基本单位',
    dataIndex: 'measureUnitName',
    key: 'measureUnitName',
}];
let selectConditionData = [
    {
        keyCode: "materialCode",
        value: "物料编码"
    },
    {
        keyCode: "materialName",
        value: "物料名称"
    },
    {
        keyCode: "materialSpec",
        value: "规格"
    },
    {
        keyCode: "model",
        value: "型号"
    },

];
class AddOtherWareHousePageDialogComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyCode: selectConditionData[0].keyCode,
            selectedRowKeys: [],
            selectedRows: [],
        }
    }
    handleSelectChange = (value) => {
        this.props.form.resetFields();
        this.setState({
            keyCode: value,
            record: {}
        });
    }
    getInput = () => {
        switch (this.state.keyCode) {
            case "materialCode":
                return <Input className="select-get-input" placeholder='请输入物料编码' onPressEnter={() => this.searchBar()} />;
            case "materialName":
                return <Input className="select-get-input" placeholder='请输入物料名称' onPressEnter={() => this.searchBar()} />;
            case "materialSpec":
                return <Input className="select-get-input" placeholder='请输入规格' onPressEnter={() => this.searchBar()} />;
            case "model":
                return <Input className="select-get-input" placeholder='请输入型号' onPressEnter={() => this.searchBar()} />;
            default:
                return false;
        }
    }
    componentDidMount() {
        this.props.PurchaseList({ page: 1, pageSize: 5, status: 1, usingWarehouse: 0 });
    }
    searchBar = () => {//查询按钮
        let searchVal = this.props.form.getFieldsValue();
        this.props.PurchaseList({ page: 1, pageSize: this.props.newState.paging.pageSize, status: 1, usingWarehouse: 0, ...searchVal })
        this.props.takeBtnLoading()
        this.setState({ selectedRowKeys: [], selectedRows: [] })
    }
    tablePaging = (current) => {
        this.props.PurchaseList(typeof current == 'number' ? Object.assign(this.props.newState.search, { page: current }) : Object.assign(this.props.newState.search, current));
        this.setState({ selectedRowKeys: [], selectedRows: [] })
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }
    handleSubmit = () => {
        let checkedList = this.state.selectedRows[0];
        let selectRowsLength = this.state.selectedRowKeys.length;
        if (selectRowsLength > 0) {
            this.props.checkedTableList(checkedList);
            this.props.hide();
        }
    }
    onRowDoubleClick = (record, index, event) => {
        this.props.checkedTableList(record);
        this.props.hide();
    }
    getComp = () => {
        let { newState, tablePaging, tableLoading, loading, title, pageSizeOptions, ...props } = this.props;
        let selectConditionOptions = selectConditionData.map(conditionWay => <Option key={conditionWay.keyCode}>{conditionWay.value}</Option>)
        let rowSelection = {
            onChange: this.onSelectChange,
            type: "radio"
        };
        let { getFieldDecorator } = this.props.form;
        let { selectedRowKeys } = this.state;
        return (
            <div className="ohter-ware-dialog-content">
                <div className="select-input-content">
                    <Select defaultValue={selectConditionData[0].value} onChange={this.handleSelectChange} className="select-input" >
                        {selectConditionOptions}
                    </Select>
                    <Form className="selectForm">
                        <FormItem>
                            {
                                getFieldDecorator(this.state.keyCode, {
                                    initialValue: ""
                                })(
                                    this.getInput()
                                    )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.searchBar} className="searchBar" loading={newState.btnLoading}>查询</Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="other-dialog-page-boder"></div>
                <MTable
                    pageSizeOptions={this.props.pageSizeOptions}
                    cols={columns}
                    rowKey={"id"}
                    dataSource={newState.dataSource}
                    loading={newState.tableLoading}
                    paging={newState.paging}
                    pageOnChange={this.tablePaging}
                    onRowDoubleClick={(record, index, event) => this.onRowDoubleClick(record, index, event)}
                    selRows={selectedRowKeys}
                    rowSelection={rowSelection}
                    handleSubmit={() => this.handleSubmit()}

                />
            </div>

        )
    }
}

AddOtherWareHousePageDialogComp.defaultProps = {
    rowKey: '',
    pageSizeOptions: ['5', '10', '15', '20', '50'],
    loading: false,
    dataSource: [],
    cols: [],
    paging: {
        // total,
        // current,
        // pageSize
    },
    pageOnChange: () => { },
}
export default Form.create()(AddOtherWareHousePageDialogComp)

