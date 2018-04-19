import React, { Component } from "react";
import { Row, Col, Spin, Table, Input, Button, Pagination, Dropdown, Menu, message, Icon } from '../../../base/components/AntdComp';
import { formatNullStr } from '../../../base/consts/Utils';
import TooltipComp from '../../../base/components/TooltipComp';
const columns = [
    // {
    //     title: '来源单据行号',
    //     dataIndex: 'line',
    //     key: 'line',
    //     hidden: true
    // },
    {
        title: '行号',
        dataIndex: 'selfLine',
        key: 'selfLine',
        fixed: 'left',
        width: 100,
    },
    {
        title: '采购类型',
        dataIndex: 'purchaseType',
        key: 'purchaseType',
        render: (text, record, index) => window.ENUM.getEnum("purchaseType", text.toString()),
        fixed: 'left',
        width: 140,
    },{
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        fixed: 'left',
        width: 200,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        fixed: 'left',
        width: 80,
        render: (text, record, index) => <TooltipComp attr={{ text: text, wid: '84' }} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        className: 'PurchaseRetView-spec',
    }, {
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
    }, {
        title: '数量',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    }, {
        title: '单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
    }, {
        title: '单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
    }, {
        title: '税率(%)',
        dataIndex: 'tax',
        key: 'tax',
    }, {
        title: '金额',
        dataIndex: 'money',
        key: 'money',
        render: (text, record, index) => text&&Number(text).toFixed(2)
    }, {
        title: '税额',
        dataIndex: 'taxMoney',
        key: 'taxMoney',
        render: (text, record, index) => (text||text===0)&&Number(text).toFixed(2)
    }, {
        title: '价税合计',
        dataIndex: 'taxMoneyTotal',
        key: 'taxMoneyTotal',
        render: (text, record, index) => text&&Number(text).toFixed(2)
    }, {
        title: '累计退库数量',
        dataIndex: 'outQuantity',
        key: 'outQuantity',
    }, {
        title: '累计开票数量',
        dataIndex: 'billingQuantity',
        key: 'billingQuantity',
    },{
        title: '发货结束状态',
        dataIndex: 'receivingStatus',
        key: 'receivingStatus',
        render: (text, record, index) => text != null && window.ENUM.getEnum("receivingStatus", text.toString()),
    },{
        title: '开票结束状态',
        dataIndex: 'billingStatus',
        key: 'billingStatus',
        render: (text, record, index) => text != null && window.ENUM.getEnum("receivingStatus", text.toString()),
    },{
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        width: 130,
        render: (text, record, index) => <TooltipComp attr={{ text: text, wid: '130' }} />
    },
];
let status = {
    submit: "提交",
    withdraw: "撤回",
    // close: "关闭",
    pushDown: "下推"
};
//orderStatus   0：已保存 1：已提交 2：已审核 3：已关闭 4：已驳回
//pushdownMark   0：否 1：是
let moreList = {
    "0": ["submit"],
    "1": ["withdraw"],
    "2": ["pushDown"],
    "3": [],
    "4": ["submit"],
};
class PurchaseReturnViewComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            money: 0,
            taxMoney: 0,
            taxMoneyTotal: 0,
            show: true,
            showMore: false,
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     let { PurRetViewData, purchaseReturnLoading } = nextProps;
    //     let { list } = PurRetViewData;
    //     let tax = 0,
    //         money = 0,
    //         taxMoney = 0,
    //         taxMoneyTotal = 0;
    //     if (Array.isArray(list) && list.length > 0) {
    //         list.forEach(item => {
    //             money = money + Number(item.money);
    //             taxMoney = taxMoney + Number(item.taxMoney);
    //             taxMoneyTotal = taxMoneyTotal + Number(item.taxMoneyTotal);
    //         });
    //     }
    //     this.setState({
    //         list,
    //         money: money.toFixed(2),
    //         taxMoney: taxMoney.toFixed(2),
    //         taxMoneyTotal: taxMoneyTotal.toFixed(2),
    //     });
    // }    

    editPuchaseReturn = (returnCode) => {
        let { EditPurRet, CanPurchaseReturnEdit, PurchaseReturnDetail } = this.props;
        CanPurchaseReturnEdit(returnCode).then(json => {
            if (json.status === 2000) {
                EditPurRet();
                PurchaseReturnDetail(returnCode);
            } else {
                // message.info('该单据已锁住，不能编辑!');
            }
        })
    }
    onClick = (obj) => {
        let { PurchaseReturnStatus, PurRetViewData, tabRemove, PurchaseReturnList } = this.props;
        PurchaseReturnStatus(obj.key, PurRetViewData.returnCode).then(json => {
            if (json.status == 2100 || json.status == 2200 || json.status == 2300 || json.status == 2400) {
                message.success(json.message[0].msg);
                tabRemove();
                PurchaseReturnList({ page: 1, pageSize: 10 });
            } else {
                message.error(json.message[0].msg);
            }
        });
    }

    title = () => {
        // let { money, taxMoney, taxMoneyTotal } = this.state;
        let { PurRetViewData } = this.props;
        return (
            <div className="tab-title">
                <div className="left-text">
                    <span><strong>明细详细</strong></span>
                </div>
                <div>
                    <span className="total">
                        <span className="laber">合计</span>
                        <span className="laber">金额：</span>
                        <span className="number">{formatNullStr(PurRetViewData.curSymbol)}{formatNullStr(PurRetViewData.money)}</span>
                        <span className="laber">税额：</span>
                        <span className="number">{formatNullStr(PurRetViewData.curSymbol)}{formatNullStr(PurRetViewData.taxMoney)}</span>
                        <span className="laber">价锐合计：</span>
                        <span className="number">{formatNullStr(PurRetViewData.curSymbol)}{formatNullStr(PurRetViewData.taxMoneyTotal)}</span>
                    </span>
                </div>
            </div>
        );
    }

    render() {
        let { PurRetViewData, purchaseReturnLoading } = this.props;
        let menu = (
            <Menu onClick={this.onClick}>
                {
                    (PurRetViewData.returnStatus != undefined) && moreList[PurRetViewData.returnStatus].map(item => {
                        if (PurRetViewData.returnStatus == 2 && PurRetViewData.pushdownMark == 1) {
                            // if (item == 'close') {
                            //     return <Menu.Item key="close">关闭</Menu.Item>
                            // }
                        } else {
                            return <Menu.Item key={item}> {status[item]}</Menu.Item>
                        }
                    })
                }

            </Menu>
        );
        let { show, showMore } = this.state;  
        return (
            <div className="PurchaseRetView-wrap">
                <Spin spinning={purchaseReturnLoading}>
                    <Row className="PurchaseRetView-title">
                        <Col span={16}>
                            <p className="order"><b>退货单编号：<span style={{ marginRight: 31 }}>{formatNullStr(PurRetViewData.returnCode)}</span>供应商：<span>{formatNullStr(PurRetViewData.supplierCode)}</span> | <span>{formatNullStr(PurRetViewData.supplierName)}</span></b></p>
                            <p className="status">单据状态：<span style={{ color: '#4c80cf', fontSize: '12px' }}>{window.ENUM.getEnum("purchaseOrderStatus", (PurRetViewData.returnStatus || 0) + '')}</span>　下推状态：<span style={{ color: '#f66666', paddingRight: '20px' }}>{PurRetViewData.pushdownMark ? '已下推' : '未下推'}</span>
                                来源单据：<span>{formatNullStr(PurRetViewData.sourceOrderCode)}</span> | <span>{PurRetViewData.sourceOrderType==1 ? '采购订单' : ''}</span></p>
                        </Col>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            {PurRetViewData.returnStatus == 0 || PurRetViewData.returnStatus == 4 ?
                                <Button type="primary" onClick={() => this.editPuchaseReturn(PurRetViewData.returnCode)}>编辑</Button>
                                :null
                            }
                            <Dropdown overlay={menu}><Button type="ghost" className="morebtn">更多操作 <Icon type="down" /></Button></Dropdown>
                        </Col>
                        <a className="show-more-info" href="#" onClick={() => {
                            this.setState({ show: !show })
                        }}>{show ? '收起' : '展开'}</a>
                    </Row>
                    <Row className="PurchaseRetView-info" style={{ display: this.state.show ? `block` : `none` }}>
                        <Col span={8} style={{borderRight:'1px solid #e2e2e2'}}>
                            <ul className="base-info">
                                <li className="header"><strong>基本信息</strong></li>
                                <li><span>供应商名称：</span>{formatNullStr(PurRetViewData.supplierName)}</li>
                                <li><span>订单日期：</span>{formatNullStr(PurRetViewData.orderDate)}</li>
                                <li><span>联系人：</span>{formatNullStr(PurRetViewData.contactsName)}</li>
                                <li><span>联系人电话：</span>{formatNullStr(PurRetViewData.contactsTel)}</li>
                                <li><span>收货地址：</span>{formatNullStr(PurRetViewData.receivingAddressName)}</li>
                                <li><span>详细地址：</span><div style={{margin:'-24px 0 0 75px'}}><TooltipComp attr={{text:formatNullStr(PurRetViewData.detailAddress), wid:'100%' }}/></div></li>
                            </ul>
                        </Col>
                        <Col span={8} style={{ borderRight: '1px solid #e2e2e2' }}>
                            <ul className="receive-info">
                                <li className="header"><strong>收货信息</strong></li>
                                <li><span>预计收货日期：</span>{formatNullStr(PurRetViewData.etdDate)}</li>
                                <li><span>采购组织：</span>{formatNullStr(PurRetViewData.purchaseOrgName)}</li>
                                <li><span>采购员：</span>{formatNullStr(PurRetViewData.buyerName)}</li>
                                <li><span>发货站点：</span>{formatNullStr(PurRetViewData.siteName)}</li>
                                <li><span>详细地址：</span><div style={{ margin: '-24px 0 0 85px' }}><TooltipComp attr={{ text: formatNullStr(PurRetViewData.siteAddressDetl), wid: '100%' }} /></div></li>
                                <li><span></span></li>
                            </ul>
                        </Col>
                        <Col span={8}>
                            <ul className="other-info">
                                <li className="header"><strong>其他信息</strong></li>
                                <li><span>币种：</span>{formatNullStr(PurRetViewData.curName)}</li>
                                <li><span>成本中心：</span>{formatNullStr(PurRetViewData.costCenterName)}</li>
                                <li><span>是否含税：</span>{window.ENUM.getEnum("isTax", (PurRetViewData.isTax || 0).toString())}&nbsp;      {formatNullStr(PurRetViewData.tax)}</li>
                                {/*<li><span>金额：</span>{PurRetViewData.curSymbol}{PurRetViewData.money ? Number(PurRetViewData.money).toFixed(2) : ''}</li>
                                <li><span>税额：</span>{PurRetViewData.curSymbol}{PurRetViewData.taxMoney || PurRetViewData.taxMoney === 0 ? Number(PurRetViewData.taxMoney).toFixed(2) : ''}</li>
                                <li><span>价税合计：</span>{PurRetViewData.curSymbol}{PurRetViewData.taxMoneyTotal ? Number(PurRetViewData.taxMoneyTotal).toFixed(2) : ''}</li>*/}
                                <li><span>备注：</span><div className="remarks"><TooltipComp attr={{ text:formatNullStr(PurRetViewData.remarks),wid:'100%'}}/></div></li>
                            </ul>
                        </Col>    
                    </Row>
                    <div className='PurchaseRetView-table'>
                        <Table
                            dataSource={PurRetViewData.list}
                            columns={columns}
                            rowKey={"id"}
                            scroll={{ x: 2800 }}
                            pagination={{
                                total: PurRetViewData.list ? PurRetViewData.list.length : 0,
                                showTotal: (total) => `总共 ${total} 条记录`,
                                pageSizeOptions: ['10', '15', '20', '50'],
                                showSizeChanger: true,
                            }}
                            title={this.title}
                        />
                    </div>
                </Spin>
            </div>
        )
    }
}
export default PurchaseReturnViewComp;