import React, { Component } from 'react'
//两个header组建 对应停用员工和部门员工列表
import HeaderToManageComp  from '../components/HeaderToManageComp'
import HeaderToOutInfoComp  from '../components/HeaderToOutInfoComp'
import DeactivedMemberTable  from './DeActivedMemberCont'

import MoveDepCont from '../dialogconts/MoveDepCont'
import ImportViewCont from '../dialogconts/ImportViewCont'

import { connect } from 'react-redux'
import ImportEmployeeAct from '../actions/ImportEmployeeAct'
import MemberManageAct from '../actions/MemberManageAct'
import deactiveAct from '../actions/DeactivedMemberAct'
import SetOfficesAct from '../actions/SetOfficesAct';
import { Layout } from '../../base/components/AntdComp.js';
import { fromJS, Record, toJS } from 'immutable';

class ManageHead extends Component {

constructor(props, context) {
    super(props, context);
        this.searchPm = {deptCode:'', employeeName: '', phone: '',page: 1,pageSize: 10};
        this.searchOutInfo = { employeeName: '', phone: '',page: 1, pageSize: 10};
    }

    onSearch = (val) => {
        const { getMemberInfoList,state } = this.props;
        if(!state.tableLoading){
            this.searchPm = { ...this.searchPm, deptCode:state.departinfo.key, employeeName: val, phone: val, page: 1 };
            getMemberInfoList(this.searchPm);
        }
    }
    
    onClear = () => {
        this.searchPm = { ...this.searchPm, employeeName: '', phone: '', page: 1 };
        getMemberInfoList(this.searchPm);
    }  
    
    onSearch_outinfo = (val) => {
        let {state} = this.props;
        if( !state.tableLoading ){
            this.searchOutInfo = { ...this.searchOutInfo, employeeName: val, phone: val, page: 1 };
            this.refreshOutInfoList(this.searchOutInfo);
        }
    } 
    refreshOutInfoList = (val) => {
        let { getMemberOutInfoList } = this.props;
        getMemberOutInfoList(val);
    }   

    render() {
        let { record, changetable, state, deactiveState } = this.props;
        let deactiveSearch = deactiveState.searchDeactiveMemberVal;
        return (
                <div className="manage-top-content">
                    {
                        changetable == 2 ? 
                        <HeaderToManageComp {...this.props} 
                            SearchVal={state.searchPm.employeeName || state.searchPm.phone}
                            onSearch={this.onSearch}
                            onChange={this.onChange}
                            onClear={this.onClear}/> : 
                        <HeaderToOutInfoComp {...this.props} 
                            SearchVal={deactiveSearch.employeeName || deactiveSearch.phone }
                            onSearch={this.onSearch_outinfo}
                            onChange={this.onChange}
                            onClear={this.onClear}
                            refreshList={this.refreshOutInfoList}/> 
                    }
                    <MoveDepCont  {...this.props}/>
                    <ImportViewCont {...this.props}/>
                </div>
        )
    }
}

const mapStateToProps = (state) =>  {   
    return {
        changetable: state.PersonManageRedu.toJS().changetable,
        state: state.MemberManageRedu.toJS(),
        deactiveState: state.GetActivedMemberRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMemberInfoList: (val) => {
        dispatch( MemberManageAct.getMemberInfoList(val) )    },
    getMemberOutInfoList: (val) => {
        dispatch( deactiveAct.getDeactivedList(val) )
    },

    MoveDepVisiable: () => { dispatch(MemberManageAct.MoveDepVisiable(true)) },
    importViewVisiable: () => { dispatch(ImportEmployeeAct.importViewVisiable(true)); },

    stopAccount: (Ids) => {
        dispatch(MemberManageAct.stopAccount(Ids));
    },
    SetOfficesVisiable: () => {
        dispatch(SetOfficesAct.SetOfficesVisiable(true));
    },
})

export default connect( mapStateToProps, mapDispatchToProps )(ManageHead)




 




