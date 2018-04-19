import React, {Component} from "react";
import {connect} from "react-redux";
import {Select, Button, Input, Form} from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import {store} from '../../data/StoreConfig';
const Option = Select.Option;
const Search = Input.Search;
class SaleOrderSearchComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'saleOrderCode',
            value: ''
        };
    }
    query = () => {
        let queryKey=this.state.key;
        this.props.onSearch({[queryKey]:this.state.value})
    };
    handleInputChange= (event) => {
        this.setState({value: event.target.value})
    };
    add = () => {
        this.props.GetCodeRule().then(json=>{
            if(json.status===2000){
                store.dispatch(TabsAct.TabAdd({title: "新建销售订单", key: "saleOrderAdd"}));
            }
        })
    };
    onChange= (value) => {
        this.setState({value: ''})
        this.setState({key: value})
    };
    render() {
        return (
            <div className="sale-input-cont">
                <div className="input-select">
                    <Select style={{width: 180}} onChange={this.onChange} defaultValue="saleOrderCode" >
                        <Option  value="saleOrderCode">销售订单号</Option>
                        <Option value="customerName">客户名称</Option>
                        <Option value="sourceCode">来源订单号</Option>
                    </Select>
                    <Input onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180,marginLeft:20}} value={this.state.value} onChange={this.handleInputChange}/>
                    <Button className="default-btn query-sale" onClick={this.query}><i className="c2mfont c2m-search1" style={{paddingRight:7,fontSize:10}}></i><span>查询</span></Button>
                    
                    <Button className="default-btn new-sale" onClick={this.add}><i className="c2mfont c2m-jia" style={{paddingRight:7,fontSize:10}}></i><span>新建</span></Button>
                </div>

            </div>
        )
    }
}

export default SaleOrderSearchComp;