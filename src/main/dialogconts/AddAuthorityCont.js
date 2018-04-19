import React from "react";
import {connect} from "react-redux";
import AddAuthorityComp from "../components/AddAuthorityComp";
import AuthorityAct from "../actions/AuthorityAct";

class AddAuthorityCont extends React.Component{
    constructor(props){
        super(props);
    }
    handleSubmit = (data)=>{
        //在这里对提交的数据进行包装处理
        this.props.addAuthority(data);
    }
    render(){
        let props = {
            title:"新增",
            visible:this.props.add_visible,
            loading:this.props.dialog_loading,
            handleCancel:()=>this.props.setAddVisible(false),
            handleSubmit:this.handleSubmit
        };
        return (
            <div>
                <AddAuthorityComp {...props}/>
            </div>
        );
    }
}
let mapStateToProps = (state)=>state.AuthorityRedu.toJS();
let mapDispatchToProps = (dispatch)=>({
    addAuthority:(data)=>dispatch(AuthorityAct.addAuthority(data)),
});
export default connect(mapStateToProps,mapDispatchToProps)(AddAuthorityCont);