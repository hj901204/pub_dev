import React, { Component } from 'react'
import MTable from '../../../base/components/TableComp';
import { store } from "../../data/StoreConfig";
import OtherWareHousePageAct from '../../actions/InventoryModule/OtherWareHousePageAct';
import { Spin, Row, Col } from '../../../base/components/AntdComp'
import TooltipComp from '../../../base/components/TooltipComp'
import { formatNullStr } from "../../../base/consts/Utils";
let columns = [{
    title: '序号',
    dataIndex: 'lineNum',
    key: 'lineNum',
    width:50,
    className:'receipt-list-linenum',
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (txt, record, index) => record.status ? window.ENUM.getEnum("orderStatus", record.status) : ''
}, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width:155,
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
}, {
    title: '计划数量',
    dataIndex: 'planAmount',
    key: 'planAmount',
}, {
    title: '基本单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
}, {
    title: '预收货数量',
    dataIndex: 'beforehandDeliveryAmount',
    key: 'beforehandDeliveryAmount',
}, {
    title: '已收货数量',
    dataIndex: 'receivedAmount',
    key: 'receivedAmount',
}, {
    title: '未清数量',
    dataIndex: 'outstandingAmount',
    key: 'outstandingAmount',
},

];

class ReceiptDetailsComp extends Component {
    constructor(props, context) {
        super(props, context);
         this.state = {
            text: "收起",
            infoClassName: "purchase-eidt-info-show",
            count: 1,
            index: 0,
        }
    }
    tablePaging = (current) => {
        store.dispatch(OtherWareHousePageAct.takeOrderDetailsMaterialPm(typeof current == 'number' ? Object.assign(this.props.newState.search, { page: current }) : Object.assign(this.props.newState.search, current)));
    }
    statusHandler = (status) => {
        switch (status) {
            case 1:
            case 3:  //保存和预收货完成（蓝色）
                return <a style={{ color: '#4C80CF' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            case 2:
            case 4: //部分预收货和部分收货（橙色）
                return <a style={{ color: '#F6A623' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            case 5: // 收货完成（绿色）
                return <a style={{ color: '#417505' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            case 6: // 关闭  （红色）：D0011B
                return <a style={{ color: '#D0011B' }}>{window.ENUM.getEnum("orderStatus", status)}</a>
                break;
            default:
                return '--'
                break;
        }
    }
    infoHandle = () => {
        this.setState({
            count: this.state.count + 1,
        })
        if (this.state.count % 2 == 0) {
            this.setState({
                text: "收起",
                infoClassName: "purchase-eidt-info-show",
            })
        } else {
            this.setState({
                text: "展开",
                infoClassName: "purchase-eidt-info-hide",
            })
        }
    }
    render() {
        let {newState, tablePaging, materialLoading, ...props} = this.props;
        let info = newState.takeOrderDetailsPm || '';
        let receoptList = newState.takeOrderDetailsListPm.list || '';
        return (
            <div className="receipt-details-box">
                <Spin spinning={this.props.newState.DetailsPmLoading}>
                    <div className="receipt-info">
                        <p>信息总览：<span>{formatNullStr(info.orderCode)}</span></p>
                        <div className="receipt-info-list">
                            <p>状态：<span> {
                                this.statusHandler(formatNullStr(info.status))
                            }</span></p>
                            <p>收货站点：<span>{formatNullStr(info.deliverySiteName)}</span></p>
                        </div>
                    </div>
                    <div className="receipt-bold-line" onClick={this.infoHandle}>{this.state.text}</div>
                    <div className="receipt-details-info-list">
                        <Row className={this.state.infoClassName}>
                            <Col span={6}>
                                <div className="receipt-base-info other-receipt-base-info" >
                                    <p><span className="receipt-size-lable">其他入库类型：</span><span>{formatNullStr(info.busName)}</span></p>
                                    <p><span className="receipt-size-lable">创建人：</span><span>{formatNullStr(info.createByName)}</span></p>
                                    <p><span className="receipt-size-lable">创建时间：</span><span>{formatNullStr(info.createDate)}</span></p>
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="receipt-other-info other-receipt-other-info">
                                    <p><span className="receipt-size-lable">备注：</span><span className="receipt-size-lable-remarks">{formatNullStr(info.remarks)}</span></p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="receipt-materiel-list">
                        <h3>物料列表</h3>
                        <MTable
                            cols={columns}
                            rowKey={"id"}
                            dataSource={newState.dataSource}
                            loading={newState.materialLoading}
                            paging={newState.paging}
                            pageOnChange={this.tablePaging}
                            {...props}
                        />
                    </div>
                    <div className="receipt-receiving-record">
                        <h3>收货记录</h3>
                        <div className="receipt-record-list">
                            {receoptList == '' ? '' :
                                receoptList.map((option, index) => {
                                    return (<p key={index + ""} value={option + ""}><span className="receipt-record-time">{option.updateDate}</span><span>{option.createByName}收货了批次为{option.batchNum == "" ? '空' : option.batchNum}的{option.materialName}[{option.materialCode}]{option.materialAmount}{option.materialUnitName}，收货仓位为{option.siteName}的{option.name}。</span></p>)
                                })
                            }
                        </div>
                    </div>
                </Spin>
            </div>

        )
    }
}

export default ReceiptDetailsComp



