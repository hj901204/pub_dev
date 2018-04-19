import React,{Component} from "react";
import { bindActionCreators } from 'redux';
import AddReturnSalesListComp from '../../components/InventoryModule/AddReturnSalesListComp';
import { connect } from 'react-redux'
import AddReturnSalesListAct from '../../actions/InventoryModule/AddReturnSalesListAct';

class AddReturnSalesListCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <AddReturnSalesListComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.AddReturnSalesListRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
     actions: bindActionCreators(AddReturnSalesListAct, dispatch) 
})
export default connect( mapStateToProps, mapDispatchToProps )(AddReturnSalesListCont)


