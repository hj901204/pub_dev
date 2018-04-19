import React,{Component} from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import EmployeeAct from '../actions/EmployeeAct';
import AddEmployeeComp from '../components/AddEmployeeComp';


class AddEmployeeCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            console.log(json);
            if (json.status && (json.status ===2000)) {
                console.log('新增员工成功!');
            } else {
                console.log('新增员工失败!');
            };
            handleCancel();
        });
    }
    render() {
       // console.log(this.props.handleCancel);
        const { visible } = this.props;
        return (
            visible ?
                <AddEmployeeComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddEmployeeCont.defaultProps = {
    title: "新增员工",
}

const mapStateToProps = (state) => ({
    visible: state.EmployeeRedu.get('add_employee_visiable'),
    loading: state.EmployeeRedu.get('employeeLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(EmployeeAct.AddEmployeeVisiable(false)) },
    handleSubmit: (data) => { return dispatch(EmployeeAct.AddEmployee(data)) },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddEmployeeCont);
