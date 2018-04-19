/**
 * Created by MW on 2017/4/19.
 */
import React, {Component} from 'react'
import MTable from '../../../base/components/TableComp'
import TooltipComp from '../../../base/components/TooltipComp'
import {Popconfirm, message} from '../../../base/components/AntdComp'
import { formatNullStr } from '../../../base/consts/Utils';

let columns = [
    {
        title: '单据号',
        dataIndex: 'orderCode',
        key: 'orderCode',
        width: 196,
    },{
        title: '源单据号',
        dataIndex: 'sourceOrderCode',
        key: 'sourceOrderCode',
        width: 205,
    }, {
        title: '源单据类型',
        dataIndex: 'sourceOrderType',
        key: 'sourceOrderType',
        render: (text, record, index) => window.ENUM.getEnum("billType", record.sourceOrderType)
    }, {
        title: '领料人',
        dataIndex: 'ownerName',
        key: 'ownerName',
    }, {
        title: '领料组织',
        dataIndex: 'ownerDetpName',
        key: 'ownerDetpName',
    }, {
        title: '源单备注',
        dataIndex: 'sourceRemark',
        key: 'sourceRemark',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 84}} />
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => window.ENUM.getEnum("outDetailStatus", record.status)
    }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        width: 60
    }
];

class ProductionIssueTableComp extends Component{
    constructor(props) {
        super(props);
        columns[0].render= (text,record) =>{
            return <a className="operator-color" href="#" onClick={() => this.props.newTab('storeDetails',record.orderCode)}>{text}</a>
        };
        columns[1].render= (text,record) =>{
            return <a className="operator-color" href="#" onClick={() => this.props.sidebarVisible(record.sourceOrderCode)}>{text}</a>
        };
        columns[7].render= (text,record) =>{
            return (
                <span>
                        {
                            (record.status != 5 && record.status != 6) ?
                                <span title="执行" className="operator-color operator" href="javascript:;" onClick={() => this.props.newTab('edit',record.orderCode)}>
                                    <i className="c2mfont c2m-zhihang"></i>
                                </span> : <span className="line">{formatNullStr('')}</span>
                        }
                    {
                        record.status == 1 ?
                            <Popconfirm title="确认删除该记录吗？" onConfirm={() => this.confirmDelete(record.orderCode)} okText="确定" cancelText="取消">
                                <span title="删除" className="operator-color operator" href="javascript:;">
                                        <i className="c2mfont c2m-shanchu"></i>
                                    </span>
                            </Popconfirm> : <span className="line">{formatNullStr('')}</span>
                    }
                    </span>
                )
        };
    }

    confirmDelete = (orderCode) => {
        this.props.confirmDelete(orderCode).then(json => {
            if(json.status == 2000){
                message.info('数据删除成功！');
            }
        })
    }

    tablePaging = (current) => {
        this.props.getList(typeof current == 'number'?Object.assign(this.props.search,{page:current}):Object.assign(this.props.search,current));
    }

    render() {
        return (
            <div className="table-list">
                <MTable cols={columns} rowKey={"id"} dataSource={this.props.dataSource} paging={this.props.paging} pageOnChange={this.tablePaging}/>
            </div>
        )
    }
}

export default ProductionIssueTableComp