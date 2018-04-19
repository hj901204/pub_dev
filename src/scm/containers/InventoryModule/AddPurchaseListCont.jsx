import React,{Component} from "react";
import { bindActionCreators } from 'redux';
import AddPurchaseListComp from '../../components/InventoryModule/AddPurchaseListComp';
import { connect } from 'react-redux'
import AddPurchaseListAct from '../../actions/InventoryModule/AddPurchaseListAct';

class AddPurchaseListCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <AddPurchaseListComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.AddPurchaseListRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
     actions: bindActionCreators(AddPurchaseListAct, dispatch) 
})
export default connect( mapStateToProps, mapDispatchToProps )(AddPurchaseListCont)


