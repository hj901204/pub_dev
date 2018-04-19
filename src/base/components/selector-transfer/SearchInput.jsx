import React, { Component, PropTypes } from 'react';
import { Input, Button } from '../AntdComp';
const InputGroup = Input.Group;

window.time = 0;
window.clear;
class SearchInput extends Component {
    constructor(prop) {
        super(prop);
    }
    handleInputChange=(e) => {
        // this.props.selector.searchValue = e.target.value;
        let th = this,val = e.target.value;
        if(window.time==1)
            window.clearTimeout(window.clear);
        window.clear = setTimeout(function() {
            window.time = 0;
            // console.log("this is fasong chenggong");
            if(th.props.currentData.length>0)
                th.props.searchSeleced(val);
        }, 500);
        window.time = 1;
    }
    searchCurrentData=()=> {
        this.props.searchSeleced();
    }
    render() {
        return (
            <div
                className="ant-search-input-wrapper"
                style={{width: "100%"}}>
                <InputGroup className="ant-search-input">
                    <Input
                        ref="sInput"
                        placeholder="搜索同事"
                        onChange={this.handleInputChange}
                        onPressEnter={this.searchCurrentData} />
                    <div className="ant-input-group-wrap">
                        <Button
                            icon="search"
                            className="ant-btn ant-btn-icon-only ant-search-btn"
                            onClick={this.searchCurrentData} />
                    </div>
                </InputGroup>
            </div>
        )
    }
}

export default SearchInput
