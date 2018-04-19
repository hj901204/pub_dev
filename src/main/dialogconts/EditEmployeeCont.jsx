import React,{Component} from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import EmployeeAct from '../actions/EmployeeAct';
import EditEmployeeComp from '../components/EditEmployeeComp';

class AddEmployeeCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    initData = () =>{
        const { loading, EmployeeDetail, empCode, handleCancel } = this.props;
        if (!loading && empCode) {
            EmployeeDetail(empCode).then(json => {
                if (json.status && (json.status === 2000)) {
                    message.info('获取员工详情成功!');
                } else {
                    // message.warn(T.DETAILFAIL);
                    handleCancel(null);
                };
            });
        }
    }
    
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status && (json.status === 2000)) {
                 message.info('修改员工成功!');
                handleCancel();
                //tablePaging();
            } else {
                message.warn('修改员工失败!');
            };
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <EditEmployeeComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                /> : null
        );
    }
}

AddEmployeeCont.defaultProps = {
    title: "编辑员工",
}

const mapStateToProps = (state) =>({
    visible: state.EmployeeRedu.get('edit_employee_visiable'),
    loading: state.EmployeeRedu.get('employeeLoading'),
    employee: state.EmployeeRedu.get('employee'),
    empCode: state.EmployeeRedu.get('empCode'),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(EmployeeAct.EditEmployeeVisiable(false,id)) },
    handleSubmit: (data) => dispatch(EmployeeAct.EditEmployee(data)),
    EmployeeDetail: (empCode) => dispatch(EmployeeAct.EmployeeDetail({ empCode })),
})


export default connect(mapStateToProps,mapDispatchToProps)(AddEmployeeCont);
