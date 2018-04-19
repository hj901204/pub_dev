/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'
import {Spin} from '../../../base/components/AntdComp'
import {Popconfirm, message} from '../../../base/components/AntdComp'

let colmuns = [
    {
        title: '序号',
        dataIndex: 'number',
        key: 'number',
        render: (text,recoder,index) => index + 1,
        width: 45
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => window.ENUM.getEnum("outDetailStatus", record.status) ,
        width: 90
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width: 154,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 92}} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 100}} />
    },{
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 99}} />
    },{
        title: '计划数量',
        dataIndex: 'planAmount',
        key: 'planAmount',
    }, {
        title: '基本单位',
        dataIndex: 'materialUnitName',
        key: 'materialUnitName',
    }, {
        title: '已分配数量',
        dataIndex: 'allocatedAmount',
        key: 'allocatedAmount',
    }, {
        title: '已发货数量',
        dataIndex: 'shippedAmount',
        key: 'shippedAmount',
    }, {
        title: '未清数量',
        dataIndex: 'outstandingAmount',
        key: 'outstandingAmount',
    }
];

class ProductionIssueOutboundDetailsTableComp extends Component {
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
                    <h3 className="public-title"><span className="line"></span>物料列表</h3>
                    <Spin spinning={this.props.tableLoading}>
                        <div className="list">
                            <MTable cols={colmuns} rowKey={'id'} dataSource={this.props.list} paging={this.props.paging} pageOnChange={this.tablePaging}/>
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

export default ProductionIssueOutboundDetailsTableComp