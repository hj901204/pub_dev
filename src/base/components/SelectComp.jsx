import React, { Component, PropTypes } from "react";
import { Select } from "./AntdComp";
const Option = Select.Option;

class SelectComp extends Component { 
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value || ''
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({value});
        }
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({value});
        }
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        let { onChange,list,keyName,labelName,style } = this.props;
        let { value } = this.state;
        return (
            <div style={{display:'inline',...style}}>
                <Select
                    {...this.props}
                    value={value}
                    onChange={this.handleChange}
                >
                    {
                        Array.isArray(list)? list.map((item, index) => 
                            <Option key={index} value={item[keyName]}>{item[labelName]}</Option>
                        ):null
                    }
                </Select>
                {this.props.children}
            </div>
        );
    }
} 

SelectComp.defaultProps = {
    keyName: '',
    labelName: '',
    list: [],
    onChange:()=>{},
}

export default SelectComp;

// Example
{/*<SelectComp
    list={window.ENUM.getEnum("bool")}
    keyName="catCode"
    labelName="catName"
>
    <span>（建议税率17%）</span>
</SelectComp>*/}