import React, { Component } from 'react'
import MTable from '../../../base/components/TableComp';
import TooltipComp from '../../../base/components/TooltipComp'
const columns = [{
        title: '行号',
        dataIndex: 'sourceLineNumber',
        key: 'sourceLineNumber',
        className:'purchase-table-list',
        width:54,
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => '已保存',
        width:78,
    }, {
        title: '物料编码',
        dataIndex: 'productCode',
        key: 'productCode',
    }, {
        title: '物料名称',
        dataIndex: 'productName',
        key: 'productName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 150}} />
    },{
        title: '规格',
        dataIndex: 'productSpec',
        key: 'productSpec',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 76}} />
    },{
        title: '型号',
        dataIndex: 'productModel',
        key: 'productModel',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 82}} />
    },{
        title: '计划数量',
        dataIndex: 'productionNumber',
        key: 'productionNumber',
        width:124,
    },{
        title: '基本单位',
        dataIndex: 'productUnitName',
        key: 'productUnitName',
        width:86,
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width:94,
        className:'add-purchaselist-oeration',
        render: (text, record, index) => '--  --'
    }
];


class AddWareHousingTableComp extends Component {
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

export default AddWareHousingTableComp

