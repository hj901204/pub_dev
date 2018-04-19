import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import SupplierTabsComp from '../../components/RenterModule/SupplierTabsComp';
import SupplierBaseComp from '../../components/RenterModule/SupplierBaseComp';
import TabsAct from '../../actions/TabsAct';

class SupplierViewCont extends Component {
    constructor(props, context) {
        super(props, context);
         this.state = {
            searchPm: {
                  contactCode: ''+props.contactCode, page: 1, pageSize: 10
            }
        };
    }

    tablePaging = (page) => {
        let { tabLoading, SupplierViewList } = this.props;
        if (!tabLoading){
            if (typeof page === "number") {
                this.state.searchPm.page = page;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...page };
            };
           
           SupplierViewList(this.state.searchPm).then(json => {
                if (json.status === 2000) {
                
                } 
            });
        }
    }
    
    render() {
        let {tabLoading}=this.props;
        return (
            <div className="supplierView-content">
                 <SupplierBaseComp {...this.props}/>
                 <SupplierTabsComp  {...this.props}/>
            </div>
        );
        
    }
   
}
const mapStateToProps = (state) => {
    return state.SupplierRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    hidden_visible:(val)=>dispatch(SupplierAct.Hidden_visible(val)),
    getEditData: (pm, type, Ppage) => {return dispatch(SupplierAct.getSupplierData(pm, type, Ppage)) },
    //  SupplierDetailsShow:(supplierId)=>dispatch(SupplierAct.SupplierDetailsShow({supplierId})),
    TableContacts:(page)=>dispatch(SupplierAct.TableContacts(page)),
    SupplierBaseLoading:()=>dispatch(SupplierAct.supplierBaseLoading(true)),
    supplierStatus:(pm)=>dispatch(SupplierAct.onSetup(pm)),
    EditModul:()=>dispatch(TabsAct.TabAdd({
            title:"编辑供应商",
            key:"EditSupplier"
     })),
    getDept:(pm)=>dispatch(SupplierAct.getDeptData(pm)),
    getBusinessPartnerData:(pm)=>dispatch(SupplierAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm)=>dispatch(SupplierAct.getCurList(pm)),
    getEmployeesList:(pm)=>dispatch(SupplierAct.getEmpList(pm)),
    getSubjectList:(pm)=>{dispatch(SupplierAct.getSearchInitData(pm))},
})
export default connect(mapStateToProps, mapDispatchToProps)(SupplierViewCont);
