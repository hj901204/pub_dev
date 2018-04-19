import React,{Component} from "react";
import ProductionSendMaterialCarryOutComp from '../../components/InventoryModule/ProductionSendMaterialCarryOutComp';
import { connect } from 'react-redux';
import actions from '../../actions/InventoryModule/ProductionSendMaterialCarryOutAct';
import ProductionInventorySelectCont from '../../dialogconts/InventoryModule/ProductionInventorySelectCont';

class ProductionSendMaterialCarryOutCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    
    render(){
        return (
            <div className='sale-order-box'>
                <ProductionSendMaterialCarryOutComp {...this.props}/>
                <ProductionInventorySelectCont {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => state.ProductionSendMaterialCarryOutRedu.toJS();
    
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductionSendMaterialCarryOutCont);
