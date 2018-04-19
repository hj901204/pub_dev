import React, { Component, PropTypes } from "react";
import { Radio } from "./AntdComp";
const RadioGroup = Radio.Group;

class RadioComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || '',
            options: props.options || [],
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ value });
        }
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
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
        let { value, options } = this.state;
        return (
            <div >
                <RadioGroup
                    {...this.props}
                    options={options}
                    onChange={this.handleChange}
                    value={value}
                />
                {this.props.children}
            </div>
        );
    }
}

RadioComp.defaultProps = {
    options: [],
}
Radio.propTypes = {
    options: PropTypes.array,
}

export default RadioComp;

// Example
// const options = [
//     { label: 'Apple', value: 'Apple' },
//     { label: 'Pear', value: 'Pear' },
//     { label: 'Orange', value: 'Orange' },
// ];
{/*<RadioComp
    options={options}
>
    <span>（建议税率17%）</span>
</RadioComp>*/}