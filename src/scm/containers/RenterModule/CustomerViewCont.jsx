import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import CustomerAct from '../../actions/RenterModule/CustomerAct';

import CustomerTabsComp from '../../components/RenterModule/CustomerTabsComp';
import CustomerBaseComp from '../../components/RenterModule/CustomerBaseComp';
import TabsAct from '../../actions/TabsAct';

class CustomerViewCont extends Component {
    constructor(props, context) {
        super(props, context);
         this.state = {
            searchPm: {
                  contactCode: ''+props.contactCode, page: 1, pageSize: 10
            }
        };
    }

    tablePaging = (page) => {
        let { tabLoading, CustomerViewList } = this.props;
        if (!tabLoading){
            if (typeof page === "number") {
                this.state.searchPm.page = page;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...page };
            };
           
           CustomerViewList(this.state.searchPm).then(json => {
                if (json.status === 2000) {
                
                } 
            });
        }
    }

    render() {
        let {tabLoading}=this.props;
        return (
            <div className="customerView-content">
                 <CustomerBaseComp {...this.props}/>
                 <CustomerTabsComp  {...this.props} />
                 
            </div>
        );
        
    }
   
}
const mapStateToProps = (state) => {
    return state.CustomerRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    CustomerViewList: (pm) => dispatch(CustomerAct.CustomerViewList(pm)),
    hidden_visible:(val)=>dispatch(CustomerAct.Hidden_visible(val)),
    CustomerDetailsShow:(customerId)=>dispatch(CustomerAct.CustomerDetailsShow({customerId})),
    customerLoading:()=>dispatch(CustomerAct.customerLoading(true)),
    EditModul:()=>dispatch(TabsAct.TabAdd({
            title:"编辑客户",
            key:"EditCustomer"
     })),
    getEditData: (customerCode, langCode, type, Ppage) => {return dispatch(CustomerAct.getCustomerData({ customerCode, langCode }, type, Ppage)) },
    getDept:(pm)=>dispatch(CustomerAct.getDeptData(pm)),
    getBusinessPartnerData:(pm)=>dispatch(CustomerAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm)=>dispatch(CustomerAct.getCurList(pm)),
    customerStatus:(pm)=>dispatch(CustomerAct.onSetup(pm)),
    CustomerBaseLoading: () => dispatch(CustomerAct.CustomerBaseLoading(true)),
    getEmployeesList: (deptCode) => dispatch(CustomerAct.getEmpList(deptCode)),
    getSubjectList:(pm)=>{dispatch(CustomerAct.getSearchInitData(pm))},
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomerViewCont);
