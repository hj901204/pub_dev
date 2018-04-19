import React, {Component} from "react";
import MTable from '../../../base/components/TableComp';
import {connect} from "react-redux";
import {Row, Col, Button, Select, Dropdown, Menu, Icon, Spin,Modal} from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import {store} from '../../data/StoreConfig';
import { formatNullStr } from '../../../base/consts/Utils';
import TooltipComp from "../../../base/components/TooltipComp";
const Option = Select.Option;
class BomDetailComp extends Component {
    constructor(props) {
        super(props);
        // this.pageSize = 11;
        this.state = {
            key: 0,
            value: '更多操作',
            status:''
        }

        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                hidden: true
            }, {
                title: '物料编码',
                dataIndex: 'materialCode',
                key: 'materialCode',
                width: 175,
            }, {
                title: '物料名称',
                dataIndex: 'materialName',
                key: 'materialName',
                render: (txt, index, record) => <TooltipComp attr={{text:txt, wid: 70, placement: 'left'}} />
            }, {
                title: '物料规格',
                dataIndex: 'materialSpec',
                key: 'materialSpec',
                render: (txt, index, record) => <TooltipComp attr={{text:txt, wid: 70, placement: 'left'}} />
            }, {
                title: '单位用量',
                dataIndex: 'quantityPer',
                key: 'quantityPer',
                width: '15%',
            }, {
                title: '计量单位',
                dataIndex: 'measureUnit',
                key: 'measureUnit',
                width: '10%',
                hidden: true
            }, {
                title: '计量单位',
                dataIndex: 'measureUnitName',
                key: 'measureUnitName',
                width: '10%',
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                render: (txt, index, record) => <TooltipComp attr={{text:txt, wid: 150, placement: 'left'}} />
            }];
    };

  /*  componentDidMount() {
        this.props.initData && this.props.initData()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.detail.bomCode !== nextProps.detail.bomCode || this.props.detail.version !== nextProps.detail.version) {
            this.props.initData && this.props.initData()
        }
    };*/

    editBom = () => {
        this.props.GetBom(this.props.bomDetailInfo.bomCode, this.props.bomDetailInfo.version, "edit")
        store.dispatch(TabsAct.TabAdd({title: "编辑BOM", key: "bomEdit"}));
        store.dispatch(TabsAct.TabRemove("bomDetail", "bomEdit"));
    };
    handleChange = (value) => {
        switch (value) {
            case 'copy':
                this.props.GetBom(this.props.bomDetailInfo.bomCode, this.props.bomDetailInfo.version, "copy")
                store.dispatch(TabsAct.TabRemove("bomDetail", "bomCopy"));
                store.dispatch(TabsAct.TabAdd({title: "复制BOM", key: "bomCopy"}));
                break;
            case 'upgrade':
                this.props.GetBom(this.props.bomDetailInfo.bomCode, this.props.bomDetailInfo.version, "upgrade")
                store.dispatch(TabsAct.TabRemove("bomDetail", "bomUpgrade"));
                store.dispatch(TabsAct.TabAdd({title: "升级BOM", key: "bomUpgrade"}));
                break;
            case '1':
                this.props.CheckDate(this.props.bomDetailInfo.startTime,this.props.bomDetailInfo.endTime,this.props.bomDetailInfo.bomCode, this.props.bomDetailInfo.version, 1,'detail')
                /*store.dispatch(TabsAct.TabRemove("bomDetail", "bomList"));*/
                this.setState({status:1})
                break;
            case '2':
                this.props.UpdateStatus(this.props.bomDetailInfo.startTime,this.props.bomDetailInfo.endTime,this.props.bomDetailInfo.bomCode, this.props.bomDetailInfo.version, 2)
               /* store.dispatch(TabsAct.TabRemove("bomDetail", "bomList"));*/
                this.setState({status:2})
                break;

            default:
        }
    };
    getE = (key, val) => {
        if (val !== "undefined") {
            return window.ENUM.getEnum(key, val)
        }
    };
    getOption = (status) => {
        if (status === 0) {
            return <Select className="select-btn" value={this.state.value} style={{width: 80}}
                           onChange={this.handleChange}>
                <Option value="copy">复制</Option>
                <Option value="1">启用</Option>
            </Select>
        } else if (status === 1) {
            return <Select className="select-btn" value={this.state.value} style={{width: 80}}
                           onChange={this.handleChange}>
                <Option value="copy">复制</Option>
                <Option value="upgrade">升版</Option>
                <Option value="2">禁用</Option>

            </Select>
        } else if (status === 2) {
            return <Select className="select-btn" value={this.state.value} style={{width: 80}}
                           onChange={this.handleChange}>
                <Option value="copy">复制</Option>
                <Option value="upgrade">升版</Option>
                <Option value="1">启用</Option>
            </Select>
        }
    };
    handleOk = () => {
        this.props.UpdateStatus(this.props.bomDetailInfo.startTime,this.props.bomDetailInfo.endTime,this.props.bomDetailInfo.bomCode, this.props.bomDetailInfo.version,this.state.status)
        this.props.ModalDetailVisiable(false)
    };
    handleCancel = () => {
        this.props.ModalDetailVisiable(false)
    };
    statusHandler = (status) => {
        switch (status) {
            case 0: //保存（蓝色）
                return <a style={{ color: '#4C80CF' }}>{this.getE("bomStatus", status)}</a>
                break;
            case 1: // 已启用（绿色）
                return <a style={{ color: '#417505' }}>{this.getE("bomStatus", status)}</a>
                break;
            case 2: // 已禁用  （红色）：D0011B
                return <a style={{ color: '#D0011B' }}>{this.getE("bomStatus", status)}</a>
                break;
            default:
                return '--'
                break;
        }
    }
    render() {
        const {bomDetailInfo} = this.props;
        let columns = this.columns;
        let dataSource = this.dataSource;
        let {key} = this.state;
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                    <div className="bom-head">
                        <div className="bom-head-left">
                            <span className="bom-head-h1">BOM详情：{bomDetailInfo.bomCode}
                                | {bomDetailInfo.materialCode}
                                [{bomDetailInfo.materialName ? bomDetailInfo.materialName : ''}]</span>
                            <span className="bom-head-h">状态：<strong
                                className="bom-head-strong">{this.statusHandler(bomDetailInfo.status)}</strong> 类别：<strong
                                className="bom-head-strong">{this.getE("bomType", bomDetailInfo.type + '')}</strong>
                                产品编码：<strong className="bom-head-strong">{bomDetailInfo.materialCode}
                                    [{bomDetailInfo.materialName ? bomDetailInfo.materialName : ''}]</strong></span>
                        </div>
                        <div className="bom-head-right">
                            <span className="bom-head-right-button">
                                <Button className="editable-add-btn bomDetail-efit-btn" onClick={this.editBom}
                                        style={{visibility: bomDetailInfo.status == 0 ? `visible` : `hidden`}}><i className="c2mfont c2m-bianji" style={{paddingRight:7,fontSize:10}}></i>编辑</Button>
                                {this.getOption(bomDetailInfo.status)}
                            </span>
                        </div>
                    </div>
                    <div className="bom-body">
                        <div className="bom-body-border">
                            <Row>
                                <Col className="bom-body-borderR" span={12}>
                                    <div className="bom-baseinfo">
                                        <span className="bom-baseinfo-title">基本信息</span>
                                    </div>
                                    <div className="bom-baseinfo-con">
                                        <ul>
                                            <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">BOM编号：</span><span
                                                className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.bomCode)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">类别：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(this.getE("bomType", bomDetailInfo.type + ''))}</span>
                                            </li>
                                            <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">BOM名称：</span><span
                                                className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.bomName)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">更新人：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.createByName)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">产品编号：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.materialCode)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">更新时间：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.updateDate)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">产品名称：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.materialName)}</span></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="bom-baseinfo">
                                        <span className="bom-baseinfo-title">公司</span>
                                    </div>
                                    <div className="bom-stateinfo-con">
                                        <ul>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">版本号：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.version)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">生效日期：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.startTime)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">状态：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(this.getE("bomStatus", bomDetailInfo.status + ''))}</span>
                                            </li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">失效日期：</span><span
                                                    className="bom-baseinfo-con-li">{formatNullStr(bomDetailInfo.endTime)}</span></li>
                                            <li className="bom-stateinfo-con-li"><span
                                                className="bom-baseinfo-10">备注：</span><span
                                                    className="bom-baseinfo-con-li bom-baseinfo-rc">{formatNullStr(bomDetailInfo.remarks)}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="bom-mxInfo"><span className="bom-baseinfo-title">明细信息</span></div>
                        <div className="bom-detailedinfo-con">
                            <MTable
                                cols={columns}
                                dataSource={bomDetailInfo.list}
                                rowKey={"id"}
                            />
                        </div>
                    </div>
                </Spin>
                <div>
                    {this.props.showDetailModal ?
                        <Modal title="时间校验"
                            visible={this.props.showDetailModal}
                            style={{ width: 520 }}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>操作版本的生效日期与之前启用的版本的失效时间有真空期，是否要进行操作？</p>
                        </Modal>:null
                    }    
                </div>
            </div>
        )
    }
}
export default BomDetailComp;