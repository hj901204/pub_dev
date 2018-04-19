import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp.js';
import { connect } from 'react-redux';
import actions from '../actions/MemberManageAct';
import TabsAct from '../actions/TabsAct';
import ImportViewComp from '../components/ImportViewComp';
import ImportEmployeeAct from '../actions/ImportEmployeeAct';


class AgainImportViewCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        this.props.handleSubmit(data)
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <ImportViewComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

const mapStateToProps = (state) => ({
        visible: state.ImportEmployeeRedu.get('againImportViewVisiable'),
        loading: state.ImportEmployeeRedu.get('importViewLoading'),
})

const mapDispatchToProps = (dispatch) => ({
    handleCancel:()=>{dispatch(ImportEmployeeAct.againImportViewVisiable(false))},
    handleSubmit: (data) => { dispatch(ImportEmployeeAct.PositionList(data))},
})


export default connect(mapStateToProps,mapDispatchToProps)(AgainImportViewCont);
