import React,{Component} from "react";
import OtherWareHousePageComp from '../../components/InventoryModule/OtherWareHousePageComp';
import { connect } from 'react-redux'
import OtherWareHousePageAct from '../../actions/InventoryModule/OtherWareHousePageAct';
import TabsAct from '../../actions/TabsAct'
import PurchaseListAct from '../../actions/InventoryModule/PurchaseListAct'

class OtherWareHousePageCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <OtherWareHousePageComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.OtherWareHousePageRedu.toJS()
    }
};

const mapDispatchToProps = (dispatch) => ({
    newCreate: () => {
        dispatch(TabsAct.TabAdd({title:'新建其他入库单', key:'inventoryAddOtherWareHousePageCont'}));
    },
     receiptDetails: (pm) => {
        dispatch(TabsAct.TabAdd({title:'其他入库单详情', key:'inventoryOtherWareHousePageDetailsCont'}));
        dispatch(OtherWareHousePageAct.details(pm))
    },
    takeOrderDelete:(pm)=>{
        return dispatch(OtherWareHousePageAct.takeOrderDelete({orderCode:pm}))
    },
    PurchaseList: (pm) => {
        dispatch( OtherWareHousePageAct.PurchaseList(pm) )
    },
    GetIslock: (val) => dispatch(OtherWareHousePageAct.GetIslock({orderCode:val})),
    EditIslock:(val) => dispatch(OtherWareHousePageAct.EditIslock({orderCode:val})),
    takeBtnLoading:()=>{
        dispatch(OtherWareHousePageAct.btnLoading(true))
    },
    BusCodeList:(pm)=>{
        return dispatch(OtherWareHousePageAct.BusCodeList(pm)) 
    },
    GetCodeRule: () => dispatch(PurchaseListAct.GetCodeRule({businessIndex:28})),
})
export default connect( mapStateToProps, mapDispatchToProps )(OtherWareHousePageCont)


