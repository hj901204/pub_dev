import React, { Component } from 'react'
import MTable from '../../../base/components/TableComp';
import TooltipComp from '../../../base/components/TooltipComp'
const columns = [{
        title: '行号',
        dataIndex: 'line',
        key: 'line',
        className:'purchase-table-list',
        width:55,
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => '已保存',
        width:83,
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width:154,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 150}} />
    },{
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
    },{
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
    },{
        title: '计划数量',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        width:110,
    },{
        title: '基本单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
        width:74,
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width:100,
        className:'add-purchaselist-oeration',
        render: (text, record, index) => '--  --'
    }
];


class AddPurchaseTableComp extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render(){  
        let {newState,...props}=this.props;       
        return (
            <div className="addpurchase-table-list">
                <MTable 
                    scroll={{ x: 1583 }}  
                    cols={columns}
                    rowKey = {"orderCode"}
                    dataSource={newState.dataSource} 
                    loading={newState.tableLoading}
                    paging = {newState.paging}
                    pageOnChange={this.tablePaging}
                    {...props}  
                />
            </div>
        );

    }
}

export default AddPurchaseTableComp

