import React, { Component, PropTypes } from 'react';
import { AutoComplete, Spin } from './AntdComp';
import { shouldComponentUpdate, debounce } from '../consts/Utils';

const Option = AutoComplete.Option;

class AutoSelectComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.onSearch = debounce(this.onSearch,500);
        this.state = {
            selectedList: props.selectedList || [],
            value: props.value,
            loading: props.loading||false,
        }
        this.rerender = true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
        return this.rerender || (this.state.selectedList != nextProps.selectedList);
    }
    componentWillReceiveProps(nextProps) {
        let { selectedList, value, loading } = this.state;
        if ('selectedList' in nextProps && nextProps.selectedList != this.props.selectedList) {
            selectedList = nextProps.selectedList;
        }
        if ('value' in nextProps && nextProps.value != this.props.value) {
            value = nextProps.value;
        }
        if ('loading' in nextProps && nextProps.loading != this.props.loading) {
            loading = nextProps.loading;
        }
        this.setState({ selectedList,value,loading });
    }

    onSelect = (value) => {
        const { onSelect, keyName } = this.props;
        const { selectedList } = this.state;
        this.rerender = false;
        for (let index in selectedList) {
            let item = selectedList[index];
            if (item[keyName] == value) {
                item.list = selectedList;//
                onSelect(item);
                break;
            }
        };
        if (value == this.state.value) {
            this.handleChange(value);
        };
    }
    onSearch = (value) => {
        const { inpInterval, onSearch } = this.props;
        let search = onSearch(value);
        this.rerender = true;
        if (value) {
            this.setState({ loading: true });
            if (typeof search != 'undefined') {
                search.then(json => {
                    this.setState({ loading: false });
                });
            } else {
                this.setState({ loading: false });
            }
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
        let { keyName, width, displayName, format, dropdownMatchSelectWidth} = this.props;
        let { loading,selectedList, value } = this.state;
        if (!Array.isArray(displayName)) {
            displayName=[displayName]
        }
        return (
            <AutoComplete
                style={{ width }}
                {...this.props}
                value={String(value)}
                filterOption={false}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                onChange={this.handleChange}
                dropdownMatchSelectWidth={dropdownMatchSelectWidth}
            >
                {
                    loading ? <Option key="" value="" disabled={true}><Spin size="small"></Spin></Option> :
                        Array.isArray(selectedList) ? selectedList.map((item, index) => {
                            let displayItem = displayName.map(key => item[key]);
                            return <Option
                                key={String(item[keyName])}
                                {
                                ...this.props.getOptionProps(item)
                                }
                            >
                                {typeof format === 'function' ? format(item, index):format.format(displayItem)}
                            </Option>
                        }) : null
                }
            </AutoComplete>
        )
    }
}

AutoSelectComp.defaultProps = {
    keyName: '',
    displayName: [],
    // width: 200,
    inpInterval: 500,
    dropdownMatchSelectWidth: false,
    format: "{0}[{1}]",
    onSelect: () => { },
    onSearch: () => { },
    getOptionProps: () => {},
}
AutoComplete.propTypes = {
    keyName: PropTypes.string.isRequired,
    // displayName: PropTypes.array,
    width: PropTypes.number,
    inpInterval: PropTypes.number,
    // format: PropTypes.string,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
}
export default AutoSelectComp

// Example

/*<AutoSelectComp
    {...style}
    value={this.state.value}
    selectedList={list}
    onSelect={onSelect}
    onSearch={onSearch}
    displayName={['key','label']}
    keyName={'key'}
    onChange={value=>this.setState({ value })}
    format="{0}-{1}-{2}"
/>;*/

// const selectedList = [
//     {
//         key: 1,
//         label: "ABC",
//     },
//     {
//         key: 2,
//         label: "DEF",
//     },
// ];