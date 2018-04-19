import React, { Component } from "react";
import { Button, Popconfirm, message, Radio, Select, Form } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import OperationsComp from '../../../base/components/OperationsComp'

import AddPurDetailLineCont from '../../dialogconts/OrderModule/AddPurDetailLineCont';
import EditPurDetailLineCont from '../../dialogconts/OrderModule/EditPurDetailLineCont';

class PurchaseDetailComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = props.value || [];
        this.state = {
            list: value,
            data: {
                materialCode: "",
                materialName: "",
                materialSpec: "",
                materialModel: "",
                orderNumber: "",
                measureUnitCode: "",
                valuationNumber: "",
                valuationUnit: "",
                unitPrice: "",
                tax: "",
                remarks: "",
            },
            index: null,
            current: 1,
            pageSize: 10,
            money: 0,
            taxMoney: 0,
            taxMoneyTotal: 0,
            disableds:[],
        }
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
            },
            {
                title: '采购类型',
                dataIndex: 'purchaseType',
                key: 'purchaseType',
                width: 84,
                fixed: 'left',
                render: (text, record, index) => {
                    return window.ENUM.getEnum("purchaseType", text + '')
                },
            }, {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'metarialCode',
                width: 104,
                fixed: 'left',
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                width: 98,
                fixed: 'left',
            }, {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
            }, {
                title: '型号',
                dataIndex: 'materialModel',
                key: 'materialModel',
            }, {
                title: '订单数量',
                dataIndex: 'orderNumber',
                key: 'orderNumber',
            }, {
                title: '单位',
                dataIndex: 'measureUnitCode',
                key: 'measureUnitCode',
                width: 140,
                render: (text, record, index) => this.getUnitName(text),
            }, {
                title: '计价数量',
                dataIndex: 'valuationNumber',
                key: 'valuationNumber',
            }, {
                title: '计价单位',
                dataIndex: 'valuationUnit',
                key: 'valuationUnit',
                render: (text, record, index) => this.getUnitName(text),
            }, {
                title: '单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
            }, {
                title: '税率 (%)',
                dataIndex: 'tax',
                key: 'tax',
            }, {
                title: '金额',
                dataIndex: 'money',
                key: 'money',
            }, {
                title: '税额',
                dataIndex: 'taxMoney',
                key: 'taxMoney',
            }, {
                title: '价税合计',
                dataIndex: 'taxMoneyTotal',
                key: 'taxMoneyTotal',
            }, {
                title: 'SPU编码',
                dataIndex: 'spuCode',
                key: 'spuCode',
            }, {
                title: 'SPU名称',
                dataIndex: 'spuName',
                key: 'spuName',
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                width: 200,
            }, {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
            }
        ];

        this.columns[this.columns.length - 1].render = (text, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    show: true,
                    fun: () => {
                        let { showDetailLine, type } = this.props;
                        showDetailLine && showDetailLine(type, 'edit', true);
                        this.getDetail(record, index);
                    },
                },
                {
                    title: "删除",
                    titleText: ['确定要删除该BOM吗', '删除后，该条BOM记录将不可恢复！'],
                    show: true,
                    fun: () => this.handleDelete(index),
                },
            ];
            return <OperationsComp operations={opts} />;
        }
    }
    getUnitName(value) {
        let { measureList } = this.props;
        let keyName = 'meaCode', labelName = 'meaName';
        if (measureList && keyName && labelName) {
            if (Array.isArray(measureList) && measureList.length > 0) {
                measureList.forEach(item => {
                    if (item[keyName] === value) {
                        value = item[labelName];
                    }
                })
            }
        }
        return value;
    };
    title = () => {
        let { curSymbol, sourceOrderType, addBtn, showDetailLine, type } = this.props;
        let { money, taxMoney, taxMoneyTotal } = this.state;
        let addBtnText = sourceOrderType != '1' ? "添加行" : "";

        return (
            <div className="tab-title">
                <div className="left-text">
                    <span><strong>明细详细</strong></span>
                </div>
                <div>
                    <span className="total">
                        <span className="laber">合计</span>
                        <span className="laber">金额：</span>
                        <span className="number">{curSymbol+money}</span>
                        <span className="laber">税额：</span>
                        <span className="number">{curSymbol+taxMoney}</span>
                        <span className="laber">价税合计：</span>
                        <span className="number">{curSymbol+taxMoneyTotal}</span>
                    </span>
                {
                    addBtnText ?
                        <a href='#' onClick={() => showDetailLine(type, 'add', true)}>
                            <i className='c2mfont c2m-tianjia'/>
                            {addBtnText}
                        </a>
                    :null
                }
                </div>
            </div>
        );
    }
    componentWillMount() {
        let { getMaterialList, getMeasureList } = this.props;
        // getMaterialList && getMaterialList("");
        getMeasureList && getMeasureList();
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            let tax = 0,
                money = 0,
                taxMoney = 0,
                taxMoneyTotal = 0,
                list = nextProps.value;
            
            list.forEach(item => {
                money = money + Number(item.money);
                taxMoney = taxMoney + Number(item.taxMoney);
                taxMoneyTotal = taxMoneyTotal + Number(item.taxMoneyTotal);
            });
            this.setState({
                list,
                money: money.toFixed(2),
                taxMoney: taxMoney.toFixed(2),
                taxMoneyTotal: taxMoneyTotal.toFixed(2),
            });
            this.setDisableds(nextProps);
        }
    }
    //新增保存
    handleAdd = (data) => {
        const { onChange } = this.props;
        let { list } = this.state;
        let id = "-1";
        if (list[0] && list[0].id < 0) {
            id = list[0].id - 1;
        };
        data.id = id;
        data.selfLine = id;
        data = this.changeDetail(data);
        let newData = [...list];
        newData.splice(0, 0, data);
        onChange && onChange(newData);
    }
    //编辑保存
    handleEdit = (data) => {
        const { onChange } = this.props;
        let { list, index } = this.state;
        let newData = [...list];
        data = this.changeDetail(data);
        if (index != null) {
            newData[index] = data;
            this.setState({index:null})
        }
        onChange && onChange(newData);
    }
    //获取行数据
    getDetail = (data, index) => {
        let { current, pageSize } = this.state;
        if (current && current != 1) {
            index = (current - 1) * pageSize + index;
        };
        this.setState({data,index})
    }
    //转化行数据
    changeDetail = (data) => {
        //计价数量
        data.valuationNumber = data.orderNumber;
        //计价单位
        data.valuationUnit = data.measureUnitCode;
        //税额
        data.taxMoney = (data.valuationNumber * data.unitPrice * data.tax / 100).toFixed(2);
        //价税合计
        data.taxMoneyTotal = (data.valuationNumber * data.unitPrice).toFixed(2);
        //金额
        data.money = (data.taxMoneyTotal - data.taxMoney).toFixed(2);
        
        return data;
    }
    //点击删除
    handleDelete = (index) => {
        const { onChange } = this.props;
        let { current, pageSize, list } = this.state;
        let realIndex = index;
        if (current && current != 1) {
            realIndex = (current - 1) * pageSize + index;
            if (index == 0 && list.length - 1 == realIndex) {
                this.setState({ current: current - 1 });
            }
        };
        let newData = [...list];
        newData.splice(realIndex, 1);
        onChange && onChange(newData);
    }
    //表格换页
    handleTableChange = (pagination, filters, sorter) => {
        let { current, pageSize } = pagination;
        this.setState({ current, pageSize });
    }
    setDisableds = (props) => {
        let {  tax, sourceOrderType } = props;
        let { purchaseType, alreadyMatchCatalog } = this.state.data || {};
        //非库存采购-禁编对象
        const list0 = ['materialCode', 'valuationUnit', 'valuationNumber'];
        //库存采购-禁编对象
        const list1 = ['materialName', 'materialSpec', 'materialModel', 'measureUnitCode', 'valuationNumber', 'valuationUnit', 'purchaseType'];

        // let { sourceOrderType } = this.props;
        // let { alreadyMatchCatalog } = this.record;
        //设置需要禁用的列,点编辑时有效
        let disableds = purchaseType == '0' ? list1 : list0;
        if (tax == '0' || sourceOrderType == '1') {//来源电商
            disableds = [...disableds, 'tax'];
        }
        if (sourceOrderType == '1') {//来源电商
            disableds = [...disableds, 'unitPrice', 'materialName', 'materialSpec', 'materialModel', 'measureUnitCode'];
            if (purchaseType != '0') {//是否库存采购
                disableds = [...disableds, 'orderNumber'];
            }
            if (alreadyMatchCatalog == '1') {//是否首次交易
                disableds = [...disableds, 'materialCode', 'orderNumber'];
            }
        }
        this.setState({ disableds });
    }
    render() {
        let { list, data, disableds } = this.state;
        let dataSource = list || [];
        let { paging, onChange,form,loading, ...props } = this.props;
        return (
            <div className='purchaseDetail-table'>
                <MTable
                    {...props}
                    cols={this.columns}
                    dataSource={dataSource}
                    rowKey={"id"}
                    title={this.title}
                    onChange={this.handleTableChange}
                    scroll={{ x: 2640 }}
                />
                <AddPurDetailLineCont
                    {...props} handleSubmit={this.handleAdd} />
                <EditPurDetailLineCont
                    {...props} handleSubmit={this.handleEdit} disableds={disableds} detail={data}/>
            </div>
        );
    }
}
export default PurchaseDetailComp;




PurchaseDetailComp.defaultProps = {
    curSymbol:'',
}