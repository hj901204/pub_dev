import React, { Component } from "react";
import { store } from "../../data/StoreConfig";
import { Button, Popconfirm, message, Radio, Select, Form, Row, Col, } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import OtherWarehouseEditDialogAct from "../../actions/InventoryModule/OtherWarehouseEditDialogAct";
import OtherWarehouseEditDialogCont from "../../dialogconts/InventoryModule/OtherWarehouseEditDialogCont";
import OtherWarehouseEditAct from '../../actions/InventoryModule/OtherWarehouseEditAct';
import TooltipComp from "../../../base/components/TooltipComp"
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
            record: {},
        }
        this.newRow = {    // 新增行
            "lineNum": '',
            "id": null,
            "materialCode": "",
            "materialName": "",
            "materialSpec": "",
            "materialModel": "",
            "planAmount": 0,
            "materialUnitName": "",
            "valuationNumber": "",
            "model": "",
            'opType': 0,  // 操作类型
        }
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'lineNum',
                key: 'lineNum',
                hidden: true
            },
            {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'metarialCode',
                width: 212,
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                render: (text, record, index) =><TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                render: (text, record, index) =><TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
            }, {
                title: '型号',
                dataIndex: 'materialModel',
                key: 'materialModel',
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
                dataIndex: 'materialUnitName',
                key: 'materialUnitName',
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: 74,
                className: 'table-thead-center'
            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
        /*this.columns.forEach((item) => {
            //inputNumber
            if (/^planAmount$/i.test(item.dataIndex)) {
                item.render = this.inputNumberColRender(item.dataIndex, item.obj)
            }
            // input
            if (/^materialCode$/i.test(item.dataIndex)) {
                item.render = this.inputHandler(item.dataIndex, item.obj)
            }
        })*/
    }

    inputHandler = (dataIndex, obj = {}) => (text, record, index) => {   // --------------- 8.23 ------屏蔽
        /*let { textStyle, rules, ...cellObj } = obj;
        if (this.state.isEdit == record[this.recordKey]) {
            if (this.state.disableds.includes(dataIndex)) {
                return this.record[dataIndex];
            } else {
                let { current, pageSize } = this.state;
                if (current && current != 1) {
                    index = (current - 1) * pageSize + index;
                };
                return (
                    <div>
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
        }*/
    }

    inputDialogShow = (index, record) => {
        // this.props.actions.indexVal(index);   // ---8.21
        // this.setState({
        //     materialCodeTips: false
        // })
        // store.dispatch(OtherWarehouseEditDialogAct.show())
    }

    getNewRow = () => {
        store.dispatch(OtherWarehouseEditDialogAct.materialData({}))
        store.dispatch(OtherWarehouseEditDialogAct.show())   // 弹出框  -- 8.21
        let id = "-1";
        if (this.data[0] && this.data[0].lineNum < 0) {
            id = this.data[0].lineNum - 1;
        };
        this.newRow.lineNum = String(id);
        store.dispatch(OtherWarehouseEditDialogAct.editRow(this.newRow, 0))   // redux 存储当前数据   for the material madal initial info
        return {
            // "lineNum": String(id),
            // "id": null,
            // "materialCode": "",
            // "materialName": "",
            // "materialSpec": "",
            // "materialModel": "",
            // "planAmount": 0,
            // "materialUnitName": "",
            // "valuationNumber": "",
            // 'opType': 0,  // 操作类型
        }
    }
    // 编辑
    /*handleEdit = (record) => {
        // record.isEdit = 1;   // 当前行为编辑状态
        if (record.opType == 0) {  // 该行为新增行
            record.opType = 0;
        } else {
            record.opType = 1;  // 该行为编辑行
        }
        this.setState({ record })
    }*/
    // 删除
    handleDel = (realIndex) => {
        if (this.data[realIndex].opType == 0) {  // 该删除行  为  新增行
            return;
        } else { // 该删除行 不是新增行
            this.data[realIndex].opType = 2;
            this.props.actions.delRow(this.data[realIndex]);
        }
        store.dispatch(OtherWarehouseEditAct.tableData(this.data))
    }
    // 保存
    /*handleSave = () => {
        let val = this.props;
        if (val.checkedTableList && val.checkedTableList.materialCode) {
            this.isEdit = true;
            this.record.materialCode = val.checkedTableList.materialCode;
            this.record.materialName = val.checkedTableList.materialName;
            this.record.materialSpec = val.checkedTableList.materialSpec;
            this.record.materialModel = val.checkedTableList.model;
            this.record.materialUnitName = val.checkedTableList.measureUnitName;
            this.record.materialUnitCode = val.checkedTableList.measureUnit;
            store.dispatch(OtherWarehouseEditAct.checkedTableList({}))
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
        store.dispatch(OtherWarehouseEditAct.tableData(this.data));
    }*/
    // 取消
    /*handleCancel = (index) => {
        this.data[index].isEdit = 0;
        this.record.planAmount = this.state.record.planAmount;
        let x = Object.assign(this.data[index], this.record);
        this.data[index] = x;
        store.dispatch(OtherWarehouseEditAct.tableData(this.data))
    }*/

    handleChange = (key, index, value) => {
        /*if (key == 'planAmount') {
            this.record.planAmount = value;
        }
        this.forceUpdate();*/
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialOrderInfo !== this.data) {
            this.data = nextProps.initialOrderInfo;
        } else {
            this.data = this.data;
        }
    }

    // --------------- 8.22 --------------------
    optColRender = (txt, record, index) => {
        return (
            <div className="editable-row-operations">
                <span onClick={() => this.handleEdit(record, index)} className='c2mfont c2m-bianji_sel' title='编辑'></span>
                <Popconfirm placement="bottomRight"
                    title={
                        <div>
                            <h5>确认要删除该明细项吗？</h5>
                        </div>
                    }
                    onConfirm={() => this.deleteRow(index)}
                    okText="是" cancelText="否">
                    <span className='c2mfont c2m-shanchu_nor' title='删除'></span>
                </Popconfirm>
            </div>
        );
    }

    saveHandler = (index) => {
        this.setState({
            isEdit: null
        })
    }

    handleEdit = (record, index) => {
         let { current, pageSize } = this.state;
        // record.isEdit = 1;   // 当前行为编辑状态
        if (record.opType == 0) {  // 该行为新增行
            record.opType = 0;
        } else {
            record.opType = 1;  // 该行为编辑行
        }
        if (current && current != 1) {
            index = (current - 1) * pageSize + index;
        };
        // -------------------- 8.21-----------
        store.dispatch(OtherWarehouseEditDialogAct.editRow(record, index))
        store.dispatch(OtherWarehouseEditDialogAct.materialDataList(record))
        store.dispatch(OtherWarehouseEditDialogAct.show())   // 弹出框  -- 8.21

        // --------------------end 8.21-----------
        // this.setState({ record })
    }


}
let MTable = Form.create()(TableComp);

class OtherWarehouseEditTableEditComp extends Component {
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
        let addBtn = this.props.sourceOrderType != '1' ? "添加行" : "";
        return (
            <div className='otherwarehouse-edittable'>
                <OtherWarehouseEditDialogCont />
                <h3 className='edittable-title'>明细项</h3>
                <MTable
                    {...props}
                    dataSource={dataSource}
                    handleSubmit={this.handleSubmit}
                    rowKey={"key"}
                    addBtn={addBtn}
                    addBtn="添加行"
                />
            </div>
        );
    }
}
export default Form.create()(OtherWarehouseEditTableEditComp);
