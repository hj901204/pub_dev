import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Button, Input, Form } from '../../../base/components/AntdComp';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
import TabsAct from '../../actions/TabsAct';
import { store } from '../../data/StoreConfig';

const Option = Select.Option;
const Search = Input.Search;

class LinkInputComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInput: true,
            inputValue:'',
            SearchVal: props.SearchVal,
            key: 'saleReturnCode',
            value: '',
            condition: {}
        };
    }

    componentWillMount() {
        // console.log('component will mount...');
    }

    onChange = (value) => {
        this.setState({isInput: value !== 'status'});
        this.setState({value: ''})
        this.setState({key: value})

    };
    query = () => {
        let queryKey = this.state.key;
        this.props.onSearch({[queryKey]:this.state.value})
    };
    add = () => {
        // this.props.GetCodeRule().then(json=>{
            // if(json.status===2000){
                store.dispatch(SaleReturnAct.OriginalOrderList());
                store.dispatch(TabsAct.TabAdd({title:"新建销售退货单",key:"saleReturnAdd"}));
            // }
        // })
     /*   this.props.CleanBomDetail({});*/
    };
    handleInputChange = (event) => {
        this.setState({value: event.target.value})
    };
    handleStatusChange = (value) => {
        this.setState({value: value})
    };
    render() {
        return (
            <div className="link-input-cont">
                <div className="input-select">

                    <Select style={{ width: 180 }} placeholder="退货单号" onChange={this.onChange}>
                        <Option value="saleReturnCode">退货单号</Option>
                        <Option value="customerName">客户名称</Option>
                    </Select>
                    
                    <Input onPressEnter={this.query} style={{width: 180,marginLeft:20}} value={this.state.value}  placeholder="请输入关键字查询" onChange={this.handleInputChange} onPressEnter={this.query}/>
                    <Button className="default-btn query-saleReturn" onClick={this.query}><i className="c2mfont c2m-search1" style={{paddingRight:7,fontSize:10}}></i>查询</Button>
                    <Button className="default-btn new-saleReturn" onClick={this.add}><i className="c2mfont c2m-jia" style={{paddingRight:7,fontSize:10}}></i>新建</Button>
                </div>

            </div>
        )
    }
}
export default Form.create()(LinkInputComp);