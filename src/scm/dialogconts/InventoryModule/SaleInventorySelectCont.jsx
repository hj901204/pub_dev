import React,{Component} from "react";
import { connect } from 'react-redux';
import SaleInventorySelectComp from '../../components/InventoryModule/SaleInventorySelectComp';
import SaleCarryOutAct from '../../actions/InventoryModule/SaleCarryOutAct';


class SaleInventorySelectCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    render() {
        const { inventorySelectVisiable,inventorySelectLoading ,InventorySelectSave} = this.props;
        return (
            inventorySelectVisiable ?
                <SaleInventorySelectComp
                    {...this.props}
                    onOk={(data)=>InventorySelectSave(data)}
                    visible={inventorySelectVisiable}
                    loading={inventorySelectLoading}
                />:null
               
        );
    }
}

const mapStateToProps = (state) => state.SaleCarryOutRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    handleCancel:()=>{dispatch(SaleCarryOutAct.InventorySelectVisiable(false))},
    InventorySelectTableList:(data) =>{ dispatch(SaleCarryOutAct.InventorySelectTableList(data))},
    InventorySelectSave:(data) =>{ dispatch(SaleCarryOutAct.InventorySelectSave(data))},
})


export default connect(mapStateToProps,mapDispatchToProps)(SaleInventorySelectCont);
