import React,{Component} from "react";
import { bindActionCreators } from 'redux';
import AddWareHousingComp from '../../components/InventoryModule/AddWareHousingComp';
import { connect } from 'react-redux'
import AddWareHousingAct from '../../actions/InventoryModule/AddWareHousingAct';

class AddWareHousingCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <AddWareHousingComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.AddWareHousingRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
     actions: bindActionCreators(AddWareHousingAct, dispatch) 
})
export default connect( mapStateToProps, mapDispatchToProps )(AddWareHousingCont)


