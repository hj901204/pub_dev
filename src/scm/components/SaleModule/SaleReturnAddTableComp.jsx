import React, { Component } from 'react';
import { Button, Popconfirm, message, Input, Icon, Table, Select, Radio, Form, Modal } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import EditableTableComp from '../../../base/components/EditableTableComp';
import SaleReturnDialogCont from '../../dialogconts/OrderModule/SaleReturnDialogCont';
import SaleReturnAddTableDialogCont from "../../dialogconts/SaleModule/SaleReturnAddTableDialogCont";
import SaleReturnEditTableDialogCont from "../../dialogconts/SaleModule/SaleReturnEditTableDialogCont";
import MTable from "../../../base/components/TableComp";
import TooltipComp from "../../../base/components/TooltipComp"
import { store } from "../../data/StoreConfig";

const Option = Select.Option;

class SaleReturnAddTableComp extends Component {
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
                hidden: true,
                fixed: 'left'
            }, {
                title: 'canRetNum',
                dataIndex: 'canRetNum',
                key: 'canRetNumid',
                hidden: true,
                fixed: 'left'
            }, {
                title: '行号',
                dataIndex: 'lineNum',
                key: 'lineNum',
                width: 50,
                fixed: 'left'
            }, {
                title: '订单行号',
                dataIndex: 'saleOrderLineNum',
                key: 'saleOrderLineNum',
                width: 108,
                fixed: 'left'

            },
            {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'materialCode',
                width: 108,
                fixed: 'left',
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 70, placement: 'left' }} />

            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                width: 104,
                fixed: 'left',
                obj: {
                    style: { width: 140 },
                },
                render: (text, index, record) => {
                    return <TooltipComp attr={{ text: text, wid: 70, placement: 'left' }} />
                }
            },
            {
                title: '退货数量',
                dataIndex: 'returnNum',
                key: 'returnNum',
                width: 140,
               
            }, {
                title: '单位',
                dataIndex: 'unitOfMeasurement',
                key: 'unitOfMeasurement',
                width: 140,
                hidden: true
            }, {
                title: '单位',
                dataIndex: 'unitOfMeasurementName',
                key: 'unitOfMeasurementName',
                width: 140,
            }, {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                width: 140,
                obj: {
                    rules: [
                        { type: 'gtZero', label: '单价' }
                    ]
                }


            }, {
                title: '税率（％）',
                dataIndex: 'taxRate',
                key: 'taxRate',
                width: 140,
                obj: {
                    rules: [
                        { type: 'gtEqZero', label: '税率' }
                    ]
                }


            }, {
                title: '赠品',
                dataIndex: 'isDonation',
                key: 'isDonation',
                width: 140,
                render: (txt, record, index) => {
                    return this.getE('isDonation',txt+'')
                }
            }, {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                width: 300,
                obj: {
                    textStyle: { width: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', },
                    rules: [
                        { max: 200, message: '最多允许200字' },
                    ],
                }

            }, {
                title: '规格',
                dataIndex: 'specification',
                key: 'specification',
                width: 140,
                obj: {
                    style: { width: 200 },
                },
                render: (txt, index, record) => <TooltipComp attr={{ text: txt, wid: 70, placement: 'left' }} />
            }, {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                width: 140,

            }, {
                title: '税额',
                dataIndex: 'tax',
                key: 'tax',
                width: 140,

            }, {
                title: '税价合计',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                width: 130,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 120,
                fixed: 'right'
            }


        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
    }

    optColRender = (txt, record, index) => {
        // console.log('tyep--', this.props.businessType);
        return (
            <div style={{lineHeight:1}}>
                {this.props.businessType == 1 ? <span className="purchase-double-line">--</span> : <span className="purchase-order-implement c2mfont c2m-bianji" title='编辑' onClick={() => this.editDialogShow(index, record)}></span>}
                {this.props.businessType == 1 ? <span className="purchase-double-line-delete">--</span> : <Popconfirm title="确认删除该数据吗？" onConfirm={() => this.delOrder(index, record)} okText="确定" cancelText="取消">
                    <span className="purchase-order-implement-delete c2mfont c2m-shanchu" title='删除'></span>
                </Popconfirm>}
                {/*3*/}
            </div>
        );
    }
    editDialogShow = (index, record) => {
        console.log('editDialogShow:');
        
        // this.props.indexTableVal({ index: index, flag: 'edit' });
        this.props.SaleReturnAddTableVisiable(true, 'edit');
        this.setState({ currVal: record, index: index })
    }
    addNewRow = () => {

        // this.props.indexTableVal({index:0,flag:'add'});
        // if (this.props.businessType == 1) {
        //     message.error('来源电商不能新增');
        //     return false;
        // }
        this.props.SaleReturnAddTableVisiable(true, 'add');
        // let newRow = Object.assign({}, this.getNewRow());
        // this.data.splice(0, 0, newRow);
        this.forceUpdate();
        // store.dispatch(SaleOrderAct.tableData(this.data))
    }

   
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if ('value' in nextProps && nextProps.value != this.state.list) {
            const list = nextProps.value;
            this.setState({ list });
        }
    }

      // 明细行点击确认
    handleSubmit = (data, index) => {
        // console.log(data);
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(data);
        }
    }

    handleEdit = (record) => {
        if (record.materialCode) {
            this.materialCode = [record];
        } else {
            this.materialCode = [];
        }
    }
    handleSave = () => {
        //  this.record.materialName!=undefined && && this.record.specification!="" && this.record.unitOfMeasurement!=undefined
        console.log(this.record);
        if (this.record.materialCode != "") {
            this.isEdit = true;
        } else {
            message.error('物料编码/物料名称/规格/单位不能为空');
            this.isEdit = false;
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

  
    // 弹出框
    handleSubmitDialog = (rows) => {
        let { list } = this.state;
        // console.log(list);
        // console.log(rows);
        this.handleSubmit(list.concat(rows));
    }
    //表格变化事件
    handleTableChange = (pagination, filters, sorter) => {
        let { current, pageSize } = pagination;
        this.setState({ current, pageSize });
    }

    getE = (key, val) => {
        // console.log(val);
        if (val !== undefined && val !== 'null' && val !== "") {
            return window.ENUM.getEnum(key, val)
        }
    }
    render() {
        let { list, currVal } = this.state;
        let dataSource = list || [];
        let { paging, onChange, saleReturnAllInfo, ...props } = this.props;
        // console.log('props:');
        // console.log(this.props);

        return (
            <div className="add-table-wrap">
                <div onClick={this.addNewRow} className="saleOrder-add-btn"><a><i className="c2mfont c2m-tianjia" style={{ paddingRight: 5 }}></i>添加行</a></div>
                <MTable className="add-table"
                    {...this.props}
                    cols={this.columns}
                    dataSource={dataSource}
                    handleSubmit={this.handleSubmit}
                    rowKey={"lineNum"}
                    addBtn="添加行"
                    scroll={{ x: 2070 }}
                    onChange={this.handleTableChange}
                />
                {/* <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal> */}
                {/* <SaleReturnDialogCont type={this.props.type} handleSubmit={this.handleSubmitDialog} list={list} saleOrderCode={this.props.saleReturnDetailInfo.sourceCode} /> */}
                {/* <SaleReturnDialogMaterialCont type={this.props.type} handleSubmit={this.handleSubmitDialog} list={list} saleOrderCode={this.props.saleReturnDetailInfo.sourceCode}   /> */}
                 <SaleReturnAddTableDialogCont
                    {...this.props}
                    setTable={this.props.setTable}
                    setTableElement={this.setTableElement}
                    list={list}
                    currVal={currVal}
                />
                <SaleReturnEditTableDialogCont
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


export default SaleReturnAddTableComp;