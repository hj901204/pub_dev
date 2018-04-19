import React,{Component} from "react";
import WareHousingComp from '../../components/InventoryModule/WareHousingComp';
import { connect } from 'react-redux'
import WareHousingAct from '../../actions/InventoryModule/WareHousingAct';
import TabsAct from '../../actions/TabsAct'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'
import ProductionAct from '../../actions/OrderModule/ProductionAct';
class WareHousingCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <WareHousingComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.WareHousingRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
//    openSideBar:(value,pmCode)=>{
//        if(pmCode){
//           dispatch(WareHousingAct.openSideBar(value,pmCode))
//        }else{
//           dispatch(WareHousingAct.openSideBar(value))
//        }
      
//     },
//   openSideBarSub:(value,pmCode)=>{
//       if(pmCode){
//         dispatch(WareHousingAct.openSideBarSub(value,pmCode))
//       }else{
//         dispatch(WareHousingAct.openSideBarSub(value))
//       }
//     },
    openSideBar:(pmCode)=>{
     dispatch(TabsAct.TabAdd({title: "生产订单详情",key: "productionViewCont" }))
     dispatch(ProductionAct.ProductionDetailData({"orderCode":pmCode}))
     },
    newCreate: () => {
        dispatch(TabsAct.TabAdd({title:'新建生产入库单', key:'inventoryAddWareHousingCont'}));
    },

     receiptDetails: (pm) => {
        dispatch(TabsAct.TabAdd({title:'生产入库单收货详情', key:'inventoryWareHousingDetailsCont'}));
        dispatch(WareHousingAct.details(pm))
    },
    takeOrderDelete:(pm)=>{
        return dispatch(WareHousingAct.takeOrderDelete({orderCode:pm}))
    },
    PurchaseList: (pm) => {
        dispatch( WareHousingAct.PurchaseList(pm) )
    },
     GetIslock: (val) => dispatch(WareHousingAct.GetIslock({orderCode:val})),
     takeBtnLoading:()=>{
        dispatch(WareHousingAct.btnLoading(true))
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:29})),
})
export default connect( mapStateToProps, mapDispatchToProps )(WareHousingCont)


