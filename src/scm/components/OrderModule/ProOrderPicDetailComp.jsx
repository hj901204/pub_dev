import React, { Component } from "react";
import { Button, Popconfirm, message, Radio, Select, Form } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import TooltipComp from '../../../base/components/TooltipComp';
import OperationsComp from '../../../base/components/OperationsComp';
class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'line';
        this.columns = [{
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            width: 100,
        }, {
            title: '物料编码',
            dataIndex: 'materialCode',
            key: 'metarialCode',
            width: 140,
        }, {
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            width: 140,
            render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 88, placement: 'top' }} />
        }, {
            title: '物料规格',
            dataIndex: 'materialSpec',
            key: 'materialSpec',
            width: 140,
        }, {
            title: '标准用料数量',
            dataIndex: 'materialNumber',
            key: 'materialNumber',
            width: 140,
        }, {
            title: '可申领数量',
            dataIndex: 'mayApplyNumber',
            key: 'mayApplyNumber',
            width: 140,
        }, {
            title: '单位',
            dataIndex: 'measureUnitCode',
            key: 'measureUnitCode',
            width: 140,
            render: (text, record, index) => record.measureUnitName,
            
        }, {
            title: '申领数量',
            dataIndex: 'applyNumber',
            key: 'applyNumber',
            width: 140,
            obj:{
                rules:[
                    {type:'gtEqZero',label:'申领数量'}
                ],
            }
        }, {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',
            width: 200,
            obj:{
                rules:[{
                    max:200,message:'备注不能超过200字符！',
                }],
                render: {
                    wid:137,
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
        }
        ];
        this.columns[this.columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '确定',
                    fun: () => this.saveHandler(index),
                    show: this.state.isEdit == record[this.recordKey],
                },
                {
                    title: '取消',
                    fun: () => this.cancelEdit(index),
                    show: this.state.isEdit == record[this.recordKey],
                },
                {
                    title: '编辑',
                    fun: () => this.editHandler(record),
                    show: this.state.isEdit == null,
                },
            ];
            return <OperationsComp operations={opts} />;
        };
        this.columns.forEach((item) => {
            //input
            if (/^remarks$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //InputNumber
            if (/^applyNumber$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
        })
    }
    handleSave = (index) => {
        if (/^\.\d+$/.test(this.record.applyNumber)) {
            this.record.applyNumber = '0' + this.record.applyNumber;
        }
    }
    handleChange = (key, index, value) => {
        // if (key === 'remarks') {
        //     if (this.record.remarks.length > 200) {
        //         message.warning('备注不能超过200字符！');
        //         this.record.remarks = this.record.remarks.slice(0,200);
        //     }
        // }
        // if (key === 'applyNumber') {
        //     if (Number(this.record.applyNumber) > Number(this.record.mayApplyNumber)) {
        //         this.record.applyNumber = this.record.mayApplyNumber;
        //         message.warning('申领数量不可以大于可申领数量！');
        //     }else{
        //         this.record.applyNumber = Number(this.record.applyNumber).toFixed(2);
        //     }
        // }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource != this.data) {
            this.data = nextProps.dataSource;
        }
    }
}

let MTable = Form.create()(TableComp);

class ProOrderPicDetailComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value,
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.state.list) {
            const list = nextProps.value.map(item=>{
                item.applyNumber=Number(item.applyNumber).toFixed(2);
                item.mayApplyNumber=Number(item.mayApplyNumber).toFixed(2);
                item.materialNumber=Number(item.materialNumber).toFixed(2);
                return item;
            });
            this.setState({ list });
        }
    }
    handleSubmit = (data, index) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(data);
        }
    }

    render() {
        let { list } = this.state;
        let dataSource = list || [];
        let { paging, onChange, ...props } = this.props;
        return (
            <div>
                <MTable
                    {...props}
                    handleSubmit={this.handleSubmit}
                    dataSource={dataSource}
                    recordKey={"key"}
                    addBtn=""
                />
            </div>
        );
    }
}
export default ProOrderPicDetailComp;