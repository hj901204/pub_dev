import React,{Component} from "react";
import { connect } from 'react-redux';
import PurchaseInventorySelectComp from '../../components/InventoryModule/PurchaseInventorySelectComp';
import actions from '../../actions/InventoryModule/PurchaseReturnOutCarryOutAct';



class PurchaseInventorySelectCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { inventorySelectVisiable,inventorySelectLoading ,InventorySelectSave} = this.props;
        return (
            inventorySelectVisiable ?
                <PurchaseInventorySelectComp
                    {...this.props}
                    onOk={(data)=>InventorySelectSave(data)}
                    visible={inventorySelectVisiable}
                    loading={inventorySelectLoading}
                />:null
               
        );
    }
}

const mapStateToProps = (state) => state.PurchaseReturnOutCarryOutRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    handleCancel:()=>{dispatch(actions.InventorySelectVisiable(false))},
    InventorySelectTableList:(data) =>{ dispatch(actions.InventorySelectTableList(data))},
    InventorySelectSave:(data) =>{ dispatch(actions.InventorySelectSave(data))},
})


export default connect(mapStateToProps,mapDispatchToProps)(PurchaseInventorySelectCont);
