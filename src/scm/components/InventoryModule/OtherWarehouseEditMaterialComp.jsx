/**
 *  其他入库单  编辑物料  弹出框 -- 
 */
import React, { Component, PropTypes } from "react";
import FormModalComp from '../../../base/components/FormModalComp';
import { Form, Input, Col, Row, InputNumber, Button, Spin, Select, Checkbox, Pagination, Popconfirm, message } from '../../../base/components/AntdComp';
import SelectTableComp from '../../../base/components/SelectTableComp'; // 下拉表格组件
import OtherWarehouseEditDialogAct from '../../actions/InventoryModule/OtherWarehouseEditDialogAct';
import { store } from "../../data/StoreConfig";
import Validate from '../../../base/consts/ValidateList'
let FormItem = Form.Item;

let columns = [{
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
    key: 'measureUnitName',
}];

let searchData = {
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
        }
    ],
    center: [
        {
            title: "搜索",
            Func: null,
            style: {},
            type: "button"
        }
    ]
}
class OtherWarehouseEditMaterialComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    selectMaterialList = (data) => {
        if (data) {
            data.materialUnitName = data.measureUnitName;
            data.materialModel = data.model;
            data.materialUnitCode  = data.measureUnit;
            store.dispatch(OtherWarehouseEditDialogAct.materialDataList(data))
        }
        this.forceUpdate();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.props.form.validateFields((err, data) => {
                if (!err) {
                    // data.opType == 0 ? this.props.addNewRowToTable(data)
                    this.props.addNewRowToTable && this.props.addNewRowToTable(data);
                    this.props.hide();
                    store.dispatch(OtherWarehouseEditDialogAct.materialData({}))
                }
            });
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.newState.materialData != this.props.newState.materialData) {
            this.props.newState.materialData = nextProps.newState.materialData;
        }
        this.forceUpdate();
    }



    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let { newState } = this.props;
        const layoutForm = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };
        return (
            <div className="material-edit-dialog">
                <Form>
                    <FormItem
                        label='lineNum'
                        {...layoutForm}
                        style={{ display: 'none' }}
                    >
                        {
                            getFieldDecorator('lineNum', {
                                initialValue: newState.materialData.lineNum || ""
                            })(
                                <Input />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='订单ID'
                        {...layoutForm}
                        style={{ display: 'none' }}
                    >
                        {
                            getFieldDecorator('id', {
                                initialValue: newState.materialData.lineNum < 0 ? null : newState.materialData.id
                            })(
                                <Input />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='物料编码'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('materialCode', {
                                initialValue: newState.materialData.materialCode || "",
                                rules: [{ required: true, message: '物料编码为必填!' }]
                            })(
                                <SelectTableComp
                                    columns={columns}
                                    rowKey='materialCode'
                                    valueKey='materialCode'
                                    searchData={searchData}
                                    getDataSource={this.props.PurchaseList}    // 表格数据请求
                                    handleSubmit={this.selectMaterialList}
                                />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='状态'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('status', {
                                initialValue: "保存"
                            })(
                                <Input disabled className='noborder-input' />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='物料名称'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('materialName', {
                                initialValue: newState.materialData.materialName || "--"
                            })(
                                <Input disabled className='noborder-input' />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='规格'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('materialSpec', {
                                initialValue: newState.materialData.materialSpec || "--"
                            })(
                                <Input disabled className='noborder-input' />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='型号'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('materialModel', {
                                initialValue: newState.materialData.materialModel || "--"
                            })(
                                <Input disabled className='noborder-input' />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='基本单位'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('materialUnitName', {
                                initialValue: newState.materialData.materialUnitName || "--"
                            })(
                                <Input disabled className='noborder-input' />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='基本单位编码'
                        {...layoutForm}
                        style={{ display: 'none' }}
                    >
                        {
                            getFieldDecorator('materialUnitCode', {
                                initialValue: newState.materialData.materialUnitCode || "--"
                            })(
                                <Input disabled className='noborder-input' />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='计划数量'
                        {...layoutForm}
                    >
                        {
                            getFieldDecorator('planAmount', {
                                initialValue: newState.materialData.planAmount || 0,
                                rules: [
                                        Validate({
                                            type: "gtZero",
                                            //message: "",
                                            label: '计划数量',
                                            decimal: 2,
                                            required: true
                                        })
                                ]
                            })(
                                <InputNumber />
                                )
                        }
                    </FormItem>
                    <FormItem
                        label='表格列是否为新增'
                        {...layoutForm}
                        style={{ display: 'none' }}
                    >
                        {
                            getFieldDecorator('opType', {
                                initialValue: newState.materialData.opType || 0,
                            })(
                                <Input />
                                )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }

}
export default Form.create()(OtherWarehouseEditMaterialComp)