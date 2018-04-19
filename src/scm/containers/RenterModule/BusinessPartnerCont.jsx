import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import BusinessPartnerComp from '../../components/RenterModule/BusinessPartnerComp';
import BusinessAct from '../../actions/RenterModule/BusinessAct'

class BusinessPartnerCont extends Component{
    constructor(props,context){
        super(props,context);
        this.searchCo = {bpCode:'',page: 1,pageSize: 10};
        this.searchAd = {bpCode:'',page: 1,pageSize:10};
    }
    contactTablePaging=(page)=>{
        const{contactTabLoading,ContactList,businessId}=this.props;
        this.searchCo.bpCode=businessId;
        if (!contactTabLoading){
            if (typeof page === "number") {
                this.searchCo.page = page;
            } else {
                this.searchCo = { ...this.searchCo, ...page };
            };
            ContactList(this.searchCo);
        }
    }
    addressTablePaging=(page)=>{
        const{addressTabLoading,AddressList,businessId}=this.props;
        this.searchAd.bpCode=businessId;
        if(!addressTabLoading){
            if (typeof page === "number") {
                this.searchAd.page = page;
            } else {
                this.searchAd = { ...this.searchAd, ...page };
            };
            AddressList(this.searchAd);
        }
    }
    initData = () =>{
      const{businessPartnerTabLoading,BusinessDetailsShow,businessBase,businessId,contactTabLoading,addressTabLoading,...props}=this.props;
      if(!businessPartnerTabLoading&&businessId){
          BusinessDetailsShow(businessId).then(json=>{
               if (json.status === 2000) {
                    // message.info('获取商业伙伴详情成功!');
                } else if (json.status === 4352) {
                   // handleCancel(null);
                };
          })
      }
    }
    render(){
        return(
            <BusinessPartnerComp 
            {...this.props}
            initData={this.initData}
            loading={this.props.businessPartnerTabLoading}
            contactTablePaging={this.contactTablePaging}
            addressTablePaging={this.addressTablePaging}
            />
        )
    }
}

const mapStateToProps = (state) => { return state.BusinessRedu.toJS() }
const mapDispatchToProps = (dispatch, ownProps) => ({
    BusinessDetailsShow:(businessCode)=>dispatch(BusinessAct.BusinessDetailsShow({businessCode})),
    ContactList:(pm)=>dispatch(BusinessAct.BusinessDetailsContact(pm)),
    AddressList:(pm)=>dispatch(BusinessAct.BusinessDetailsAddress(pm)),
})
export default connect(mapStateToProps,mapDispatchToProps)(BusinessPartnerCont);