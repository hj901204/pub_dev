import React,{Component} from "react";
import { connect } from 'react-redux';
import InstantSidebarWrapComp from '../../components/InventoryModule/InstantSidebarWrapComp';
import actions from '../../actions/InventoryModule/InstantInventoryAct';

class SaleInventorySelectCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    render() {
        let {sidebarVisiable,dialogLoading} = this.props;
        return (
            sidebarVisiable ?
                <InstantSidebarWrapComp
                    {...this.props}
                />:null
               
        );
    }
}

const mapStateToProps = (state) => state.InstantInventoryRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    handleCancel:()=>{dispatch(actions.SidebarVisiable(false))},
})


export default connect(mapStateToProps,mapDispatchToProps)(SaleInventorySelectCont);
