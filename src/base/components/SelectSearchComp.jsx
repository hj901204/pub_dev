import React, { Component, PropTypes } from 'react';
import { Select, Spin } from './AntdComp';;
import { shouldComponentUpdate, debounce } from '../consts/Utils';

const Option = Select.Option;

class SelectSearchComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.lastFetchId = 0;
        this.onSearch = debounce(this.onSearch, 500);
        // console.log(props.value);
        this.state = {
            data: [],
            value: props.value,
            loading: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    componentWillReceiveProps(nextProps) {
        // let { data, value, loading } = this.state;
        // if ('data' in nextProps && nextProps.data != data) {
        //     console.log(data);
        //     data = nextProps.data;
        // }
        if ('value' in nextProps && nextProps.value != this.props.value) {
            let value = nextProps.value;
            // console.log('changedValue2', value);
            this.setState({ value });
        }
        // if ('loading' in nextProps && nextProps.loading != loading) {
        //     loading = nextProps.loading;
        // }
    }

    onSelect = (value, option) => {
        // console.log('onSelect',this.state.data[option.props.index]);
        // console.log('onselect', option.props.data);
        // const { onSelect, keyName } = this.props;
        // const { data } = this.state;
        // for (let index in data) {
        //     let item = data[index];
        //     if (item[keyName] == value) {
        //         item.list = data;//
        this.props.onSelect && this.props.onSelect(option.props.data || {});
        //         break;
        //     }
        // }
    }
    onSearch = (value) => {
        // const {  onSearch } = this.props;
        // let search = this.props.onSearch(value);
        // if (value) {
        //     this.setState({ loading: true });
        //     if (typeof search != 'undefined') {
        //         search.then(json => {
        //             this.setState({ loading: false });
        //         });
        //     } else {
        //         this.setState({ loading: false });
        //     }
        // }

        // console.log('sss', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        if (value) {
            this.setState({ loading: true });
            this.props.onSearch(value).then(data => {
                if (fetchId !== this.lastFetchId) { // for fetch callback order
                    return;
                }
                // console.log('onSearch', data);
                this.setState({ data });
            })
        }
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        // console.log(value);
        this.setState({
            data: [],
            loading: false,
        });
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        // console.log('changedValue', changedValue);
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        let { width, dropdownMatchSelectWidth, format, ...props } = this.props;
        let { loading, data, value } = this.state;
        // console.log('data', data);
        return (
            <Select
                //defaultActiveFirstOption
                labelInValue
                optionLabelProp="children"
                showSearch
                allowClear
                placeholder="输入关键字"
                style={{ width }}
                value={value}
                filterOption={false}
                showArrow={false}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                onChange={this.handleChange}
                dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                notFoundContent={loading ? <Spin size="small" /> : null}
            >
                {
                    //loading ? <Option key="" value=""><Spin size="small"></Spin></Option> :
                    typeof format === 'function' ? format(data) : null
                }
            </Select>
        )
    }
}

SelectSearchComp.defaultProps = {
    // keyName: '',
    // displayName: [],
    data: [],
    width: '100%',
    inpInterval: 500,
    dropdownMatchSelectWidth: false,
    format: () => { },
    onSelect: () => { },
    onSearch: () => { },
    // getOptionProps: () => {}
}
SelectSearchComp.propTypes = {
    // keyName: PropTypes.string.isRequired,
    // displayName: PropTypes.array,
    data: PropTypes.array,
    width: PropTypes.string,
    inpInterval: PropTypes.number,
    dropdownMatchSelectWidth: PropTypes.bool,
    format: PropTypes.func,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
}
export default SelectSearchComp

// Example

/*
    handleSubmit = (e) => {
        ...
            data.purchaseCode = data.purchaseCode && data.purchaseCode.key||'';
        ...
    }
    <FormItem label= "采购单号" {...formItemLayout }>
        {
            this.getFD('purchaseCode', {
                initialValue: purchaseReturnDetail.purchaseCode ? {
                    key: purchaseReturnDetail.purchaseCode,
                    label: `${purchaseReturnDetail.purchaseCode}[${purchaseReturnDetail.buyerName}]`
                } : undefined,
            })(
                <SelectSearchComp
                    data={purchaseList}
                    onSelect={this.purchaseSelect}
                    onSearch={this.purchaseSearch}
                    disabled={type == 'add' ? false : true}
                    format={data => data.map(item => <Option key={String(item.orderCode)} data={item}>{`${item.orderCode}[${item.buyerName}]`}</Option>)}
                />
                )
        }
    </FormItem >

*/