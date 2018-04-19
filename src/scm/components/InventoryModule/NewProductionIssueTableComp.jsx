/**
 * Created by MW on 2017/4/21.
 */
import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'


let columns = [
    {
        title: '行号',
        dataIndex: 'line',
        key: 'line',
        width: 53,
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => "保存",
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width: 181,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 88}} />
    }, {
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 86}} />
    }, {
        title: '计划数量',
        dataIndex: 'applyNumber',
        key: 'applyNumber',
    }, {
        title: '基本单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
    }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        width: 63,
    }
];

class NewProductionIssueTableComp extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="table">
                <h3 className="title"><span className="line"></span>订单信息</h3>
                <div>
                    <MTable cols={columns} rowKey={"line"} dataSource={this.props.dataSource.list} />
                </div>
            </div>
        )
    }
}

export default NewProductionIssueTableComp

