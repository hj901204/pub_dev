import React, { Component } from 'react';
import { Form, Input, Spin, Select, Button, Modal, Col, Row, message } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Urls } from '../../../base/consts/Urls';
import MTable from '../../../base/components/TableComp';
import SearchComp from '../../../base/components/SearchComp';

let Search = Input.Search;
let FormItem = Form.Item;

let columns = [{
    title: '行号',
    dataIndex: 'id',
    key: 'id',
    hidden: true,
}, {
    title: '销售订单编码',
    dataIndex: 'saleOrderCode',
    key: 'saleOrderCode',
}, {
    title: '订单行号',
    dataIndex: 'lineNum',
    key: 'lineNum',
}, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
}, {
    title: '可退货数量',
    dataIndex: 'canRetNum',
    key: 'canRetNum',
}, {
    title: '客户名称',
    dataIndex: 'customerName',
    key: 'customerName',
}, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
}];

class SaleReturnDialogComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.searchPm = { saleOrderCode: '', materialCode: '', customerName: '',  page: 1, pageSize: 20 };
        this.inputValue = { materialCode: '', customerName: '' };
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
            item.lineNum = '';
        })

        console.log(selectedRows);
        handleSubmit(selectedRows);
        // console.log(this.state.list);
        handleCancel(this.props.type)
    }
    handleCancel = (e) => {
        if (!this.props.saleReturnDetailLoading) {
            this.props.handleCancel && this.props.handleCancel(this.props.type);
        }
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }
    componentWillMount() {
        this.props.SaleOrderDetailList(this.props[this.props.type].saleOrderDetail.saleDetails, this.props.type);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list != this.state.list) {
            this.setState({ list: nextProps.list });
        }
    }

    onChange = (val) => {
        this.setState({ searchKey: val, searchValue: '' });
    }

    // 翻页
    tablePaging = (page) => {
        console.log('tablePaging...');
        const { saleReturnDetailLoading, OriginalOrderList, saleOrderCode } = this.props;
        console.log(this.props);
        if (!saleReturnDetailLoading) {
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = {...this.searchPm, ...page};
            }
            this.searchPm.saleOrderCode = saleOrderCode;
            console.log('this.searchPm:');
            console.log(this.searchPm);
            OriginalOrderList(this.searchPm);
        }
    };


    onSearch = (val) => {
        let searchKey = this.state.searchKey, type = this.props.type;
        this.searchPm = Object.assign({}, this.inputValue, val);
        if(!this.props.saleReturnDetailLoading) {
            this.searchPm = {...this.searchPm, page: 1};
            this.tablePaging();
        }

    }
    query = () => {
        let searchKey = this.state.searchKey;
        this.onSearch({[searchKey]:this.state.searchValue})
    }

     onSearchChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    dialog = () => {
        let { tablePaging, type, saleReturnDetailLoading, originalOrderSource, ...props } = this.props;
        let { saleOrderDetailList } = this.props[type];
        let { saleOrderDetail } = this.props;

        let saleOrder = [];
   
        let list = this.state.list.map(item => item.saleOrderLineNum);
    

        if(Array.isArray(originalOrderSource)) {
            originalOrderSource.forEach((item, index) => {
                let i = 1;
                
                if (!list.includes(item.lineNum)) {
                    let obj = {};
                    for(let key in item){
                        if(key != 'list') {
                            obj[key] = item[key];
                        }
                    }
                    let saleLineNum = obj['lineNum'];
                    obj['id'] =  obj['detailId'];
                    obj['saleOrderLineNum'] = saleLineNum;
                    obj['returnNum'] = Number(obj['canRetNum'].replace(/,/,''));
                    obj['canRetNum'] = Number(obj['canRetNum'].replace(/,/,''));
                    obj['taxRate'] = Number(obj['taxRate']).toFixed(2);
                    obj['unitPrice'] = Number(obj['unitPrice']).toFixed(2);
                    obj['amount'] = Number(obj['returnNum'] * obj['unitPrice']).toFixed(2);
                    obj['tax'] = Number(obj['returnNum'] * (obj['taxRate']/100) * obj['unitPrice']).toFixed(2);
                    obj['totalAmount'] = (Number(obj['amount']) + Number(obj['tax'])).toFixed(2);
                    saleOrder.push(obj);
                    // console.log('saleOrder:');
                    // console.log(saleOrder);
                }
                
            })
        }
     
        let rowSelection = {
            onChange: this.onSelectChange,
            type: "checkbox"
        };
        let { selectedRowKeys } = this.state;
        return (
            <div className="manage-box">
                <div className="managehead" style={{ marginBottom: 20 }}> 
                  
                    <Select style={{ width: 200, marginRight: 20 }} placeholder="物料编码" onChange={this.onChange}>
                        <Select.Option value="materialCode">物料编码</Select.Option>
                        <Select.Option value="customerName">客户名称</Select.Option>
                    </Select>

                    <Input
                        placeholder="请输入关键字搜索"
                        style={{ width: 200 }}
                        onChange={this.onSearchChange}
                        value={this.state.searchValue}
                        onPressEnter={this.query}
                    />
                    <Button type="primary" onClick={this.query} style={{ marginLeft: 20 }}>查询</Button>
                </div>
                <div className="manage-body">
                    <MTable
                        dataSource={saleOrder}
                        cols={columns}
                        loading={saleReturnDetailLoading}
                        rowKey={'lineNum'}
                        selRows={selectedRowKeys}
                        rowSelection={rowSelection}
                    />
                </div> 
                {/* <Row type="flex" justify="center">
                    <Col span={12}>
                        <FormItem FormItem {...formItemLayout} label="物料编码">
                            {getFieldDecorator('materialCode', {

                                initialValue: saleReturnDetailInfo.takeDelOfDetails ? saleReturnDetailInfo.takeDelOfDetails : '',
                                rules: [{ message: '物料编码为必填', required: true }],
                            })(
                                <Input ></Input>
                                )
                            }
                        </FormItem>
                        <FormItem FormItem {...formItemLayout} label="物料名称">
                            {getFieldDecorator('specification', {

                                initialValue: saleReturnDetailInfo.takeDelOfDetails ? saleReturnDetailInfo.takeDelOfDetails : '',
                                rules: [{ message: '物料名称为必填', required: true }],
                            })(
                                <Input ></Input>
                                )
                            }
                        </FormItem>
                    </Col>

                </Row> */}
            </div>
        )

    }

    render() {
        const { title, type } = this.props;
        // const { getFieldDecorator } = this.props.form;

        // console.log(this.props);

        return (
            <div>
                <Modal title={title} visible={this.props[type].saleReturn_visiable }
                    width={"1200px"}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" size="large"
                            onClick={this.handleSubmit}>
                            确定
                    </Button>
                    ]}
                >
                    {/* <div className="manage-box">
                          <Row type="flex" justify="center">
                            <Col span={12}>
                                <FormItem FormItem {...formItemLayout} label="物料编码">
                                    {getFieldDecorator('materialCode', {

                                        initialValue: '',
                                        rules: [{ message: '物料编码为必填', required: true }],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="物料名称">
                                    {getFieldDecorator('materialName', {

                                        initialValue: '',
                                        rules: [{ message: '物料名称为必填', required: true }],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="数量">
                                    {getFieldDecorator('returnNum', {

                                        initialValue: '',
                                        rules: [{ message: '数量为必填', required: true }],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="单价">
                                    {getFieldDecorator('unitOfMeasurement', {

                                        initialValue: '',
                                        rules: [{ message: '数量为必填', required: true }],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                 <FormItem FormItem {...formItemLayout} label="赠品" style={{visibility: `hidden`}}>
                                    {getFieldDecorator('materialCode', {

                                        initialValue: '',
                                        rules: [{}],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="规格">
                                    {getFieldDecorator('specification', {

                                        initialValue: '',
                                        rules: [{ }],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="赠品">
                                    {getFieldDecorator('idk', {

                                        initialValue: '',
                                        rules: [{}],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="税率">
                                    {getFieldDecorator('isDonation', {

                                        initialValue: '',
                                        rules: [{}],
                                    })(
                                        <Input ></Input>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>  
                        <Row type="flex" justify="center">
                            <Col span={24}>
                                <FormItem FormItem {...formItemLayout} label="备注">
                                    {getFieldDecorator('remark', {
                                        initialValue: saleReturnDetailInfo.remark ? saleReturnDetailInfo.remark : '',
                                        rules: [
                                            { max: 200, message: '最多允许200字符' },
                                        ],
                                    })(
                                        <Input type="textarea" style={{ height: 130, width: 200}} placeholder="请输入备注"/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                    </div> */}
                    {this.dialog()}
                </Modal>
            </div>

        );

    }
}

// const SaleReturnDialogComp = Form.create()(SaleReturnDialogComp);

// export default Form.create()(SaleReturnDialogComp);
export default SaleReturnDialogComp;
