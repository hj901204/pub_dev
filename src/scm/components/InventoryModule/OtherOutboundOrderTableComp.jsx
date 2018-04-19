/**
 * Created by MW on 2017/7/19.
 * 其它出库单_表格
 */

import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'
import { formatNullStr } from '../../../base/consts/Utils';
import {Popconfirm, message} from '../../../base/components/AntdComp'

let columns = [
    {
        title: "出库单据号",
        dataIndex: "orderCode",
        key: "orderCode",
        width: 212,
    }, {
        title: "单据类型",
        dataIndex: "busName",
        key: "busName",//orderType
    } , {
        title: "发货站点",
        dataIndex: "shippingSiteName",
        key: "shippingSiteName",
    }, {
        title: "收货人",
        dataIndex: "bpFull",
        key: "bpFull",
    }, {
        title: "收货部门",
        dataIndex: "ownerDetpName",
        key: "ownerDetpName",
    }, {
        title: "交货日期",
        dataIndex: "deliveryDate",
        key: "deliveryDate",
        width: 134,
        render:(text, record, index) => record.deliveryDate ? record.deliveryDate.match(/\d{4}\-\d{2}\-\d{2}/)[0] : formatNullStr('')
    }, {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (text, record, index) => window.ENUM.getEnum("outDetailStatus", record.status)
    }, {
        title: "操作",
        dataIndex: "operator",
        key: "operator",
        width: 120
    }
]

class OtherOutboundOrderTableComp extends Component {
    constructor(props) {
        super(props);

        columns[0].render = (text, record) => {
            return (
                <a href="javascript:;" className="operator-color operator" onClick={() => this.props.newTab('details', record.orderCode)} >{record.orderCode}</a>
            )
        };

        columns[7].render = (text, record) => {
            return (
                <span>
                    {
                        record.status == 1 ?
                            <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.props.newTab('edit', record.orderCode)}>
                                <i className="c2mfont c2m-bianji"></i>
                            </span> : <span className="line">{formatNullStr('')}</span>
                    }
                    {
                        (record.status !=5 && record.status != 6 ) ?
                            <span title="执行" className="operator-color second operator" href="javascript:;" onClick={() => this.props.newTab('execute', record.orderCode)}>
                                <i className="c2mfont c2m-zhihang"></i>
                            </span> : <span className="line second">{formatNullStr('')}</span>
                    }
                    {
                        record.status == 1 ?
                            <Popconfirm title="确认删除该数据吗？" onConfirm={() => this.props.confirmDelete(record.orderCode)}>
                                <span title="删除" className="operator-color operator" href="javascript:;">
                                    <i className="c2mfont c2m-shanchu"></i>
                                </span>
                            </Popconfirm> : <span className="line">{formatNullStr('')}</span>
                    }
                </span>
            )
        }
    };

    tablePaging = (current) => {
        this.props.getList(typeof current == 'number'?
            Object.assign(this.props.search,{page:current})
            :
            Object.assign(this.props.search,current)
        );
    }

    render() {
        return(
            <div className="table-list">
                <MTable cols={columns} rowKey="id" dataSource={this.props.dataSource} paging={this.props.paging} pageOnChange={this.tablePaging}/>
            </div>
        )
    }
}

export default OtherOutboundOrderTableComp