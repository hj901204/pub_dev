/**
 * Created by MW on 2017/4/21.
 */
import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'

let columns = [
    {
        title: '行号',
        dataIndex: 'selfLine',
        key: 'selfLine',
        width: 64,
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => "保存",
        width:92
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width: 175,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 149}} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 90}} />
    }, {
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 90}} />
    }, {
        title: '计划数量',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        width: 120,
    }, {
        title: '基本单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
        width: 62,
    }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        width: 114,
    }
];

class NewPurchaseReturnStoreHouseTableComp extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="table">
                <h3 className="public-name"><span className="line"></span>订单信息</h3>
                <div>
                    <MTable cols={columns} rowKey={"id"} dataSource={this.props.dataSource.list} />
                </div>
            </div>
        )
    }
}

export default NewPurchaseReturnStoreHouseTableComp

