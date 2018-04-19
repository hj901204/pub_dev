import React,{Component} from "react";
import SaleCarryOutComp from '../../components/InventoryModule/SaleCarryOutComp';
import { connect } from 'react-redux';
import SaleCarryOutAct from '../../actions/InventoryModule/SaleCarryOutAct';
import SaleInventorySelectCont from '../../dialogconts/InventoryModule/SaleInventorySelectCont';

class SaleCarryOutCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    
    render(){
        return (
            <div className='sale-order-box'>
                <SaleCarryOutComp {...this.props}/>
                <SaleInventorySelectCont {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => state.SaleCarryOutRedu.toJS();
    
const mapDispatchToProps = (dispatch) => ({
     distributeBtn: (data) =>{ dispatch(SaleCarryOutAct.distributeBtn(data))},
     CarryOutList: (data) =>{ dispatch(SaleCarryOutAct.CarryOutList(data))},
     carryOutOrderInfoList:(data) =>{ dispatch(SaleCarryOutAct.carryOutOrderInfoList(data))},
     DistributeInfoDelete:(data) =>{ dispatch(SaleCarryOutAct.DistributeInfoDelete(data))},
     DistributeInfoList:(data) =>{ dispatch(SaleCarryOutAct.DistributeInfoList(data))},
     ShippingSend:(data) =>{ 
        dispatch(SaleCarryOutAct.ShippingSend(data));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SaleCarryOutCont);
