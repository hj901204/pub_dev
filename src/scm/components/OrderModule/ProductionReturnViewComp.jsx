//生产退料申请单
import React, { Component } from "react";
import { Row, Col, Spin, Table, Input, Button, Pagination, Menu, Dropdown,Icon } from '../../../base/components/AntdComp';
import { formatNullStr } from '../../../base/consts/Utils';
import TooltipComp from "../../../base/components/TooltipComp";
const columns = [
    {
        title: '行号',
        dataIndex: 'line',
        key: 'line',
        width:52,
        render: (text, record, index) => <div style={{textAlign:'center'}}>{text}</div>,
        className:"ProRet_title",
        fixed: 'left'


    }, {
        title: '物料编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
        width:151,
        fixed: 'left'
    }, {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
        render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 86, placement: 'left' }} />,
        fixed: 'left',
        width:103

    }, {
        title: '物料规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
        render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 86, placement: 'left' }} />,
    }, {
        title: '可申退数量',
        dataIndex: 'mayReturnNumber',
        key: 'mayReturnNumber',
    }, {
        title: '计量单位',
        dataIndex: 'measureUnitName',
        key: 'measureUnitName',
        
    }, {
        title: '申退数量',
        dataIndex: 'returnNumber',
        key: 'returnNumber',
    }, {
        title: '已退数量',
        dataIndex: 'backMaterialNumber',
        key: 'backMaterialNumber',
    }, {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        render: (text, record, index) => <TooltipComp attr={{ text: text, wid: 134, placement: 'left' }} />,
    }];

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
class ProductionReturnViewComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            show:true,
            info:true,
        };
    }

    editProducRetn = (code) => {
        let {ProEdit,EditProductionReturnCont,resetNull,GetProductionReturnDetail,ProductionOrderList,GetDepartment}=this.props;
        ProEdit({ "returnCode": code }).then(json=>{
            if (json.status === 2000) {
                EditProductionReturnCont();
                resetNull(false);
                GetProductionReturnDetail({ "returnCode": code });
                ProductionOrderList({ page: 1, pageSize: 10 }, 'edit');
                GetDepartment({ "orgType": 5, "status": 1, page: 1, pageSize: 10 }, 'edit');
            }
        })
    }
    onClick = (obj) => {
        let { ProRetnStatus, proReturnViewData } = this.props;
        ProRetnStatus(obj.key, proReturnViewData.returnCode);
    }
    render() {
        let { proReturnViewData, proReturnLoading } = this.props;
        let itemlist = moreList[proReturnViewData.billStatus] || [];
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
                <Spin spinning={proReturnLoading}>
                    <div className="ProductionReturnView-title">
                        <Row>
                            <Col span={12}>
                                <p className="ProductionReturnView-order"><b>信息总览：<span style={{ marginRight: 31 }}>{proReturnViewData.returnCode}</span></b></p>
                                <p className="ProductionReturnView-status">生产退料单状态：<span>{proReturnViewData.billStatus?window.ENUM.getEnum("returnBillStatus", (proReturnViewData.billStatus) + ''):formatNullStr(proReturnViewData.billStatus)}</span></p>
                            </Col>
                            <Col span={12} className="ProductionReturnView-btns">
                                {proReturnViewData.billStatus == '0' || proReturnViewData.billStatus == '4' || proReturnViewData.billStatus == '6' ? <Button type="primary" className="ProductionReturnView-updatebtn" onClick={() => this.editProducRetn(proReturnViewData.returnCode)}><i className="c2mfont c2m-bianji1"></i>编辑</Button> : null}
                                <Dropdown overlay={menu}>
                                    <Button type="default" className="ProductionReturnView-morebtn" >更多操作 <Icon type="down" /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <div className="more-informations">
                            <a  href="#" onClick={() => {
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
                                        <ul >
                                            <li className="ProductionReturnView-infotitle">基本信息</li>
                                            <li><span>退料申请单：</span> {formatNullStr(proReturnViewData.returnCode)}</li>
                                            <li><span>类型：</span>{proReturnViewData.type?window.ENUM.getEnum("returnType", (proReturnViewData.type || 1) + ''):formatNullStr(proReturnViewData.type)}</li>
                                            <li><span>源单编号：</span>{formatNullStr(proReturnViewData.productionOrderCode)}</li>
                                            <li><span>退料组织：</span>{formatNullStr(proReturnViewData.deptName)}</li>
                                            <li><span>申请人：</span>{formatNullStr(proReturnViewData.empName)}</li>
                                        </ul>
                                    </Col>
                                    <Col span={8}>
                                        <ul className="ProductionReturnView-ulborder">
                                            <li className="ProductionReturnView-infotitle"></li>
                                            <li><span>计划退料时间：</span>{formatNullStr(proReturnViewData.plannedReturnDate)}</li>
                                            <li><span>创建人：</span>{formatNullStr(proReturnViewData.createByName)}</li>
                                            <li><span>创建时间：</span>{formatNullStr(proReturnViewData.createDate)}</li>
                                            <li><span>更新人：</span>{formatNullStr(proReturnViewData.updateByName)}</li>
                                            <li><span>更新时间：</span>{formatNullStr(proReturnViewData.updateDate)}</li>
                                        </ul>
                                    </Col>
                                    <Col span={8}>
                                        <ul>
                                            <li className="ProductionReturnView-infotitle">状态信息</li>
                                            <li><span>单据状态：</span>{proReturnViewData.billStatus?window.ENUM.getEnum("returnBillStatus", proReturnViewData.billStatus+''):formatNullStr(proReturnViewData.billStatus+'')}</li>
                                            <li><span>退料状态：</span>{window.ENUM.getEnum("returnStatus", proReturnViewData.returnStatus+'')}</li>
                                        </ul>
                                    </Col>
                                </Row>
                                <div className="more-remark">
                                    <a  href="#" onClick={() => {
                                        this.setState({ info: !this.state.info })
                                    }}>{this.state.info ? '隐藏更多信息' : '显示更多信息'}
                                        </a>
                                </div>
                            
                            </div>
                        </div>
                        <div className="ProductionReturnView-remark" style={{ display: this.state.info ? `block` : `none` }}>
                            <Row>
                                <Col span={24}>
                                    <p>订单备注：{proReturnViewData.remarks}</p>
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
                        <div >
                            <Table dataSource={proReturnViewData.list || null} columns={columns}
                                rowKey={"materialCode"}
                                scroll={{ x: 1500 }}
                                pagination={{
                                    total: proReturnViewData.list ? proReturnViewData.list.length : 0,
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
export default ProductionReturnViewComp;