import React,{Component} from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import DepartmentAct from '../actions/DepartmentAct';
import AddDepartmentComp from '../components/AddDepartmentComp';
import AddressAct from '../actions/AddressAct'

class AddDepartmentCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, tablePaging } = this.props;
        if (loading) {
            return;
        }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                handleCancel();
                tablePaging();
            }
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                    <AddDepartmentComp
                        {...this.props}
                        onOk={this.handleSubmit}
                    /> : null
        );
    }
}

AddDepartmentCont.defaultProps = {
    title: "新增部门",
    width: 800,
}

const mapStateToProps = (state) => ({
    visible: state.DepartmentRedu.get('add_department_visiable'),
    loading: state.DepartmentRedu.get('departmentLoading'),
    pDeptName: state.DepartmentRedu.get('pDeptName'),
    deptMgr: state.DepartmentRedu.get('deptMgr'),
    detail: state.DepartmentRedu.get('detail'),
    address: state.DepartmentRedu.get('address'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(DepartmentAct.cancel(false)) },
    handleSubmit: (data) => { return dispatch(DepartmentAct.AddDepartment(data)) },
    //getFormSelect:()=>{ dispatch(DepartmentAct.getFormSelect()) },
    // getpDeptName:()=>{dispatch(DepartmentAct.pDeptName())},
    getdeptMgr:(pm)=>{dispatch(DepartmentAct.deptMgr(pm))},
    getSelectData:(param)=>{return dispatch(DepartmentAct.getSelectData(false,param))},
    // newAddress:()=>{dispatch(DepartmentAct.newAddress(true))},
    AddAddressVisiable: () => { dispatch(AddressAct.AddAddressVisiable(true)); },
    getAddress: () => dispatch(AddressAct.AddressList()),
    getPDetail:(addressCode,type)=>{ return dispatch(DepartmentAct.detail({"addressCode":addressCode},type))}
})


export default connect(mapStateToProps,mapDispatchToProps)(AddDepartmentCont);
