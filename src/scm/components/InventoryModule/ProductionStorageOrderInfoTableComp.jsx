import React, { Component } from 'react'
import MTable from '../../../base/components/TableComp';
import ProductionStorageOperationDialogAct from "../../actions/InventoryModule/ProductionStorageOperationDialogAct";
import ProductionStorageTopAct from '../../actions/InventoryModule/ProductionStorageTopAct';
import ProductionStorageOperationDialogCont from "../../dialogconts/InventoryModule/ProductionStorageOperationDialogCont";
import { store } from "../../data/StoreConfig";
import TooltipComp from "../../../base/components/TooltipComp"
const columns = [{
    title: '行号',
    dataIndex: 'lineNum',
    key: 'lineNum',
    width: 52,
    fixed: 'left',
    className: 'table-thead-center',
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    width: 82,
    render: (txt, record, index) => record.status ? window.ENUM.getEnum("orderStatus", record.status) : ""
}, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    fixed: 'left',
    width: 166,
}, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    fixed: 'left',
    width: 142,
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 134, placement: 'left' }} />
}, {
    title: '规格',
    dataIndex: 'materialSpec',
    key: 'materialSpec',
    className: 'th-padding',
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
}, {
    title: '型号',
    dataIndex: 'materialModel',
    key: 'materialModel',
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
}, {
    title: '计划数量',
    dataIndex: 'planAmount',
    key: 'planAmount',
    width: 92,
}, {
    title: '基本单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
    width: 60,
}, {
    title: '预收货数量',
    dataIndex: 'beforehandDeliveryAmount',
    key: 'beforehandDeliveryAmount',
    width: 88,
}, {
    title: '已收货数量',
    dataIndex: 'receivedAmount',
    key: 'receivedAmount',
    width: 97,
}, {
    title: '未清数量',
    dataIndex: 'outstandingAmount',
    key: 'outstandingAmount',
}, {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 66,
    fixed: 'right',
    className: 'table-thead-center',
}
];



class ProductionStorageOrderInfoTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) => {
            return (record.status == 1 || record.status == 2 || (record.status == 4 && (record.beforehandDeliveryAmount * 1 < record.planAmount * 1))) ?
                <span onClick={() => this.clickHandler(record)} className='c2mfont c2m-yushouhuo iconstyle' title='预收货'></span> : '—';
        }
    }

    clickHandler = (record) => {
        store.dispatch(ProductionStorageOperationDialogAct.initDataSource(record));
    }

    tablePaging = (page) => {
        store.dispatch(ProductionStorageTopAct.tablePagingForOrderInfoTable(page))
    }

    render() {
        let { state, ...props } = this.props;
        let tableData = state.orderInfoTableData
        let pagination = {
            current: tableData.paging.page,
            pageSize: tableData.paging.pageSize,
            total: tableData.paging.total
        }
        return (
            <div>
                <ProductionStorageOperationDialogCont />
                <MTable
                    cols={columns}
                    dataSource={tableData.dataSource}
                    rowKey={'lineNum'}
                    scroll={{ x: 1583 }}
                    paging={pagination}
                    pageOnChange={this.tablePaging}
                    loading={tableData.tableLoading}
                />
            </div>
        );

    }
}

export default ProductionStorageOrderInfoTableComp

