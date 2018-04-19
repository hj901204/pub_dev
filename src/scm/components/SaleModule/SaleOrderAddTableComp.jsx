import React, { Component } from 'react';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import { Button, Popconfirm, message, Input, Icon, Table, Select, Radio, DatePicker, Form } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import TooltipComp from "../../../base/components/TooltipComp";
import SaleOrderAddTableDialogCont from "../../dialogconts/SaleModule/SaleOrderAddTableDialogCont";
import SaleOrderEditTableDialogCont from '../../dialogconts/SaleModule/SaleOrderEditTableDialogCont'
import SaleOrderAct from "../../actions/SaleModule/SaleOrderAct";
import MTable from "../../../base/components/TableComp"
import moment from 'moment';
import { store } from "../../data/StoreConfig";
const Option = Select.Option;

class SaleOrderAddTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value,
            currVal: '',
            index: '',
            current: 1,
            pageSize:10
        }
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                hidden: true
            }, {
                title: '行号',
                dataIndex: 'lineNum',
                key: 'lineNum',
                width: 62,
                fixed: 'left',
            }, {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'metarialCode',
                width: 164,
                fixed: 'left',
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                width: 98,
                fixed: 'left',
            }, {
                title: '规格',
                dataIndex: 'specification',
                key: 'specification',
                className: 'saleOrder-table-padding',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 70, placement: 'left' }} />
            }, {
                title: '型号',
                dataIndex: 'model',
                key: 'model',
            }, {
                title: '数量',
                dataIndex: 'materialNum',
                key: 'materialNum',
                render:(text,record,index)=>{
                    return Number(text).toFixed(2)
                }
            }, {
                title: '单位',
                dataIndex: 'unitOfMeasurementName',
                key: 'unitOfMeasurementName',
            }, {
                title: '单位',
                dataIndex: 'unitOfMeasurement',
                key: 'unitOfMeasurement',
                hidden: true
            }, {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                render:(text,record,index)=>{
                    return Number(text).toFixed(2)
                }
            }, {
                title: '赠品',
                dataIndex: 'isDonation',
                key: 'isDonation',
                render: (txt, record, index) => {
                    return window.ENUM.getEnum("isDonation", txt + '')
                },
            }, {
                title: '交货日期',
                dataIndex: 'planDelivery',
                key: 'planDelivery',
            }, {
                title: '税率 (%)',
                dataIndex: 'taxRate',
                key: 'taxRate',
                render:(text,record,index)=>{
                    return Number(text).toFixed(2)
                }
            }, {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                render:(text,record,index)=>{
                    return Number(text).toFixed(2)
                }
            }, {
                title: '税额',
                dataIndex: 'tax',
                key: 'tax',
                render:(text,record,index)=>{
                    return Number(text).toFixed(2)
                }
            }, {
                title: '价税合计',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                render:(text,record,index)=>{
                    return Number(text).toFixed(2)
                }
            },{
                title: 'SPU',
                dataIndex: 'spu',
                key: 'spu',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 100, placement: 'left' }} />
            }, {
                title: 'SPU数量',
                dataIndex: 'spuNum',
                key: 'spuNum',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 100, placement: 'left' }} />
            }, {
                title: '来源单号',
                dataIndex: 'sourceCode',
                key: 'sourceCode',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 100, placement: 'left' }} />
            }, {
                title: '来源行号',
                dataIndex: 'sourceLineNum',
                key: 'sourceLineNum',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 100, placement: 'left' }} />
            }, {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 100, placement: 'left' }} />
            }, {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                width: 86,
            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
    }
    optColRender = (txt, record, index) => {
        return (
            <div>
                {this.props.businessType == 1 ? <span className="purchase-double-line">--</span> : <span className="purchase-order-implement c2mfont c2m-bianji" title='编辑' onClick={() => this.editDialogShow(index, record)}></span>}
                {this.props.businessType == 1 ? <span className="purchase-double-line-delete">--</span> : <Popconfirm title="确认删除该数据吗？" onConfirm={() => this.delOrder(index, record)} okText="确定" cancelText="取消">
                    <span className="purchase-order-implement-delete c2mfont c2m-shanchu" title='删除'></span>
                </Popconfirm>}
                {/*3*/}
            </div>
        );
    }
    editDialogShow = (index, record) => {
        // this.props.indexTableVal({ index: index, flag: 'edit' });
        this.props.SaleOrderAddTableVisiable(true, 'edit');
        this.setState({ currVal: record, index: index })
    }
    addNewRow = () => {

        // this.props.indexTableVal({index:0,flag:'add'});
        if (this.props.businessType == 1) {
            message.error('来源电商不能新增');
            return false;
        }
        this.props.SaleOrderAddTableVisiable(true, 'add');
        // let newRow = Object.assign({}, this.getNewRow());
        // this.data.splice(0, 0, newRow);
        this.forceUpdate();
        // store.dispatch(SaleOrderAct.tableData(this.data))
    }
    // deleteRow = (index) => {
    //     let { list } = this.state;
    //     list.splice(index, 1);
    //     this.handleSubmit(list)
    // }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.state.list) {
            const list = nextProps.value;
            this.setState({ list });
        }
    }
    handleSubmit = (data, index) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(data);
        }
    }
    setTableElement = (data) => {
        let { list } = this.state;
        list.splice(0, 0, data);
        this.handleSubmit(list);
    }
    setEditTableElement = (data,index=this.state.index) => {
        let { list, current, pageSize } = this.state;
        let newData = [...list];
        if (current && current != 1) {
            index = (current - 1) * pageSize + index;
        };
        newData[index]= data;
        this.handleSubmit(newData,index)
    }
    delOrder = (index) => {
        let { list, current, pageSize } = this.state;
        let realIndex = index;
        if (current && current != 1) {
            realIndex = (current - 1) * pageSize + index;
            if (index == 0 && list.length - 1 == realIndex) {
                this.setState({ current: current - 1 });
            }
        };
        list.splice(realIndex, 1);
        this.handleSubmit(list,realIndex)
    }
    // handleSubmitEditDialog = (data,index=this.state.index) => {
    //     let { list, current, pageSize } = this.state;
    //     let newData = [...list];
    //     if (current && current != 1) {
    //         index = (current - 1) * pageSize + index;
    //     };
    //     newData[index]= data;
    //     this.handleSubmit(newData,index)
    // }
    //表格变化事件
    handleTableChange = (pagination, filters, sorter) => {
        let { current, pageSize } = pagination;
        this.setState({ current, pageSize });
    }
    render() {
        let { list, currVal } = this.state;
        let dataSource = list || [];
        let { paging, onChange, saleDetails, ...props } = this.props;
        return (
            <div className="saleOrder-add-table-wrap">
                <div onClick={this.addNewRow} className="saleOrder-add-btn"><a><i className="c2mfont c2m-tianjia" style={{ paddingRight: 5 }}></i>添加物料</a></div>
                <MTable className="add-table"
                    {...this.props}
                    cols={this.columns}
                    dataSource={dataSource}
                    handleSubmit={this.handleSubmit}
                    rowKey={"key"}
                    addBtn="添加行"
                    scroll={{ x: 2600 }}
                    onChange={this.handleTableChange}
                />
                <SaleOrderAddTableDialogCont
                    {...this.props}
                    setTable={this.props.setTable}
                    setTableElement={this.setTableElement}
                    list={list}
                />
                <SaleOrderEditTableDialogCont
                    {...this.props}
                    setTable={this.props.setTable}
                    list={list}
                    setEditTableElement={this.setEditTableElement}
                    currVal={currVal}
                />
            </div>
        );
    }
}
export default SaleOrderAddTableComp;