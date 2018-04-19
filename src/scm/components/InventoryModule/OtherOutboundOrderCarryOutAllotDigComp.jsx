/**
 * Created by MW on 2017/7/21.
 * 其它出库单分配弹窗组件
 */

import React, {Component} from "react";
import {Form, Input, Button, Select, message, InputNumber} from 'antd';
import Table from "../../../base/components/TableComp"
import ModalComp from '../../../base/components/ModalComp';
import { store } from "../../data/StoreConfig";
import OtherOutboundOrderCarryOutAct from '../../actions/InventoryModule/OtherOutboundOrderCarryOutAct'
import { formatNullStr } from '../../../base/consts/Utils';

const FormItem = Form.Item;
const Option = Select.Option;

let columns = [{
    title: '仓库名称',
    dataIndex: 'warehouseName',
    key: 'warehouseName',
}, {
    title: '仓位',
    dataIndex: 'freightSpaceName',
    key: 'freightSpaceName',
}, {
    title: '批次号',
    dataIndex: 'batchCode',
    key: 'batchCode',
}, {
    title: '可用数量',
    dataIndex: 'amount',
    key: 'amount',
}, {
    title: '分配数量',
    dataIndex: 'allotAmount',
    key: 'allotAmount'
}];


class OtherOutboundOrderCarryOutAllotDig extends ModalComp {
    constructor(props, context) {

        super(props, context);
        this.state = {
            selectCode: 'input'
        };
        columns[columns.length-1].render = (text, record,index) => {
            return (
                <FormItem style={{'margin':'0'}}>
                    {
                        this.props.form.getFieldDecorator(record.idStr,{
                            initialValue: 0.00,
                            rules: [{validator: (rule,val,callback)=>{
                               if(val === '' || val === undefined){
                                    callback("分配数量格式不正确");
                                } else if(!(/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(val))){
                                   callback("小数点后不能超过两位");
                               } else if(val<=record.amount && val <= Number((this.props.popupData.planAmount-this.props.popupData.allocatedAmount).toFixed(2))){
                                    callback();
                                } else{
                                    callback("数量分配不对，请重新输入");
                                }
                            }}]
                        })(
                            <InputNumber type="number" min={0.00} step={0.01} />
                                         //formatter={value => String(value).replace(/([0-9]+([.][0-9]{0,2})?)[0-9]*/,"$1")}
                                        // parser={value => value}/>
                        )
                    }
                </FormItem>
            );
        };
    };

    //提交分配记录
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                let parameterList = [];
                for(var name in values) {
                    this.props.popupList.some((value) => {
                        if(name == value.id){
                            parameterList.push({
                                outCode:this.props.popupSearch.outCode,
                                lineNum:this.props.popupSearch.lineNum,
                                warehouseCode:value.warehouseCode,
                                freightSpaceCode:value.freightSpaceCode,
                                batchCode:value.batchCode,
                                materialAmount:values[name]
                            });
                            return;
                        }
                    })
                }
                this.props.allocateSave({list:parameterList});
            }
        });
    }

    cleanSearch = (e) => {
        this.props.form.resetFields(['searchContent']);
    };

    //查询
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            store.dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('popupLoading',true));
            this.props.getInventoryList({...{},...this.props.popupSearch,...{[values.searchType]:values.searchContent}},true);
        })
    };

    // tablePaging = (page) => {
    //
    //     this.props.getAllocateInfo(typeof page == 'number' ?
    //         {
    //             page: page,
    //             pageSize: 10,
    //             outCode: this.props.orderInfoData.orderCode,
    //             lineNum: this.props.popupData.lineNum
    //         }
    //         :
    //         Object.assign(page, {outCode: this.props.orderInfoData.orderCode, lineNum: this.props.popupData.lineNum})
    //     );
    // };

    getComp = () => {

        let {getFieldDecorator} = this.props.form;

        return (
            <div className="other-outbound-order-carry-out-popup">
                <div className="top-details">
                    <div className="col-left">
                        <div className="col-one">
                            <div className="mar-bottom">物料编码：{formatNullStr(this.props.popupData.materialCode)}</div>
                            <div>物料名称：{formatNullStr(this.props.popupData.materialName)}</div>
                        </div>
                        <div className="col-two">
                            <div className="mar-bottom">规格：{formatNullStr(this.props.popupData.materialSpec)}</div>
                            <div>型号：{formatNullStr(this.props.popupData.materialModel)}</div>
                        </div>
                        <div className="col-three">
                            <div className="mar-bottom">基本单位：{formatNullStr(this.props.popupData.materialUnitName)}</div>
                        </div>
                    </div>

                    <div className="col-right">
                        <div className="mar-bottom">计划数量：<span
                            className="color-red">{formatNullStr(this.props.popupData.planAmount)}</span></div>
                        <div>已分配数量：<span className="color-green">{formatNullStr(this.props.popupData.allocatedAmount)}</span></div>
                    </div>
                </div>
                <div className="popup-search">
                    <Form>
                        <FormItem className="form-item">
                            {getFieldDecorator('searchType', {
                                initialValue: 'freightSpaceName'
                            })(
                                <Select className="search-type" onChange={this.cleanSearch}>
                                    <Option value="freightSpaceName">仓位</Option>
                                    <Option value="batchCode">批次号</Option>
                                </Select>
                            )
                            }
                        </FormItem>
                        <FormItem className="form-item">
                            {getFieldDecorator('searchContent', {
                                initialValue: ''
                            })(
                                <Input className="search-content" placeholder="请输入关键字搜索" onPressEnter={this.submit}/>
                            )}
                        </FormItem>
                        <FormItem className="form-item">
                            <Button type="button" className="search-btn" loading={this.props.searchLoading} onClick={this.submit}>查询</Button>
                        </FormItem>
                    </Form>
                </div>
                    <div className="popup-table">
                        <Form>
                            <Table cols={[].concat(columns)} rowKey="id" dataSource={this.props.popupList} pagination={false} />
                        </Form>
                    </div>
            </div>
        )


    }
}

OtherOutboundOrderCarryOutAllotDig.defaultProps = {
    title: '库存选择',
    okText: '确定',
    width: 740,
    maskClosable: true,
}

let OtherOutboundOrderCarryOutAllotDigComp = Form.create()(OtherOutboundOrderCarryOutAllotDig)
export default OtherOutboundOrderCarryOutAllotDigComp;



