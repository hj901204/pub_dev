import React, { Component } from "react";
import { Form, Input, Spin, Select, Button, Modal, Col, Row, message } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Urls } from '../../../base/consts/Urls';
import MTable from '../../../base/components/TableComp';
import SearchComp from '../../../base/components/SearchComp';
let Search = Input.Search;
let columns = [{
    title: '行号',
    dataIndex: 'id',
    key: 'id',
    hidden: true,
}, {
    title: '行号',
    dataIndex: 'selfLine',
    key: 'selfLine',
}, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
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
    dataIndex: 'materialModel',
    key: 'materialModel',
}, {
    title: '单位',
    dataIndex: 'measureUnitName',
    key: 'measureUnitName',
}];




class PurRetDialogComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            list: props.list || [],
            searchKey: 'materialCode',
            searchValue: ''
        };

    }
    handleSubmit = (e) => {
        let { selectedRows } = this.state;
        let { handleSubmit, handleCancel } = this.props;
        selectedRows.map(item => {
            let a=item.selfLine;
            item.selfLine = item.line;
            item.line = a;
        })
        handleSubmit(selectedRows);
        handleCancel(this.props.type)
    }
    handleCancel = (e) => {
        if (!this.props.orderSourceLoading) {
            this.props.handleCancel && this.props.handleCancel(this.props.type);
        }
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }
    componentWillMount() {
        this.props.PurchaseDetailList(this.props[this.props.type].purchaseDetail.list, this.props.type);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list != this.state.list) {
            this.setState({ list: nextProps.list });
        }
    }
    onChange = (val) => {
        this.setState({ searchKey: val, searchValue: '' });
    }
    onSearch = (val) => {
        let searchKey = this.state.searchKey, type = this.props.type;
        let list = this.props[type].purchaseDetail.list;
        let dataSource = [];
        if (Array.isArray(list)) {
            list.forEach(item => {
                if (item[searchKey].includes(val)) {
                    dataSource.push(item);
                }
            });
        };
        this.props.PurchaseDetailList(dataSource, type);
    }
    onSearchChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }
    dialog = () => {
        let { tablePaging, type, purchaseDetailLoading, ...props } = this.props;
        let { purchaseDetailList } = this.props[type];
        let dataSource = [];
        let list = this.state.list.map(item => Number(item.line));
        if (Array.isArray(purchaseDetailList)) {
            purchaseDetailList.forEach(item => {
                if (!list.includes(item.selfLine)) {
                    dataSource.push(item);
                }
            });
        };
        let rowSelection = {
            onChange: this.onSelectChange,
            type: "checkbox"
        };
        let { selectedRowKeys } = this.state;
        return (
            <div className="manage-box">
                <div className="managehead" style={{ marginBottom: 20 }}>
                    <Select size="large" style={{ width: 200, marginRight: 20 }} defaultValue='materialCode' onSelect={this.onChange}>
                        {
                            window.ENUM.getEnum("searchType").map(item => {
                                return <Select.Option value={item.catCode} key={item.catCode}>{item.catName}</Select.Option>
                            })
                        }
                    </Select>
                    <Search
                        onSearch={this.onSearch}
                        placeholder="请输入关键字搜索"
                        style={{ width: 200 }}
                        onChange={this.onSearchChange}
                        value={this.state.searchValue}
                    />
                    <Button type="primary" onClick={() => { this.onSearch(this.state.searchValue) }} style={{ marginLeft: 20 }}>查询</Button>
                </div>
                <div className="manage-body">
                    <MTable
                        dataSource={dataSource}
                        cols={columns}
                        loading={purchaseDetailLoading}
                        rowKey={"id"}
                        selRows={selectedRowKeys}
                        rowSelection={rowSelection}
                        pageSizeOptions={['5', '10', '15', '20', '50']}
                        paging={{
                            pageSize: 5
                        }}
                    />
                </div>
            </div>
        )

    }

    render() {
        const { title, type } = this.props;
        return (
            <div>
                <Modal title={title} visible={this.props[type].purRet_visiable }
                    width={"950px"}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" size="large"
                            onClick={this.handleSubmit}>
                            确定
                    </Button>,
                    ]}
                >
                    {this.dialog()}
                </Modal>
            </div>

        );

    }
}

export default PurRetDialogComp;
