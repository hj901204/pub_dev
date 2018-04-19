
import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import OperationsComp from '../../../base/components/OperationsComp'; 
import TooltipComp from '../../../base/components/TooltipComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
import EditPurPriceDetailDialogCont from '../../dialogconts/OrderModule/EditPurPriceDetailDialogCont';

class AddPurPriceDetailTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: '行号',
                dataIndex: 'lineNumber',
                key: 'lineNumber',
                width: '4%',
                className: "firstColCenter",
            },
            {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'materialCode',
                width:'13%',
            },
            {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                render:(txt,record,index)=>{
                    return <TooltipComp attr={{text:txt, wid: 88, placement: 'top'}} />
                },
                width:'12%',
            },
            {
                title: '规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                render:(txt,record,index)=>{
                    return <TooltipComp attr={{text:txt, wid: 88, placement: 'top'}} />
                },
                width:'11%',
            },
            {
                title: '型号',
                dataIndex: 'materialModel',
                key: 'materialModel',
                render:(txt,record,index)=>{
                    return <TooltipComp attr={{text:txt, wid: 88, placement: 'top'}} />
                },
                width:'11%',
            }, {
                title: '批量价格',
                dataIndex: 'batchPrice',
                key: 'batchPrice',
                render: (txt, record, index) => {
                    txt = Number(txt).toFixed(2);
                    return `${record.currencySymbol}${txt}`
                },
                width:'11%',
            }, {
                title: '税率',
                dataIndex: 'taxRate',
                key: 'taxRate',
                render: (txt, record, index) => {
                    txt = Number(txt).toFixed(2);
                    return `${txt}%`
                },
                width:'7%',
            }, {
                title: '批量价格（含税）',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                render: (txt, record, index) => {
                    txt = Number(txt).toFixed(2);
                    return `${record.currencySymbol}${txt}`
                },
                width:'11%',
            }, {
                title: '数量',
                dataIndex: 'materialQty',
                key: 'materialQty',
                render: (txt, record, index) => txt && Number(txt).toFixed(2),
                width:'9%',
            }, {
                title: '单位编码',
                dataIndex: 'materialUnitCode',
                key: 'materialUnitCode',
                hidden: true,
            },
            {
                title: '单位',
                dataIndex: 'materialUnitName',
                key: 'materialUnitName',
                width:'6%',
            },
            {
                dataIndex: 'handle',
                title: '操作',
                width: '5%',
                className: "textAlignCenter",
            }
        ];

        const value = props.value || [];
        this.state = {
            list: value,
            material: {},
            index:'',
            current: 1,
            pageSize:10
        };
        // this.columns[this.columns.length - 1].render = (txt, record, index) => {
        //     return <div>
        //         <a href="#" onClick={() => this.editPurPrice(record, index)} >编辑 </a>
        //         <Popconfirm title={
        //             <div>
        //                 <h5>确定删除该条物料明细吗？</h5>
        //                 <p>删除后，该条物料明细将不可恢复！</p>
        //             </div>
        //         } onConfirm={() => this.delPurPrice(index)} >
        //             <a href="#">删除</a>
        //         </Popconfirm>
        //     </div>
        // }

        this.columns[this.columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    titleText: [],
                    icon: '',
                    fun: () => this.editPurPrice(record, index),
                    show: true,
                },
                {
                    title: "删除",
                    titleText: ['确定删除该条物料明细吗？', '删除后，该条物料明细将不可恢复！'],
                    icon: '',
                    show: true,
                    fun: () => this.delPurPrice(index),
                },
            ];
            return <OperationsComp operations={opts} />;
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.state.list) {
            const list = nextProps.value;
            this.setState({ list });
        }
    }
    //编辑明细
    editPurPrice = (data,index) => {
        this.props.PurPriceDialogVisiable(this.props.type,'editPurPriceDetail_visible');
        this.setState({material:data,index:index})
    }
    //删除明细
    delPurPrice = (index) => {
        let { list, current, pageSize } = this.state;
        let realIndex = index;
        if (current && current != 1) {
            realIndex = (current - 1) * pageSize + index;
            if (index == 0 && list.length - 1 == realIndex) {
                this.setState({ current: current - 1 });
            }
        };
        let newData = [...list];
        newData.splice(realIndex, 1);
        this.handleSubmit(newData,realIndex)
    }
    //数据传到上层form表单
    handleSubmit = (data,index) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(data);
        }
    }
    //新增物料
    handleSubmitEditDialog = (data,index=this.state.index) => {
        let { list, current, pageSize } = this.state;
        let newData = [...list];
        if (current && current != 1) {
            index = (current - 1) * pageSize + index;
        };
        newData[index]= data;
        this.handleSubmit(newData,index)
    }
    //表格变化事件
    handleTableChange = (pagination, filters, sorter) => {
        let { current, pageSize } = pagination;
        this.setState({ current, pageSize });
    }
    render() {
        let { list, material } = this.state;
        let dataSource = list || [];
        let { paging, onChange, editPurPriceDetail_visible, type, ...props } = this.props;
        return (
            <div className='purPriceDetail-table'>
                <MTable
                    {...props}
                    dataSource={dataSource}
                    // style={{marginTop:20}}
                    rowKey={"materialCode"}
                    cols={this.columns}
                    onChange={this.handleTableChange}
                    />
                  {
                    editPurPriceDetail_visible ?
                        <EditPurPriceDetailDialogCont
                            {...props}
                            list={list}
                            handleSubmit={this.handleSubmitEditDialog}
                            material={material}
                        /> : null
                }
                
            </div>
           
        );
    }
}
export default AddPurPriceDetailTableComp;