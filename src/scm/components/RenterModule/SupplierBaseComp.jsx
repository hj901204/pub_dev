import React, { Component } from "react";
import { Row, Modal, Col, Spin, Table, Input, Icon, Button, Tabs, Popconfirm, Checkbox, Radio } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import ModalComp from '../../../base/components/ModalComp';
import { formatNullStr } from '../../../base/consts/Utils';
import TooltipComp from '../../../base/components/TooltipComp';
const CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;

class DetailModal extends ModalComp {

    getComp = () => {
        let { company } = this.props;
        return <div style={{ width: '93%' }}>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">公司全称：</Col>
                <Col span={5}>{company.companyName}</Col>
                <Col span={4} offset={3} className="conventional-right">经营类型：</Col>
                <Col span={5}>{company.businessTypeName}</Col>
            </Row>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">公司简称：</Col>
                <Col span={5}>{company.companyAbbr}</Col>
                <Col span={4} offset={3} className="conventional-right">公司性质：</Col>
                <Col span={5}>{company.companyTypeName}</Col>
            </Row>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">法人代表：</Col>
                <Col span={5}>{company.corporation}</Col>
                <Col span={4} offset={3} className="conventional-right">公司规模：</Col>
                <Col span={5}>{company.companyScaleName}</Col>
            </Row>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">行业：</Col>
                <Col span={5}>{company.tradeTypeName}</Col>
                <Col span={4} offset={3} className="conventional-right">公司邮箱：</Col>
                <Col span={5}>{company.email}</Col>
            </Row>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">创立日期：</Col>
                <Col span={5}>{company.creationDate}</Col>
                <Col span={4} offset={3} className="conventional-right">公司电话：</Col>
                <Col span={5}>{company.tel}</Col>
            </Row>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">公司网址：</Col>
                <Col span={5}>{company.website}</Col>
                <Col span={4} offset={3} className="conventional-right">公司传真：</Col>
                <Col span={5}>{company.fax}</Col>
            </Row>
            <Row>
                <Col span={7} style={{ textAlign: 'right' }} className="conventional-right">统一社会信用代码：</Col>
                <Col span={5}>{company.companyUscc}</Col>
            </Row>
        </div>
    }
}
const statusColor = ['#4C80CF', '#417505', '#D0011B']
class SupplierBaseComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.statusParam = {
            'supplierCode': '',
            'langCode': '',
            'status': '',
            show: false,
        }
    }
    state = { visible: false, }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    hidden_visible = (value) => {
        this.props.hidden_visible(!value);
    }

    changeStatus = (code, status, langCode) => {
        if (status == 2 || status == 0) {
            status = 1
        } else {
            status = 2
        }
        this.statusParam = {
            ...this.statusParam,
            supplierCode: code,
            langCode: langCode,
            status: status
        }
        this.props.supplierStatus(this.statusParam)
            .then(json => {
                if (json.status == 2000) {
                    console.log('启用/禁用供应商成功！');
                    this.props.SupplierBaseLoading(true);
                    this.props.getEditData({ 'supplierCode': code, "langCode": langCode }, 'detail');
                }
            })
    }

    editSupplier = (code, langCode, deptCode) => {
        this.props.EditModul();
        this.props.getEditData({ "supplierCode": code, "langCode": langCode }, 'edit', 'supplierViewCont').then(data => {
            //结算方式 C014，付款条件 C013，行业 C015，经营类型 C019，公司性质 C018，公司规模 C016, 发票类型 C021
            let param = [{ "subCode": "C014", "catCode": data.settlementCode },
            { "subCode": "C013", "catCode": data.paymentCode },
            { "subCode": "C015", "catCode": data.scmBp.tradeTypeCode },
            { "subCode": "C019", "catCode": data.scmBp.businessTypeCode },
            { "subCode": "C018", "catCode": data.scmBp.companyTypeCode },
            { "subCode": "C016", "catCode": data.scmBp.companyScaleCode },
            { "subCode": "C021", "catCode": data.invoiceTypeCode }
            ]
            param.map((item) => {
                this.props.getSubjectList({ ...item, "status": 1, "page": 1, "pageSize": 10 });
            });
            this.props.getDept({ "orgCode": data.deptCode, "orgType": 2, "status": 1, "page": 1, "pageSize": 10 });
            if (data.deptCode) {
                this.props.getEmployeesList({ "deptCode": data.deptCode, "employeeCode": data.empCode, "page": 1, "pageSize": 10 });
            }
            this.props.getBusinessPartnerData({
                "bpCode": data.receiveOrgCode,
                "page": "1",
                "pageSize": "10"
            });
            this.props.getCurrencyList({
                "curCode": data.currencyCode,
                "page": "1",
                "pageSize": "10"
            })
        });
    }

    isNullObject = (obj) => {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                return true;  //有自有属性或方法，返回false
            }
        }
        return false;  //没有自有属性或方法，返回true，该对象是空对象
    }

    render() {
        const { hiddenVisible, supplierBaseSource, supplierBaseLoading, ...props } = this.props;
        let scmBp = supplierBaseSource.scmBp || {};
        let supplierStauts = this.isNullObject(supplierBaseSource) ? window.ENUM.getEnum("supplierStauts", supplierBaseSource.status + '') : '';
        return (
            <div className="Supplier-BaseInfo">
                <Spin spinning={supplierBaseLoading}>
                    <div className="Supplier-Title">
                        <div style={{ width: '85%', float: 'left' }}>
                            <div className="Supplier-BigTitle">
                                <span>供应商：{supplierBaseSource.supplierCode} | {supplierBaseSource.supplierFull}
                                    {/*{supplierBaseSource.company?
                                    <a onClick={this.showModal}>{supplierBaseSource.supplierFull}</a> : <span>{supplierBaseSource.supplierFull}</span>}
                                    <DetailModal
                                        visible={this.state.visible}
                                        title="公司详情"
                                        handleCancel={() => this.setState({ visible: false })}
                                        handleSubmit={() => this.setState({ visible: false })}
                                        company={supplierBaseSource.company || ""}
                                    >
                                        
                                    </DetailModal>*/}
                                </span>
                            </div>
                            <div className="Supplier-SmallTitle">状态：<span style={{ color: `${statusColor[Number(supplierStauts)]}` }}>{supplierStauts}</span> &nbsp;
                                {/*经营类型：{scmBp.tradeTypeName} &nbsp;网址：<a href={scmBp.website} target="blank">{scmBp.website}</a> &nbsp;电话：{scmBp.tel} &nbsp;邮箱：<a href={'mailto:' + scmBp.email}>{scmBp.email}</a>*/}
                            </div>
                        </div>
                        <div style={{ height: '97px', lineHeight: '97px' }}>
                            <Button type="primary" style={{ marginRight: '10px', width: 72, height: 30 }} onClick={() => this.editSupplier(supplierBaseSource.supplierCode, supplierBaseSource.langCode, supplierBaseSource.deptCode)} ><i className='c2mfont c2m-bianji1' style={{ fontSize: 10, marginRight: 6 }} />编辑</Button>
                            <Popconfirm title={
                                <div>
                                    <h5>确认要{supplierBaseSource.status == 2 || supplierBaseSource.status == 0 ? '启用' : '禁用'}当前供应商吗？</h5>
                                    {/*<p>{T.DELSUPPLIER_OK}</p>*/}
                                </div>
                            }
                                onConfirm={() => this.changeStatus(supplierBaseSource.supplierCode, supplierBaseSource.status, scmBp.langCode)}
                            >
                                <Button type="primary" style={{ width: 72, height: 30 }}>{supplierBaseSource.status == 2 || 0 ? <i className='c2mfont c2m-qiyongcopy' style={{ fontSize: 10, marginRight: 6 }} /> : <i className='c2mfont c2m-jinyong1' style={{ fontSize: 10, marginRight: 6 }} />}
                                    {supplierBaseSource.status == 2 || 0 ? '启用' : '禁用'}</Button>
                            </Popconfirm>

                        </div>
                    </div>
                    <div className="Supplier-conventionalBase">
                        <Row>
                            <Col span={8} className='conventional-part'>
                                <Row>
                                    <Col className="conventional-title">常规</Col>
                                </Row>
                                <Row>
                                    <Col span={5} className="conventional-right">统一社会信用代码：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.uscc)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={5} className="conventional-right">供应商全称：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.supplierFull)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={5} className="conventional-right">供应商简称：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.supplierAbt)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={5} className="conventional-right">主语言：</Col>
                                    <Col span={8}><span>{window.ENUM.getEnum("language", scmBp.langCode || 'ZH')}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={5} className="conventional-right">描述：</Col>
                                    <Col span={18}><span><TooltipComp attr={{ text: supplierBaseSource.supplierDesc, wid: '97%' }} /></span></Col>
                                </Row>
                            </Col>
                            <Col span={8} className='conventional-part'>
                                <Row>
                                    <Col className="conventional-title">商务</Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">结算货币：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.currencyName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">结算方式：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.settlementName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">发票类型：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.invoiceTypeName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">付款条件：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.paymentName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">收款方：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.receiveOrgName)}</span></Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col className="conventional-title">组织</Col>
                                </Row>
                                <Row>
                                    <Col span={4} className="conventional-right">所属组织机构：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.deptName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={4} className="conventional-right">负责人：</Col>
                                    <Col span={8}><span>{formatNullStr(supplierBaseSource.empName)}</span></Col>
                                </Row>
                            </Col>
                        </Row>
                        <a className="show-or-hide" href="#" onClick={() => {
                            this.setState({ show: !this.state.show })
                        }}>{this.state.show ? '收起更多隐藏信息' : '展示更多隐藏信息'}
                            <Icon type={this.state.show ? "up" : "down"} /></a>
                    </div>
                    <div style={{ display: this.state.show ? `block` : `none` }} className='Supplier-company'>
                        <Row>
                            <Row><Col className="conventional-title">公司</Col></Row>
                            <Col span={8}>
                                <Row>
                                    <Col span={3} className="conventional-right">法人代表：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.corporation)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">创业日期：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.creationDate)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">行业：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.tradeTypeName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">经营类型：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.businessTypeName)}</span></Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={3} className="conventional-right">公司性质：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.companyTypeName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">公司规模：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.companyScaleName)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">公司网站：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.website)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">公司邮箱：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.email)}</span></Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={3} className="conventional-right">公司电话：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.tel)}</span></Col>
                                </Row>
                                <Row>
                                    <Col span={3} className="conventional-right">公司传真：</Col>
                                    <Col span={8}><span>{formatNullStr(scmBp.fax)}</span></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </div>
        )
    }
}
export default SupplierBaseComp;