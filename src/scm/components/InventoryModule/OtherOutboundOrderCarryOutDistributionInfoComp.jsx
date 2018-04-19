/**
 * Created by MW on 2017/7/20.
 * 其它出库单_分配信息
 */

import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'
import {Popconfirm, Spin} from '../../../base/components/AntdComp'
import { formatNullStr } from '../../../base/consts/Utils';

let columns = [
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 90,
        render: (txt, record, index) => window.ENUM.getEnum("getAllocateInfoStatus", record.status)
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width: 161,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 88}} />
    }, {
        title: '站点',
        dataIndex: 'warehouseName',
        key: 'warehouseName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 88}} />
    }, {
        title: '仓位',
        dataIndex: 'freightSpaceName',
        key: 'freightSpaceName',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
    }, {
        title: '批次号',
        dataIndex: 'batchCode',
        key: 'batchCode',
    }, {
        title: '数量',
        dataIndex: 'materialAmount',
        key: 'materialAmount',
    }, {
        title: '基本单位',
        dataIndex: 'materialUnitName',
        key: 'materialUnitName',
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
        dataIndex: 'operator',
        key: 'operator',
        width: 63
    }
];

class OtherOutboundOrderCarryOutDistributionInfoComp extends Component {
    constructor (props) {
        super(props)
        columns[10].render = (text, record) => {
            return (
            record.status == 1?
                <Popconfirm title="确认删除该数据吗？" onConfirm={() => this.props.confirmDelete(record.id)}>
                    <span title="删除" className="operator" href="javascript:;">
                        <i className="c2mfont c2m-shanchu"></i>
                    </span>
                </Popconfirm>:<span className="line">{formatNullStr('')}</span>
            )
        }
    };

    tablePaging = (page) => {
        this.props.getAllocateInfo(typeof page =='number'?
            {page:page,pageSize:10,outCode:this.props.orderCode,isFlag: 0,status: 0}
            :
            Object.assign(page,{outCode:this.props.orderCode,isFlag: 0,status: 0})
        );
    };

    render() {
        return (
            <div>
                <Spin spinning={this.props.allotInfoLoading}>
                    <MTable cols={columns} rowKey="id" dataSource={this.props.allotInfoList} paging={this.props.allotPaging} pageOnChange={this.tablePaging} />
                </Spin>
            </div>
        )
    }
}

export default OtherOutboundOrderCarryOutDistributionInfoComp
