/**
 * Created by MW on 2017/4/25.
 */
import React, {Component} from "react";
import FormModalComp from "../../../base/components/FormModalComp";
import AutoSelectComp from "../../../base/components/AutoSelectComp";
import {Form, AutoComplete, Button, Input} from "antd";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
class StorageAddDialogComp extends FormModalComp {
    onSearch = (val) => {

        this.props.actions.fetchEnumSiteCode(val);

    }

    getOptionProps = (item) => {
        return {
            displayName: item.siteName
        }
    }
    getComp = () => {
        return this.props.visible ? (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="所属站点" {...formItemLayout}>
                    {this.getFD('siteCode', {
                        initialValue: this.props.dataSource.siteCode || "",
                        rules: [
                            {
                                message: '请从下拉列表中选择一项',
                                type: "autoselect",
                                list: this.props.enumSiteCode,
                                keyName: "siteCode",
                            }, {required: true, message: '站点必填!'}
                        ],
                    })(
                        <AutoSelectComp
                            className="input"
                            dropdownClassName="new-sales-store-search-dropdown"
                            selectedList={ this.props.enumSiteCode }
                            onSelect={this.onSelect}
                            onSearch={(val) => this.onSearch(val)}
                            optionLabelProp="displayName"
                            getOptionProps={this.getOptionProps}
                            labelName="siteName"
                            keyName={"siteCode"}
                            format={(item) => <div>
                                <div className="option-code">{item.siteCode}</div>
                                <div className="option-name">{item.siteName}</div>
                            </div>}
                        />,
                    )
                    }
                </FormItem>

                {
                    this.props.dataSource.code ?
                        <FormItem label="编码"  {...formItemLayout}>
                            {this.getFD('code', {
                                initialValue: this.props.dataSource.code || "",
                                rules: [{required: true, message: '编码不能为空'}]
                            })(
                                <Input disabled={true} placeholder="请输入编码"/>
                            )}
                        </FormItem>
                        :
                        <FormItem label="编码"  {...formItemLayout}>
                            {this.getFD('code', {
                                initialValue: this.props.dataSource.code || "",
                                rules: [{required: true, message: '编码不能为空'}]
                            })(
                                <Input placeholder="请输入编码"/>
                            )}
                        </FormItem>
                }
                <FormItem label="名称"  {...formItemLayout}>
                    {this.getFD('name', {
                        initialValue: this.props.dataSource.name || "",
                        rules: [{required: true, message: '名称不能为空'}]
                    })(
                        <Input placeholder="请输入名称"/>
                    )}
                </FormItem>
                <FormItem label="描述"  {...formItemLayout}>
                    {this.getFD('remarks', {
                        initialValue: this.props.dataSource.remarks || "",
                        rules: [{max: 200, message: '最多可以输入 200 个字符'}]
                    })(
                        <Input type="textarea" rows={5} placeholder="请输入描述"/>
                    )}
                </FormItem>
            </Form>
        ) : null;
    }
}
StorageAddDialogComp.defaultProps = {
    dataSource: {},
    actions: {}
}

export default StorageAddDialogComp;
