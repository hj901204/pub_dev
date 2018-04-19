import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import MaterialAct from '../../actions/MaterialModule/MaterialAct';
import TabsAct from '../../actions/TabsAct';
import MaterialTabsComp from '../../components/MaterialModule/MaterialTabsComp';
import MaterialBaseComp from '../../components/MaterialModule/MaterialBaseComp';

class MaterialViewCont extends Component {
    constructor(props, context) {
        super(props, context);
         this.state = {
            searchPm: {
                  contactCode: ''+props.contactCode, page: 1, pageSize: 20
            }
        };
    }

    // tablePaging = (page) => {
    //     let { tabLoading, SupplierViewList } = this.props;
    //     if (!tabLoading){
    //         if (typeof page === "number") {
    //             this.state.searchPm.page = page;
    //         } else {
    //             this.state.searchPm = { ...this.state.searchPm, ...page };
    //         };
           
    //        SupplierViewList(this.state.searchPm).then(json => {
    //             if (json.status === 2000) {
                
    //             } 
    //         });
    //     }
    // }
    // tablecontacts=(bpCode,page,pageSize)=>{
    //      let {  TableContacts,tabLoading } = this.props;
    //      if(!tabLoading){
    //             TableContacts({ bpCode:bpCode,page: page, pageSize: pageSize })
    //      }
           
    // }
    //  tablePaging = (pageNum) => {
    //     let { tabLoading, MaterialList } = this.props;
    //     if (!tabLoading){
    //         if (typeof pageNum === "number") {
    //             this.state.searchPm.page = pageNum;
    //         } else {
    //             this.state.searchPm = { ...this.state.searchPm, ...pageNum };
    //         };
    //        MaterialList(this.state.searchPm).then(json => {
    //             if (json.status === 2000) {
    //             } else if (json.status === 4351) {

    //             };
    //         });
    //     }
    // }

    render() {
        let {tabLoading}=this.props;
        return (
            <div className="MaterialView-content">
                 <MaterialBaseComp {...this.props} />
                 <MaterialTabsComp  {...this.props} />
            </div>
        );
        
    }
   
}
const mapStateToProps = (state) => {
    return state.MaterialRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
     hidden_visible:(val)=>dispatch(MaterialAct.Hidden_visible(val)),
     hidden_button:(val)=>dispatch(MaterialAct.Hidden_button(val)),
     EditModul:()=>dispatch(TabsAct.TabAdd({
            title:"编辑物料",
            key:"materialEdit"
     })),
    getCurrencyList:(pm,type)=>dispatch(MaterialAct.getCurList(pm,type)),
    getEditData:(materialCode,type)=>dispatch(MaterialAct.getSupplierData({materialCode},type)),
    MaterialIsDisable:(materialCode,status)=>dispatch(MaterialAct.MaterialIsDisable({materialCode,status})),
})
export default connect(mapStateToProps, mapDispatchToProps)(MaterialViewCont);
