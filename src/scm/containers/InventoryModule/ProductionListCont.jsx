import React,{Component} from "react";
import ProductionListComp from '../../components/InventoryModule/ProductionListComp';
import { connect } from 'react-redux'
import ProductionListAct from '../../actions/InventoryModule/ProductionListAct';
import TabsAct from '../../actions/TabsAct'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'
import ProductionReturnAct from '../../actions/OrderModule/ProductionReturnAct';
class ProductionListCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <ProductionListComp {...this.props}
                    />
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.ProductionlistRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
//    openSideBar:(value,pmCode)=>{
//        if(pmCode){
//           dispatch(ProductionListAct.openSideBar(value,pmCode))
//        }else{
//           dispatch(ProductionListAct.openSideBar(value))
//        }
      
//     },
//   openSideBarSub:(value,pmCode)=>{
//       if(pmCode){
//         dispatch(ProductionListAct.openSideBarSub(value,pmCode))
//       }else{
//         dispatch(ProductionListAct.openSideBarSub(value))
//       }
//     },
   openSideBar:(pmCode)=>{
      dispatch(TabsAct.TabAdd({title: "生产退料申请单详情", key: "productionReturnViewCont"}))
      dispatch(ProductionReturnAct.ProductionReturnViewData({"returnCode":pmCode}))
     },
    newCreate: () => {
        dispatch(TabsAct.TabAdd({title:'新建生产退料单', key:'inventoryAddInventoryProductionCont'}));
    },
     receiptDetails: (pm) => {
        dispatch(TabsAct.TabAdd({title:'生产退料单详情', key:'inventoryProductionDetailsCont'}));
        dispatch(ProductionListAct.details(pm))
    },
    takeOrderDelete:(pm)=>{
        return dispatch(ProductionListAct.takeOrderDelete({orderCode:pm}))
    },  
    PurchaseList: (pm) => {
        dispatch( ProductionListAct.PurchaseList(pm) )
    },
    GetIslock: (val) => dispatch(ProductionListAct.GetIslock({orderCode:val})),
    takeBtnLoading:()=>{
        dispatch(ProductionListAct.btnLoading(true))
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:26})),
})
export default connect( mapStateToProps, mapDispatchToProps )(ProductionListCont)


