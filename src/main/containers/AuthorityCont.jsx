import React,{Component} from "react";
import { connect } from "react-redux";
import AuthorityComp from "../components/AuthorityComp";
import Sidebar from "../../base/components/SidebarWrapComp";
import AuthorityAct from "../actions/AuthorityAct";
import AddAuthorityCont from "../dialogconts/AddAuthorityCont";
import AuthoritySideCont from "../dialogconts/AuthoritySideCont";
import SelectorTransferCont from '../dialogconts/SelectorTransferCont';
import SelectorAct from '../actions/SelectorAct';

class AuthorityCont extends Component{
    constructor(prop){
        super(prop);
    }
    hideSidebar = ()=>{
        this.props.setSideVisible(false);
    }
    refreshAuthority = (page)=>{
        let searchPm = {
            page:this.props.authPaging.page,
            pageSize:this.props.authPaging.pageSize
        };
        if(typeof page === "number"){
            searchPm = {...searchPm , page}
        }else{
            searchPm = {...searchPm , ...page}
        }
        this.props.getAuthorityList(searchPm);
    }
    handleSubmit = (data)=>{
        data = data.map((d)=>{
            return d.empCode;
        });
        return this.props.addMenbers(data);
    }
    handleCancel = ()=>{
        this.props.setSelVisible(false);
    }
    render(){
        let addProps = {
            setAddVisible:this.props.setAddVisible,
            refreshAuthority:this.refreshAuthority,
        }
        let sideProps = {
            maskClosable:true,
            side_visible:this.props.side_visible,
            onClose:this.hideSidebar,
            refreshAuthority:this.refreshAuthority,
        }
        return (
            <div>
                <AuthorityComp {...this.props} refreshAuthority={this.refreshAuthority} />
                <AddAuthorityCont {...addProps}/>
                <SelectorTransferCont handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
                <Sidebar {...sideProps}>
                    <AuthoritySideCont/>
                </Sidebar>
            </div>
        );
    }
}
let mapStateToProps = (state)=>state.AuthorityRedu.toJS();
let mapDispatchToProps = (dispatch)=>({
    setSideVisible:(bool)=>dispatch(AuthorityAct.setSideVisible(bool)),
    setAddVisible:(bool)=>dispatch(AuthorityAct.setAddVisible(bool)),
    getAuthorityList:(page)=>dispatch(AuthorityAct.getAuthorityList(page)),
    getAuthorityDetail:(id)=>dispatch(AuthorityAct.getAuthorityDetail(id)),
    getAuthorityTree:()=>dispatch(AuthorityAct.getAuthorityTree()),
    getMenberTree:()=>dispatch(AuthorityAct.getMenberTree()),
    setSelVisible:(bool)=> dispatch(SelectorAct.visibleDialog(bool)),
    addMenbers:(data)=>dispatch(AuthorityAct.addMenbers(data)),
})
export default connect(mapStateToProps , mapDispatchToProps)(AuthorityCont);
