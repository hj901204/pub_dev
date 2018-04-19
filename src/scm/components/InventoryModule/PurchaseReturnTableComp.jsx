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
        width: 154,
    },{
        title: '源单据号',
        dataIndex: 'sourceOrderCode',
        key: 'sourceOrderCode',
        width: 147,
    }, {
        title: '源单据类型',
        dataIndex: 'sourceDocType',
        key: 'sourceDocType',
        render: (text, record, index) => window.ENUM.getEnum("billType", record.sourceOrderType),
        width: 110,
    }, {
        title: '供应商',
        dataIndex: 'bpFull',
        key: 'bpFull',
    }, {
        title: '收货地址',
        dataIndex: 'deliveryAddressDetl',
        key: 'deliveryAddressDetl',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 140}} />
    }, {
        title: '源单备注',
        dataIndex: 'sourceRemark',
        key: 'sourceRemark',
        render: (text, record, index) => <TooltipComp attr={{text: text, wid: 140}} />
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => window.ENUM.getEnum("outDetailStatus", record.status),
        width: 74,
    }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        width: 91,
    }
];

class PurchaseReturnTableComp extends Component{
    constructor(props) {
        super(props);
        columns[0].render= (text,record) =>{
            return <a className="operator-color" href="#" onClick={() => this.props.newTab('storeDetails',record.orderCode)}>{text}</a>
        };
        columns[1].render= (text,record) =>{
            return <a className="operator-color" href="#" onClick={() => this.props.sidebarVisible('sideDetails',{returnCode:record.sourceOrderCode})}>{text}</a>
        };
        columns[3].render= (text,record) =>{
            return <TooltipComp
                attr={{text: <span className="operator-color" href="#"
                                onClick={() => this.props.sidebarVisible('sideSupplier',{supplierCode:record.bpCode,langCode:record.langCode})}>{text}</span>,
                    wid: 140}} />
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

export default PurchaseReturnTableComp