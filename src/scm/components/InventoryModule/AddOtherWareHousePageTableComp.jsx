import React, { Component } from 'react'
import { Button, Popconfirm, message, Input, Icon, Table, Select, Radio, Form } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import { store } from "../../data/StoreConfig";
import AddOtherWareHousePageDialogCont from "../../dialogconts/InventoryModule/AddOtherWareHousePageDialogCont";
import AddOtherWareHousePageDialogAct from "../../actions/InventoryModule/AddOtherWareHousePageDialogAct";
import AddOtherWareHousePageAct from "../../actions/InventoryModule/AddOtherWareHousePageAct";
import TooltipComp from '../../../base/components/TooltipComp'
class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'lineNum';
        this.state = {
            isEdit: null,
            disableds: [],
            current: 1,
            pageSize: 10,
            materialCodeTips: false,
            record:{}
        }
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'lineNum',
                key: 'lineNum',
                hidden: true
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            }, {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'materialCode',
                width:212,
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                render: (text, record, index) => <TooltipComp attr={{text: text, wid: 88}} />
            }, {
                title: '型号',
                dataIndex: 'model',
                key: 'model',
            }, {
                title: '计划数量',
                dataIndex: 'planAmount',
                key: 'planAmount',
                obj: {
                    rules: [
                        { type: 'gtZero', label: '计划数量', decimal: 2 }
                    ]
                }
            }, {
                title: '基本单位',
                dataIndex: 'measureUnitName',
                key: 'measureUnitName',
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width:74,
                className:'addohter-table-operation'
            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
        this.columns.forEach((item) => {
            //inputNumber
            if (/^planAmount$/i.test(item.dataIndex)) {
                item.render = this.inputNumberColRender(item.dataIndex, item.obj)
            }
            // input
            if (/^materialCode$/i.test(item.dataIndex)) {
                item.render = this.inputHandler(item.dataIndex, item.obj)
            }
        })
    }
    //表格列
    inputHandler = (dataIndex, obj = {}) => (text, record, index) => {
        let { textStyle, rules, ...cellObj } = obj;
        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return this.record[dataIndex];
            } else {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                return (
                    <div className="table-materialCode-style" style={{width:'160px'}}>
                        <p className='a-editStyle'>
                            {record.materialCode}
                            <a onClick={() => this.inputDialogShow(index, record)} className='a-dialog-btn' >...&nbsp;</a>
                        </p>
                        <span style={{ display: this.state.materialCodeTips ? 'block' : 'none' }} className='materialCodeTips'>物料编码不能为空!</span>
                    </div>
                )
            }
        } else {
            return <div style={textStyle}>{text}</div>;
        }
    }
    inputDialogShow = (index, record) => {
        this.props.actions.indexVal(index);
        this.setState({
            materialCodeTips: false
        })
        store.dispatch(AddOtherWareHousePageDialogAct.show())
    }
    addNewRow = () => {
        let newRow = Object.assign({}, this.getNewRow());
        this.data.splice(0, 0, newRow);
        this.forceUpdate();
        store.dispatch(AddOtherWareHousePageAct.tableData(this.data))
    }
    getNewRow = () => {
        let id = "-1";
        if (this.data[0] && this.data[0].lineNum < 0) {
            id = this.data[0].lineNum - 1;
        };
        return {
            //"id": String(id),
            "lineNum": String(id),
            "id":null,
            "status": "已保存",
            "materialCode": "",
            "materialName": "",
            "materialSpec": "",
            "planAmount": "",
            "model": "",
            "measureUnitName": "",
            'opType': 0,
        }
    }
    // setDisableds = (purchaseType, tax = this.props.tax) => { }
    handleEdit = (record) => {
        record.isEdit = 1;   // 当前行为编辑状态
        store.dispatch(AddOtherWareHousePageAct.tableData(this.data))
        this.setState({ record })
    }
    handleDel = (index) => {
        store.dispatch(AddOtherWareHousePageAct.tableData(this.data))
    }
    handleSave = () => {
        let val = this.props;
        if (val.checkedTableList && val.checkedTableList.materialCode) {
            this.isEdit = true;
            this.record.materialCode = val.checkedTableList.materialCode;
            this.record.materialName = val.checkedTableList.materialName;
            this.record.materialSpec = val.checkedTableList.materialSpec;
            this.record.model = val.checkedTableList.model;
            this.record.measureUnitName = val.checkedTableList.measureUnitName;
            // this.record.id = val.checkedTableList.id;
            this.record.materialUnitCode = val.checkedTableList.measureUnit;
            store.dispatch(AddOtherWareHousePageAct.checkedTableList({}))
        }
        if (!this.record.materialCode) {   // 物料编码为空
            this.isEdit = false;
            this.record.isEdit = 1;
            this.setState({
                materialCodeTips: true
            })
        } else {
            this.record.isEdit = 0;
        }
        store.dispatch(AddOtherWareHousePageAct.tableData(this.data))
    }
    handleChange = (key, index, value) => {
        if (key === 'planAmount') {
            this.record.planAmount = value;
        }
        this.forceUpdate();
    }
    handleCancel = (index) => {
        this.data[index].isEdit = 0;
        this.record.planAmount = this.state.record.planAmount;
        let x = Object.assign(this.data[index], this.record);
        this.data[index] = x;
        store.dispatch(AddOtherWareHousePageAct.tableData(this.data))
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.initialOrderInfo !== this.data) {
            this.data = nextProps.initialOrderInfo;
        } else {
            this.data = this.data;
        }
    }
}
let MTable = Form.create()(TableComp);

class AddOtherWareHousePageTableComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data, index) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(data);
        }
    }
    render() {
        let { initialOrderInfo } = this.props;
        let dataSource = initialOrderInfo || [];
        let { paging, onChange, ...props } = this.props;
        return (
            <div className="add-row-other-table">
                <AddOtherWareHousePageDialogCont />
                <h3 className='add-row-other-table-title'>明细项</h3>
                <MTable
                    {...props}
                    dataSource={dataSource}
                    rowKey={"key"}
                    addBtn="添加行"
                    handleSubmit={this.handleSubmit}
                    className="addOtherWarePageTable"
                />
            </div>
        );

    }
}

export default AddOtherWareHousePageTableComp;