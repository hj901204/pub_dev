/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from 'react'
import {Spin} from '../../../base/components/AntdComp'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'

let columns = [
    {
        title: '序号',
        dataIndex: 'number',
        key: 'number',
        render: (text,recoder,index) => <div className="number">{index + 1}</div>,
        fixed: 'left',
        width: 46
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => window.ENUM.getEnum("outDetailStatus", record.status),
        fixed: 'left',
        width: 84
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        fixed: 'left',
        width: 164,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        fixed: 'left',
        width: 164,
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 138}} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 100}} />
    },{
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 90}} />
    }, {
        title: '计划数量',
        dataIndex: 'planAmount',
        key: 'planAmount',
        width: 90,
    }, {
        title: '基本单位',
        dataIndex: 'materialUnitName',
        key: 'materialUnitName',
        width: 82,
    }, {
        title: '已分配数量',
        dataIndex: 'allocatedAmount',
        key: 'allocatedAmount',
        width: 100,
    }, {
        title: '已发货数量',
        dataIndex: 'shippedAmount',
        key: 'shippedAmount',
        width: 78,
    }, {
        title: '未清数量',
        dataIndex: 'outstandingAmount',
        key: 'outstandingAmount',
        width: 97,
    }
];

class SalesOutboundDetailsTableComp extends Component {
    constructor(props) {
        super(props)
    }

    tablePaging = (page) => {
        this.props.getTable(typeof page =='number'?{page:page,pageSize:10,outCode:this.props.dataSource.orderCode}:Object.assign(page,{outCode:this.props.dataSource.orderCode}));
    }

    render () {
        return(
            <div>
                <div className="table">
                    <h3 className="public-title">物料列表</h3>
                    <Spin spinning={this.props.tableLoading}>
                        <div className="list">
                            <MTable cols={columns} rowKey={'id'} dataSource={this.props.list} paging={this.props.paging} pageOnChange={this.tablePaging} scroll={{ x: 1583 }} />
                        </div>
                    </Spin>
                </div>
                <div className="remark">
                    <h3 className="public-title">发货记录</h3>
                    <div className="content">
                        {this.props.remarkList.map((perRemark) => {
                            return(
                                <div key={perRemark.id} className="per-remark">
                                    <span className="time">{perRemark.updateDate}</span>
                                    <span>{perRemark.createByName}从{perRemark.warehouseName}的{perRemark.freightSpaceName}仓位，分配了批次为{perRemark.batchCode ? perRemark.batchCode : '空'}的{perRemark.materialName}{perRemark.materialCode?'[' + perRemark.materialCode + ']':''}{perRemark.materialAmount}{perRemark.materialUnitName}。</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesOutboundDetailsTableComp