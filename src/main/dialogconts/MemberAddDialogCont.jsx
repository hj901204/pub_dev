/**
 * Created by MW on 2017/3/24.
 */
import React, { Component,PropTypes } from "react";
import MemberAddDialogComp from "../components/MemberAddDialogComp";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MemberAddDialogActions from "../actions/MemberAddDialogActions"

class MemberAddDialogCont extends Component{
    constructor(props, context) {
        super(props, context);

    }

    handleSubmit = (data) => {
        this.props.actions.addMember(data).then((json)=>{
            if(json.status=== 2000){
                this.props.actions.hide();
                this.props.submitCallBack && this.props.submitCallBack(json);
            }
        })
    }

    handleCancel = ()=>{
        if(!this.props.loading){
            this.props.actions.hide();
        }
    }



    render() {
        const { visible } = this.props;
        return (
            visible ?
                <MemberAddDialogComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                    handleCancel ={this.handleCancel}
                    handleSubmit = {this.handleSubmit}
                /> : null
        );
    }
}

MemberAddDialogCont.defaultProps = {
    title:"新增员工"
}
let mapStateToProps =(state)=>{
    return state.MemberDialogRedu.get("addMemberDialog").toJS();
}
let mapDispatchToProps =(dispatch)=>({
        actions:bindActionCreators(MemberAddDialogActions,dispatch)
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(MemberAddDialogCont);
