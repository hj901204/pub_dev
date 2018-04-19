/**
 * Created by MW on 2017/7/19.
 * 其它出库单列表_搜索
 */

import React, {Component} from 'react';
import {Select, Input, Button, Form} from '../../../base/components/AntdComp';
import {store} from "../../data/StoreConfig";
import OtherOutboundOrderAct from '../../actions/InventoryModule/OtherOutboundOrderAct'
let FormItem = Form.Item,
    Option = Select.Option;
let options = [
    {
        value: "orderCode",
        text: "出库单据号"
    },{
        value: "busCode",
        text: "单据类型"
    }, {
        value: "bpFull",
        text: "收货人"
    }, {
        value: "ownerDeptName",
        text: "收货部门"
    }, {
        value: "status",
        text: "状态"
    }
];

let optionsStatus = [
    {
        value: '-1',
        text: "全部",
    }, {
        value: '1',
        text: "保存",
    }, {
        value: '2',
        text: "部分分配"
    }, {
        value: '3',
        text: "分配完成"
    }, {
        value: '4',
        text: "部分发货"
    }, {
        value: '5',
        text: "发货完成"
    }, {
        value: '6',
        text: "关闭"
    }
];

class OtherOutboundOrderSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectCode: 'input'
        }
    };

    cleanSearch = (e) => {
        this.props.form.resetFields(['searchContent']);
        this.setState({selectCode: e == 'status' ? 'select' : (e == 'busCode'?'type':'input') })
    };
    newTab = () => {
        let {GetCodeRule, newTab} = this.props;
        GetCodeRule().then(json => {
            if (json.status === 2000) {
                newTab('newBuilt')
            }
        })
    }
    searchInput = () => {

        let { getFieldDecorator } = this.props.form;

        switch (this.state.selectCode){
            case 'input':
                return (
                    <FormItem className="form-item">
                        {getFieldDecorator('searchContent', {
                            initialValue: ''
                        })(
                            <Input className="search-content" type='text' placeholder='请输入关键字搜索' onPressEnter={this.submit} />
                        )}
                    </FormItem>
                );
            case 'select':
                return (
                    <FormItem className="form-item">
                        {getFieldDecorator('searchStatus', {
                            initialValue: '-1'
                        })(
                            <Select className="search-type">
                                {optionsStatus.map((optionStatus) => {
                                   return <Option key={optionStatus.value} value={optionStatus.value}>{optionStatus.text}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                );
            case 'type':
                return (
                    <FormItem className="form-item">
                        {getFieldDecorator('dataType', {
                            initialValue: this.props.dataTypeSource[0].busCode? this.props.dataTypeSource[0].busCode :''
                        })(
                            <Select className="search-type">
                                {this.props.dataTypeSource.map((optionType) => {
                                    return <Option key={optionType.busCode} value={optionType.busCode}>{optionType.busName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                );
            default:
                return (
                    <FormItem className="form-item">
                        {getFieldDecorator('searchContent', {
                            initialValue: ''
                        })(
                            <Input className="search-content" type='text' placeholder='请输入关键字搜索' onPressEnter={this.submit} />
                        )}
                    </FormItem>
                );
        }
    };

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                let searchArgument;
                if(values.searchType == 'status'){
                    searchArgument = {[values.searchType]:Number(values.searchStatus)};
                } else if(values.searchType == 'busCode'){
                    searchArgument = {[values.searchType]:values.dataType};
                    // this.props.dataTypeSource.map((dataType) => {
                    //     if (dataType.busCode == values.dataType){
                    //         searchArgument = {
                    //             [values.searchType]:values.dataType,
                    //             // busName:dataType.busName
                    //         };
                    //     }
                    // })
                }
                else {
                    searchArgument = {[values.searchType]:values.searchContent};
                }
                this.props.loading('searchLoading',true);
                this.props.getList(Object.assign({page:1, pageSize:this.props.paging.pageSize,sourceOrderType:15,},searchArgument));
            })
        })

    };

    render() {

        let { getFieldDecorator } = this.props.form;

        return (
            <div className="search">
                <Form className="search-left">
                    <FormItem className="form-item">
                        {getFieldDecorator('searchType',{
                            initialValue: 'orderCode'
                        })(
                            <Select className="search-type" onChange = {this.cleanSearch}>
                                {options.map((option) => {
                                    return <Option key={option.value} value={option.value}>{option.text}</Option>
                                })}
                            </Select>
                            )
                        }
                    </FormItem>
                    {this.searchInput()}
                    <FormItem  className="form-item">
                        <Button className="submit" onClick={this.submit} loading={this.props.searchLoading}><i className="c2mfont c2m-search1"></i>查询</Button>
                    </FormItem>
                </Form>
                <div className="search-right">
                    <Button className="new-built" type='button' onClick={this.newTab}><i className="c2mfont c2m-jia"></i>新建</Button>
                </div>
            </div>
        )
    }
}
let OtherOutboundOrderSearchComp = Form.create()(OtherOutboundOrderSearch);

export default OtherOutboundOrderSearchComp