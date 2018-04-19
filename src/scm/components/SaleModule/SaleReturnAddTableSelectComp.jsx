import React, { Component } from 'react';
import { Select, Form,Spin } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
const Option = Select.Option;
const FormItem = Form.Item;

class SaleReturnAddTableSelectComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.array = [];
    }
    handleChange = (value) => {

        let val = this.props.materialSource[value];
        let flag = this.props.flag;
        this.props.handleChange(val, flag ,this.props.typePage);
    }
    handleSelect= () => {
        this.props.MaterialList('');
    };
    onSearch = (value) => {
        this.props.MaterialList(value);
    };
    render() {
        let { materialSource, saleReturnDetailInfo } = this.props;
        const { getFieldDecorator } = this.props.form;

        let materialOptions = materialSource.map((val, index) => {
            return <Option title={val.materialCode} key={index}>{val.materialCode}
            </Option>
        })
        return (
            <div className="saleReturn-select-css">
                <FormItem >
                    {getFieldDecorator('materialCode', {
                        initialValue: this.props.record
                    })(
                        <Select
                            showSearch
                            optionLabelProp={"title"}
                            notFoundContent={this.props.fetching ? <Spin size="small" /> : null}
                            style={{ width: 200 }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onSearch={this.onSearch}
                            onChange={this.handleChange}
                            onFocus={this.handleSelect}
                        >
                            {materialOptions}
                        </Select>
                        )}
                </FormItem>
            </div>
        )
    }
}

export default Form.create()(SaleReturnAddTableSelectComp);