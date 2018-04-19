import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import ProductionReturnAct from '../../actions/OrderModule/ProductionReturnAct';
import AddProductionReturnComp from '../../components/OrderModule/AddProductionReturnComp';
import {Spin} from '../../../base/components/AntdComp';
import PurchaseAct from '../../actions/OrderModule/PurchaseAct';
class AddProductionReturnCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return(
           <Spin spinning={this.props.addProductionReturnLoading}><AddProductionReturnComp {...this.props}/></Spin>
        )
    }

}
AddProductionReturnCont.defaultProps = {
    title: "新建生产退料申请单",
    type:"add"
}

const mapStateToProps = (state) => {
    return state.ProductionReturnRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
    ProductionOrderList:(pm,type)=>dispatch(ProductionReturnAct.ProductionOrderList(pm,'add')),
    GetDepartment:(pm,type)=>dispatch(ProductionReturnAct.GetDepartment(pm,'add')),
    ProductionOrderDetail:(pm,type)=>{return dispatch(ProductionReturnAct.ProductionOrderDetail(pm,'add'))},
    EmpList:(pm,type)=>dispatch(ProductionReturnAct.EmpList(pm,'add')),
    ProductionReturn_Add: (data) => {return dispatch(ProductionReturnAct.ProductionReturn_Add(data))},
    ProductionReturn_AddToBack: (data) => {return dispatch(ProductionReturnAct.ProductionReturn_Add(data,'back'))},
    ReturnDataSource:(pm,type) => dispatch(ProductionReturnAct.ReturnDataSource(pm,type)),
    NullReturnDataSource:(type) => dispatch(ProductionReturnAct.NullReturnDataSource(type)),
})
     
export default connect(mapStateToProps, mapDispatchToProps)(AddProductionReturnCont);