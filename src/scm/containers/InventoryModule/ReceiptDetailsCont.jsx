import React,{Component} from "react";
import ReceiptDetailsComp from '../../components/InventoryModule/ReceiptDetailsComp';
import { connect } from 'react-redux'
class ReceiptDetailsCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <ReceiptDetailsComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.ReceiptDetailsRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect( mapStateToProps, mapDispatchToProps )(ReceiptDetailsCont)


