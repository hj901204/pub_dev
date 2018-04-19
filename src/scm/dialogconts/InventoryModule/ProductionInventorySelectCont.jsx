import React,{Component} from "react";
import { connect } from 'react-redux';
import ProductionInventorySelectComp from '../../components/InventoryModule/ProductionInventorySelectComp';
import actions from '../../actions/InventoryModule/ProductionSendMaterialCarryOutAct';



class ProductionInventorySelectCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    render() {
        const { inventorySelectVisiable,inventorySelectLoading ,InventorySelectSave} = this.props;
        return (
            inventorySelectVisiable ?
                <ProductionInventorySelectComp
                    {...this.props}
                    onOk={(data)=>InventorySelectSave(data)}
                    visible={inventorySelectVisiable}
                    loading={inventorySelectLoading}
                />:null
               
        );
    }
}

const mapStateToProps = (state) => state.ProductionSendMaterialCarryOutRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    handleCancel:()=>{dispatch(actions.InventorySelectVisiable(false))},
    InventorySelectTableList:(data) =>{ dispatch(actions.InventorySelectTableList(data))},
    InventorySelectSave:(data) =>{ dispatch(actions.InventorySelectSave(data))},
})


export default connect(mapStateToProps,mapDispatchToProps)(ProductionInventorySelectCont);
