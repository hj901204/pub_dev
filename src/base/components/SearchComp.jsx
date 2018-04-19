import React, { Component, PropTypes } from "react";
import { Input } from "./AntdComp";
import { shouldComponentUpdate } from '../consts/Utils';
const Search = Input.Search;

class SearchComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            SearchVal: props.SearchVal,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.SearchVal !== this.props.SearchVal) {
            this.setState({ SearchVal: nextProps.SearchVal });
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    
    onChange = (e) => {
        this.setState({ SearchVal: e.target.value });
    }
    render() {
        const { width, placeholder, onSearch } = this.props;
        return (
            <Search
                style={{ width }}
                placeholder= { placeholder }
                value={ this.state.SearchVal }
                onChange={ this.onChange }
                onSearch={ onSearch }
            />
        )
    }
}

SearchComp.defaultProps = {
    SearchVal: '',
    placeholder: '',
    width: 200,
    onSearch: ()=>{},
}

SearchComp.propTypes = {
    SearchVal: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    onSearch: PropTypes.func,
}

export default SearchComp


// Example

/*
    < SearchComp
        SearchVal = { SearchVal }
        onSearch = { onSearch }
        placeholder = "输入职位名称／编号搜索"
        width = { 300 }
    />
*/