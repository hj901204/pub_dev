import React, {Component} from "react";
import {connect} from "react-redux";
import {Select, Button, Input, Form} from '../../../base/components/AntdComp';
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
            key: 'bomCode',
            value: '',
        };
    }

    componentWillMount() {
    }

    onChange = (value) => {
        this.setState({isInput: value !== 'status'});
        if(value == 'status'){
            this.setState({value: '1'})
            this.setState({key: value})
        }else {
            this.setState({value: ''})
            this.setState({key: value})
        }
    };
    query = () => {
        let queryKey=this.state.key;
        this.props.onSearch({[queryKey]:this.state.value})

    };
    add = () => {
        this.props.GetCodeRule().then(json=>{
            if(json.status===2000){
                store.dispatch(TabsAct.TabAdd({title:"新建BOM",key:"bomAdd"}));
            }
        })
        /*   this.props.CleanBomDetail({});*/
    };
    handleInputChange= (event) => {
        this.setState({value: event.target.value})
    };
    handleStatusChange= (value) => {
        this.setState({value: value})
    };
    render() {
        return (
            <div className="bom-link-input-cont">
                <div className="input-select">
                    <Select style={{width: 180}} onChange={this.onChange} defaultValue="bomCode">
                        <Option value="bomCode">BOM编码</Option>
                        <Option value="version">版本号</Option>
                        <Option value="materialCode">产品编号</Option>
                        <Option value="status">状态</Option>
                        <Option value="bomName">BOM名称</Option>
                    </Select>
                    {this.state.isInput ?
                        <Input   onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180,marginLeft:20}} value={this.state.value}  onChange={this.handleInputChange}/>:
                        <Select   style={{width: 100,marginLeft:20}} onChange={this.handleStatusChange} defaultValue="1">
                            <Option value="0">保存</Option>
                            <Option value="1">启用</Option>
                            <Option value="2">禁用</Option>
                        </Select>}
                    <Button className="default-btn query-bom" onClick={this.query}><i className="c2mfont c2m-search1" style={{paddingRight:7,fontSize:10}}></i><span>查询</span></Button>
                    <Button className="default-btn new-bom" onClick={this.add}><i className="c2mfont c2m-jia" style={{paddingRight:7,fontSize:10}}></i><span>新建</span></Button>
                </div>

            </div>
        )
    }
}
export default Form.create()(LinkInputComp);