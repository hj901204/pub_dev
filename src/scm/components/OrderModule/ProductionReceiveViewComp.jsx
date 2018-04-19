import React, { Component } from "react";
import { Row, Col, Spin, Table, Input, Button, Pagination, Menu, Dropdown,Icon } from '../../../base/components/AntdComp';
const columns = [
    {
        title: '行号',
        dataIndex: 'line',
        key: 'line',
    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
    }, {
        title: '物料规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
    }, {
        title: '标准用料数量',
        dataIndex: 'materialNumber',
        key: 'materialNumber',
    }, {
        title: '可申领数量',
        dataIndex: 'mayApplyNumber',
        key: 'mayApplyNumber',
    }, {
        title: '单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
    }, {
        title: '申领数量',
        dataIndex: 'applyNumber',
        key: 'applyNumber',
    },
    {
        title: '已领数量',
        dataIndex: 'applyMaterialNumber',
        key: 'applyMaterialNumber',
    }, {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    }
];
let status = {
    submit: "提交",
    repeal: "撤回",
    // lock: "锁定",
    // unlock: "解锁",
    // close: "关闭",
    reject: "驳回",
    audit: "审批"
};
//orderStatus   0:保存 1:提交 2:批准 3:关闭 4:驳回 5:锁定 6:撤回
//orderSource   1:自建 2:MPS建议 3:外部系统
let moreList = {
    "0": ["submit",],
    "1": ["repeal", "reject", "audit"],
    "2": [],
    "3": [],
    "4": ["submit"],
    "5": [],
    "6": ["submit",],
};
class ProductionReceiveViewComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
            info: true,
        };
    }

    editProducRec = (code) => {
        let { CanPorducRecEdit,EditModul, ViewEditCode, GetSelectData } = this.props;
        CanPorducRecEdit(code).then(json => {
            if (json.status === 2000) {
                EditModul();
                ViewEditCode(code);
                GetSelectData('edit');
            }
        })
    }
    onClick = (obj) => {
        let { ProRecStatus, proReceiveViewData } = this.props;
        ProRecStatus(obj.key, proReceiveViewData.requisitionCode);
    }
    render() {
        let { proReceiveViewData, proReceiveLoading } = this.props,
            Record = proReceiveViewData || null;
        let itemlist = moreList[proReceiveViewData.billStatus] || [];
        let menu = (
            <Menu onClick={this.onClick}>
                {
                    itemlist.map(item =>
                        < Menu.Item key={item}> {status[item]}</Menu.Item>)
                }
            </Menu>
        );
        return (
            <div className="ProductionReturnView-Box">
                <Spin spinning={proReceiveLoading}>
                    <div className="ProductionReturnView-title">
                        <Row>
                            <Col span={12}>
                                <p className="ProductionReturnView-order"><b>信息总览：<span style={{ marginRight: 31 }}>{Record.requisitionCode}</span></b></p>
                                <p className="ProductionReturnView-status">生产领料单单状态：<span>{window.ENUM.getEnum("billStatus", (Record.billStatus || 0) + '')}</span></p>
                            </Col>
                            <Col span={12} className="ProductionReturnView-btns">
                                {proReceiveViewData.billStatus == '0' || proReceiveViewData.billStatus == '4' || proReceiveViewData.billStatus == '6' ? <Button type="primary" className="ProductionReturnView-updatebtn" onClick={() => this.editProducRec(proReceiveViewData.requisitionCode)}>编辑</Button> : null}
                                <Dropdown overlay={menu}>
                                    <Button type="default" className="ProductionReturnView-morebtn" >更多操作 <Icon type="down" /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <div className="more-informations">
                            <a href="#" onClick={() => {
                                this.setState({ show: !this.state.show })
                            }}>{this.state.show ? '收起' : '展开'}
                            </a>
                        </div>
                    </div>

                    <div style={{ display: this.state.show ? `block` : `none` }}>
                        <div className="ProductionReturnView-info">
                            <div className="ProductionReturnView-informations">
                                <Row>
                                    <Col span={8}>
                                        <ul>
                                            <li className="ProductionReturnView-infotitle">基本信息</li>
                                            <li><span>领料申请单：</span>{Record.requisitionCode}</li>
                                            <li><span>类型：</span>{window.ENUM.getEnum("type", (Record.type || 1) + '')}</li>
                                            <li><span>单据来源：</span>{window.ENUM.getEnum("pickingSource", (Record.pickingSource || 1) + '')}</li>
                                            <li><span>源单编号：</span>{Record.productionOrderCode}</li>
                                            <li><span>领料组织：</span>{Record.deptName}</li>
                                            <li><span>申请人：</span>{Record.empName}</li>
                                        </ul>
                                    </Col>
                                    <Col span={8}>
                                        <ul className="ProductionReturnView-ulborder">
                                            <li></li>
                                            <li><span>计划领料时间：</span>{Record.plannedPickingDate}</li>
                                            <li><span>创建人：</span>{Record.createByName}</li>
                                            <li><span>创建时间：</span>{Record.createDate}</li>
                                            <li><span>更新人：</span>{Record.updateByName}</li>
                                            <li><span>更新时间：</span>{Record.updateDate}</li>
                                        </ul>
                                    </Col>
                                    <Col span={8}>
                                        <ul>
                                            <li className="ProductionReturnView-infotitle">状态信息</li>
                                            <li><span>单据状态：</span>{window.ENUM.getEnum("billStatus", (Record.billStatus || 0) + '')}</li>
                                            <li><span>领料状态：</span>{window.ENUM.getEnum("pickingStatus", (Record.pickingStatus || 1) + '')}</li>
                                        </ul>
                                    </Col>
                                </Row>
                                <div className="more-remark">
                                    <a href="#" onClick={() => {
                                        this.setState({ info: !this.state.info })
                                    }}>{this.state.info ? '隐藏更多信息' : '显示更多信息'}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="ProductionReturnView-remark" style={{ display: this.state.info ? `block` : `none` }}>
                            <Row>
                                <Col span={24}>
                                    <p>订单备注：{Record.remarks}</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="ProductionReturnView-detailinfo" >
                        <div className="ProductionReturnView-infotitle">
                            <Row>
                                <Col span={24}>
                                    <b>明细信息</b>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Table dataSource={Record.list || null} columns={columns}
                                rowKey={"line"}
                                pagination={{
                                    total: Record.list ? Record.list.length : 0,
                                    showTotal: (total) => `总共 ${total} 条记录`,
                                    pageSizeOptions: ['10', '15', '20', '50'],
                                    showSizeChanger: true,
                                }}
                            />
                        </div>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default ProductionReceiveViewComp;