/**
 * Created by MW on 2017/7/21.
 */

import React,{Component} from "react";
import { connect } from 'react-redux';
import OtherOutboundOrderCarryOutAllotDigComp from '../../components/InventoryModule/OtherOutboundOrderCarryOutAllotDigComp';
import OtherOutboundOrderCarryOutAct from '../../actions/InventoryModule/OtherOutboundOrderCarryOutAct'


class OtherOutboundOrderCarryOutAllotDigCont extends Component{
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (this.props.visible ? <OtherOutboundOrderCarryOutAllotDigComp {...this.props} handleCancel={this.props.handleCancel} visible={this.props.visible} loading={this.props.popupLoading}/>:null);
    }
}

let mapStateToProps = (state) => state.OtherOutboundOrderCarryOutRedu.toJS();
let mapDispatchToProps = (dispatch) => ({
    handleCancel: () => {dispatch(OtherOutboundOrderCarryOutAct.loadingOrVisible('visible',false))},
    getInventoryList :(search, mark) => {
        dispatch(OtherOutboundOrderCarryOutAct.getInventoryList(search, mark));
    },
    allocateSave: (list) => {
        dispatch(OtherOutboundOrderCarryOutAct.allocateSave(list));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherOutboundOrderCarryOutAllotDigCont);

