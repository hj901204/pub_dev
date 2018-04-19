import React,{Component} from "react";
import PurchaseReturnOutCarryOutComp from '../../components/InventoryModule/PurchaseReturnOutCarryOutComp';
import { connect } from 'react-redux';
import actions from '../../actions/InventoryModule/PurchaseReturnOutCarryOutAct';
import PurchaseInventorySelectCont from '../../dialogconts/InventoryModule/PurchaseInventorySelectCont';

class PurchaseReturnOutCarryOutCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    
    render(){
        return (
            <div className='sale-order-box'>
                <PurchaseReturnOutCarryOutComp {...this.props}/>
                <PurchaseInventorySelectCont {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => state.PurchaseReturnOutCarryOutRedu.toJS();
    
const mapDispatchToProps = (dispatch) => ({
     distributeBtn: (data) =>{ dispatch(actions.distributeBtn(data))},
     CarryOutList: (data) =>{ dispatch(actions.CarryOutList(data))},
     carryOutOrderInfoList:(data) =>{ dispatch(actions.carryOutOrderInfoList(data))},
     DistributeInfoDelete:(data) =>{ dispatch(actions.DistributeInfoDelete(data))},
     DistributeInfoList:(data) =>{ dispatch(actions.DistributeInfoList(data))},
     ShippingSend:(data) =>{
        dispatch(actions.ShippingSend(data));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnOutCarryOutCont);
