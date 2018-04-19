import React, { Component } from "react";
import { Row, Col, Spin, Table, Input, Button, Pagination, Dropdown, Menu, message, Icon } from '../../../base/components/AntdComp';
import TooltipComp from '../../../base/components/TooltipComp';
import { formatNullStr } from '../../../base/consts/Utils';

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
        width: 48,
        fixed: 'left'
    },
    {
        title: '采购类型',
        dataIndex: 'purchaseType',
        key: 'purchaseType',
        render: (text, record, index) => window.ENUM.getEnum("purchaseType", text.toString()),
        fixed: 'left',
        width: 84,
    },
    {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        fixed: 'left',
        width: 104,
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        fixed: 'left',
        width: 80,
        render: (text, record, index) => <TooltipComp attr={{ text: text, wid: '80' }} />
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        className:'PurchaseView-spec',
    }, {
        title: '型号',
        dataIndex: 'materialModel',
        key: 'materialModel',
    }, {
        title: '订单数量',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    }, {
        title: '订单单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
    }, {
        title: '计价数量',
        dataIndex: 'valuationNumber',
        key: 'valuationNumber',
    },
    {
        title: '计价单位',
        dataIndex: 'valuationUnit',
        key: 'valuationUnit',
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
        title: '累计入库数量',
        dataIndex: 'inQuantity',
        key: 'inQuantity',
    }, {
        title: '未清数量',
        dataIndex: 'notclearQuantity',
        key: 'notclearQuantity',
    }, {
        title: '累计开票数量',
        dataIndex: 'billingQuantity',
        key: 'billingQuantity',
    },
    {
        title: '收货结束状态',
        dataIndex: 'goodsStatus',
        key: 'goodsStatus',
        render: (text, record, index) => text != null && window.ENUM.getEnum("receivingStatus", text.toString()),
    }, {
        title: '开票结束状态',
        dataIndex: 'invoiceStatus',
        key: 'invoiceStatus',
        render: (text, record, index) => text != null && window.ENUM.getEnum("receivingStatus", text.toString()),
    }, 
    {
        title: 'SPU编码',
        dataIndex: 'spuCode',
        key: 'spuCode',
    }, {
        title: 'SPU名称',
        dataIndex: 'spuName',
        key: 'spuName',
    }, {
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
    "6": [],
};
class PurchaseViewComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // money: 0,
            // taxMoney: 0,
            // taxMoneyTotal: 0,
            show: true,
            showMore: false,
        };
    }
    editPurchase = (orderCode) => {
        let { CanPurchaseEdit, EditModul, PurchaseDetail } = this.props;
        CanPurchaseEdit(orderCode).then(json => {
            if (json.status === 2000) {
                EditModul();
                PurchaseDetail(orderCode);
            } else {
                // message.info('该单据已锁住，不能编辑!');
            }
        })
    }
    onClick = (obj) => {
        let { PurchaseStatus, PurchaseViewData, tabRemove, PurchaseList } = this.props;
        let flag = false;
        PurchaseViewData.sourceOrderType == 1 && Array.isArray(PurchaseViewData.list) && PurchaseViewData.list.map(item => {
            if (!item.materialCode) {
                flag = true;
            }
        })
        if (flag) {
            message.warn('明细项物料信息不能为空');
            return;
        }
        if (PurchaseViewData.sourceOrderType == 1 && PurchaseViewData.pldDate == '') {
            message.warn('计划收货日期不能为空');
            return;
        }
        PurchaseStatus(obj.key, PurchaseViewData.orderCode).then(json => {
            if (json.status == 2100 || json.status == 2200 || json.status == 2300 || json.status == 2400) {
                message.success(json.message[0].msg);
                tabRemove();
                PurchaseList({ page: 1, pageSize: 10 });
                
            } else {
                message.error(json.message[0].msg);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        let { PurchaseViewData, purchaseViewLoading } = nextProps;
        let { list } = PurchaseViewData;
        // let tax = 0,
            // money = 0,
            // taxMoney = 0,
            // taxMoneyTotal = 0;
        // if (Array.isArray(list) && list.length>0){
        //     list.forEach(item => {
        //         money = money + Number(item.money);
        //         taxMoney = taxMoney + Number(item.taxMoney);
        //         taxMoneyTotal = taxMoneyTotal + Number(item.taxMoneyTotal);
        //     });
        // }
        this.setState({
            list,
            // money: money.toFixed(2),
            // taxMoney: taxMoney.toFixed(2),
            // taxMoneyTotal: taxMoneyTotal.toFixed(2),
        });
    }
    
    title = () => {
        let { money, taxMoney, taxMoneyTotal, curSymbol } = this.props.PurchaseViewData || {};
        return (
            <div className="tab-title">
                <div className="left-text">
                    <span><strong>明细详细</strong></span>
                </div>
                <div>
                    <span className="total">
                        <span className="laber">合计</span>
                        <span className="laber">金额：</span>
                        <span className="number">{curSymbol + money}</span>
                        <span className="laber">税额：</span>
                        <span className="number">{curSymbol + taxMoney}</span>
                        <span className="laber">价税合计：</span>
                        <span className="number">{curSymbol + taxMoneyTotal}</span>
                    </span>
                </div>
            </div>
        );
    }
    render() {
        let { PurchaseViewData, purchaseViewLoading } = this.props;
        let menu = (
            <Menu onClick={this.onClick}>
                {
                    (PurchaseViewData.orderStatus != undefined) && moreList[PurchaseViewData.orderStatus].map(item => {
                        if (PurchaseViewData.orderStatus == 2 && PurchaseViewData.pushdownMark == 1) {
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
            <div className="PurchaseView-wrap">
                <Spin spinning={purchaseViewLoading}>
                    <Row className="PurchaseView-title">
                        <Col span={16}>
                            <p className="order"><b>订单编号：<span style={{ marginRight: 31 }}>{ formatNullStr(PurchaseViewData.orderCode)}</span>供应商：<span>{formatNullStr(PurchaseViewData.supplierCode)}</span> | <span>{formatNullStr(PurchaseViewData.supplierName)}</span></b></p>
                            <p className="status">单据状态：<span style={{ color: '#4c80cf', paddingRight: '20px' }}>{window.ENUM.getEnum("purchaseOrderStatus", (PurchaseViewData.orderStatus || 0) + '')}</span>下推入库标记：<span style={{ color: '#f66666',paddingRight:'20px' }}>{PurchaseViewData.pushdownMark ? '已下推' : '未下推'}</span>来源单据：<span>{formatNullStr(PurchaseViewData.sourceOrderCode)}</span> | <span>{window.ENUM.getEnum("purchaseSourceOrderType", (PurchaseViewData.sourceOrderType || 0) + '')}</span></p>
                        </Col>
                        <Col span={8} style={{textAlign:'right'}}>
                            {PurchaseViewData.orderStatus == 0 || PurchaseViewData.orderStatus == 4 ?
                                <Button type="primary" onClick={() => this.editPurchase(PurchaseViewData.orderCode)}>编辑</Button>
                                :null
                            }
                            <Dropdown overlay={menu}><Button type="ghost" className="morebtn">更多操作 <Icon type="down" /></Button></Dropdown>
                        </Col>
                        <a className="show-more-info" href="#" onClick={() => {
                            this.setState({ show: !show })
                        }}>{show ? '收起' : '展开'}</a>
                    </Row>
                    <Row className="PurchaseView-info" style={{ display: this.state.show ? `block` : `none` }}>
                        <Col span={8}>
                            <ul className="base-info">
                                <li className="header"><strong>基本信息</strong></li>
                                <li><span>供应商名称：</span>{formatNullStr(PurchaseViewData.supplierName)}</li>
                                <li><span>订单日期：</span>{PurchaseViewData.orderDate && PurchaseViewData.orderDate.replace(/\-/g, '/') || formatNullStr(PurchaseViewData.orderDate)}</li>
                                <li><span>联系人：</span>{formatNullStr(PurchaseViewData.contactsName)}</li>
                                <li><span>联系电话：</span>{formatNullStr(PurchaseViewData.contactsTel)}</li>
                                <li><span>发货地址：</span>{formatNullStr(PurchaseViewData.shippingAddressName)}</li>
                                <li><span>详细地址：</span>{formatNullStr(PurchaseViewData.detailAddress)}</li>
                            </ul>
                        </Col>
                        <Col span={8}>
                            <ul className="receive-info">
                                <li className="header"><strong>收货信息</strong></li>
                                <li><span>计划收货日期：</span>{PurchaseViewData.pldDate && PurchaseViewData.pldDate.replace(/\-/g, '/') || formatNullStr(PurchaseViewData.pldDate)}</li>
                                <li><span>采购组织：</span>{formatNullStr(PurchaseViewData.purchaseOrgName)}</li>
                                <li><span>采购员：</span>{formatNullStr(PurchaseViewData.buyerName)}</li>
                                <li><span>联系电话：</span>{formatNullStr(PurchaseViewData.buyerTel)}</li>
                                <li><span>收货站点：</span>{formatNullStr(PurchaseViewData.siteName)}</li>
                                <li><span>详细地址：</span><div className="address"><TooltipComp attr={{ text: formatNullStr(PurchaseViewData.siteAddressDetl), wid: '97%' }} /></div></li>
                            </ul>
                        </Col>
                        <Col span={8}>
                            <ul className="other-info">
                                <li className="header"><strong>其他信息</strong></li>
                                <li><span>币种：</span>{formatNullStr(PurchaseViewData.curName)}</li>
                                <li><span>成本中心：</span>{formatNullStr(PurchaseViewData.costCenterName)}</li>
                                <li><span>付款条件：</span>{formatNullStr(PurchaseViewData.payMode)}</li>
                                <li><span>是否含税：</span>{window.ENUM.getEnum("isTax", (PurchaseViewData.isTax || 0).toString())}&nbsp;      (默认17%)</li>
                                <li><span>备注：</span><div className="remarks"><TooltipComp attr={{ text: formatNullStr(PurchaseViewData.remarks), wid: '97%' }} /></div></li>
                            </ul>  
                        </Col>
                        <a className="show-more-info" href="#" onClick={() => this.setState({ showMore: !showMore })}>{this.state.showMore ? '收起更多隐藏信息' : '展开更多隐藏信息'}</a>
                    </Row>
                    <Row className="PurchaseView-remark" style={{ display: this.state.showMore ? `block` : `none` }}>
                        <Col span={8} className="bayer-info">
                            <div className="header">买家留言</div>
                            <div dangerouslySetInnerHTML={{ __html: formatNullStr(PurchaseViewData.insideRemarks) }}></div>
                        </Col>
                        <Col span={16} className="shop-info">
                            <div className="header">电商留言</div>
                            <div dangerouslySetInnerHTML={{__html: formatNullStr(PurchaseViewData.externalRemarks)}}></div>
                        </Col>
                    </Row>
                    <div className='PurchaseView-table'>
                        <Table
                            dataSource={PurchaseViewData.list}
                            columns={columns}
                            rowKey={"id"}
                            scroll={{ x: 2800 }}
                            pagination={{
                                total: PurchaseViewData.list ? PurchaseViewData.list.length : 0,
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
export default PurchaseViewComp;