//生产订单
import React, { Component } from "react";
import { Row, Col, Spin, Table, Input, Button, Pagination, Dropdown, Menu, message, Icon } from '../../../base/components/AntdComp';
import { formatNullStr } from '../../../base/consts/Utils';
let statusColor = ['#4C80CF', '#F6A623', '#417505', '#D0011B', '#F6A623', '#D0011B','#F6A623']
let status = {
    submit: "提交",
    repeal: "撤回",
    lock: "锁定",
    unlock: "解锁",
    close: "关闭",
    pushDown: "下推领料申请单"
};
//orderStatus   0:保存 1:提交 2:批准 3:关闭 4:驳回 5:锁定 6:撤回
//orderSource   1:自建 2:MPS建议 3:外部系统

let dis = {
    submit:[1,2,3,5],
    repeal: [0,2,3,4,5,6],
    lock: [0,1,3,4,5,6],
    unlock: [0,1,2,3,4,6],
    close: [3],
    pushDown: [0,1,3,4,5,6]
};
// let moreList = {
//     "0": ["submit",],
//     "1": ["repeal"],
//     "2": ["lock", "close"],
//     "3": [],
//     "4": ["submit"],
//     "5": ["unlock",],
//     "6": ["submit",],
// };
class ProductionViewComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    editProduction = (code) => {
        //this.props.resetRecord(false);
        this.props.EditProductionCont();
        this.props.EditProOrderDetail({ "orderCode": code });
        this.props.getSiteAll({ "isSog": 1, "status": 1 });
        this.props.getDepartment({ "orgType": "5", "orgCode": "", "orgName": "", "page": 1, "pageSize": 10 }, 'edit');
    }
    onClick = (obj) => {
        let { ProductionStatus, ProViewData } = this.props;
        ProductionStatus(obj.key, ProViewData.orderCode).then(json => {
            if (json) {
                for (let [key, val] of Object.entries(status)) {
                    if (key == obj.key) {
                        message.success(val + '成功！');
                    }
                }
            }
            
        });
    }

    getBtn=(dis)=>{
        let { ProductionStatus, ProViewData } = this.props;
        let btns=[];
        for(let [key,val] of Object.entries(dis)){
            if(val.includes(ProViewData.orderStatus)){
                btns.push(< Menu.Item key={key} disabled> {status[key]}</Menu.Item>) 
            }else{
                btns.push(< Menu.Item key={key} > {status[key]}</Menu.Item>)
            }
        }
        return btns;
    }

    render() {
        let { ProViewData, proOrdViewLoading } = this.props;
        //let itemlist = moreList[ProViewData.orderStatus] || [];
        let menu = (
            <Menu onClick={this.onClick}>
                {
                    this.getBtn(dis)
                }
            </Menu>
        );
        return (
            <div className="Production-detail">
                <Spin spinning={proOrdViewLoading}>
                    <div className="PurchaseView-title">
                        <Row>
                            <Col span={12}>
                                <p className="PurchaseView-order">
                                    <b>生产订单详情：<span style={{ marginRight: 31 }}>{formatNullStr(ProViewData.orderCode)}</span></b>
                                </p>
                                <p className="PurchaseView-status">
                                    生产订单状态：<span style={{ marginRight: '10px', color: `${statusColor[Number(ProViewData.orderStatus)]}`}}>{window.ENUM.getEnum("ProOrderStatus", (ProViewData.orderStatus || 0) + '')}</span>
                                    产出品：<span>{formatNullStr(ProViewData.productCode)}{`[${formatNullStr(ProViewData.productName)}]`}</span>
                                    {/*计划数量：<span>{ProViewData.productionNumber}{ProViewData.measureUnitName}</span>*/}
                                </p>
                            </Col>
                            <Col span={12} className="PurchaseView-btns">
                                {ProViewData.orderStatus == '0' || ProViewData.orderStatus == '4' ? <Button type="primary" className="PurchaseView-updatebtn" onClick={() => this.editProduction(ProViewData.orderCode)}>
                                    <i className="c2mfont c2m-bianji1" style={{marginRight:'6px',fontSize:'10px'}}></i>
                                    编辑</Button> : null}
                                <Dropdown overlay={menu}>
                                    <Button type="primary" className="PurchaseView-morebtn" >更多操作 <Icon type="down" /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                    <div className="PurchaseView-info">
                        <div className="PurchaseView-informations ProductionView-informations">
                            <Row>
                                <Col span={8}>
                                    <ul className="PurchaseView-ulborder productionView-ul">
                                        <li className="ProductionView-infonum"><b>基本信息</b></li>
                                        <li><span>订单类型：</span>{window.ENUM.getEnum("ProOrderType", (ProViewData.orderType || 1) + '')}</li>
                                        <li><span>单据来源：</span>{window.ENUM.getEnum("proOrderSource", (ProViewData.orderSource || 1) + '')}</li>
                                        <li><span>源单编号：</span>{formatNullStr(ProViewData.sourceCode)+'-'+formatNullStr(ProViewData.sourceLineNumber)}</li>
                                        <li><span>产品编码：</span>{formatNullStr(ProViewData.productCode)}{`[${formatNullStr(ProViewData.productName)}]`}</li>
                                        <li><span>BOM编号：</span>{formatNullStr(ProViewData.bomCode) + '-' + formatNullStr(ProViewData.bomVersion)}</li>
                                        <li><span>工艺路线：</span>{formatNullStr(ProViewData.processFlowCode)}</li>
                                        <li><span>生产数量：</span>{formatNullStr(ProViewData.productionNumber)}</li>
                                        {/*{ProViewData.measureUnitName}*/}
                                        <li><span>生产组织：</span>{formatNullStr(ProViewData.productionOrg)}{`[${formatNullStr(ProViewData.productionOrgName)}]`}</li>
                                        <li><span>计划开工时间：</span>{formatNullStr(ProViewData.plannedStartDate)}</li>
                                        <li><span>计划完工时间：</span>{formatNullStr(ProViewData.plannedEndDate)}</li>
                                    </ul>
                                </Col>
                                <Col span={8}>
                                    <ul className="PurchaseView-ulborder productionView-ul">
                                        <li className="ProductionView-infonum"><b>状态信息</b></li>
                                        <li><span>单据状态：</span>{window.ENUM.getEnum("ProOrderStatus", (ProViewData.orderStatus || 0) + '')}</li>
                                        <li><span>生产状态：</span>{window.ENUM.getEnum("productionStatus", (ProViewData.productionStatus || 0) + '')}</li>
                                        <li><span>是否固定：</span>{ProViewData.plannedEndDate ? "是" : "否"}</li>
                                        <li><span>优先级：</span>{window.ENUM.getEnum("priority", (ProViewData.priority || 1) + '')}</li>
                                        <li className="ProductionView-infonum"><b>数量信息</b></li>
                                        <li><span>计划生产数量：</span>{formatNullStr(ProViewData.productionNumber)}</li>
                                        {/*{ProViewData.measureUnitName || ''}*/}
                                        <li><span>已开工数量：</span>{formatNullStr(ProViewData.startNumber)}</li>
                                        {/*{ProViewData.measureUnitName || ''}*/}
                                        <li><span>已完工数量：</span>{formatNullStr(ProViewData.endNumber)}</li>
                                        {/*{ProViewData.measureUnitName || ''}*/}
                                        <li><span>未清数量：</span>{formatNullStr(ProViewData.outstandingNumber)}</li>
                                        {/*{ProViewData.measureUnitName || ''}*/}
                                    </ul>
                                </Col>
                                <Col span={8}>
                                    <ul className="productionView-ul">
                                        <li className="ProductionView-infonum"><b>仓储信息</b></li>
                                        <li><span>预设仓库：</span>{formatNullStr(ProViewData.presetDepot)}{`[${formatNullStr(ProViewData.presetDepotName)}]`}</li>
                                        <li><span>仓位：</span>{formatNullStr(ProViewData.presetPosition)}{`[${formatNullStr(ProViewData.presetPositionName)}]`}</li>
                                        <li><span>计划入库时间：</span>{formatNullStr(ProViewData.presetStorageDate)}</li>
                                        <li><span>实际入库仓库：</span>{formatNullStr(ProViewData.actualDepot)}{`[${formatNullStr(ProViewData.actualDepotName)}]`}</li>
                                        <li><span>仓位：</span>{formatNullStr(ProViewData.actualPosition)}{`[${formatNullStr(ProViewData.actualPositionName)}]`}</li>
                                        <li><span>实际入库时间：</span>{formatNullStr(ProViewData.actualStorageDate)}</li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="PurchaseView-remark">
                        <Row>
                            <Col span={24}>
                                <p className="ProductionView-remark" style={{ wordBreak: 'break-all' }}>订单备注：{formatNullStr(ProViewData.remarks)}</p>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default ProductionViewComp;
