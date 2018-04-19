import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions/DeactivedMemberAct'
import DeActivedMember  from '../components/DeActivedMemberComp'
import { fromJS, Record} from 'immutable';

class DeactivedMemberTable extends Component {
    constructor(props, context) {
        super(props, context); 
        this.searchVal = { page:1, pageSize:10, employeeName:'', phone:'' }
    }    
    tablePaging = (page) => {
        let { getDeactivedList, state } = this.props;
        if(typeof page === "number"){
            if(typeof state.searchDeactiveMemberVal.employeeName === 'undefined'){ 
               this.searchVal = { ...this.searchVal, page: page}              
            }else {
                this.searchVal = {...state.searchDeactiveMemberVal, page: page}
            }
        }else {
            this.searchVal = { ...this.searchVal, ...page};
        }
        getDeactivedList(this.searchVal)
    }


    render() {
       let { state, getDeactivedList, memberManageState } = this.props;
        return (
            <div>
                <DeActivedMember  
                     {...this.props}
                     state = { state } 
                     tablePaging= {this.tablePaging}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) =>  ({
   state: state.GetActivedMemberRedu.toJS(),
   memberManageState: state.MemberManageRedu.toJS(),
})

const mapDispatchToProps = ( dispatch, getState ) => ({
    getDeactivedList: (val) => {
        dispatch( actions.getDeactivedList(val) )
    }
})



export default connect( mapStateToProps, mapDispatchToProps )(DeactivedMemberTable)

