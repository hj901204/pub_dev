import React from 'react'
import DepartmentComp from '../components/DepartmentComp'
import Sidebar from '../../base/components/SidebarWrapComp';
import { connect } from 'react-redux'
import actions from '../actions/DepartmentAct';
import AddDepartmentCont from '../dialogconts/AddDepartmentCont';
import EditDepartmentCont from '../dialogconts/EditDepartmentCont';
import { fromJS, Record } from 'immutable';
import DepartmentDetailCont from '../dialogconts/DepartmentDetailCont';

class DepartmentCont extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.searchValue = { departmentName: '', departmentCode: '' };
        this.searchPm = { "conditions": [] }
    }

    initlist = () => {
        let { tabLoading, DepartmentList } = this.props;
        if (!tabLoading) {
            DepartmentList(this.searchPm);
        }
    }

    onSearch = (value) => {
        if (value != '') {
            this.searchPm = {
                ...this.searchPm,
                conditions: [
                    ...this.searchPm.conditions,
                    {
                        "field": "dept_no",
                        "value": value,
                        "operation": 1
                    },
                    {
                        "field": "dept_name",
                        "value": value,
                        "operation": 1
                    },
                    // {
                    //     "field": "status",
                    //     "value": 1,
                    //     "operation":0
                    // }
                ],
                "relations": "dept_no or dept_name",
                // departmentName: value, 
                // departmentCode:value
            };
        this.searchValue = {...this.searchValue, departmentName: value, departmentCode: value};
        }
        this.initlist();
        this.searchPm = { ...this.searchPm, "conditions": [] }
    }
    onClear = () => {
        this.searchPm = { ...this.searchPm, "conditions": [] };
        this.searchValue = { ...this.searchValue, departmentName: '', departmentCode: '' };
        this.initlist();
    }

    render() {
        let { side_visible, record, side_Loading, SidebarVisiable,getAddress } = this.props;
        let { departmentName, departmentCode } = this.searchValue;
        return (
            <div className="manage-content">
                <DepartmentComp {...this.props}
                    SearchVal={departmentName || departmentCode}
                    initlist={this.initlist}
                    onSearch={this.onSearch}
                />
                <Sidebar maskClosable={true}
                    side_visible={side_visible}
                    onClose={() => SidebarVisiable(false)}
                >
                    <DepartmentDetailCont tablePaging={this.onClear} side_Loading={side_Loading} />

                </Sidebar>
                <AddDepartmentCont tablePaging={this.onClear} />
                <EditDepartmentCont tablePaging={this.onClear} />
            </div>
        )
    }

}


const select = (state) => state.DepartmentRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    DepartmentList: (pm) => {
        dispatch(actions.getDepartmentList(pm))
    },
    OpenModal: () => {
        dispatch(actions.openAddmodal(true))
    },
    SidebarVisiable: (value) => {
        dispatch(actions.closeSidebar(value))
    },
    onOpenSidebar: (tag) => {
        dispatch(actions.opensidebar(true, tag))
    },

})
export default connect(select, mapDispatchToProps)(DepartmentCont)