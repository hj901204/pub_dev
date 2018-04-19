import React, { Component } from 'react';
import { Select, Form, Spin } from '../../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../../base/consts/Utils';
const Option = Select.Option;
const FormItem = Form.Item;

class SaleOrderAddTableSelectComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.array = [];
        this.state = {
            value:'',
        }       
    }
    componentDidMount = () =>{
        this.props.MaterialList('');
        // if (this.props.materialSource.length == 0) {
        //     this.props.MaterialList('');
        // }
    }
    handleChange = (value) => {
        let val = this.props.materialSource[value];
        let flag = this.props.flag;
        this.props.handleChange(val, flag,this.props.typePage);
    }
    // handleSelect = () => {
    //     console.log('handleSelect')
    //     this.props.MaterialList('');
    //     // if (this.props.materialSource.length == 0) {
    //     //     this.props.MaterialList('');
    //     // }
    // };
    onSearch = (value) => {
        console.log('onSearch')
        this.props.MaterialList(value);
    };
    render() {
        let { materialSource } = this.props;
        // console.log(materialSource)
        const { getFieldDecorator } = this.props.form;
        let materialOptions = materialSource.map((val, index) => {
            return <Option title={val.materialCode} key={index}>{val.materialCode} {val.materialName} {val.materialSpec} {val.measureUnit}
            </Option>
        })
        return (
            <div className="bom-select-css">
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
                        >
                            {materialOptions}
                        </Select>
                        )}
                </FormItem>
            </div>
        )
    }
}

export default Form.create()(SaleOrderAddTableSelectComp);