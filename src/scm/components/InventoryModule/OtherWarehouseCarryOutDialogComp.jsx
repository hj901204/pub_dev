import React, { Component, PropTypes } from "react";
import { Form, message, Popconfirm } from '../../../base/components/AntdComp';
import FormModalComp from '../../../base/components/FormModalComp';
import EditableTableComp from '../../../base/components/EditableTableComp';

class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'rowKey';
        let { record } = this.props
        this.state = {
            disableds: ['warehouseName'],
            preReceiveNum: record.planAmount - record.beforehandDeliveryAmount
        }
        this.columns = [
            {
                title: 'rowKey',
                dataIndex: 'rowKey',
                key: 'rowKey',
                hidden: true
            }, {
                title: '行号',
                dataIndex: 'line',
                key: 'line',
                width: 70,
            }, {
                title: '仓位',
                dataIndex: 'freightSpaceCode',
                key: 'freightSpaceCode',
                width: 110,
                obj: {
                    keyName: 'code',
                    labelName: 'code',
                    listKey: 'code',
                    getList: props.actions.searchPosition,
                    dropdownMatchSelectWidth: false,
                    dropdownClassName: 'select-auto-complete',
                    dropdownStyle: { width: 200 },
                    style: { width: 70 },
                    rules: [
                        { required: true, message: '仓位必填' },
                    ],
                    format: (item) => (<div className='auto-complete-option'><p className='auto-complete-option-p'><span>{item.code}</span> {item.name ? '【 ' + item.name + ' 】' : ''}</p>
                        <p className='auto-complete-option-p'>{item.siteName}</p>
                        <div className='auto-complete-option-border'></div>
                    </div>)
                },
            }, {
                title: '仓库',
                dataIndex: 'warehouseName',
                key: 'warehouseName',
                width: 100
            }, {
                title: '仓库编码',
                dataIndex: 'warehouseCode',
                key: 'warehouseCode',
                hidden: true,
            }, {
                title: '批次号',
                dataIndex: 'batchNum',
                key: 'batchNum',
                obj: {
                    style: { width: 70 },
                    rules: [
                        { max: 20, message: '批次号为0-20个字符' }
                    ],
                },
                width: 110,
            }, {
                title: '预收货数量',
                dataIndex: 'materialAmount',
                key: 'materialAmount',
                obj: {
                    style: { width: 70 },
                    rules: [
                        { type: 'gtZero', label: '预收货数量', max: this.state.preReceiveNum }
                    ],
                },
                width: 110,
            }, {
                title: '操作',
                dataIndex: 'operation',
            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
        this.columns.forEach((item) => {
            //input ---
            if (/^batchNum|warehouseName$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //autoselect
            if (/^freightSpaceCode$/i.test(item.dataIndex)) {
                item.render = this.autoSelectColRender(item.dataIndex, item.obj);
            }
            //inputNumberColRender
            if (/^materialAmount$/i.test(item.dataIndex)) {
                item.render = this.inputNumberColRender(item.dataIndex, item.obj);
            }
        })
    }
    getNewRow = () => {
        let rowKey = "-1";
        if (this.data[0] && this.data[0].rowKey < 0) {
            rowKey = this.data[0].rowKey - 1;
        };
        return {
            "rowKey": String(rowKey),
            "line": "",
            "warehouseCode": "",
            "warehouseName": "",
            "freightSpaceCode": "",
            "batchNum": "",
            "materialAmount": "",
        }
    }
    setDisableds = (purchaseType, tax = this.props.tax) => { }
    handleEdit = (record) => {
        record.isEdit = 1; // 当前行为编辑状态
        if (record.warehouseCode) {
            this.freightSpaceCode = [record];
        } else {
            this.freightSpaceCode = [];
        }
    }
    handleSave = () => {
        this.record.isEdit = 0;  // 当前行为非编辑状态
    }

    handleChange = (key, index, value) => {
        if (key === 'freightSpaceCode') {
            this.record.freightSpaceCode = value.code;
            this.record.warehouseName = value.siteName;
            this.record.warehouseCode = value.siteCode;
            //--- 为了二次编辑时，下拉框中能有当前行数据显示
            this.record.code = value.code;
            this.record.name = value.name;
            this.record.siteName = value.siteName;
        }
        if (key === 'batchNum') {
            this.record.batchNum = value;
        }

        if (key === 'materialAmount') {
            this.record.materialAmount = value;
        }
        this.forceUpdate();
    }
    componentWillMount() {
        // this.props.actions.setLoading(true);
        // this.props.actions.searchPosition('').then(list => {
        //     this.freightSpaceCode = list;
        //     this.props.actions.setLoading(false);
        // });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource != this.data) {
            this.data = nextProps.dataSource;
        }
    }


}

let MTable = Form.create()(TableComp);

class OtherWarehouseCarryOutDialogComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.state.list) {
            const list = nextProps.value;
            this.setState({ list });
        }
    }
    submitHandler = (data, index) => {
        const onChange = this.props.onChange;
        onChange ? onChange(data, index) : null;
    }

    getComp = () => {
        let { list } = this.state;
        let dataSource = list || [];
        let { record, title, loading, ...props } = this.props;
        return (
            <div className='pre-receipt-dialog'>
                <div className="pre-receipt-dialog-title">
                    <div className="pre-receipt-dialog-title-left">
                        <p className="pre-receipt-dialog-title-left-up"><span>物料编码：{record.materialCode || ''}</span><span>规格：{record.materialSpec || ''}</span><span>基本单位：{record.materialUnitName || ''}</span></p>
                        <p className="pre-receipt-dialog-title-left-down"><span>物料名称：{record.materialName || ''}</span><span>型号：{record.materialModel || ''}</span></p>
                    </div>
                    <div className="pre-receipt-dialog-title-right">
                        <p>计划数量：<span className="receipt-number">{record.planAmount || '0'}</span></p>
                        <p>预收货数量：<span className="distribute-number">{record.beforehandDeliveryAmount || '0'}</span></p>
                    </div>
                </div>
                <MTable
                    {...props}
                    dataSource={dataSource}
                    handleSubmit={this.submitHandler}
                    rowKey={"key"}
                    addBtn="添加行"
                    style={{ marginTop: 20 }}
                    pagination={false}
                    record={record}
                />
            </div>
        )
    }
}

export default OtherWarehouseCarryOutDialogComp;
