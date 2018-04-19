import React,{Component} from "react";
import SalesReturnDetailsComp from '../../components/InventoryModule/SalesReturnDetailsComp';
import { connect } from 'react-redux'

class SalesReturnDetailsCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <SalesReturnDetailsComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.SalesReturnDetailsRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect( mapStateToProps, mapDispatchToProps )(SalesReturnDetailsCont)


