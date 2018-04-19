import React, { Component } from 'react'

import MemberInfoComp  from '../components/MemberInfoComp'
import DeActivedMemberCont  from './DeActivedMemberCont'

import TreeCont from './TreeCont'
import PersonManegeCont from './PersonManegeCont'
import PersonManageHeaderCont from './PersonManageHeaderCont'
import { Spin} from '../../base/components/AntdComp';

import { connect } from 'react-redux'
import MemberManageAct from '../actions/MemberManageAct'


class MemberManageTable extends Component {
    constructor(props, context) {
        super(props, context); 
        this.searchVal = { deptCode:'', employeeName: '', phone: '',page: 1,pageSize: 10};
    }

    tablePaging = (page) => {
        let { getMemberInfoList,state } = this.props;
        if (typeof page === "number") {
            if(typeof state.searchPm.employeeName === 'undefined'){
                this.searchVal = { ...this.searchVal,  deptCode:state.departinfo.key, page: page}              
            }else {
                this.searchVal = {...state.searchPm, page: page, deptCode:state.departinfo.key}
            }          
        } else {
            this.searchVal = { ...this.searchPm, ...page ,deptCode:state.departinfo.key};
        };
        getMemberInfoList(this.searchVal);
    }
    //两个表格
    changeTab = (val) => {
        let { state, PersonManageState, checkedList,headerChange } = this.props;
        if(val.changetable == 2){
            return (
                 <MemberInfoComp className='manage-right'
                        state = {state} 
                        side_visible={val.side_visible}
                        checkedList = {this.props.checkedList} 
                        headerChange = {headerChange}
                        tablePaging={this.tablePaging}
                        {...this.props}
                 />  
            )
        }else {
            return (
                <DeActivedMemberCont />
            )
        }
    }
    render() {
       let { state, PersonManageState,treeState, checkedList, GetActivedMemberRedu } = this.props;
        return (           
            <div className='manage-box'>
                <div className="person-manage-top">
                    <PersonManageHeaderCont {...GetActivedMemberRedu} {...this.props}/>
                    <div className="header-border"></div>   
                </div>
                <div className="person-manage-bottom">
                    <div className="person-manger-left">
                        <Spin spinning={this.props.treeState.loading}>
                            <PersonManegeCont {...treeState}/>
                            <TreeCont />
                        </Spin>
                    </div>
                    <div className="person-manger-right">
                        {
                            this.changeTab(PersonManageState)
                        }
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) =>  ({   
        state: state.MemberManageRedu.toJS(),
        PersonManageState: state.PersonManageRedu.toJS(),
        treeState: state.TreeRedu.toJS(),
        GetActivedMemberRedu: state.GetActivedMemberRedu.toJS()
});

const mapDispatchToProps = (dispatch) => ({
    checkedList: (val) => {
		dispatch( MemberManageAct.checkedList(val) )
	},
    getMemberInfoList: (val) => {
        dispatch( MemberManageAct.getMemberInfoList(val) )
    },
    getDetailsInfo: (empCode) => {
        dispatch( MemberManageAct.getDetailsInfo(empCode) )
    },
    headerChange: (len) => {
        dispatch( MemberManageAct.headerChange(len) )
    },
    onOpenSidebar:(value)=>{
        dispatch(MemberManageAct.onOpenSidebar(value))
    },
    stopAccount: (Ids) => {
        dispatch(MemberManageAct.stopAccount(Ids));
    }
})

export default connect( mapStateToProps, mapDispatchToProps )(MemberManageTable)




 




