import React,{Component} from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import AddProductionComp from '../../components/InventoryModule/AddProductionComp';
import AddProductionAct from '../../actions/InventoryModule/AddProductionAct';

class AddInventoryProductionCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <AddProductionComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.AddProductionRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
     actions: bindActionCreators(AddProductionAct, dispatch)
})
export default connect( mapStateToProps, mapDispatchToProps )(AddInventoryProductionCont)


