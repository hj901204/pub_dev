import React, { Component, PropTypes } from 'react';
import { AutoComplete } from './AntdComp';;
import { shouldComponentUpdate } from '../consts/Utils';

const Option = AutoComplete.Option;

let inpTime = setTimeout(()=>{}, 200);

class AutoSelectComp extends Component {
    constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    
    onSelect = (value) => {
        const { selectedList, searchVal, onSelect, keyName} = this.props;
        for (let index in selectedList) {
            let item = selectedList[index];
            if (item[keyName] == value) {
                onSelect(item);
                break;
            }
        }
        // let item = selectedList[value];
        // searchVal.val = item;
        // onSelect(item);
    }
    onSearch = (value) => {
        clearTimeout(inpTime);
        const { inpInterval, searchVal, onSearch } = this.props;
        searchVal.val = null;
        inpTime = setTimeout(() => {
            onSearch(value);
        }, inpInterval);
    }
    render() {
        let { keyName, width,displayName, selectedList } = this.props;
        return (
            <AutoComplete
                style={{ width }}
                {...this.props}
                filterOption={false}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
            >
                {
                    Array.isArray(selectedList) ?selectedList.map((item, index) => 
                        <Option
                            key={String(item[keyName])}
                         >
                            {item[displayName]||item[displayName[0]]+`[${item[displayName[1]]}]`}
                        </Option>
                    ):null
                }
            </AutoComplete>
        )
    }
}

AutoSelectComp.defaultProps = {
    keyName: '',
    displayName: '',
    width: 200,
    inpInterval:500,
    searchVal: {},
    onSelect: () => { },
    onSearch: () => { },
}
AutoComplete.propTypes = {
    keyName: PropTypes.string.isRequired,
    //displayName: PropTypes.string,
    width: PropTypes.number,
    inpInterval: PropTypes.number,
    searchVal: PropTypes.object,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
}
export default AutoSelectComp

// Example

/*<AutoSelectComp
    selectedList = { this.props.selectedList }
    onSelect = { this.props.handleChange }
    onSearch = {(val) => {
        this.props.getUsers(val);
    }}
    displayName = { "name"} // Option`value
    keyName = { "id"} // Option`key
/>*/

// const selectedList = [
//     {
//         id: 1,
//         name: "ABC",
//     },
//     {
//         id: 2,
//         name: "DEF",
//     },
// ];