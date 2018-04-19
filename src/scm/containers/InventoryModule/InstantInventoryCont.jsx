import React,{Component} from "react";
import InstantInventoryComp from '../../components/InventoryModule/InstantInventoryComp';
import InstantInventoryDialogCont from '../../dialogconts/InventoryModule/InstantInventoryDialogCont'
import Sidebar from '../../../base/components/SidebarWrapComp';
import { connect } from 'react-redux';
import actions from '../../actions/InventoryModule/InstantInventoryAct';
import {Tabs ,Spin,Pagination} from '../../../base/components/AntdComp';

class InstantInventoryCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return (
            <div className='sale-order-box'>
                <InstantInventoryComp {...this.props} />
                <InstantInventoryDialogCont />
            </div>
        )
    }
}
const mapStateToProps = (state) => state.InstantInventoryRedu.toJS();
    
const mapDispatchToProps = (dispatch) => ({
     SidebarBtn: (materialCode,status,id) =>{ dispatch(actions.SidebarBtn(materialCode,status,id))},
     InventoryList: (data) =>{ dispatch(actions.InventoryList(data))},
})

export default connect(mapStateToProps, mapDispatchToProps)(InstantInventoryCont);
