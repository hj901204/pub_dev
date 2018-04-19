import React, { Component } from "react";
import { Button, Popconfirm, message, Radio, Select } from '../../../base/components/AntdComp';
import EditableTableComp from '../../../base/components/EditableTableComp';

//非库存采购-禁编对象
const list0 = ['materialCode','valuationUnit'];
//库存采购-禁编对象
const list1 = ['materialName', 'materialSpec', 'materialModel', 'measureUnitCode','valuationUnit'];

const page = { 'page': 1, 'pageSize': 10 };
class MTable extends EditableTableComp {
    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: '行号',
            dataIndex: 'line',
            key: 'line',
            width: 100,
            // fixed: 'left',
        }, {
            title: '采购类型',
            dataIndex: 'purchaseType',
            key: 'purchaseType',
            width: 140,
            // fixed: 'left',
            render: (text, record, index) => {
                let obj = {
                    type: 'select',
                    list: window.ENUM.getEnum("purchaseType"),
                    key: 'catCode',
                    label: 'catName',
                    style: { width: 100 }
                };
                return this.renderColumns(this.state.data, index, 'purchaseType', text, obj)
            },
        }, {
            title: '物料编码',
            dataIndex: 'materialCode',
            key: 'metarialCode',
            width: 140,
            // fixed: 'left',
            render: (text, record, index) => {
                let onSelect = (value) => {
                    this.handleUpdate('materialCode', index, value);
                };
                let onSearch = (value) => {
                    return this.props.getMaterialList(value).then(list => {
                        this.handleUpdate('materialCodeList', index, list);
                    })
                }
                let obj = {
                    type: 'autoselect',
                    list: record.materialCodeList||this.materialList,
                    key: 'materialCode',
                    label: 'materialName',
                    style: { width: 200 },
                    onSelect,
                    onSearch,
                };
                return this.renderColumns(this.state.data, index, 'materialCode', text,obj)
            },
        }, {
            title: '物料名称列表',
            dataIndex: 'materialCodeList',
            key: 'materialCodeList',
            hidden:true,
        }, {
            title: '物料名称',
            dataIndex: 'materialName',
            key: 'materialName',
            width: 140,
            // fixed: 'left',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'materialName', text),
        }, {
            title: '规格',
            dataIndex: 'materialSpec',
            key: 'materialSpec',
            width: 140,
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'materialSpec', text),
        }, {
            title: '型号',
            dataIndex: 'materialModel',
            key: 'materialModel',
            width: 140,
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'materialModel', text),
        }, {
            title: '订单数量',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            width: 140,
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'orderNumber', text),
        }, {
            title: '单位',
            dataIndex: 'measureUnitCode',
            key: 'measureUnitCode',
            width: 140,
            render: (text, record, index) => {
                let obj = {
                    type: 'select',
                    list: this.props.measurelist,
                    key: 'meaCode',
                    label: 'meaName',
                    style: { width: 100 },
                };
                return this.renderColumns(this.state.data, index, 'measureUnitCode', text, obj)
            },
        }, {
            title: '计价数量',
            dataIndex: 'valuationNumber',
            key: 'valuationNumber',
            width: 140,
            // render: (text, record, index) => this.renderColumns(this.state.data, index, 'valuationNumber', text),
        }, {
            title: '计价单位',
            dataIndex: 'valuationUnit',
            key: 'valuationUnit',
            width: 140,
            render: (text, record, index) => {
                let obj = {
                    type: 'select',
                    list: this.props.measurelist,
                    key: 'meaCode',
                    label: 'meaName',
                    style: { width: 100 },
                };
                return this.renderColumns(this.state.data, index, 'valuationUnit', text, obj)
            },
        }, {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 140,
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'unitPrice', text),
        }, {
            title: '税率 (%)',
            dataIndex: 'tax',
            key: 'tax',
            width: 140,
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'tax', text),
        }, {
            title: '金额',
            dataIndex: 'money',
            key: 'money',
            width: 140,
        }, {
            title: '税额',
            dataIndex: 'taxMoney',
            key: 'taxMoney',
            width: 140,
        }, {
            title: '价税合计',
            dataIndex: 'taxMoneyTotal',
            key: 'taxMoneyTotal',
            width: 140,
        }, {
            title: 'SPU编码',
            dataIndex: 'spuCode',
            key: 'spuCode',
            width: 140,
        }, {
            title: 'SPU名称',
            dataIndex: 'spuName',
            key: 'spuName',
            width: 140,
        }, {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',
            width: 200,
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'remarks', text, {
                style: { width: 160 },
            }),
        }, {
            title: '操作',
            dataIndex: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => {
                let { editable } = this.state.data[index].purchaseType;
                let { tax, detail } = this.props;
                //设置需要禁用的列,点编辑时有效
                let disableds = this.getDisableds(record.purchaseType);
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.editDone(index, 'save')}>确定&nbsp;</a>
                                    <Popconfirm title="是否确定取消编辑?" onConfirm={() => this.editDone(index, 'other')}>
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                                :
                                this.state.editing?null:
                                <span>
                                    <a onClick={() => this.edit(index, disableds)}>编辑&nbsp;</a>
                                    <Popconfirm placement="bottomRight"
                                        title={
                                            <div>
                                                <h5>确认要删除该明细项吗？</h5>
                                            </div>
                                        }
                                        onConfirm={() => this.deleteRow(index)}
                                        okText="是" cancelText="否">
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                        }
                    </div>
                );
            },
        }];
    }
    getNewRow = () => ({
        // "isNewLine": { //用于判断是否是新添加的行
        //     "value": true,
        // },
        "line": {
            "value": '',
        },
        "purchaseType": {
            "editable": true,
            "value": "0",
        },
        "materialCode": {
            "editable": true,
            "value": "",
        },
        "materialCode": {
            "value": [],
        },
        "materialName": {
            "editable": false,
            "value": "",
        },
        "materialSpec": {
            "editable": false,
            "value": "",
        },
        "materialModel": {
            "editable": false,
            "value": "",
        },
        "orderNumber": {
            "editable": true,
            "value": '',
        },
        "measureUnitCode": {
            "editable": false,
            "value": "",
        },
        "valuationNumber": {
            "editable": false,
            "value": '',
        },
        "valuationUnit": {
            "editable": false,
            "value": "",
        },
        "unitPrice": {
            "editable": true,
            "value": '',
        },
        "tax": {
            "editable": this.props.tax==0?false:true,
            "value": this.props.tax,
        },
        "money": {
            "value": '',
        },
        "taxMoney": {
            "value": '',
        },
        "taxMoneyTotal": {
            "value": '',
        },
        "spuCode": {
            "value": "",
        },
        "spuName": {
            "value": "",
        },
        "remarks": {
            "editable": true,
            "value": "",
        },
    })
    getDisableds = (purchaseType) => {
        let { tax, detail } = this.props;
        //设置需要禁用的列,点编辑时有效
        let disableds = purchaseType == '0' ? list1 : list0;
        if (tax == '0' || detail.sourceOrderType == '1') {//来源电商
            disableds = [...disableds, 'tax'];
        }
        if (detail.sourceOrderType == '1') {//来源电商
            disableds = [...disableds, 'unitPrice', 'materialName', 'materialSpec', 'materialModel', 'measureUnitCode'];
            if (purchaseType != '0') {//是否库存采购
                disableds = [...disableds, 'orderNumber'];
            }
            if (detail.alreadyMatchCatalog == '0') {//是否首次交易
                disableds = [...disableds, 'materialCode'];
            }
        }
        return disableds;
    }

    handleUpdate = (key, index, value) =>{
        let { data } = this.state;

        if (key === 'purchaseType') {
            if (value == '0') {//选择采购类型时
                data[index].materialName.value = '';
                data[index].materialSpec.value = '';
                data[index].materialModel.value = '';
                data[index].measureUnitCode.value = '';
                data[index].valuationUnit.value = '';
            } else {//选择非采购类型时
                data[index].materialCode.value = '';
            };
            let enableds = value == '0' ? list0 : list1;
            enableds.forEach((k) => {
                data[index][k].editable = true;
            });
            let disableds = this.getDisableds(value);
            disableds.forEach((k) => {
                data[index][k].editable = false;
            });

        };

        let tax = data[index].tax.value / 100 + 1;

        if (key === 'orderNumber') { //订单数量联动
            data[index].valuationNumber.value = value;//计价数量
            data[index].money.value = (value * data[index].unitPrice.value / tax).toFixed(2);//金额
            data[index].taxMoney.value = (value * data[index].unitPrice.value * data[index].tax.value / 100).toFixed(2);//税额
            data[index].taxMoneyTotal.value = (value * data[index].unitPrice.value).toFixed(2);//价税合计
        };

        if (key === 'measureUnitCode') { //订单单位联动
            data[index].valuationUnit.value = value; //计价单位
        };

        if (key === 'unitPrice') { //单价联动
            data[index].money.value = (value * data[index].valuationNumber.value / tax).toFixed(2);//金额
            data[index].taxMoney.value = (value * data[index].valuationNumber.value * data[index].tax.value / 100).toFixed(2);//税额
            data[index].taxMoneyTotal.value = (value * data[index].valuationNumber.value).toFixed(2);//价税合计
        };

        if (key === 'tax') { //税率联动
            data[index].money.value = (data[index].valuationNumber.value * data[index].unitPrice.value / (value / 100 + 1)).toFixed(2);//金额
            data[index].taxMoney.value = (data[index].valuationNumber.value * data[index].unitPrice.value * value / 100).toFixed(2);//税额
        };

        if (key === 'materialCode') {
            data[index].materialName.value = value.materialName;
            data[index].materialSpec.value = value.materialSpec;
            data[index].materialModel.value = value.model;
            data[index].measureUnitCode.value = value.measureUnit;
            data[index].valuationUnit.value = value.measureUnit;
            data[index].materialCode.value = value.materialCode;

        } else if (key === 'materialCodeList'){ 
            data[index].materialCodeList = {value};//
        } else{
            if (typeof value !== 'string') {
                value=''
            }
            data[index][key].value = value;
        }

        this.setState({ data });
    }
    componentWillMount() {
        this.props.getMaterialList('').then(list => {
            this.materialList= list ;
        });
    }
    
}

class PurchaseDetailComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            const value = nextProps.value;
            this.setState({list:value});
        }
    }
    handleSubmit = (data, index) => {
        let newData = data;
        if (typeof index !== 'undefined') {
            newData = [...this.state.list];
            //isNewLine区分新增和编辑的保存事件
            if (data.isNewLine === true) {
                // delete data.isNewLine;
                // newData.splice(index, 0, data);
            } else {
                newData[index] = data;
            }
        }
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(newData);
        }
    }
    render() {
        let { list } = this.state;
        let dataSource = list || [];
        return (
            <div>
                <MTable
                    {...this.props}
                    dataSource={dataSource}
                    handleSubmit={this.handleSubmit}
                    rowKey={"key"}
                    addBtn="添加行"
                    scroll={{ x: 2640 }}
                />
            </div>
        );
    }
}
export default PurchaseDetailComp;




