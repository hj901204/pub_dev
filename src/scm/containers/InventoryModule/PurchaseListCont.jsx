import React,{Component} from "react";
import PurchaseListComp from '../../components/InventoryModule/PurchaseListComp';
import { connect } from 'react-redux'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct';
import TabsAct from '../../actions/TabsAct'
import SupplierAct from '../../actions/RenterModule/SupplierAct'
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
class PurchaseListCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <PurchaseListComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.PurchaseListRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
//    openSideBar:(value,pmCode)=>{
//        if(pmCode){
//           dispatch(PurchaseListAct.openSideBar(value,pmCode))
//        }else{
//           dispatch(PurchaseListAct.openSideBar(value))
//        }
      
//     },
//   openSideBarSub:(value,pmCode)=>{
//       if(pmCode){
//         dispatch(PurchaseListAct.openSideBarSub(value,pmCode))
//       }else{
//         dispatch(PurchaseListAct.openSideBarSub(value))
//       }
//     },
openSideBar:(pmCode)=>{
       dispatch(TabsAct.TabAdd({ title: "采购订单详情",key: "purchaseViewCont"}))
       dispatch(PurchaseAct.PurchaseCode(pmCode))
    },
  openSideBarSub:(pmCode)=>{
       dispatch(TabsAct.TabAdd({title:'供应商详情', key:'supplierViewCont'}));
       dispatch(SupplierAct.getSupplierData(pmCode, 'detail'));
       dispatch(SupplierAct.supplierBaseLoading(true));
    },
    newCreate: () => {
        dispatch(TabsAct.TabAdd({title:'新建采购入库单', key:'inventoryAddPurchaseListCont'}));
    },
     receiptDetails: (pm) => {
        dispatch(TabsAct.TabAdd({title:'采购入库单详情', key:'inventoryReceiptDetailsCont'}));
        dispatch(PurchaseListAct.details(pm))
    },
    takeOrderDelete:(pm)=>{
        return dispatch(PurchaseListAct.takeOrderDelete({orderCode:pm}))
    },
    PurchaseList: (pm) => {
        dispatch( PurchaseListAct.PurchaseList(pm) )
    },
    GetIslock: (val) => dispatch(PurchaseListAct.GetIslock({orderCode:val})),
    takeBtnLoading:()=>{
        dispatch(PurchaseListAct.btnLoading(true))
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:24})),
})
export default connect( mapStateToProps, mapDispatchToProps )(PurchaseListCont)


