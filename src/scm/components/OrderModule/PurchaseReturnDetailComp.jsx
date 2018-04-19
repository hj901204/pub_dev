import React, { Component } from "react";
import { Button, Popconfirm, message, Radio, Select, Form } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';
import { connect } from 'react-redux';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
import PurRetDialogCont from '../../dialogconts/OrderModule/PurRetDialogCont';
import TooltipComp from "../../../base/components/TooltipComp";
class TableComp extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.recordKey = 'id';
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                hidden: true
            },
            {
                title: '行号',
                dataIndex: 'selfLine',
                key: 'selfLine',
                width: 48,
                fixed: 'left',
                // hidden: true
            },
            {
                title: '来源订单号',
                dataIndex: 'line',
                key: 'line',
                width: 140,
                fixed: 'left',
                hidden: true
            }, {
                title: '采购类型',
                dataIndex: 'purchaseType',
                key: 'purchaseType',
                width: 140,
                obj: {
                    list: window.ENUM.getEnum("purchaseType"),
                    keyName: 'catCode',
                    labelName: 'catName',
                },
                fixed: 'left',
            }, {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'metarialCode',
                width: 104,
                obj: {
                    style: { width: 200 },
                    // list: record.materialCodeList,
                    keyName: 'materialCode',
                    labelName: 'materialCode',
                    displayName: ['materialCode', 'materialName'],
                    listKey: 'materialCodeList',
                    getList: props.getMaterialList,
                    rules:[{required:true,message:'物料编码 必填！'}],
                },
                fixed: 'left',
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 98, placement: 'left' }} />,
                fixed: 'left',
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 98, placement: 'left' }} />,
            }, {
                title: '型号',
                dataIndex: 'materialModel',
                key: 'materialModel',
            }, {
                title: '数量',
                dataIndex: 'orderNumber',
                key: 'orderNumber',
                obj:{
                    rules:[
                        {type:'gtZero',label:'数量'}
                    ],
                }
            }, {
                title: '单位',
                dataIndex: 'measureUnitCode',
                key: 'measureUnitCode',
                obj: {
                    // list: props.measurelist,
                    keyName: 'meaCode',
                    labelName: 'meaName',
                    rules:[{required:true,message:'单位 必填！'}],
                }
            }, {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                 obj:{
                    rules:[
                        {type:'gtEqZero',label:'单价'}
                    ],
                }
            }, {
                title: '税率 (%)',
                dataIndex: 'tax',
                key: 'tax',
                obj:{
                    rules: [
                        {type:'gtEqZero',label:'税率'}
                    ],
                }
            }, {
                title: '金额',
                dataIndex: 'money',
                key: 'money',
                render: (text, record, index) => text&&Number(text).toFixed(2)
            }, {
                title: '税额',
                dataIndex: 'taxMoney',
                key: 'taxMoney',
                render: (text, record, index) => (text||text===0)&&Number(text).toFixed(2)
            }, {
                title: '价税合计',
                dataIndex: 'taxMoneyTotal',
                key: 'taxMoneyTotal',
                render: (text, record, index) => text&&Number(text).toFixed(2)
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                obj: {
                    style: { width: 160 },
                    rules:[{
                        max:200,message:'备注不能超过200字符！',
                    }]
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                width: 86,
            }
        ];

        this.columns[this.columns.length - 1].render = this.optColRender;
        this.columns.forEach((item) => {
            //input
            if (/^materialName|materialSpec|materialModel|remarks$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //InputNumber
            if (/^orderNumber|unitPrice|tax$/i.test(item.dataIndex)) {
                item.render = this.inputColRender(item.dataIndex, item.obj);
            }
            //select
            if (/^purchaseType|measureUnitCode$/i.test(item.dataIndex)) {
                item.render = this.selectColRender(item.dataIndex, item.obj);
            }
            //autoselect
            if (/^materialCode$/i.test(item.dataIndex)) {
                item.render = this.autoSelectColRender(item.dataIndex, item.obj);
            }
        })
    }
    //点击添加
    addNewRow = () => {
        let { orderCode, PurRetDialogVisiable } = this.props;
        // console.log('orderCode', orderCode);
        if (orderCode) {
            //弹出Modal
            PurRetDialogVisiable()
        } else {
            let newRow = Object.assign({}, this.getNewRow());
            this.data.splice(0, 0, newRow);
            this.forceUpdate();
        }
    }
    //获取新行初始值
    getNewRow = () => {
        let id = "-1";
        if (this.data[0] && this.data[0].id < 0) {
            id = this.data[0].id - 1;
        };
        return {
            "id": String(id),
            "selfLine": "",
            "line": "",
            "purchaseType": "0",
            "materialCode": "",
            "materialName": "",
            "materialSpec": "",
            "materialModel": "",
            "orderNumber": "",
            "measureUnitCode": "",
            "unitPrice": "",
            "tax": this.props.tax,
            "money": "",
            "taxMoney": "",
            "taxMoneyTotal": "",
            "remarks": "",
        }
    }
    //设置禁编列
    setDisableds = (purchaseType, tax = this.props.tax) => {
        //非库存采购-禁编对象
        const list0 = ['materialCode'];
        //库存采购-禁编对象
        const list1 = ['materialName', 'materialSpec', 'materialModel','purchaseType'];

        let { orderCode } = this.props;
        let disableds = purchaseType == '0' ? list1 : list0;
        if (tax == '0') {
            disableds = [...disableds, 'tax'];
        }
        if (orderCode !== "") {
            disableds = [...disableds, 'purchaseType', 'materialCode', 'materialName', 'materialSpec', 'materialModel', 'measureUnitCode'];
        }
        this.setState({ disableds });
    }
    //编辑事件
    handleEdit = (record) => {
        this.setDisableds(record.purchaseType);
        if (record.materialCode) {
            this.materialCode = [record];
        } else {
            this.materialCode = [];
        }
    }
    //保存事件
    handleSave = () => {
        let { orderNumber, unitPrice, tax, materialCode, measureUnitCode } = this.record;
        tax = tax / 100 + 1;
        //金额
        // this.record.money = (orderNumber * unitPrice / tax).toFixed(2);
        //税额
        this.record.taxMoney = (orderNumber * unitPrice * this.record.tax / 100).toFixed(2);
        //价税合计
        this.record.taxMoneyTotal = (orderNumber * unitPrice).toFixed(2);
        this.record.money = (this.record.taxMoneyTotal - this.record.taxMoney).toFixed(2);
        // console.log(this.record);
        // if(!materialCode||!unitPrice||!orderNumber||!measureUnitCode){
        //     message.warn('明细项物料编码，数量，单位，单价不能为空');
        //     this.isEdit = false;
        // }else{
        //      this.isEdit = true;
        // }
    }
    //修改事件
    handleChange = (key, index, value) => {
        if (key === 'purchaseType') {
            if (value == '0') {//选择采购类型时
                // this.record.materialName.value = '';
                // this.record.materialSpec.value = '';
                // this.record.materialModel.value = '';
                // this.record.measureUnitCode.value = '';
                // this.record.valuationUnit.value = '';
            } else {//选择非采购类型时
                this.record.materialCode = '';
            };
            this.setDisableds(value);
        }
        if (key === 'materialCode') {
            this.record.materialCode = value.materialCode;
            this.record.materialName = value.materialName;
            this.record.materialSpec = value.materialSpec;
            this.record.materialModel = value.model;
            this.record.measureUnitCode = value.measureUnit;
        }
        this.forceUpdate();
    }
    componentWillMount() {
        this.props.getMaterialList('').then(list => {
            this.materialCode = list;
        });
        this.props.getMeasureList().then(list => {
            this.measureUnitCode = list;
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource != this.data) {
            this.data = nextProps.dataSource;
        }
        if (nextProps.tax != this.props.tax) {
            this.record.tax = nextProps.tax;
            this.setDisableds(this.record.purchaseType, nextProps.tax)
        }
    }
}

let MTable = Form.create()(TableComp);

class PurchaseDetailComp extends Component {
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
    handleSubmit = (data, index) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(data);
        }
    }
    handleSubmitDialog = (rows) => {
        let { list } = this.state;
        this.handleSubmit(list.concat(rows));
    }
    render() {
        let { list } = this.state;
        let dataSource = list || [];
        let { paging, onChange, ...props } = this.props;
        return (
            <div className='purchaseDetail-table'>
                <MTable
                    {...props}
                    dataSource={dataSource}
                    handleSubmit={this.handleSubmit}
                    rowKey={"key"}
                    addBtn="添加行"
                    scroll={{ x: 2220 }}
                    style={{marginTop:10}}
                />
                <PurRetDialogCont type={this.props.type} handleSubmit={this.handleSubmitDialog} list={list} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.PurchaseReturnRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    getMaterialList: (pm) => dispatch(PurchaseAct.MaterialList(pm)),
    getMeasureList: (pm) => dispatch(PurchaseAct.MeasureList(pm)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseDetailComp);




