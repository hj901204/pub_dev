import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from './AntdComp';;
const FormItem = Form.Item;

class CodeBtnComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            isDisabled:false,
            time: 60,
        }
        
    }
    tick=()=>{
        if(this.state.time >1){
            this.setState({time: this.state.time - 1});
            
        }else{
            this.setState({
                isDisabled:false,
                time: 60
            });
            clearInterval(this.interval);
        }
    }
    componentWillMount=()=>{
        this.setState({
            isDisabled:false,
            time: 60
        });
        clearInterval(this.interval);
    }
    componentWillUnmount=()=>{
        clearInterval(this.interval);
    }
    onClickCode=()=>{
        this.props.sendPhoneCode(()=>{
            this.setState({isDisabled:true});
            this.interval = setInterval(this.tick, 1000);
        })
    }
    
    render(){
        return (
            <Button type="primary"  className="form-btn-v"
                onClick={this.onClickCode}
                disabled={ this.state.isDisabled ? 'disabled' : '' }
                >{this.state.isDisabled?`${this.state.time}`+"s后重发":"获取验证码"}
            </Button> 
        )
    }
}
export default CodeBtnComp