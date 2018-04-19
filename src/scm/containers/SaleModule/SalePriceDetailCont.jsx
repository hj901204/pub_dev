import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import SalePriceListAct from '../../actions/SaleModule/SalePriceListAct';
import TabsAct from '../../actions/TabsAct';
import SalePriceDetailComp from '../../components/SaleModule/SalePriceDetailComp';

class SalePriceDetailCont extends Component {
    constructor(props, context) {
        super(props, context);
         this.state = {
            searchPm: {
                  contactCode: ''+props.contactCode, page: 1, pageSize: 20
            }
        };
    }

    
    render() {
        let {tabLoading}=this.props;
        return (
            <div className="MaterialView-content">
                 <SalePriceDetailComp {...this.props} />
            </div>
        );
        
    }
   
}
const mapStateToProps = (state) => {
    return state.SalePriceRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    //  hidden_visible:(val)=>dispatch(MaterialAct.Hidden_visible(val)),
    //  hidden_button:(val)=>dispatch(MaterialAct.Hidden_button(val)),
      EditModul:()=>dispatch(TabsAct.TabAdd({
             title:"编辑销售价格清单",
             key:"salePriceEdit"
      })),
    // getCurrencyList:(pm,type)=>dispatch(MaterialAct.getCurList(pm,type)),
     getEditData:(orderCode)=>dispatch(SalePriceListAct.getSupplierData({orderCode})),
     SalePriceSubmit:(orderCode,orderStatus)=>dispatch(SalePriceListAct.SalePriceSubmit({orderCode,orderStatus})),//提交
     SalePriceRepeal:(orderCode,orderStatus)=>dispatch(SalePriceListAct.SalePriceRepeal({orderCode,orderStatus})),//撤回
     SalePriceReject:(orderCode,orderStatus)=>dispatch(SalePriceListAct.SalePriceReject({orderCode,orderStatus})),//驳回
     



     
})
export default connect(mapStateToProps, mapDispatchToProps)(SalePriceDetailCont);
