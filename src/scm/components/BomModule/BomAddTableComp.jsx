import React, { Component } from 'react';
import { Button, Popconfirm, message, Input, Icon, Table, Select, Radio, Form } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import EditableTableComp from '../../../base/components/EditableTableComp';
import TooltipComp from "../../../base/components/TooltipComp";

class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'id';
        this.state = { disableds: ["materialName", "materialSpec", "measureUnitName"] }
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
                width: 150,
                hidden: true
                // fixed: 'left',
            }, {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'materialCode',
                width: 300,
                obj: {
                    style: { width: 260 },
                    keyName: 'materialCode',
                    labelName: 'materialCode',
                    displayName: ['materialCode', 'materialName'],
                    getList: props.MaterialList,
                    rules:[{required:true,message:'物料编码必填！'}],
                }
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                render: (txt, index, record) => <TooltipComp attr={{text:txt, wid: 70, placement: 'left'}} />
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                render: (txt, index, record) => <TooltipComp attr={{text:txt, wid: 70, placement: 'left'}} />
            }, {
                title: '单位用量',
                dataIndex: 'quantityPer',
                key: 'quantityPer',
                width: 200,
                obj:{
                    rules:[
                        {type:'unit',label:'单位用量',decimal:2}
                    ],
                },
            }, {
                title: '单位',
                dataIndex: 'measureUnit',
                key: 'measureUnit',
                width: 150,
                hidden: true
            }, {
                title: '计量单位',
                dataIndex: 'measureUnitName',
                key: 'measureUnitName',
                width: 150,
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                width: 400,
                obj: {
                    textStyle: { width: 350, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', },
                    rules: [{ message: '请输入备注' },{ message: '备注不能超过200字段' ,max:200}],
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: 140,
                fixed: 'right',
                // width: 100,
            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
        this.columns.forEach((item) => {
            //input
            if (/^materialName|materialSpec|measureUnit|remarks$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //InputNumber
            if (/^quantityPer$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //autoselect
            if (/^materialCode$/i.test(item.dataIndex)) {
                item.render = this.autoSelectColRender(item.dataIndex, item.obj);
            }
        })
    }
    //点击添加
    addNewRow = () => {
        let newRow = Object.assign({}, this.getNewRow());
        this.data.splice(0, 0, newRow);
        this.props.handleSubmit(this.data)
        this.forceUpdate();
    }
    handleEdit = (record) => {
        if (record.materialCode) {
            this.materialCode = [record];
        } else {
            this.materialCode = [];
        }
    }
    handleSave = () =>{
        this.record.quantityPer=Number(this.record.quantityPer).toFixed(2);
        // if(this.record.materialCode!="" && this.record.materialSpec!="" && this.record.quantityPer!=undefined && this.record.materialName!=undefined && this.record.measureUnitName!=undefined){
        //     this.isEdit = true;
        // }else{
        //     message.error('物料编码/物料名称/规格/单位用量/单位不能为空');
        //     this.isEdit = false;
        // }
    }
    getNewRow = () => {
        let id = "-1";
        if (this.data[0] && this.data[0].id < 0) {
            id = this.data[0].id - 1;
        };
        return {
            "id": String(id),
            "materialCode": "",
            "materialName ": "",
            "materialSpec": "",
            "quantityPer": 0,
            "measureUnit": "",
            "remarks": "",
        }
    }
    handleChange = (key, index, value) => {

        if (key === 'materialCode') {
            //measureUnit 
            this.record.materialCode = value.materialCode;
            this.record.materialName = value.materialName;
            this.record.materialSpec = value.materialSpec;
            this.record.measureUnit = value.measureUnit;
            this.record.measureUnitName = value.measureUnitName;
            this.record.remarks = value.remarks;
        }
        this.forceUpdate();
    }
    componentWillMount() {
        this.props.MaterialList('').then(list => {
            this.materialCode = list;
        });
    }

}

let MTable = Form.create()(TableComp);

class BomAddTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value != this.state.list) {
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
    render() {
        let { list } = this.state;
        let dataSource = list || [];
        return (
            <div>
                <MTable className="add-table"
                    {...this.props}
                    dataSource={dataSource}
                    handleSubmit={this.handleSubmit}
                    rowKey={"key"}
                    addBtn="添加行"
                />
            </div>
        );
    }
}
export default BomAddTableComp;