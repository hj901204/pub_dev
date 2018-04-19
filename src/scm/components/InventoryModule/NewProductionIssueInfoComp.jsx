/**
 * Created by MW on 2017/4/20.
 */
import React, {Component} from 'react'
import {Input, Select, Form, Button, Row, Col} from '../../../base/components/AntdComp'
import FormComp from '../../../base/components/FormComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp'
import { formatNullStr } from '../../../base/consts/Utils';

let Option = Select.Option,
    FormItme = Form.Item;

class NewProductionIssueInfoComp extends FormComp {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        }
    }

    onSelect = (value) => {
        this.props.onSelect(value.requisitionCode);
        this.setState({display:'block'});
    };

    onSearch = (value) => {
        this.props.getSelectedList(value);
        this.setState({display:'none'});
    };


    render() {

        return (
            <div>
                <div className="top">
                    <Row className="row-first">
                        <Col span={22}>
                            <h3 className="public-name">新建生产发料单</h3>
                            <div>单据号：单据号自动生成</div>
                        </Col>
                        <Col className="save-btn" span={2}>
                            <Form.Item className="save-body">
                                <Button className="save" onClick={this.props.saveInfo} loading={this.props.saveLoading}><i className="c2mfont c2m-baocun"></i>保存</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="Info">
                    <Row className="row-second">
                        <Col>
                            <span className="head-source"><span className="xing">*</span>源单据号：</span>
                            <FormItme className="form-itme">
                                {this.getFD('sourceOrderCode',{
                                    initialValue: this.props.dataSource.requisitionCode || '',
                                    rules: [
                                        {
                                            message: '请从下拉列表中选择一项',
                                            type:"autoselect",
                                            list: this.props.selectedList,
                                            keyName: "requisitionCode",
                                        },
                                        {
                                            required:true,
                                            message: '请选择源单据号',
                                        }
                                    ],
                                })(
                                    <AutoSelectComp
                                        className="input"
                                        dropdownClassName="new-sales-store-search-dropdown"
                                        selectedList = { this.props.selectedList }
                                        onSelect = {this.onSelect}
                                        onSearch = {(val) => {this.onSearch(val);}}
                                        optionLabelProp="value"
                                        labelName="requisitionCode"
                                        keyName = {"requisitionCode"}
                                        format={(item)=><div><div className="option-code">{item.requisitionCode}</div></div>}
                                    />,
                                )
                                }
                            </FormItme>
                        </Col>
                    </Row>
                    <div className="info-content" style={{'display':this.state.display}}>
                        <Row className="row-third">
                            <Col className="col-left" span={8}>
                                <div className="per-col">
                                    <span className="per-title">源单据类型：</span>
                                    <span>销售订单</span>
                                </div>
                                <div className="per-col">
                                    <span className="per-title">发货站点：</span>
                                    <span>{formatNullStr('')}</span>
                                </div>
                            </Col>
                            <Col className="col-right" span={16}>
                                <div className="per-col">
                                    <span className="per-title">领料人：</span>
                                    <span>{formatNullStr(this.props.dataSource.empName)}</span>
                                </div>
                                <div className="per-col">
                                    <span className="per-title">领料组织：</span>
                                    <span>{formatNullStr(this.props.dataSource.deptName)}</span>
                                </div>
                            </Col>
                        </Row>
                        <div className="source-remark">
                            <span className="remark-title">源单备注：</span>
                            <span className="remark-content">{formatNullStr(this.props.dataSource.remarks)}</span>
                        </div>
                    </div>
                    <Row className="row-fourth">
                        <Col className="col-remark">
                            <span className="head-source">备注：</span>
                            <FormItme className="form-itme">
                                {this.props.getFieldDecorator('remarks',{
                                        initialValue: '',
                                        rules: [
                                            { max: 200, message: '备注内容要在200字以内',}
                                        ]
                                    }
                                )(
                                    <Input className="textarea" type="textarea" rows="2"/>
                                )
                                }
                            </FormItme>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default NewProductionIssueInfoComp
