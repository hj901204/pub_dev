import React,{Component} from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import DepartmentAct from '../actions/DepartmentAct';
import EditDepartmentComp from '../components/EditDepartmentComp';
import AddressAct from '../actions/AddressAct'

class AddDepartmentCont extends Component{
    constructor(props, context) {
        super(props, context);
        this.param={mgrPm:{"empName":"","pageSize":"10"},deptNamePm:{"conditions":[]},addPm:{"isReg": "0","isMag": "1","isRep": "1","isSog": "1","isBil": "1","isOfe": "0","isVisible": "1"}}
        
    }
    initData = () =>{
        const { geteditdata, getSelectData, departmentId, handleCancel } = this.props;
        if (departmentId) {
            geteditdata(departmentId).then(json=>{
                if(json.status === "2000"){
                    this.param={
                        ...this.param,
                        mgrPm:{
                            ...this.param.mgrPm,
                            empName:this.props.Record.deptMgr
                        },
                    }
                    getSelectData(this.param);
                }
            });
        }
    }
    
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, tablePaging, getdetail, Record } = this.props;
        data.id=Record.id
        // if (loading) {
        //     return
        // }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                handleCancel();
                getdetail(Record.id)
                tablePaging();
            } else {
            };
        });
    }

    render() {
        const { visible } = this.props;
        return (
            visible ?
                    <EditDepartmentComp
                        {...this.props}
                        onOk={this.handleSubmit}
                        initData={this.initData}
                    />: null
        );
    }
}

AddDepartmentCont.defaultProps = {
    title: "编辑部门",
    width: 800,
}

const mapStateToProps = (state) => ({
    visible: state.DepartmentRedu.get('edit_department_visiable'),
    deptMgr: state.DepartmentRedu.get('deptMgr'),
    detail: state.DepartmentRedu.get('detail'),
    pDeptName: state.DepartmentRedu.get('pDeptName'),
    loading: state.DepartmentRedu.get('departmentLoading'),
    Record: state.DepartmentRedu.get('record'),
    departmentId: state.DepartmentRedu.get('DepartmentId'),
    deptMgrName: state.DepartmentRedu.get('deptMgrName'),
    address: state.DepartmentRedu.get('address'),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(DepartmentAct.edit_visiableLoading(false,id)) },
    handleSubmit: (data) => { return dispatch(DepartmentAct.EditDepartment(data)) },
    getSelectData:(param)=>{return dispatch(DepartmentAct.getSelectData(false,param))},
    getdetail:(id)=>{dispatch(DepartmentAct.detail({id}))},
    // getdeptMgr:()=>{dispatch(DepartmentAct.deptMgr())},
    geteditdata: (id) => { return dispatch(DepartmentAct.getEditData({id})) },
    AddAddressVisiable: () => { dispatch(AddressAct.AddAddressVisiable(true)); },
    getAddress: () => dispatch(AddressAct.Address()),
    getPDetail:(addressCode,type)=>{ return dispatch(DepartmentAct.detail({"addressCode":addressCode},type))}
})


export default connect(mapStateToProps,mapDispatchToProps)(AddDepartmentCont);
