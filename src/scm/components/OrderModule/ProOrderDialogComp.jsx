import React, { Component } from "react";
import { Form, Input, Spin, Select, Button, Modal, Col, Row, message } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Urls } from '../../../base/consts/Urls';
import MTable from '../../../base/components/TableComp';
import SearchComp from '../../../base/components/SearchComp';
let Search = Input.Search;
let columns = [{
    title: '销售订单号',
    dataIndex: 'orderCode',
    filterMultiple: false
}, {
    title: '客户名称',
    dataIndex: 'customerName',

}, {
    title: '明细行号',
    dataIndex: 'lineNumber',

}, {
    title: '产品编码',
    dataIndex: 'materialCode',

}, {
    title: '名称',
    dataIndex: 'materialName',
}, {
    title: '订单数量',
    dataIndex: 'amount',
}, {
    title: '单位',
    dataIndex: 'materialUnitName',
}, {
    title: '单位Code',
    dataIndex: 'materialUnit',
}, {
    title: '累计开工数量',
    dataIndex: 'accumWorkAmount',
}];




class ProOrderDialogComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
        };

    }

    componentDidMount() {
        this.props.tablePaging(1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.saleList != this.props.saleList) {
            this.setState({
                selectedRowKeys: [],
            })
        }
    }    

    handleSubmit = (e) => {
        if (this.state.selectedRowKeys.length > 0) {
            //let productionNumber = parseFloat(this.state.selectedRows[0].productionNumber) - parseFloat(this.state.selectedRows[0].allocatedAmount);
            this.props.ProductCode(this.state.selectedRows[0].materialCode + "[" + this.state.selectedRows[0].materialName + "]", this.state.selectedRows[0].materialCode, this.state.selectedRows[0].orderCode + "-" + this.state.selectedRows[0].lineNumber, this.state.selectedRows[0].productionNumber, this.state.selectedRows[0].materialUnitName, this.state.selectedRows[0].lineNumber, this.state.selectedRows[0].materialUnit, this.props.typeInt);
            this.props.setProductionNumber({
                productionNumber: this.state.selectedRows[0].productionNumber,
                sourceCode: this.state.selectedRows[0].orderCode + "-" + this.state.selectedRows[0].lineNumber,
                productCode:this.state.selectedRows[0].materialCode + "[" + this.state.selectedRows[0].materialName + "]"
            });
            this.handleCancel(this.props.typeInt);
        } else {
            message.warning('请选择一行数据！');
        }

    }
    handleCancel = (e) => {
        if (!this.props.orderSourceLoading) {
            this.props.handleCancel && this.props.handleCancel(this.props.typeInt);
        }
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {

        this.setState({ selectedRowKeys, selectedRows });
    }

    dialog = () => {
        let { onSearch, onChange, statusVal, SearchVal, tablePaging, diaPaging, saleList, orderSourceLoading, ...props } = this.props;
        let rowSelection = {
            onChange: this.onSelectChange,
            type: "radio"
        };
        let { selectedRowKeys } = this.state;
        saleList.map((item, index) => {
            item.index = index;
        });
        return (
            <div className="manage-box">
                <div className="managehead" style={{ marginBottom: 20 }}>
                   <Select size="default" defaultValue="orderCode" style={{ width: 200, marginRight: 20 }}  onChange={onChange}>
                        {
                            window.ENUM.getEnum("orderSource").map(orderSource => {
                                return <Select.Option value={orderSource.catCode.toString()} key={orderSource.catCode}>{orderSource.catName}</Select.Option>
                            })
                        }
                    </Select>
                    <SearchComp
                        onSearch={onSearch}
                        placeholder="请输入关键字搜索"
                        width={200}
                    />
                </div>
                <div className="manage-body">
                    <MTable
                        dataSource={saleList}
                        paging={diaPaging}
                        cols={columns}
                        loading={orderSourceLoading}
                        pageOnChange={tablePaging}
                        selRows={selectedRowKeys}
                        rowSelection={rowSelection}
                        rowKey={'index'}
                        pageSizeOptions={['5','10', '15', '20', '50']}
                    />
                </div>
            </div>
        )

    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <Modal width="950px" title={title} visible={this.props.typeInt == 'add' ? this.props.add.sourceCodeDilog : this.props.edit.sourceCodeDilog}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" size="large"
                            onClick={this.handleSubmit}>
                            选择
                    </Button>,
                    ]}
                >
                    {this.dialog()}
                </Modal>
            </div>

        );

    }
}

export default ProOrderDialogComp;
