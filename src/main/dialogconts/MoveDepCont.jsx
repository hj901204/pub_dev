import React,{Component} from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import MemberManageAct from '../actions/MemberManageAct';
import MoveDepComp from '../components/MoveDepComp';


class MoveDepCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        let { loading, handleSubmit, handleCancel,getMemberInfoList,departinfo } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                getMemberInfoList({ deptCode: departinfo.key, employeeName: '', phone: '',page: 1,pageSize:10});
            } else if (json.status === 4353) {
                console.log('保存失败!');
            };
        });
    }
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <MoveDepComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.MemberManageRedu.get('MoveDepVisiable'),
    loading: state.MemberManageRedu.get('MoveDepLoading'),
    pDeptName: state.MemberManageRedu.get('pDeptName'),
    departinfo: state.MemberManageRedu.get('departinfo'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(MemberManageAct.MoveDepVisiable(false)) },
    handleSubmit: (data) => { return dispatch(MemberManageAct.MoveDep(data)) },
    DeptName:(pm)=>{dispatch(MemberManageAct.DeptName(pm))},
    getMemberInfoList:(pm)=>{dispatch(MemberManageAct.getMemberInfoList(pm))},
})


export default connect(mapStateToProps,mapDispatchToProps)(MoveDepCont);
