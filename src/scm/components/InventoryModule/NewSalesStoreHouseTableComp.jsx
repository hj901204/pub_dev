/**
 * Created by MW on 2017/4/21.
 */
import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'

let columns = [
    {
        title: '行号',
        dataIndex: 'lineNum',
        key: 'lineNum',
        width: 55,
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => "保存",
        width: 85,
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width: 178,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 150}} />
    }, {
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 150}} />
    }, {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
    }, {
        title: '计划数量',
        dataIndex: 'materialNum',
        key: 'materialNum',
        width: 108,
    }, {
        title: '基本单位',
        dataIndex: 'unitOfMeasurementName',
        key: 'unitOfMeasurementName',
        width: 68,
    }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        width: 110,
    }
];

class NewSalesStoreHouseTableComp extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="table">
                <h3 className="public-name">订单信息</h3>
                <div>
                    <MTable cols={columns} rowKey={"id"} dataSource={this.props.dataSource.saleDetails} />
                </div>
            </div>
        )
    }
}

export default NewSalesStoreHouseTableComp

