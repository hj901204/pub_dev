import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import BusinessAct from '../../actions/RenterModule/BusinessAct';
import BusinessComp from '../../components/RenterModule/BusinessComp';
import TabsAct from '../../actions/TabsAct';
import BusinessPartnerCont from '../../containers/RenterModule/BusinessPartnerCont';

class BusinessCont extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            searchPm: {
                page: 1,
                pageSize: 10,
                searchValue: '',
                searchKey: '',
            },
        };
    }
    tablePaging=(pageNum)=>{
        const{businessTabLoading,BusinessList}=this.props;
        if(!businessTabLoading){
            if(typeof pageNum==="number"){
                this.state.page=pageNum;
            }else{
                this.state={...this.state,...pageNum};
            };
            let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue };
            BusinessList(pm);
        }
    }

    onSearch = (searchData) => {
        if (Array.isArray(searchData.val)) {
            searchData.val = `"${searchData.val[0]},${searchData.val[1]}"`;
        }
        if (!this.props.tabLoading) {
            this.setState({
                searchPm: {
                    ...this.state.searchPm,
                    searchKey: searchData.key,
                    searchValue: searchData.val,
                }
            }, () => this.tablePaging());
        }
    }

   render(){
       return(
           <div className="business-content"> 
                <BusinessComp 
                {...this.props}
                onSearch={this.onSearch}
                /> 
           </div>
       )
   }
}
const mapStateToProps = (state) => state.BusinessRedu.toJS();
const mapDispatchToProps=(dispatch)=>({
        BusinessList:(pm)=>dispatch(BusinessAct.BusinessList(pm)),
        businessTabAdd:()=>dispatch(TabsAct.TabAdd({
            title:"商业伙伴详情",
            key:"businessPartner"
        })),
        businessDetailsId:(bpCode,langCode)=>dispatch(BusinessAct.BusinessDetailsId(bpCode,langCode)),
})
export default connect(mapStateToProps,mapDispatchToProps)(BusinessCont);      