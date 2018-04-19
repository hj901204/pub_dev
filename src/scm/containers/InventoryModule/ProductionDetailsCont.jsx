import React,{Component} from "react";
import ProductionDetailsComp from '../../components/InventoryModule/ProductionDetailsComp';
import { connect } from 'react-redux'

class ProductionDetailsCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <ProductionDetailsComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.ProductionDetailsRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect( mapStateToProps, mapDispatchToProps )(ProductionDetailsCont)


