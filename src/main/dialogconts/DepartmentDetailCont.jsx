import React from 'react';
import { connect } from 'react-redux';
import DepartmentAct from '../actions/DepartmentAct';
import DepartmentDetailComp from '../components/DepartmentDetailComp';
import { Spin } from '../../base/components/AntdComp'


class DepartmentDetailCont extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        let {side_Loading}=this.props;
        return(
            <Spin spinning={side_Loading}>
                <DepartmentDetailComp 
                {...this.props}
            />
            </Spin>
            
        )
    }

}

let mapStateToProps =(state)=>({
    detail: state.DepartmentRedu.get('detail'),
    dataSource: state.DepartmentRedu.get('dataSource'),
    detailAddressName:state.DepartmentRedu.get('detailAddressName'),
})

let mapDispatchToProps=(dispatch)=>({
    onEditDepartment:(id)=>{dispatch(DepartmentAct.edit_visiableLoading(true,id))},
    getdetail:(id)=>{dispatch(DepartmentAct.detail({id}))},
    onsetup:(deptCode,status)=>{return dispatch(DepartmentAct.setUpDpartment({deptCode,status}))},
    SidebarVisiable: (value) => {dispatch(DepartmentAct.closeSidebar(value))},
    sideLoading: (value) => {dispatch(DepartmentAct.sideLoading(value))},
    //getAddDetail:(addCode)=>{return dispatch(DepartmentAct.get_addDetail(addCode))},
})

export default connect(mapStateToProps,mapDispatchToProps)(DepartmentDetailCont);