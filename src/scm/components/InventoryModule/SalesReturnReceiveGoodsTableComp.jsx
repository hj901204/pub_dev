import React, { Component } from 'react'
import { Button, Pagination, Input, Popconfirm } from '../../../base/components/AntdComp'
import MTable from '../../../base/components/TableComp';
import SalesReturnStoreEidtTopAct from '../../actions/InventoryModule/SalesReturnStoreEidtTopAct'
import { store } from "../../data/StoreConfig";
import TooltipComp from "../../../base/components/TooltipComp"
const columns = [{
    title: '单据id',
    dataIndex: 'id',
    key: 'id',
    hidden: true,
}, {
    title: '行号',
    dataIndex: 'lineNum',
    key: 'lineNum',
    width: 59,
    fixed: 'left',
    className: 'table-thead-center',
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    width: 76,
    render: (txt, record, index) => record.status == 1 ? <span>未收货</span> : <span>已收货</span>
}, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width: 160,
    fixed: 'left',
}, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    width: 146,
    fixed: 'left',
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 134, placement: 'left' }} />
}, {
    title: '仓库',
    dataIndex: 'siteName',
    key: 'siteName',
    className: 'th-padding',
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
}, {
    title: '仓位',
    dataIndex: 'name',
    key: 'name',
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
}, {
    title: '批次号',
    dataIndex: 'batchNum',
    key: 'batchNum',
    render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 90, placement: 'left' }} />
}, {
    title: '数量',
    dataIndex: 'materialAmount',
    key: 'materialAmount',
    width: 99,
}, {
    title: '基本单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
    width: 106,
}, {
    title: '创建人',
    dataIndex: 'createByName',
    key: 'createByName',
}, {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
}, {
    title: '操作',
    dataIndex: 'delFlag',
    key: 'delFlag',
    width: 74,
    fixed: 'right',
    className: 'table-thead-center',
}
];

class SalesReturnReceiveGoodsTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) => (
            record.status == 1 ? <div>
                <Popconfirm
                    placement="topRight"
                    title="确定删除该订单信息么？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => this.onDelete(index,record.id)}
                >
                    <span className='c2mfont c2m-shanchu iconstyle' title='删除'></span>
                </Popconfirm>
            </div> : '—'
        )
    }

    onDelete = (index,id) => {
        this.props.onDelete(index,id);
    }

    tablePaging = (page) => {
        store.dispatch(SalesReturnStoreEidtTopAct.tablePagingForReceiveGoodsTable(page))
    }

    render() {
        let { state, tablePaging } = this.props;
        let tableData = state.receiveGoodsTableData
        let pagination = {
            current: tableData.paging.page,
            pageSize: tableData.paging.pageSize,
            total: tableData.paging.total
        }
        return (
            <div>
                <MTable
                    cols={columns}
                    dataSource={tableData.dataSource}
                    rowKey={"id"}
                    paging={pagination}
                    pageOnChange={this.tablePaging}
                    loading={tableData.tableLoading}
                />
            </div>
        );

    }
}

export default SalesReturnReceiveGoodsTableComp

