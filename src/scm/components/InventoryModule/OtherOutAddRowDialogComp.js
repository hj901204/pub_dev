/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from "react";
import FormModalComp from "../../../base/components/FormModalComp";
import {Form, AutoComplete, Button, Input,InputNumber,Row,Col} from "antd";
import SelectTableComp from '../../../base/components/SelectTableComp';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const columns = [{
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    filterMultiple: false
}, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
}, {
    title: '规格',
    dataIndex: 'materialSpec',
    key: 'materialSpec',
}, {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
}, {
    title: '基本单位',
    dataIndex: 'measureUnitName',
    key: 'measureUnitName'
}];

const  searchData = {
    left: [
        {
            key: "materialCode",
            val: "物料编码",
            type: "string"
        },
        {
            key: "materialName",
            val: "物料名称",
            type: "string",
        },
        {
            key: "materialSpec",
            val: "规格",
            type: "string"
        },
        {
            key: "model",
            val: "型号",
            type: "string"
        },
        {
            key: "measureUnitName",
            val: "基本单位",
            type: "string"
        }
    ],
    center: [
        {
            title: "查询",
            Func: null,
            style: {},
            type: "button"
        }
    ]
}

class OtherOutAddRowDialogComp extends FormModalComp {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                let obj = Object.assign({},this.props.dataSource,values);

                if(this.props.actionsType == "add"){
                    this.props.handleAddSubmitCallBack  && this.props.handleAddSubmitCallBack(obj);
                }

                if(this.props.actionsType == "edit"){
                    this.props.handleEditSubmitCallBack  && this.props.handleEditSubmitCallBack(obj);
                }
                this.props.actions.hide();
            }
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.actions.hide();
    }

    handSelectSaleRow=(selectedRows)=>{

        var cloneRow =  {};

        cloneRow.materialModel = selectedRows.model;
        cloneRow.materialUnitName = selectedRows.measureUnitName;
        cloneRow.materialUnitCode = selectedRows.measureUnit;


        cloneRow.materialCode = selectedRows.materialCode;
        cloneRow.materialName = selectedRows.materialName;
        cloneRow.materialSpec = selectedRows.materialSpec;

        cloneRow.model = selectedRows.model;


        this.props.actions.setDataSource(Object.assign({},this.props.dataSource,cloneRow));


    }
    getComp = () => {
        let dataSource = this.props.dataSource;


        return this.props.visible ? (
            <Form className="other-out-edit" onSubmit={this.handleSubmit}>
                <FormItem label="物料编码"  {...formItemLayout}>
                    {this.getFD('materialCode', {
                        initialValue: dataSource.materialCode || "",
                        rules: [{required: true, message: '物料编码不能为空'}]
                    })(
                        <SelectTableComp
                            columns={columns}
                            rowKey='materialCode'
                            valueKey='materialCode'
                            handleSubmit={this.handSelectSaleRow}
                            getDataSource={this.props.actions.fetchData}
                            searchData={searchData}
                            contStyle={{ width: "600px", zIndex: '5' }}
                            style={{width:'208px'}}
                        />
                    )}
                </FormItem>
                <Row >
                    <Col span={5}>
                        <label>物料名称：</label>
                    </Col>
                    <Col span={19} >{dataSource.materialName || "--" }</Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <label>规格：</label>
                    </Col>
                    <Col span={19} >{dataSource.materialSpec || "--"}</Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <label>型号：</label>
                    </Col>
                    <Col span={19} >{dataSource.materialModel || "--"}</Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <label>基本单位：</label>
                    </Col>
                    <Col span={19} >{dataSource.materialUnitName || "--"}</Col>
                </Row>
                <FormItem label="计划数量"  {...formItemLayout}>
                    {this.getFD('planAmount', {
                        initialValue: dataSource.planAmount || "",
                        rules: [
                            {
                                validator: (rule, value = "", callback) => {
                                    if (value.length <= 0) {
                                        callback("计划数量必填。")
                                    } else if (!/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)) {
                                        callback("请输入数字。")
                                    } else if (!(value > 0)) {
                                        callback("输入值必须大于 0。")
                                    } else if (!(value <= 99999999)) {
                                        callback("输入值不能大于 99999999。")
                                    } else if (!(/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value))) {
                                        callback("小数点后不能超过两位");
                                    }
                                    callback();
                                }
                            }
                        ]
                    })(
                        <InputNumber min={0} max={99999999} step={0.01}  />
                    )}
                </FormItem>
            </Form>
        ) : null;
    }
}
OtherOutAddRowDialogComp.defaultProps = {
    handleAddSubmitCallBack:()=>{

    },
    handleEditSubmitCallBack:()=>{

    },
    actionsType:"add",
    dataSource: {},
    actions: {}
}

export default OtherOutAddRowDialogComp;
