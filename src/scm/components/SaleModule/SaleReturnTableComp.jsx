import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Icon, Button, Popconfirm } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { store } from '../../data/StoreConfig';
import TabsAct from '../../actions/TabsAct';

class SaleReturnTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: '销售退货id',
                className: 'saleReturnId',
                key: 'saleReturnId',
                width: 120,
                hidden: true,
                // className: 'hidden-node'
            },
            {
                title: '退货单号',
                dataIndex: 'saleReturnCode',
                key: 'saleReturnCode',
                width: 150,
                render: (text, record) => (<a onClick={() => this.getSaleReturnDetail(record.saleReturnCode)}>{text}</a>)
            }, {
                title: '单据状态',
                dataIndex: 'status',
                key: 'status',
                width: 60,
                render: (txt, record, index) => {
                    return this.getE("ProOrderStatus", txt + '')
                },
            }, {
                title: '业务类型',
                dataIndex: 'businessType',
                key: 'businessType',
                width: 60,
                render: (txt, record, index) => {
                    return this.getE("saleReturnBusinessType", txt + '')
                },

            }, {
                title: '客户',
                dataIndex: 'customerName',
                key: 'customerName',
                width: 118
            }, {
                title: '预计退货日期',
                dataIndex: 'planReturnDate',
                key: 'planReturnDate',
            }, {
                title: '销售组织',
                dataIndex: 'saleOrg',
                key: 'saleOrg',
            }, {
                title: '销售人员',
                dataIndex: 'saleEmp',
                key: 'saleEmp',
            }, {
                title: '下推状态',
                dataIndex: 'pushdownStatus',
                key: 'pushdownStatus',
                render: (txt, record, index) => {
                    return this.getE("isPushDownStatus", txt + '')
                },
            }, {
                title: '更新人',
                dataIndex: 'updateByName',
                key: 'updateByName',
            }, {
                title: '更新时间',
                dataIndex: 'updateDate',
                key: 'updateDate',
            }, {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
            }];

        this.columns[this.columns.length - 1].render = (txt, record, index) =>
            <div>
                <a href="#" onClick={() => this.onEditSaleReturnDetail(record.saleReturnCode)} style={{visibility: record.status == "0" || record.status == "4" || record.status == "6" ? `visible` : `hidden`}}><span title="编辑"><i className="c2mfont c2m-bianji columns-distribute" style={{marginRight:10}}></i></span> </a>
                <Popconfirm title={
                    <div>
                        <h5>确定要删除该退货单吗</h5>
                    </div>
                } onConfirm={() => this.onDelete(record.saleReturnCode)}>
                    <a href="#" style={{visibility: record.status == "0" || record.status == "4" || record.status == "6" ? `visible` : `hidden`,paddingLeft:5}}><span title="删除"><i className="c2mfont c2m-shanchu columns-distribute" style={{marginRight:10}}></i></span>  </a>
                </Popconfirm>
            </div>
    }

    getSaleReturnDetail = (saleReturnCode) => {
        // this.props.SaleReturnDetail(saleReturnCode, "detail")
        // console.log(saleReturnCode);
        this.props.GetSaleReturn(saleReturnCode, "detail");
        store.dispatch(TabsAct.TabAdd({ title: "销售退货单详情", key: "saleReturnDetail" }));

    };

    onEditSaleReturnDetail = (saleReturnCode) => {
        // this.props.SaleReturnDetail(saleReturnCode, "edit")
        this.props.GetSaleReturn(saleReturnCode, "edit");
        this.props.CheckLockingStatus(saleReturnCode);
        // store.dispatch(TabsAct.TabAdd({title:"编辑销售退货单", key:"edit"}));
    };
    onDelete = (saleReturnCode) => {
        this.props.DeleteSaleReturn(saleReturnCode);
    }

    getE = (key, val) => {
        // console.log(val);
        if (val !== undefined && val !== 'null' && val !== "") {
            return window.ENUM.getEnum(key, val)
        }
    }
    componentDidMount() {
        this.props.tablePaging(1);
    }
    render() {
        const { tabLoading, tablePaging, dataSource, ...props } = this.props;
        return (
            <div className="table-wrap">
                <div className="table-body">
                    <MTable
                        {...props}
                        dataSource={dataSource}
                        loading={tabLoading}
                        cols={this.columns}
                        rowKey={"saleReturnId"}
                        pageOnChange={tablePaging}

                    />
                </div>
            </div>
        );
    }
}
export default SaleReturnTableComp;