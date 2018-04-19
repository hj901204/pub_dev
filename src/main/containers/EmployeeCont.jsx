import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from "../../base/components/AntdComp";
import EmployeeAct from '../actions/EmployeeAct';
import EmployeeComp from '../components/EmployeeComp';
import AddEmployeeCont from '../dialogconts/AddEmployeeCont';
import EditEmployeeCont from '../dialogconts/EditEmployeeCont';

class EmployeeCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.searchPm = { empName: '', phone: '',page: 1,pageSize: 20};
    }


    render() {
        const { sidebar_visiable, record, SidebarVisiable } = this.props;
        const { empName, phone} = this.searchPm;
        return (
            <div className="manage-content">
                <EmployeeComp {...this.props}
                    SearchVal={empName || phone}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    onClear={this.onClear}
                />
                <AddEmployeeCont />
                <EditEmployeeCont />
            </div>
        );
    }
}

const mapStateToProps = (state) => state.EmployeeRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    AddEmployeeVisiable: () => { dispatch(EmployeeAct.AddEmployeeVisiable(true)); },
    EditEmployeeVisiable: (id) => { dispatch(EmployeeAct.EditEmployeeVisiable(true, id)); },
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCont);
