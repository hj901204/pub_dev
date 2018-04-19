import React,{Component} from "react";
import { bindActionCreators } from 'redux';
import AddOtherWareHousePageComp from '../../components/InventoryModule/AddOtherWareHousePageComp';
import AddOtherWareHousePageTableComp from '../../components/InventoryModule/AddOtherWareHousePageTableComp';
import { connect } from 'react-redux'
import AddOtherWareHousePageAct from '../../actions/InventoryModule/AddOtherWareHousePageAct';
import {Spin} from '../../../base/components/AntdComp';

class AddOtherWareHousePageCont extends Component{
    constructor(props,context){
        super(props,context);
    }
     componentDidMount() {
        this.props.actions.storeInitOrderInfo();
		this.props.actions.getInfo();
    }
    render(){
        return (
            <div> 
                <Spin spinning={this.props.listLoading}>
                    <AddOtherWareHousePageComp {...this.props} />
                    <AddOtherWareHousePageTableComp {...this.props} />
                </Spin>
            </div>
        );
    }
}
 
const mapStateToProps = (state) =>  {   
    return state.AddOtherWareHousePageRedu.get('addWareHouse').toJS()
}

const mapDispatchToProps = (dispatch) => ({
     actions: bindActionCreators(AddOtherWareHousePageAct, dispatch) 
})
export default connect( mapStateToProps, mapDispatchToProps )(AddOtherWareHousePageCont)


